("use strict");
const dotenv = require("dotenv"); 
 dotenv.config();
  // @ts-ignore
const stripe = require('stripe')(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, shippingDetails, email } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.attributes.quantity,
          };
        })
      );
      console.log("Line items:", lineItems);
      const session = await stripe.checkout.sessions.create({
       
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL+'/Success/',
        cancel_url: process.env.CLIENT_URL+"/Failed/",
        line_items: lineItems,
      });
      console.log( products,session);
      
      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id, shippingDetails, email } });
      return { stripeSession: session };
     
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
  async find(ctx) {
    const { email } = ctx.request.query;
    console.log(email);
    try {
      const entries = await strapi.db.query("api::order.order").findMany({
        where: { email },
      });
  
      
      const ordersWithPaymentStatus = await Promise.all(
        entries.map(async (order) => {
          try {
            const session = await stripe.checkout.sessions.retrieve(order.stripeId);
            if (session) {
              order.paymentStatus = session.payment_status;
            }
          } catch (error) {
            console.error('Error retrieving session details:', error);
          }
          return order;
        })
      );
  
      return { entries: ordersWithPaymentStatus };
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  }
}));