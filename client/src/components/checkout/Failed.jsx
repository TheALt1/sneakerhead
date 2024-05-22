import React from "react";
import Wrapper from "../Wrapper";
import "./checkout.scss";

const Failed = () => {
    return (
        <div className="container-main">
            <Wrapper>
                <div className="wrap-container">
                    <div className="title">
                        Payment failed!
                    </div>
                    <div className="mes">
                        Your order was not successful. Try again
                    </div>
                    <div className="que">
                        If issue persists, drop an email to
                    </div>
                    <div className="lol">sujayjsx@gmail.com</div>
                        
                    <a href="/" className="continuebt">Go to Home</a>
                </div>
            </Wrapper>
        </div>
    );
};

export default Failed;