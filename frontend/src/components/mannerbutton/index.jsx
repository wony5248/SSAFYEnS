import React from "react";
import Mannerbtn from "./styles";
import SwitchStyle from "./switch";
import styled from "styled-components";
const Mannerdiv = styled.div`
  height: 19%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  font-size: 20px;
  margin: 0px;
`;

const Button = (props) => {
  const { btnName } = props;

  return (
    <Mannerbtn>
      <Mannerdiv>매너모드</Mannerdiv>
        <SwitchStyle></SwitchStyle>
    </Mannerbtn>
  );
};
export default Button;
