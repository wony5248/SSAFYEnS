import React, { useState } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import Ratingstar from "@material-ui/lab/Rating";
import { withStyles } from '@material-ui/core/styles';
import moment from "moment"

const StyledRating = withStyles({
  iconFilled: {
    color: '#f6f924',
  },
  iconHover: {
    color: '#f6f924',
  },
})(Ratingstar);

const Starttime = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
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
  border-radius: 4px;
  width: auto;
  height: auto;
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
  height: 206px;
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
  height: 150px;
  color: black;
  background-color: white;
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
  font-size: 12px;
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
  height: 30px;
  color: white;
  background-color: #a3cca3;
  margin-top: 4px;
  padding: 4px;
`;

const Ratingcon = styled1.div`
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

const Confirm = () => {
  if(window.confirm("정말 완료하시겠 습니까?")){
    window.location.replace(`/Today`)
  }
  else {
    console.log("변화 없음")
  }
}

const Cancel = () => {
  if(window.confirm("정말 취소하시겠 습니까?")){
    window.location.replace(`/Today`)
  }
  else {
    console.log("변화 없음")
  }
}

const Ratinglayout = (props) => {
  const [value, setValue] = useState(0);
  const {time} = props;
  console.log(time)
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
          <Ratingquestion>설문 1</Ratingquestion>
          <Ratingquestion>설문 2</Ratingquestion>
          <Ratingquestion>설문 3</Ratingquestion>
          <Ratingquestion>설문 4</Ratingquestion>
          <Ratingquestion>설문 5</Ratingquestion>
        </Ratingcontent>
        <Ratingstarcon>
          <StyledRating
            name="customized-empty"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
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
const Rating = ({match}) => {
  const {time} = match.params;
  return <Layout pages={Ratinglayout({time})}></Layout>;
};

export default Rating;
