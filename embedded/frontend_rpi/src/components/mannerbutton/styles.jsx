import styled from "styled-components";

const Mannerbtn = styled.div`
  height: 13%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content:space-around;
  margin: 0px;
  font-size: 12px;
  border: ${props => props.isdark === true? "1px solid gray" : "1px solid #a3cca3"};
`;

export default Mannerbtn;
