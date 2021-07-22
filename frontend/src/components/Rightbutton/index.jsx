import React from "react";
import Rightsidebtn from "./styles";


const Button = (props) => {
  const { btnName } = props;

  return <Rightsidebtn>{btnName}</Rightsidebtn>;
};
export default Button;
