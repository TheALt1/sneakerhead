import "./Product.scss";
import { useNavigate } from "react-router-dom";
const Product = ({ data, slug}) => {
    const navigate = useNavigate();
    return <div className="Product-card" onClick={() => navigate("/product/" + slug)}
    >
        <div className="thumbnail">
        <img src={data?.thumbnail.data.attributes.url} alt="prod1" />
        </div>
        <div className="product-details">
            <span className="name">{data?.name}</span>
            <span className="price">&#8377;{data?.price}/-
            <p className="strikedp discountp">
                                        &#8377;{data?.original_price}
                                    </p>
                                </span>
        </div>
    </div>;
};

export default Product;
