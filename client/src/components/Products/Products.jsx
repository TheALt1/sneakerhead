import "./Products.scss";
import Product from "./Product/Product";
const Products = ({ products, innerPage }) => {
    console.log(products);
    return <div className="products-container">
        {!innerPage && <div className="sec-heading">TRENDING</div>}
        <div className="products">
        {products?.data?.map(item => (
            <Product key={item.id} slug={item.attributes.slug} data={item.attributes} />
        ))}
        </div>
    </div>;
};

export default Products;
