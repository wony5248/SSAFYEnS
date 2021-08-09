import React, {useContext} from "react";
import Sensorbtn from "./styles";
import { Context } from "../../context";


const Button = (props) => {
  const { btnName } = props;
  const {
    state: { isDark },
  } = useContext(Context);
  return <Sensorbtn isdark = {isDark}>{btnName}</Sensorbtn>;
};
export default Button;
