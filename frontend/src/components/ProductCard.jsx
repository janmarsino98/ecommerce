import React, { useState, useEffect } from "react";
import { GoAlertFill } from "react-icons/go";

const ProductCard = ({ product }) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [alertHover, setAlertHover] = useState(false);

  const handleClick = () => {
    setMoreInfo(!moreInfo);
  };

  const handleAlertHover = () => {
    setAlertHover(true);
  };

  const handleAlertBlur = () => {
    setAlertHover(false);
  };

  return (
    product && (
      <article className=" max-w-sm md:max-w-md lg:max-w-lg font-mono flex flex-col items-center h-max w-full">
        <div className="flex justify-center">
          <div className="block h-max w-max relative">
            <div className="h-40 w-40 relative">
              <img
                className={`${
                  moreInfo ? "opacity-40" : ""
                } w-full h-full object-cover`}
                src={product.img}
                alt="No image found"
              />
            </div>
            <button
              onClick={handleClick}
              className=" z-10 flex w-5 h-5 items-center absolute bottom-0 justify-center leading-none -translate-x-1/2 left-1/2 bg-slate-500"
            >
              {moreInfo ? "-" : "+"}
            </button>
            {product.stock < 5 && (
              <div
                onMouseLeave={handleAlertBlur}
                onMouseEnter={handleAlertHover}
                className={`flex px-2 absolute justify-around items-center w-full top-0 h-5 right-0 ${
                  alertHover ? "bg-slate-700 bg-opacity-70" : ""
                }`}
              >
                <div className="flex w-full justify-end">
                  <GoAlertFill color="red"></GoAlertFill>
                </div>
                <div>
                  {alertHover && (
                    <div className="flex absolute top-0 left-1 text-sm text-white ">{`Only ${product.stock} units remaining!`}</div>
                  )}
                </div>
              </div>
            )}

            {moreInfo && (
              <div className="flex absolute top-0 justify-center pt-5 text-center w-full h-full bg-opacity-50">
                <ul>
                  {product.features.map((feature, index) => {
                    return <li key={index}>{feature}</li>;
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-evenly w-full mt-2 border border-red-500 sm:flex-row">
          <div className="flex justify-left w-full items-center">
            <h1 className="text-20px font-mono font-bold">{product.name}</h1>
          </div>
          <div>
            <div
              className={`flex flex-col w-full items-end font-bold font-mono text-20px ${
                product.discounted_price ? "line-through text-red-600" : ""
              }`}
            >
              €{product.price}
            </div>
            {product.discounted_price && (
              <div className="flex text-20px font-bold ">
                €{product.discounted_price}
              </div>
            )}
          </div>
        </div>
      </article>
    )
  );
};

export default ProductCard;
