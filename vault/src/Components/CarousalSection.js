import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const contentItems = [
  {
    type: "image",
    src: "/media/service1.png",
    alt: "Service 1",
  },
  {
    type: "image",
    src: "/media/Service2.png",
    alt: "Service 2",
  },
  {
    type: "image",
    src: "/media/service3.png",
    alt: "Service 3",
  },
  {
    type: "image",
    src: "/media/service4.png",
    alt: "Service 4",
  },
  {
    type: "video",
    src: "/media/service5.mp4",
    alt: "Service 5",
  },
];

export default function CarouselSection() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false, // We'll handle autoplay manually
    pauseOnHover: false,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  useEffect(() => {
    const currentItem = contentItems[currentSlide];

    let timer;

    if (currentItem.type === "image") {
      timer = setTimeout(() => {
        sliderRef.current?.slickNext();
      }, 3000); // Slide after 3 seconds
    }

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Handle video end → next slide
  const handleVideoEnd = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 text-center">
      <h2
        className="text-4xl font-bold text-gray-800 dark:text-white mb-10"
        data-aos="fade-up"
      >
        Our Offerings in Action
      </h2>

      <div
        className="max-w-3xl mx-auto rounded-3xl backdrop-blur-lg bg-white/50 dark:bg-white/10 shadow-xl ring-1 ring-gray-300 dark:ring-gray-700 overflow-hidden"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <Slider ref={sliderRef} {...settings}>
          {contentItems.map((item, index) => (
            <div
              key={index}
              className="h-[320px] md:h-[400px] flex justify-center items-center"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-xl shadow-lg dark:shadow-blue-900"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  onEnded={() => sliderRef.current?.slickNext()}
                  className="w-full h-full object-cover rounded-xl shadow-lg dark:shadow-blue-900"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
