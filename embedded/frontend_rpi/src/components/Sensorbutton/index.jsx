import React from "react";
import Sensorbtn from "./styles";
import { useUserContext } from "../../context";


const Button = (props) => {
  const { btnName } = props;
  const { isdarked } = useUserContext();
  return <Sensorbtn isdark = {isdarked}>{btnName}</Sensorbtn>;
};
export default Button;
