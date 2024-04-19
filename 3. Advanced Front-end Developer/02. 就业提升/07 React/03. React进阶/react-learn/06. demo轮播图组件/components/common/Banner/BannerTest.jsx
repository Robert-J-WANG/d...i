import React from "react";
import Banner from ".";
import src1 from "./img/1.jpg";
import src2 from "./img/2.webp";
import src3 from "./img/3.jpg";
import src4 from "./img/4.jpg";
import src5 from "./img/5.webp";

export default function BannerTest() {
  let imgSrcs = [src1, src2, src3, src4, src5];
  return (
    <>
      <Banner imgSrcs={imgSrcs} duration={500} />
    </>
  );
}
