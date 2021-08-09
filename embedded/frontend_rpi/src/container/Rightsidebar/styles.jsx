import styled from "styled-components";

const Rightsidecontainer = styled.div`
  display: flex-row;
  width: 16%;
  margin: 0px;
  height: 99%;
  color: ${props => props.isdark ? "white" : "#424242"};
  background-color: ${props => props.isdark ? "#424242" : "white"};
  font-size: 20px;
`;

export default Rightsidecontainer;
