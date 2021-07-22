import React from "react";
import Clock from "react-live-clock";
import Datediv from "./styles";
const Date = () => {
  return (
    <Datediv>
      <div>
        <Clock format={"YYYY.MM.DD"} ticking={true} timezone={"Asia/Seoul"} />
      </div>
      <div style = {{width: "110px"}}>
        <Clock format={"HH시mm분ss초"} ticking={true} timezone={"Asia/Seoul"} />
      </div>
    </Datediv>
  );
};
export default Date;
