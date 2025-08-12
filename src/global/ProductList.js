import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/product-action";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state?.product?.products.data)


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ProductList;
