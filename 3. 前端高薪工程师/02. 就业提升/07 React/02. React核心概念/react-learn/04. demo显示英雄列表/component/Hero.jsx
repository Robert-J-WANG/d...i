import React from "react";

function Hero(props) {
  const { cname, title, skin_name } = props.hero;
  return (
    <li>
      【name】:{cname}——【title】:{title}——【skin_name】:{skin_name}
    </li>
  );
}

export default Hero;
