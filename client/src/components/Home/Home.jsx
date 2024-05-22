import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/context";
import { useEffect, useContext } from "react";
import { fetchDataFromApi } from "../../utils/api";
const Home = () => {
    const { categories, setCategories, products, setProducts } = useContext(Context);
    useEffect(() => {
        getProducts();
        getCategories();
    },[] )

    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            console.log(res);
            setProducts(res);
        }
        );
    };
    const getCategories = () => {
        fetchDataFromApi("/api/categories?populate=*").then((res) => {
            console.log(res);
            setCategories(res);
            console.log(process.env.REACT_APP_DEV_URL);
        }
        );
    };
    return (
    <div>
        <Banner />
        <div className="main-content">
            <div className="layout">
            <Category categories={categories}/>
            <Products products={products}/>
            </div>
        </div>
        </div>
)};

export default Home;
