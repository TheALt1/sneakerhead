import "./Cart.scss";
import Wrapper from "../Wrapper"
import CartItem from "../Cart/CartItem/CartItem";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Cart = () => {
    const { cartItems, cartSubTotal } = useContext(Context);
    const navigate = useNavigate();
    const handleClick = () => {
        // Navigate to the desired route
        navigate('/Shipping');
      };
    console.log(cartItems);
    return <div className="cart-container">
        <Wrapper>
            {/* cart length logic- if filled then*/}
            <div className="h-cart">
                <div className="hdcpg">Shopping Cart</div>
            </div>
            {!cartItems.length && (
                    <div className="empty-cart">
                        <BsCartX size={50}/>
                        <div >No products in the Cart.</div>
                        <div>
                        <button className="return-cta" onClick={() => navigate("/")}>
                            RETURN TO SHOP
                        </button>
                    </div></div>
                )}
            {!!cartItems.length && (
                    <>
            <div className="cart-content">
                <div className="cartit">
                    <div className="headit">
                        Cart Items
                    </div>
                    <CartItem />
                    
                </div>
                <div className="sumsec">
                    <div className="sumhd">
                            Summary
                    </div>
                    <div className="summarytext">
                        <div className="textcon">
                            <div className="sumst-title">
                                Subtotal
                            </div>
                            <div className="ctpricetext">
                                &#8377;{cartSubTotal}/-
                            </div>
                        </div>
                        <div className="sumdisclaimer">
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                        </div>
                    </div>
                    <button className="buybt" onClick={handleClick}>
                        Purchase
                    </button>
                </div>
            </div>
            </>)}
        </Wrapper>
    </div>;
};

export default Cart;
