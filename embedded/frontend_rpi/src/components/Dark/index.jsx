import React from "react";
import Speakerbtn from "./styles";
import SwitchStyle from "./switch";
import styled from "styled-components";
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { useUserContext } from "../../context";
const Speakerdiv = styled.div`
  height: 19%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 20px;
  margin: 0px;
`;

const Button = (props) => {
  const { btnName} = props;
  const { isdarked } = useUserContext();
  
  return (
    <Speakerbtn isdark = {isdarked}>
      <Speakerdiv ><Brightness2Icon />{btnName}</Speakerdiv>
      <SwitchStyle></SwitchStyle>
    </Speakerbtn>
  );
};
export default Button;
