import Layout from "../../layout";
import React from "react";
import styled from "styled-components";

import { useUserContext } from "../../context";
import "moment/locale/ko";
const Progresscontainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  margin: 0px;
  font-size: 24px;
`;
const Contentdiv = styled.div`
  overflow: auto;
  display: flex;
  justify-content: center;
  color: ${props => props.isdark ? "white":"black"};
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  margin: 0px;
  font-size: 24px;
`;
const Streaminglayout = () => {
  const { isdarked } = useUserContext();
  return (
    <Progresscontainer isdark={isdarked}>
      <img src="http://localhost:8091/?action=stream" alt="스트리밍" width="80%" height="80%" style={{marginTop: "20px"}}></img>
      <Contentdiv isdark = {isdarked}>공부하는 당신 아름다워요!</Contentdiv>
    </Progresscontainer>
  );
};

const Streaming = () => {
  return <Layout pages={Streaminglayout()}></Layout>;
};

export default Streaming;
