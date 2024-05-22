import "./Banner.scss";
import BannerImg from "../../../assets/banner.png";
import { useNavigate } from "react-router-dom";
const Banner = () => {
    const navigate = useNavigate();
    return <div className="hero-banner">
        <div className="content">
            <div className="text-content">
                <h1>Nike Air</h1>
                <h3>More Uptempo 96'</h3>
                <p>Bold, retro and all about the A-I-R. The Air More Uptempo '96 refreshes an original that has reigned supreme for more than 20 years. 
                    With a design inspired by high-flying basketball style and '90s graffiti art, 
                    these kicks can't help but turn heads off court. Nike Air technology absorbs impact for cushioning with every step.</p>
                     <div className="ctas">
                        {/* <div className="banner-cta">Read More</div> */}
                        <div className="banner-cta v2" onClick={() => navigate("/product/nike-air-more-uptempo-96")}>Shop Now</div>
                     </div>
            </div>
            <img className="banner-img" src={BannerImg} alt="bannerimage" style={{  maxHeight: '1150px' }} />
        </div>
        </div>;
};

export default Banner;
