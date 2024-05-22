import React from "react";
import "./Newsletter.scss";
import {
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";

const Newsletter = () => {
    return <div className="newsletter-section">
        <div className="newsletter-content">
            <span className="big-text">Newsletter</span>
            <span className="small-text">Sign up for latest updates and offers</span>
            <div className="form">
                <input type="email" placeholder="abc@mail.com" />
                <button className="bt">Subscribe</button>
            </div>
            <div className="text">It will be used in accordance to our privacy policy.</div>
            <div className="social-icons">
                <div className="icon">
                <a href="https://github.com/Sujayz22" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={28}/></a>
                </div>
                <div className="icon">
                <a href="https://www.linkedin.com/in/sujaypandajsx/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={28} /></a>
                </div>
            </div>
        </div>
        </div>;
};

export default Newsletter;
