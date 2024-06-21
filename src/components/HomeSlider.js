import Link from "next/link";
import { Fragment, useState } from "react";
import { useCartStore } from "../useCartStore";

export const HomeSlider1 = () => {
  const [active, setActive] = useState(0);
  const sliders = useCartStore((state) => state.sliders);
  return (
    <Fragment>
      <button
        className="slider-prev slick-arrow"
        onClick={() =>
          setActive(active === 0 ? sliders.length - 1 : active - 1)
        }
      >
        <i className="fas fa-chevron-left" />
      </button>

      {sliders.map((slider, index) => (
        <div
          key={index}
          className={`slider-single-item slide-one ${
            active === index ? "slick-active" : ""
          }`}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="slider-content">
                  <div className="sub-title mb-20">
                    {slider.heading}
                  </div>
                  <h1>{slider.title}</h1>
                  <h6>{slider.slider_text}</h6>
                  <div className="slider-btns mt-30">
                  <Link href={`${slider.button_link}`}>
                    <a className="theme-btn style-two">
                      Shop Now <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                  <Link href="/about">
                    <a className="theme-btn style-two">
                      Learn More <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="slider-images">
                  <img className="image"  style={{backgroundPosition:'cover'}} src={`http://localhost:8000/storage/images/gallery/${slider.slider_image}`} alt="Slider" />
                  <img
                    className="offer"
                    src="assets/images/shapes/organic.png"
                    alt="Organic"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="slide-shapes">
          <img
            className="pumpkin-shape"
            src="assets/images/slider/pumpkin.png"
            alt="Pumpkin"
          />
          <img
            className="two-leaf"
            src="assets/images/slider/two-lear.png"
            alt="Leaf"
          />
          <img
            className="half-leaf"
            src="assets/images/slider/half-leaf.png"
            alt="Leaf"
          />
          <img
            className="leaf-one"
            src="assets/images/slider/leaf-1.png"
            alt="Leaf"
          />
          <img
            className="leaf-two"
            src="assets/images/slider/leaf-2.png"
            alt="Leaf"
          />
        </div>
        </div>
      ))}

     

      <button
        className="slider-next slick-arrow"
        onClick={() => setActive(active === sliders.length - 1 ? 0 : active + 1)}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </Fragment>
  );
};
