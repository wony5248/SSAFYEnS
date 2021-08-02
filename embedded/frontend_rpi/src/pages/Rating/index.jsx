import React, { useState } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import Ratingstar from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const StyledRating = withStyles({
  iconFilled: {
    color: "#f6f924",
  },
  iconHover: {
    color: "#f6f924",
  },
})(Ratingstar);
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
const Starttime = styled1.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: auto;
  height: 5%;
  color: white;
  background-color: #a3cca3;
  margin: 12px 0px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Endtime = styled1.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: auto;
  height: 5%;
  color: white;
  background-color: #a3cca3;
  margin: 12px 0px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingbody = styled1.div`
  display: flex-row;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: 80%;
  color: white;
  background-color: #a3cca3;
  margin-top: 12px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingcontent = styled1.div`
  display: flex-row;
  border-radius: 4px;
  width: auto;
  height: 80%;
  color: black;
  background-color: white;
  font-size: 20px;
  overflow: auto;
  margin-top: 12px;
  padding-top: 5px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingquestiontitle = styled1.div`
  width: auto;
  margin-bottom:8px;
  height: auto;

`;
const Ratingquestion = styled1.div`
  width: auto;
  margin-bottom:5px;
  height: auto;

`;
const Ratingbtncon = styled1.div`
  width: auto;
  display: flex;
  height: auto;
  border-radius: 8px;
  border: 0px;
  color: white;
`;
const Ratingbtn = styled1.button`
  width: 78px;
  height: auto;
  border-radius: 8px;
  border: 0px;
  color: white;
  background-color: #69a569;
  padding: 4px;
  margin-left:16px;
`;
const Ratingstarcon = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin-top: 4%;
  padding: 4px;
`;

const Ratingcon = styled1.div`
  width: auto;
  font-size: 20px;
  height: 100%;
  display: flex-row;
  flex-wrap: nowrap;
  color: #a3cca3;
  background-color: white;
  margin: 0px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;

const Changestarttext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  align-items: center;
  background-color: #a3cca3;
`;

const Changeendtext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;

const Confirm = () => {
  if (window.confirm("정말 완료하시겠 습니까?")) {
    window.location.replace(`/Today`);
  } else {
    console.log("변화 없음");
  }
};

const Cancel = () => {
  if (window.confirm("정말 취소하시겠 습니까?")) {
    window.location.replace(`/Today`);
  } else {
    console.log("변화 없음");
  }
};

const Ratinglayout = (props) => {
  const [value, setValue] = useState(0);
  const [rate, setRate] = useState(0);
  const [selectedValue1, setSelectedValue1] = React.useState("1");
  const [selectedValue2, setSelectedValue2] = React.useState("1");
  const [selectedValue3, setSelectedValue3] = React.useState("1");
  const [selectedValue4, setSelectedValue4] = React.useState("1");
  const handleChange1 = (event) => {
    setSelectedValue1(event.target.value);
    console.log(event.target.value);
  };
  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
    console.log(event.target.value);
  };
  const handleChange3 = (event) => {
    setSelectedValue3(event.target.value);
    console.log(event.target.value);
  };
  const handleChange4 = (event) => {
    setSelectedValue4(event.target.value);
    console.log(event.target.value);
  };
  const { time } = props;
  // console.log(time[0] + time[1]);
  // console.log(moment().format("H"));
  console.log((Number(selectedValue1) + Number(selectedValue2) + Number(selectedValue3) + Number(selectedValue4)) /4)
  return (
    <Ratingcon>
      <Starttime>
        <Changestarttext>일정 시작 시간</Changestarttext>
        <Changestarttext>{time}</Changestarttext>
      </Starttime>
      <Endtime>
        <Changeendtext>일정 종료 시간</Changeendtext>
        <Changeendtext>{moment().format("H : mm")}</Changeendtext>
      </Endtime>
      <Ratingbody>
        <Ratingcontent>
          <Ratingquestiontitle>일정 평가</Ratingquestiontitle>
          <Ratingquestion>
            1. 유해물질 탐지 시간이 일정 진행시간의 몇 %인가요?
          </Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="detect"
              value={selectedValue1}
              onChange={handleChange1}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio />}
                label="80%이상 100%이하"
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio />}
                label="60% 이상 80% 이하"
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio />}
                label="40% 이상 60% 이하"
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio />}
                label="20% 이상 40% 이하"
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio />}
                label="0% 이상 20% 이하"
              />
            </RadioGroup>
          </FormControl>

          <Ratingquestion>
            2. 일정 진행시간이 원래 일정 진행시간의 몇 %인가요?
          </Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              value={selectedValue2}
              onChange={handleChange2}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio />}
                label="0%이상 20%이하"
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio />}
                label="20% 이상 40% 이하"
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio />}
                label="40% 이상 60% 이하"
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio />}
                label="60% 이상 80% 이하"
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio />}
                label="80% 이상 100% 이하"
              />
            </RadioGroup>
          </FormControl>
          <Ratingquestion>3. 일정 목표의 몇 %를 달성하셨나요?</Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              value={selectedValue3}
              onChange={handleChange3}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio />}
                label="0%이상 20%이하"
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio />}
                label="20% 이상 40% 이하"
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio />}
                label="40% 이상 60% 이하"
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio />}
                label="60% 이상 80% 이하"
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio />}
                label="80% 이상 100% 이하"
              />
            </RadioGroup>
          </FormControl>
          <Ratingquestion>4. 오늘의 공부 환경은 어떠하였나요?</Ratingquestion>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              value={selectedValue4}
              onChange={handleChange4}
            >
              <FormControlLabel
                value="1"
                control={<GreenRadio />}
                label="매우 별로였다."
              />
              <FormControlLabel
                value="2"
                control={<GreenRadio />}
                label="별로였다."
              />
              <FormControlLabel
                value="3"
                control={<GreenRadio />}
                label="그저 그랬다."
              />
              <FormControlLabel
                value="4"
                control={<GreenRadio />}
                label="좋았다."
              />
              <FormControlLabel
                value="5"
                control={<GreenRadio />}
                label="매우 좋았다."
              />
            </RadioGroup>
          </FormControl>
        </Ratingcontent>
        <Ratingstarcon>
          <StyledRating
            name="customized-empty"
            value={(Number(selectedValue1) + Number(selectedValue2) + Number(selectedValue3) + Number(selectedValue4)) /4}
            size="large"
            precision={0.25}
            readOnly
          />
          <Ratingbtncon>
            <Ratingbtn onClick={() => Cancel()}>취소</Ratingbtn>
            <Ratingbtn onClick={() => Confirm()}>완료</Ratingbtn>
          </Ratingbtncon>
        </Ratingstarcon>
      </Ratingbody>
    </Ratingcon>
  );
};
const Rating = ({ match }) => {
  const { time } = match.params;
  return <Layout pages={Ratinglayout({ time })}></Layout>;
};

export default Rating;
