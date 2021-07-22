import React from "react";
import Datebtn from "./styles";


const Button = (props) => {
  const { btnName } = props;

  return <Datebtn>{btnName}</Datebtn>;
};
export default Button;
