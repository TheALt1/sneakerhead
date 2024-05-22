import axios from "axios";

export const userData = () => {
    const stringifiedUser = localStorage.getItem("user") || '""';
    return JSON.parse(stringifiedUser || {});
  };
  
  const user = userData();
const token = user?.jwt;

const params = {
    headers: {
        Authorization: "bearer" + process.env.REACT_PUBLIC_STRAPI_API_TOKEN,
    },
};
export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(
            process.env.REACT_APP_DEV_URL + url,
             params
            );
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer" + process.env.REACT_PUBLIC_STRAPI_API_TOKEN,
        "Content-Type": "application/json"
    },
});

export const addToWishlist = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer" + process.env.REACT_PUBLIC_STRAPI_API_TOKEN,
    },
});

export const removeFromWishlist = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer" + process.env.REACT_PUBLIC_STRAPI_API_TOKEN,
    },
});

export const forgotPassword = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer" + process.env.REACT_PUBLIC_STRAPI_API_TOKEN,
    },
});


