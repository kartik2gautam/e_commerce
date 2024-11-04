import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ProductSlider.css";
import { Img } from "react-image";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../Images/Fortnite.jpg";
import img2 from "../Images/ApexLegends.jpg";
import img3 from "../Images/Minecraft.jpg";
import img4 from "../Images/cyberpunk.jpg";

import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductSlider = () => {
  const navigate = useNavigate()
  const data = [
    {
      id: 1,
      image: img1,
      title: "Get the latest Fortnite version!",
      button: "/site/home/single-product-view/45",
    },
    {
      id: 2,
      image: img2,
      title: "Get the latest Apex Legends version!",
      button: "#",
    },
    {
      id: 3,
      image: img3,
      title: "Get the latest Minecraft version!",
      button: "#",
    },
    {
      id: 4,
      image: img4,
      title: "Get the latest Cyberpunk version!",
      button: "#",
    },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="productslider">
      <Slider className="productslider" {...settings}>
        {data.map((item) => {
          return (
            <div className="imagecont" key={item.id}>
              <Img src={item.image} alt="noimg" />
              <div className="content">
                <h1>{item.title}</h1>
                <button className="mt-3 text-white bg-danger">Shop Now!</button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
