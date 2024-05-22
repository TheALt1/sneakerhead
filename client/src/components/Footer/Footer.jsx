import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";
const Footer = () => {
    return <footer className="footer">
        <div className="footer-content">
            <div className="col">
                <div className="title">About</div>
                <div className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Qui odio recusandae, nisi error totam laborum aut obcaecati? Ea, neque nemo?
                     Tempora officia dolor esse quasi minus vel voluptatum hic laboriosam.
                </div>
            </div>
            <div className="col">
                <div className="title">Contact</div>
                <div className="c-item">
                    <FaLocationArrow color="grey"/>
                    <div className="text">
                        Old Madras Road, Bangalore, Karnataka, India -560016
                    </div>
                </div>
                <div className="c-item">
                    <FaMobileAlt color="grey"/>
                    <div className="text">
                        Phone : 8327779549
                    </div>
                </div>
                <div className="c-item">
                    <FaEnvelope color="grey"/>
                    <div className="text">
                        Email : sujayjsx@gmail.com
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="title">Brands</div>
                <span className="text">Nike</span>
                <span className="text">Adidas</span>
                <span className="text">Converse</span>
                <span className="text">Vans</span>
            </div>
            <div className="col">
                <div className="title">Pages</div>
                <span className="text">Home</span>
                <span className="text">About</span>
                <span className="text">Privacy Policy</span>
                <span className="text">Returns</span>
                <span className="text">Terms & Conditions</span>
                <span className="text">Contact Us</span>
            </div>
        </div>
        <div className="bottom-bar">
            <div className="bottom-bar-content">
                <div className="text">
                Sneakerhead. 2023 by SujayJSX | E-commerce Solutions.
                </div>
                <img src={Payment} alt="payments" id="stripefooter"/>
            </div>
        </div>
    </footer>;
};

export default Footer;
