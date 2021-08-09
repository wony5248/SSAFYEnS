import styled from "styled-components";

const Centerlayout = styled.div`
  display: flex-row;
  flex-wrap: nowrap;
  width: 68%;
  height: 98.7%;
  background-color: ${props => props.isdark ? "#424242" : "white"};
  border: ${props => props.isdark ? "1px solid gray" : "1px solid #a3cca3"};
  align-items: center;
  margin: 0px;
`;


export default Centerlayout;
