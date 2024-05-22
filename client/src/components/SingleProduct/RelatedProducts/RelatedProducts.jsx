
import React, { useState, useEffect } from 'react';
import Products from "../RelatedProducts/Prod";
import useFetch from '../../../hooks/useFetch';
import "./RelatedProducts.scss"
const RelatedProducts = ({ categoryId,productslug}) => {
    const { data } = useFetch(
      `/api/products?populate=*&filters[slug][$ne]=${productslug}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
  );

    return <div className="rel-prod">
        <div className="rel-heading">You Might Also Like</div>
                <span>
                <Products products={data} />
                  </span>
    </div>;
    
};

export default RelatedProducts;
