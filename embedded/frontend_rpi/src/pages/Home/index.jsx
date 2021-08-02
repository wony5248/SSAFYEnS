import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { styled } from "@material-ui/core/styles";
import Clock from "react-live-clock";
import Logo from "../../assets/ssafyenslogo.png";
import Progressimg from "../../assets/Progress.jpg";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "40%",
  },
  title: {
    flexGrow: 1,
  },
  grid: {
    padding: "24px",
  },
}));
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

const MuiCard = styled(CardActionArea)({
  display: "flex",
  justi: "center",
});
const HOME = () => {
  const classes = useStyles();
  return (
    <div>
      <MuiAppbar position="static">
        <MuiToolbar>
          <MuiTypo variant="h6" className={classes.title}>
            <img src={Logo} width="20%" />
          </MuiTypo>
          <Clock
            format={"YYYY년MM월DD일 hh시mm분ss초"}
            ticking={true}
            timezone={"Asia/Seoul"}
          />
        </MuiToolbar>
      </MuiAppbar>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={5}>
          <Card className={classes.root}>
            <CardActionArea>
              <img src={Progressimg} width="40%"></img>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Progress
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card className={classes.root}>
            <CardActionArea>
              <img src={Progressimg} width="40%"></img>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Today
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <img src={Progressimg} width="40%"></img>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Change
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <img src={Progressimg} width="40%"></img>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Timer
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HOME;
