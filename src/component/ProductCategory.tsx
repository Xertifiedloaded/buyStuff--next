import React from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "../ReduxComponent/ReduxStore";
import { PRODUCTS } from "@/utils/Utilities";
import { useApiContext } from "@/DashBoard/FetchContext";
import Image from "next/image";

const ProductCategoryList: React.FC = () => {
  const {product} = useApiContext()
  const dispatch = useDispatch();
  const categories = [...new Set(product.map((product) => product.category))];
    const styleName = 'w-full bg-blue-500 text-black border border-black py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
  return (
    <>
      <div className="product-category-list lg:w-[85%] mx-auto xs:w-[90%]">
        {categories.map((category) => (
          <section key={category} className="category-section">
            <h1 className="lg:text-5xl xs:text-2xl xs:my-5 font-bold lg:my-10 uppercase">
              {category}
            </h1>
            <ul className="product-grid grid xl:grid-cols-2 xs:grid-cols-1 gap-4 ">
              {product.filter((product) => product.category === category).map(
                (product) => (
                  <li
                    key={product.productId}
                    className="product-item grid grid-cols-2  border border-white rounded-lg  bg-white shadow-lg min-h-[130px] py-3 px-2"
                  >
                    <div
                      className="rounded-lg"
                      style={{
                        backgroundImage: `url(${product.productImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "90%",
                        height: "100%",
                      }}
                    />
               
                    <div className="lg:flex items-start xs:block gap-4 justify-between">
                      <div className="lg:w-[70%] flex-1">
                        <h3 className="product-name text-sm font-semibold">
                          {product.productName}
                        </h3>
                        {product.productDetails && (
                          <p className="product-details lg:py-4 text-xs">
                            {product.productDetails}
                          </p>
                        )}
                      </div>
                      <div className="xs:flex items-center justify-between lg:block  ">
                        <p className="product-price text-sm font-bold">
                        ₦{product.productPrice.toFixed(2)}
                        </p>
                        <div className="my-4 flex w-full justify-center items-end">
                          <button
                            onClick={() => dispatch(addToCart(product))}
                            className="bg-black text-white w-8 h-8 rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default ProductCategoryList;
