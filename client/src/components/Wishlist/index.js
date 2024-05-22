import React from "react";
import "../Cart/Cart.scss";
import Wrapper from "../Wrapper";
import { useNavigate } from "react-router-dom";
import {BsFillBagHeartFill} from "react-icons/bs";
import Wishitem from "./WishItem/Wishitem";
import "./Wishlist.scss";
const Wishlist = (wishlist) => {
    const navigate = useNavigate();
  
    console.log(wishlist);
    
    return<div className="wish-container">
        <Wrapper>
        <div className="h-cart">
                <div className="hdcpg">Wishlist</div>
            </div>
            {wishlist.wishlist && wishlist.wishlist.data && wishlist.wishlist.data.length === 0 ? (
          <>
            
                    <div className="empty-cart">
                    <BsFillBagHeartFill size={50}/>
                    <div className="wlempty">Wishlist is empty</div>
                    <div>
                    <button className="return-cta" onClick={() => navigate("/")}>
                        RETURN TO SHOP
                    </button>
                </div></div>
                </>
        ) : (
          <div className="wish-content">
                <div className="wishdp">
                    {wishlist?.wishlist?.data?.map((item) => (
                  <Wishitem
                    key={item.id}
                    item={item}
                    slug={item.products.slug}
                    data={item.products}
                    count={wishlist.wishlist.data.length}
                  />    
                  ))}
                </div>
            </div>
            )}
        </Wrapper>
    </div>
};
export default Wishlist;