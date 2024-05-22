import "../../Wishlist/Wishlist.scss";
import { useNavigate } from "react-router-dom";
import { userData } from "../../../utils/api";
import { removeFromWishlist } from "../../../utils/api";
import {CgRemoveR} from "react-icons/cg";

const Wishitem = ({ data, slug, item, count}) => {
    const navigate = useNavigate();
    const {email}= userData();
    console.log(count);

    const handleRemoveFromWishlist = async (item) => {
        try {
            const id = item.id;
            const res= await removeFromWishlist.delete(`/api/wishlists/${id}`, {
              params: {
                id:id,
                email: email,
              },
            });
            console.log(res);
            console.log(id);
            // Optionally, you can refresh the wishlist data here.
          } catch (err) {
            console.error(err);
          }
      };
    return <div className={count <= 1 ? 'single-card' : 'Product-card'}>
        <div onClick={() => navigate("/product/" + slug)}>
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
        </div>
        <div className="removebtnwl" >
            <CgRemoveR size={38} color="white" onClick={() => handleRemoveFromWishlist(item)} id="rmviconwl"/>
        </div>
       
    </div>;
};

export default Wishitem;
