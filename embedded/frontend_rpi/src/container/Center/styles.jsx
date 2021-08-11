import styled from "styled-components";

const Centerlayout = styled.div`
  display: flex-row;
  flex-wrap: nowrap;
  width: 68%;
  height: 98.75%;
  background-color: ${props => props.isdark ===  true ? "#424242" : "white"};
  border: ${props => props.isdark === true? "1px solid gray" : "1px solid #a3cca3"};
  align-items: center;
  margin: 0px;
`;


export default Centerlayout;
