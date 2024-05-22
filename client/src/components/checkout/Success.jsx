import React from "react";
import Wrapper from "../Wrapper";
import "./checkout.scss";

const Success = () => {
  
  return (
    <div className="container-main">
      <Wrapper>
        <div className="wrap-container">
          <div className="title">
            Thanks for shopping with us!
          </div>
          <div className="mes">
            Your order has been placed successfully.
          </div>
          <div className="que">
            For any product-related queries, drop an email to
          </div>
          <div className="lol">sujayjsx@gmail.com</div>

          <a href="/" className="continuebt">Continue Shopping</a>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;
