import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../css/carousel.css";

import test1 from "./img/1.png";
import test2 from "./img/2.png";
import test3 from "./img/3.png";
import learnIntro from "./img/learnIntro.png";
import imgIntro from "./img/imgIntro.png";
import conIntro from "./img/conIntro.png";
import noteIntro from "./img/noteIntro.png";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={learnIntro} alt="first slide" className="carousel-image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={imgIntro} alt="second slide" className="carousel-image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={conIntro} alt="third slide" className="carousel-image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={noteIntro} alt="four slide" className="carousel-image" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
