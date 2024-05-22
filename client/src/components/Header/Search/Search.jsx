import "./Search.scss";
import { useState, useEffect } from "react";
import {MdClose} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
const Search = ({setShowSearch}) => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
    const [imageStyle, setImageStyle] = useState({
        width: '100px', // Initial width
        height: '100px', // Initial height
      });
    
      const handleResize = () => {
        const viewportWidth = window.innerWidth;
    
        if (viewportWidth < 768) {
          setImageStyle({ width: '60px', height: '70px' }); // Adjust styles for smaller screens
        } else if (viewportWidth >= 768 && viewportWidth < 1024) {
          setImageStyle({ width: '130px', height: '150px' }); // Adjust styles for medium screens
        } else {
          setImageStyle({ width: '130px', height: '150px' }); // Default styles for larger screens
        }
      };
    
      const onChange = (e) => {
        const inputValue = e.target.value;

    // Split the input value into words
    const words = inputValue.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the capitalized words back into a single string
    const capitalizedValue = capitalizedWords.join(' ');

    // Update the state with the capitalized value
    setQuery(capitalizedValue);
    };

    let {data} = useFetch(`/api/products?populate=*&filters[name][$contains]=${query}`);
    if(!query.length){
      data = null;
    }

      useEffect(() => {
        // Initial call to set styles on page load
        handleResize()
    
        // Attach a listener to update styles when the window is resized
        window.addEventListener('resize', handleResize);
    
        // Clean up the listener when the component is unmounted
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return <div className="search-model">
            <div className="form-field">
                <input type="text" autoFocus placeholder="Search" value={query} onChange={onChange}
                />
                <span className="etbtn"><MdClose size={36} onClick={() => setShowSearch(false)}  /></span>
            </div>
            <div className="search-result-contents">
            {!data?.data?.length && query.length === 0 &&(
                    <div className="start-msg">
                        Start typing to see products you are looking for.
                    </div>
                )}
                {!data?.data?.length && query.length !== 0 && (
                    <div className="no-results-msg">
                      No results found for "{query}".
                    </div>
                  )}
                <div className="search-results">
                {data?.data?.map((item) => ( 
                  <div className="search-result-item" key={item.id} onClick={() => {
                    navigate("/product/" + item.id);
                                setShowSearch(false);
                  }}>
                  <div className="crtimg">
                   <img src={item.attributes.thumbnail.data.attributes.url} alt="shoe" width={imageStyle.width} height={imageStyle.height} />
                  </div>
                  <div className="alignsr">
                  <div className="pt">
                  {item.attributes.name}
              </div>
                  <div className="ps">
                  {item.attributes.subtitle}
                  </div>
                  </div>
                  </div>
                ))}
                </div>
            </div>
                </div>;
};

export default Search;
