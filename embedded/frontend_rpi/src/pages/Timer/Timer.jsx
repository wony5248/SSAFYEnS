import React, { Component } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import HourglassTopIcon from "@material-ui/icons/HourglassEmpty";
const Countdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius: 4px;
  width: auto;
  color: ${props => props.isdark ? "white" : "#121212"};
  height: 46.9%;
  margin: 12px 0px;
  font-size: 40px;
  padding: 4px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Countbtn = styled.button`
  border-radius: 4px;
  width: 20%;
  height: 15%;
  color: white;
  background-color:  ${props => props.isdark ? "gray" : "#a3cca3"};
  margin: 12px 0px;
  font-size: 40px;
  padding: 4px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Titlediv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Addbtn = styled.button`
  border: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.isdark ? "gray" : "#a3cca3"};
  color: white;
  border: 1px solid black;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 40px;
`;
class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 300000,
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        console.log("Timer Ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: 300000,
      });
    }
  };
  plusTimer = () => {
    this.setState({
      timerTime: this.state.timerTime + 60000,
    });
  };
  tenplusTimer = () => {
    this.setState({
      timerTime: this.state.timerTime + 600000,
    });
  };
  minusTimer = () => {
    if (this.state.timerTime >= 60000) {
      this.setState({
        timerTime: this.state.timerTime - 60000,
      });
    }
    if (this.state.timerTime <= 0) {
      this.setState({
        timerTime: 0,
      });
    }
  };
  tenminusTimer = () => {
    if (this.state.timerTime >= 600000) {
      this.setState({
        timerTime: this.state.timerTime - 600000,
      });
    }
    if (this.state.timerTime <= 0) {
      this.setState({
        timerTime: 0,
      });
    }
  };
  render() {
    const { isdark } = this.props;
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <Countdiv isdark={isdark}>
        <Titlediv>
          <HourglassTopIcon fontSize="large" />
          Timer
        </Titlediv>
        <Titlediv>
          <Addbtn isdark={isdark} onClick={this.tenminusTimer}>
            <RemoveIcon fontSize="large" />
            <RemoveIcon fontSize="large" />
          </Addbtn>
          <Addbtn isdark = {isdark} onClick={this.minusTimer}>
            <RemoveIcon fontSize="large" />
          </Addbtn>
          {hours} : {minutes} : {seconds}{" "}
          <Addbtn isdark = {isdark} onClick={this.plusTimer}>
            <AddIcon fontSize="large" />
          </Addbtn>
          <Addbtn isdark = {isdark} onClick={this.tenplusTimer}>
            <AddIcon fontSize="large" />
            <AddIcon fontSize="large" />
          </Addbtn>
        </Titlediv>

        {timerOn === false &&
          (timerStart === 0 || timerTime === timerStart) && (
            <Countbtn isdark = {isdark} onClick={this.startTimer}>Start</Countbtn>
          )}
        {timerOn === true && timerTime >= 1000 && (
          <Countbtn isdark = {isdark} onClick={this.stopTimer}>Stop</Countbtn>
        )}
        {timerOn === false &&
          timerStart !== 0 &&
          timerStart !== timerTime &&
          timerTime !== 0 && (
            <Countbtn isdark = {isdark} onClick={this.startTimer}>Resume</Countbtn>
          )}

        {(timerOn === false || timerTime < 1000) &&
          timerStart !== timerTime &&
          timerStart > 0 && (
            <Countbtn isdark = {isdark} onClick={this.resetTimer}>Reset</Countbtn>
          )}
      </Countdiv>
    );
  }
}

export default Countdown;
