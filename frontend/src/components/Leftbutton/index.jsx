import React from "react";

import Leftsidebtn from "./styles";

const Button = (props) => {
  const { btnName } = props;

  return <Leftsidebtn>{btnName}</Leftsidebtn>;
};
export default Button;
