import Slider from "react-slick";
import slider from "../../assets/slider.jpg";
import sliderr from "../../assets/sliderr.jpg";
import sliderrr from "../../assets/sliderrr.jpg";

const MainSlider = ({ height = 500 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [slider, sliderr, sliderrr];

  return (
    <section className="w-full max-w-full">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full"
            style={{ height: `${height}px` }} // تتحكم في ارتفاع السلايدر بسهولة
          >
            <img
              src={img}
              alt={`slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MainSlider;
