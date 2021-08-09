import React, { Component } from "react";
import styled from "styled-components";
import TimerIcon from '@material-ui/icons/Timer';
const Stopwatchdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius: 4px;
  width: auto;
  height: 45.4%;
  margin: 12px 0px;
  font-size: 40px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Stopwatchbtn = styled.button`
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
class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };
  
  render() {
    const { timerTime } = this.state;

    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <Stopwatchdiv>
        <Titlediv><TimerIcon fontSize = "100%"/>Stopwatch</Titlediv>
        <div>
          {hours} : {minutes} : {seconds}
        </div>

        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <Stopwatchbtn onClick={this.startTimer}>Start</Stopwatchbtn>
        )}
        {this.state.timerOn === true && (
          <Stopwatchbtn onClick={this.stopTimer}>Stop</Stopwatchbtn>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <Stopwatchbtn onClick={this.startTimer}>Resume</Stopwatchbtn>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <Stopwatchbtn onClick={this.resetTimer}>Reset</Stopwatchbtn>
        )}
      </Stopwatchdiv>
    );
  }
}

export default Stopwatch;
