import "./Category.scss";
import { useNavigate } from "react-router-dom";
const Category = ( {categories} ) => {
    const navigate = useNavigate();
    return (
        <div className="shop-by-category">
            <div className="heading">Shop By Brand</div><br /><br />
           <div className="categories">
                {categories?.data?.map((item) => (
                <div key={item.id} className="category" onClick={() => navigate(`/category/${item.id}`)}
                >
                        <img 
                        src={
                            item.attributes.img.data.attributes.url
                            } 
                            alt="category images" 
                            />
                </div>
               ))}
            </div>
        </div>
    );
};

export default Category;