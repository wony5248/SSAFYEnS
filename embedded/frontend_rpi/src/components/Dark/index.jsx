import React, {useContext} from "react";
import Speakerbtn from "./styles";
import SwitchStyle from "./switch";
import styled from "styled-components";
import MicIcon from '@material-ui/icons/Mic';
import { useUserContext } from "../../context";
import { IS_DARK } from "../../context/actionTypes";
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
  const { btnName, isdark} = props;
  const { isdarked } = useUserContext();
  
  return (
    <Speakerbtn isdark = {isdarked}>
      <Speakerdiv ><MicIcon />{btnName}</Speakerdiv>
      <SwitchStyle></SwitchStyle>
    </Speakerbtn>
  );
};
export default Button;
