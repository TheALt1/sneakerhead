'use strict';

/**
 * wishlist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wishlist.wishlist', ({ strapi }) => ({
    async find(ctx) {
        const { email } = ctx.request.query;
        try {
          const data = await strapi.db.query("api::wishlist.wishlist").findMany({
            where: { email },
          });
          return { data };
        } catch (error) {
          ctx.response.status = 500;
          return error;
        }
      },
      async create(ctx) {
        const { products, email } = ctx.request.body;
        try {
          const res = await strapi.service("api::wishlist.wishlist").create({
            data: {
              products,
              email,
            },
          });
          return res;
        } catch (error) {
          ctx.response.status = 500;
          return error;
        }
      },
      async delete(ctx) {
        const { id, email } = ctx.request.query;
        console.log(id, email);
        try {
          const res = await strapi.db.query("api::wishlist.wishlist").delete({
            where: { id, email },
          });
          return res;
        } catch (error) {
          ctx.response.status = 500;
          console.log({ error });
          return error;
        }
      },

}));