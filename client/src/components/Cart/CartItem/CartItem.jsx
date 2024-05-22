import "./CartItem.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../utils/context";
const CartItem = (item) => {
  const { cartItems, handleRemoveFromCart, handleCartItemQuantity, handleUpdateSelectedSize} = useContext(Context);
    const [imageStyle, setImageStyle] = useState({
        width: '100px', // Initial width
        height: '100px', // Initial height
      });

      const [quantity, setQuantity] = useState(1);
      //console.log(cartItems);
      const [selectedSize, setSelectedSize] = useState();
      
      const handleSizeChange = (e, item) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);
        console.log('New size:', newSize);

        // Find the selected size based on the value and update the product
        const selectedSize = item.attributes.size?.data?.find(
          (szitem) => szitem.size === newSize
        );
      
        if (selectedSize) {
          const product = { ...item };
          product.attributes.clsize = selectedSize.size;
          handleUpdateSelectedSize(product, selectedSize.size);
        }
      };


      const handleSelectChange = (e, item) => {
        const newQuantity = parseInt(e.target.value, 10);
    
        // Update the local state for rendering purposes
        setQuantity(newQuantity);
    
        // Create a copy of the item to pass to the context function
        const product = { ...item };
    
        // Update the quantity attribute in the copy
        product.attributes.quantity = newQuantity;
    
        // Call the context function to update the cart item quantity
        handleCartItemQuantity(product, newQuantity);
      };



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
    return <div>{cartItems.map(item => (
      <div className="crtitemcontainer" 
      key={item.id}
      onClick={() => {}}
      >
      <div className="crtimg">
          <img src={item.attributes.thumbnail.data.attributes.url} alt="shoe" width={imageStyle.width} height={imageStyle.height} />
      </div>
      <div className="allmain">
          <div className="crtmain">
              <div className="alignpnpp">
          <div className="pt">
          {item.attributes.name}
          </div>
          <div className="pp">
         Price : &#8377;{item.attributes.price} /-
          </div>
          </div>
          <div className="ps">
              {item.attributes.subtitle}
          </div>
      </div>
      <div className="downct">
      <div className="sizemt">
      <div className="sizect">
      <div className="szct">
      <div className="szlbl">Size:</div>
      <div className="szopt"><select
      onChange={(e) =>
                                    handleSizeChange(e, item)
                                }
                            >
                                {item.attributes.size?.data?.map((szitem, i) => {
                                    return (
                                        <option
                                            key={i}
                                            value={selectedSize}
                                          
                                            disabled={
                                                !szitem.enabled ? true : false
                                            }
                                            selected={
                                                item.attributes.clsize === szitem.size
                                            }
                                        >
                                            {szitem.size}
                                            
                                        </option>
                                    );
                                })}
      </select></div>
      </div>
      <div className="qtset">
      <div className="qtlbl">Quantity:</div>
        <div className="qtopt">
        <select
               
              onChange={(e) => handleSelectChange(e, item)}
              value={item.attributes.quantity}
            >
              {Array.from(
                { length: 10 },
                (_, i) => i + 1
              ).map((q, i) => (
                <option key={i} value={q}>
                  {q}
                </option>
              ))}
            </select>
      </div>
      </div></div>
      </div>
      <RiDeleteBin6Line className="delicon" onClick={() => handleRemoveFromCart(item)}/>
      </div>
      </div>
  </div>
    ))}
    </div>;
};

export default CartItem;
