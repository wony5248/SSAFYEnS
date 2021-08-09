import styled from "styled-components";

const Sensorbtn = styled.div`
  width: auto;
  height: 40%;
  padding: 0px;
  display: flex;
  align-items: center;
  align-content: center;
  margin: 0px;
  border: ${props => props.isdark ? "1px solid gray" : "1px solid #a3cca3"};
`;

export default Sensorbtn;
