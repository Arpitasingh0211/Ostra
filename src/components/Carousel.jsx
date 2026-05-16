import React, { useContext, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "lucide-react";
import { getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import OstraHeroBgImg from "../assets/OstraHeroBgImg.jpeg";
import Catagory from "./Catagory";
const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  // console.log(data);
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        left: "20px",
        height:"60px",
        width: "60px"
      }}
    >
      <AiOutlineArrowLeft
        style={{
          color: "#42005a",
          borderRadius: "50%",
          padding: "8px",
          fontSize: "40px",
          cursor: "pointer",
          backgroundColor:"white",
          borderBottom: "3px solid #e5e7eb"
        }}
      />
    </div>
  );
};
  const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        right: "20px",
        height:"60px",
        width: "60px"
      }}
    >
      <AiOutlineArrowRight
        style={{
          color: "#42005a",
          borderRadius: "50%",
          padding: "8px",
          fontSize: "40px",
          cursor: "pointer",
          backgroundColor:"white",
          borderBottom: "3px solid #e5e7eb"
        }}
      />
    </div>
  );
};

var settings = {
  dots: true,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 800,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
  return (
    <div>
      <Slider {...settings}>
        {data?.slice(7,14).map((item, index) => {
          return (
            <div
              key={index}
              // className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="relative ">
                <div className="w-full min-h-180 bg-cover bg-center bg-no-repeat overflow-hidden  "
                style={{
                  backgroundImage: `url(${OstraHeroBgImg})`
                }}>
                  <img src={item.thumbnail} alt={item.title} className="absolute w-[600px] h-[580px] top-[23%] left-[52%]  " />
                  <div className="flex flex-col gap-2 absolute top-[35%] left-[15%]">
                    <h3 className="text-purple-500  font-display text-sm uppercase tracking-widest flex gap-2 "><Sparkles className="h-4"/>premium beauty</h3>
                    <h1 className="font-sans text-7xl font-bold  line-clamp-3 w-[650px] h-[160px] mb-5 text-[#42005a] tracking-wider">Beauty That Speaks <span className="text-[#8B7CF6]">Elegance.</span></h1>
                    <p className="text-gray-400 md:w-[500px] line-clamp-3 pr-7 mb-5">{item.description}</p>
                    <button className="bg-[#8B7CF6] hover:bg-[#473e81] hover:text-white transition-all duration-300 text-white px-6 py-3 rounded-4xl font-semibold active:scale-98 w-max flex gap-2 items-center">Shop now <ArrowRight className="h-5 w-5 "/></button>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          );
        })}
        
      </Slider>
      <Catagory/>
    </div>
  );
};

export default Carousel;
