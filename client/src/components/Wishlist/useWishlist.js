import React, { useState, useEffect } from "react";
import axios from "axios";
import { userData } from "../../utils/helpers";

const useWishlist = (token) => {
  const [wishlist, setWishlist] = useState([]);
  const [isNewOrdersAdded, setIsNewOrdersAdded] = useState(false);
  const { email } = userData();
    
  useEffect(() => {
    const getWishlistData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/wishlists`, {
          params: {
            email: email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setIsNewOrdersAdded(false);
        setWishlist(data);
      } catch (error) {
        console.log({ error });
      }
    };

    if (!!token) {
      getWishlistData();
    }
  }, [token, isNewOrdersAdded]);

  return { wishlist, setIsNewOrdersAdded };
};

export default useWishlist;
