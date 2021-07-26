import React, { useState } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import styled1 from "styled-components";
import { makeStyles, styled } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Changeselect = styled1.select`
  width: 80px;
  height: auto;
  color: white;
  background-color: #69a569;
  border: 0px;
`;

const Changecalcon = styled1.div`
  width: auto;
  height: 310px;
  display: flex-row;
  flex-wrap: nowrap;
  color: #a3cca3;
  background-color: white;
  margin: 0px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;
const Changestart = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin: 12px 0px;
  padding: 4px;
`;
const Changeend = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
`;
const Changestarttext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;
const Changeendtext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;

const Changetitle = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: #a3cca3;
`;
const Changetitletext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  font-size: 16px;
`;
const Changebtn = styled1.button`
  width: 78px;
  height: auto;
  border-radius:8px;
  border:0px;
  color: white;
  background-color: #69a569;
  padding: 4px;
`;
const ChangeContent = styled1.div`
  display: flex-row;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: #a3cca3;
  margin-top:12px;
`;
const ChangeContentheader = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: #a3cca3;
`;
const Changetitleinput = styled(Input)({
  backgroundColor: "white",
  height: "25px",
  fontSize: "12px",
  paddingLeft: "8px",
});
const Changecontentinput = styled(Input)({
    backgroundColor: "white",
    borderRadius: "8px",
    height: "118px",
    fontSize: "12px",
    padding: "8px",
    marginLeft: "8px",
    marginBottom: "8px",
    marginTop: "4px",
    width: "310px",
    overflow : "auto",
  });
const Changecalendarlayout = () => {
  const classes = useStyles();
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const handlestartChange = (event) => {
    setStarttime(event.target.value);
    console.log(event.target.value);
  };
  const handleendChange = (event) => {
    setEndtime(event.target.value);
    console.log(event.target.value);
  };
  return (
    <Changecalcon>
      <Changestart>
        <Changestarttext>변경할 시작 시간</Changestarttext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={starttime}
          onChange={handlestartChange}
        >
          <option value={0}>00:00</option>
          <option value={1}>01:00</option>
          <option value={2}>02:00</option>
          <option value={3}>03:00</option>
          <option value={4}>04:00</option>
          <option value={5}>05:00</option>
          <option value={6}>06:00</option>
          <option value={7}>07:00</option>
          <option value={8}>08:00</option>
          <option value={9}>09:00</option>
          <option value={10}>10:00</option>
          <option value={11}>11:00</option>
          <option value={12}>12:00</option>
          <option value={13}>13:00</option>
          <option value={14}>14:00</option>
          <option value={15}>15:00</option>
          <option value={16}>16:00</option>
          <option value={17}>17:00</option>
          <option value={18}>18:00</option>
          <option value={19}>19:00</option>
          <option value={20}>20:00</option>
          <option value={21}>21:00</option>
          <option value={22}>22:00</option>
          <option value={23}>23:00</option>
        </Changeselect>
      </Changestart>
      <Changeend>
        <Changeendtext>변경할 종료 시간</Changeendtext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endtime}
          onChange={handleendChange}
        >
          <option value={0}>00:00</option>
          <option value={1}>01:00</option>
          <option value={2}>02:00</option>
          <option value={3}>03:00</option>
          <option value={4}>04:00</option>
          <option value={5}>05:00</option>
          <option value={6}>06:00</option>
          <option value={7}>07:00</option>
          <option value={8}>08:00</option>
          <option value={9}>09:00</option>
          <option value={10}>10:00</option>
          <option value={11}>11:00</option>
          <option value={12}>12:00</option>
          <option value={13}>13:00</option>
          <option value={14}>14:00</option>
          <option value={15}>15:00</option>
          <option value={16}>16:00</option>
          <option value={17}>17:00</option>
          <option value={18}>18:00</option>
          <option value={19}>19:00</option>
          <option value={20}>20:00</option>
          <option value={21}>21:00</option>
          <option value={22}>22:00</option>
          <option value={23}>23:00</option>
        </Changeselect>
      </Changeend>
      <Changetitle>
          <Changetitletext>일정 제목</Changetitletext>
          <Changetitleinput placeholder = "변경할 일정 제목"></Changetitleinput>
      </Changetitle>
      <ChangeContent>
          <ChangeContentheader>
              <Changetitletext>일정 내용</Changetitletext>
              <Changebtn>변경</Changebtn>
          </ChangeContentheader>
          <Changecontentinput placeholder = "변경할 일정 내용">변경할 일정 내용</Changecontentinput>
      </ChangeContent>
      <div>Changecalendar</div>
      <Link to="/">Home</Link>
      <br></br>
      <Link to="/Progress">Progress</Link>
      <br></br>
      <Link to="/Change">Change</Link>
      <br></br>
      <Link to="/Rating">Rating</Link>
      <br></br>
      <Link to="/Timer">Timer</Link>
      <br></br>
      <Link to="/Today">Today</Link>
    </Changecalcon>
  );
};
const Changecalendar = () => {
  return <Layout pages={Changecalendarlayout()}></Layout>;
};

export default Changecalendar;
