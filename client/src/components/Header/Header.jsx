import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
import { userData } from "../../utils/helpers";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import "./Header.scss";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [categories, setCategories] = useState(null);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const navigate = useNavigate();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const catMenuTimeout = useRef(null); // To handle the mouse leave timeout

    const handleIconClick = () => {
        setIsMenuActive(!isMenuActive);
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    const { cartCount } = useContext(Context);
    const { username, jwt } = userData();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await fetchDataFromApi("/api/categories?populate=*");
        setCategories(data);
    };

    const toggleCatMenu = () => {
        setShowCatMenu(!showCatMenu);
        // Clear the timeout when the menu is toggled
        if (catMenuTimeout.current) {
            clearTimeout(catMenuTimeout.current);
            catMenuTimeout.current = null;
        }
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the menu after 4 seconds
        catMenuTimeout.current = setTimeout(() => {
            setShowCatMenu(false);
            setIsMenuActive(false);
        }, 4000);
    };

    const handleMouseEnter = () => {
        // Clear the timeout when the mouse enters the menu
        if (catMenuTimeout.current) {
            clearTimeout(catMenuTimeout.current);
            catMenuTimeout.current = null;
        }
    };

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-content">
                    <div className="left">
                        <ul>
                            <li onClick={() => navigate("/")}>Home</li>
                            <li onClick={() => navigate("/about")}>About</li>
                            <li onClick={toggleCatMenu}>Categories</li>
                        </ul>
                        {showCatMenu && (
                            <div className={`ctmenu ${scrolled ? "ctmenu-fixed" : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                {categories?.map(({ attributes: c, id }) => {
                                    return (
                                        <a key={id} href={`/category/${c.slug}`}>
                                            <li className="showltmenu">{c.name}</li>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="center" onClick={() => navigate("/")}>
                        Sneakerhead.
                    </div>
                    <div className="right">
                        <TbSearch onClick={() => setShowSearch(true)} />
                        {jwt && <span className="usernamedp">Hi {username}</span>}
                        <div className="menuac">
                            <BiUser onClick={handleIconClick} onMouseLeave={handleMouseLeave}/>
                            {isMenuActive && (
                                <div className="overlay">
                                    {jwt ? (
                                        <>
                                            <p>Account</p>
                                            <a href="/orders">Orders</a>
                                            <a href="/Wishlist">Wishlist</a>
                                            <a href="/Logout">Logout</a>
                                        </>
                                    ) : (
                                        <>
                                            <a href="/Login">Log In</a>
                                            <a href="/Signup">Sign Up</a>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <span className="cart-icon" onClick={() => navigate("/cart")}>
                            <CgShoppingCart />
                            {!!cartCount && <span>{cartCount}</span>}
                        </span>
                    </div>
                </div>
            </header>
            {showSearch && <Search setShowSearch={setShowSearch} />}
        </>
    );
};

export default Header;
