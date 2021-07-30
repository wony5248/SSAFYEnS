import React, { Component } from "react";
import styled from "styled-components"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import HourglassTopIcon from '@material-ui/icons/HourglassEmpty';
const Countdiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
align-content: center;
border-radius: 4px;
width: auto;
height: 46.9%;
color: #121212;
margin: 12px 0px;
font-size: 40px;
padding: 4px;
padding-left:16px;
padding-right:16px;
`;

const Countbtn = styled.button`

border-radius: 4px;
width: 20%;
height: 15%;
color: white;
background-color: #a3cca3;
margin: 12px 0px;
font-size: 40px;
padding: 4px;
padding-left:16px;
padding-right:16px;
`;

const Titlediv = styled.div`

display:flex;
align-items: center;
justify-content: space-around;
`;

const Addbtn = styled.button`
border: none;
height: 100%;
display:flex;
align-items: center;
justify-content: space-around;
background-color: white;
font-size: 40px;
`;
class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 300000
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
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
        timerTime: 300000
      });
    }
  };
  plusTimer = () => {
    this.setState({
      timerTime : this.state.timerTime + 60000
    })
  }
  minusTimer = () => {
    if (this.state.startTime !== 0)
    {this.setState({
      timerTime : this.state.timerTime - 60000
    })}
  }
  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <Countdiv>
        <Titlediv><HourglassTopIcon fontSize = "large"/>Timer</Titlediv>
          <Titlediv >
            <Addbtn onClick = {this.minusTimer}><RemoveIcon fontSize="large"/></Addbtn>{hours} : {minutes} : {seconds} <Addbtn onClick = {this.plusTimer}><AddIcon fontSize="large"/></Addbtn>
          </Titlediv>

          {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
            <Countbtn onClick={this.startTimer}>
              Start
            </Countbtn>
          )}
          {timerOn === true && timerTime >= 1000 && (
            <Countbtn onClick={this.stopTimer}>
              Stop
            </Countbtn>
          )}
          {timerOn === false &&
            (timerStart !== 0 &&
              timerStart !== timerTime &&
              timerTime !== 0) && (
              <Countbtn onClick={this.startTimer}>
                Resume
              </Countbtn>
            )}

          {(timerOn === false || timerTime < 1000) &&
            (timerStart !== timerTime && timerStart > 0) && (
              <Countbtn onClick={this.resetTimer}>
                Reset
              </Countbtn>
            )}
      </Countdiv>
    );
  }
}

export default Countdown;
