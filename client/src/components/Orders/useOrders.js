import React, { useState, useEffect } from "react";
import axios from "axios";
import { userData } from "../../utils/helpers";

const useOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [isNewOrdersAdded, setIsNewOrdersAdded] = useState(false);
  const { email } = userData();

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/orders`, {
          params: {
            email: email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setIsNewOrdersAdded(false);
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.log({ error });
      }
    };

    if (!!token) {
      getOrderData();
    }
  }, [token, isNewOrdersAdded]);

  return { orders, setIsNewOrdersAdded };
};

export default useOrders;
