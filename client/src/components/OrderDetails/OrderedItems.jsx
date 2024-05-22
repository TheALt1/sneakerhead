import "./OrderedItems.scss";
import { useNavigate } from "react-router-dom";
const OrderedItems = ({ id,product}) => {
    const navigate = useNavigate();
    console.log(product);
    return <div className="order-card" onClick={() => navigate("/product/" + id)}
    >
        <div className="order-thumb">
        <img src={product?.attributes.thumbnail.data.attributes.url} alt="prod1" style={{ width: '150px', height: '200px' }}/>
        </div>
        <div className="order-details">
            <span className="name">{product?.attributes.name}</span>
            <span className="price">&#8377;{product?.attributes.price}/-
            <p className="strikedp discountp">
                                        &#8377;{product?.attributes.original_price}
                                    </p>
                                </span>
        </div>
    </div>;
};

export default OrderedItems;
