import "./Prod.scss";
import Product from "../../Products/Product/Product";
const Prod = ({ products, innerPage }) => {
    return <div className="products-container">
        {!innerPage && <div className="sec-heading"></div>}
        <div className="products">
        {products?.data?.map(item => (
            <Product key={item.id} id={item.id} data={item.attributes} />
        ))}
        </div>
    </div>;
};

export default Prod;
