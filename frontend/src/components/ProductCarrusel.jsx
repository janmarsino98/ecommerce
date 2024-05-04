import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FaRegCircle } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const ProductCarrusel = () => {
  const [products, setProducts] = useState([]);
  const [firstDisplayedItem, setFirstDisplayedItem] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_all_products");
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("There was an error while fetching products: ", error);
      }
    };
    fetchData();
  }, []);

  const itemsDisplayed = 4;

  const handleLeftArrowClick = () => {
    const newFirstDisplayedItem = firstDisplayedItem - 1;
    setFirstDisplayedItem(newFirstDisplayedItem);
  };

  const handleRightArrowClick = () => {
    const newFirstDisplayedItem = firstDisplayedItem + 1;
    setFirstDisplayedItem(newFirstDisplayedItem);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        {/* {firstDisplayedItem != 0 && (
          <FaAngleLeft
            className="cursor-pointer"
            onClick={handleLeftArrowClick}
          ></FaAngleLeft>
        )} */}
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products
            .slice(firstDisplayedItem, firstDisplayedItem + itemsDisplayed)
            .map((product, index) => {
              return (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product}></ProductCard>
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* {firstDisplayedItem != products.length - itemsDisplayed && (
          <FaAngleRight
            className="cursor-pointer"
            onClick={handleRightArrowClick}
          ></FaAngleRight>
        )} */}
      </div>
    </div>
  );
};

export default ProductCarrusel;
