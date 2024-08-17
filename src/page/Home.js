import React from "react";
import ControlledCarousel from "../component/Carousel/Carousels";
import Card from "../component/card";

function Home() {
  return (
    <div className="home-container">
      <ControlledCarousel />
      <br />
      <Card />
      <br />
    </div>
  );
}

export default Home;
