import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { styled } from "@material-ui/core/styles";
import Clock from "react-live-clock";
import Logo from "../../assets/ssafyenslogo.png";
import Progressimg from "../../assets/Progress.jpg";
import Grid from "@material-ui/core/Grid";

const MuiToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
});
const MuiAppbar = styled(AppBar)({
  backgroundColor: "#a3cca3",
  display: "flex",
  justifyContent: "center",
});

const MuiTypo = styled(Typography)({
  display: "flex",
  alignItems: "center",
});

const HOME = () => {
  return (
    <div>
      
    </div>
  );
};

export default HOME;
