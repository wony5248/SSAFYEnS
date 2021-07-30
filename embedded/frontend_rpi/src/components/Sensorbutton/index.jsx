import React from "react";
import Sensorbtn from "./styles";


const Button = (props) => {
  const { btnName } = props;

  return <Sensorbtn>{btnName}</Sensorbtn>;
};
export default Button;
