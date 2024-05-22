import "./SingleProduct.scss";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../../components/Wrapper";
import ProductDetailsCarousal from "../../components/ProductDetailsCarousal";
import { IoMdHeartEmpty } from "react-icons/io";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import ReactMarkdown from "react-markdown";
import {
    FaCartPlus
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../utils/context";
import { addToWishlist } from "../../utils/api";
import { userData } from '../../utils/helpers';

const SingleProduct = ( ) => {
    const [quantity, setQuantity] = useState(1);
    const { slug } = useParams();
    const [selectedSize, setSelectedSize] = useState();
    const { handleAddToCart } = useContext(Context);
    const [showError, setShowError] = useState(false);
    console.log({slug});
    const {data} = useFetch(
        `/api/products?populate=*&[filters][slug][$eq]=${slug}`
        );
        if(!data) return;
        const product = data?.data?.[0]?.attributes;
        const {email} = userData();
        const handleAddToWishlist = async () => {
            try {
            const res = await addToWishlist.post("/api/wishlists", {
                products: product,
                email: email,
            });
            console.log(res);
            }
            catch(err){
                return(err);
            }
          };

    return <div className="single-product-main-content">
            <Wrapper>
            <div className="single-product-page">
                <div className="leftside">
                    <ProductDetailsCarousal images={product.image.data}/>
             </div>
              
            <div className="rightside">
                <div className="name">{product.name}</div>
                <div className="subtitlesp">{product.subtitle}</div>
                <div className="price">
                            <p className="mrp">
                                Price : &#8377;{product.price}/-
                            </p>
                                <>
                                    <p className="strikedp discountp">
                                        &#8377;{product.original_price}
                                    </p>
                                </>
                        </div>
                        <div className="taxes">
                            Incl. of all taxes
                        </div>
                        <div className="sizes">
                            <div className="sizect">
                                <div className="sizetitle">
                                    Select Size
                                </div>
                            </div>
                        </div>
                        <div id= "sizesGrid" className="sizesgrid">
                            {product?.size?.data?.map((item, i) => (
                                <button key={i} className={`${item.enabled ? 'sizebt ' : 'sizebtdis '}${selectedSize === item.size ? 'button-selected ' : ''}`}  onClick={() => {
                                    setSelectedSize(item.size)
                                    setShowError(false)
                                    console.log(item)
                                }}
                                >
                                    {item.size} 
                                </button>
                            ))}
                        </div>
                        {showError && (
                                <div className="szerror">
                                    Size selection is required
                                </div>
                            )}
                        <div>
                    <button className="Add-to-cart" onClick={() => {
                        if(!selectedSize){
                            setShowError(true)
                            document.getElementById("sizesGrid").scrollIntoView({
                                block:"center",
                                behavior: 'smooth',
                            });
                    } else {
                            handleAddToCart(
                                data?.data?.[0],
                                quantity,selectedSize
                            );
                            setQuantity(1);
                    }
                }}
                    >
                        Add to Cart
                       <span><FaCartPlus size={18}/></span>
                    </button>
                    <button className="wishltbt" onClick={handleAddToWishlist}>
                        Wishlist
                        <span><IoMdHeartEmpty size={21}/></span>
                    </button>
                        </div>
                        <div className="descbg">
                    <div className="proddesc-title">Product Description</div>
                    <div className="prod-desc markdown">
                        <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>
                </div>
            </div></div>
            <RelatedProducts
            productslug={slug}
            categoryId={product.categories.data[0].id}
            />
            <center>
            <div className="swipemb">
                
            </div></center>
    </Wrapper>
</div>;
};

export default SingleProduct;
