import React from 'react';
import OrderedItems from '../OrderDetails/OrderedItems';
import { loadStripe } from "@stripe/stripe-js";
import './orders.scss';

const getDateTime = (string) => {
  const fullDate = new Date(string);
  const date = fullDate.toLocaleDateString();
  const time = fullDate.toLocaleTimeString();
  return `${date} - ${time}`;
};

const Orders = ({ orders }) => {
  console.log(orders);
  const stripePromise = loadStripe('pk_test_51NtpnsSI7HZWJAd659tIN2jeuCLIJrIyasfS9PJWd98phoHD7x9pW1ddaZvUHZf5gZt6gDdYPIQ0fvodOB98tot100YsDUSEQB');
  const retryPayment = (stripeId) => {
    stripePromise.then(stripe => {
      stripe.redirectToCheckout({
        sessionId: stripeId,
      });
    });
  };
  return (
    <center>
      <div className="orders">
        {orders.entries.length ? ( 
          <>
            <h2 className="h2order">Your orders:</h2>
            {orders.entries.map((order) => (
              <div key={order.id}>
                <h3>Order date: {getDateTime(order.createdAt)}</h3>
                <span className="orderstatus">Payment Status: {order.paymentStatus}</span>
                {order.products.length ? (
                  <div>
                    {order.products.map((product) => (
                      <div key={product.id} className="items">
                        <OrderedItems product={product} />
                        <div className="orderspec">
                          <span>
                            Size: {product?.attributes.clsize} <br />
                            Quantity: {product?.attributes.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No products in this order.</p>
                )}
                <div className="orderbtns">
                {order.paymentStatus === 'unpaid' && (
                  <span>
                    <button className="retrypay" onClick={() => retryPayment(order.stripeId)}>Retry Payment</button>
                  </span>  )}
                  <div className="orders-add">
                    <span className="sdtitle">Shipping Details</span>
                    <span>Name: {order.shippingDetails.firstName + ' ' + order.shippingDetails.lastName}</span>
                    <span>
                      Address: {order.shippingDetails.address + ', ' + order.shippingDetails.city + ', ' + order.shippingDetails.state + ', ' + order.shippingDetails.country + ' -' + order.shippingDetails.zip}
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </>
        ) : (
          <h2 className="noorders">No orders available.</h2>
        )}
      </div>
    </center>
  );
};

Orders.defaultProps = {
  orders: [],
};

export default Orders;
