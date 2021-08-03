import React, {useState} from 'react';
import {Grid, Button, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Wrapper from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Userinfo = () =>{
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
          height: 20,
          borderRadius: 5,
        },
        colorPrimary: {
          backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
          borderRadius: 5,
          backgroundColor: '#A3CCA3',
        },
      }))(LinearProgress);

    const trophySettings = {
        dots: true,
        infinite : true,
        speed: 500,
        slidesToShow:6,
        slideseToScroll:1
    };

    const groupSettings = {
        dots: true,
        infinite : true,
        speed: 500,
        slidesToShow:3,
        slideseToScroll:1
    };

    const trophyList = [
        {id:1, name:'trophy1'},
        {id:2, name:'trophy2'},
        {id:3, name:'trophy3'},
        {id:4, name:'trophy4'},
        {id:5, name:'trophy5'},
        {id:6, name:'trophy6'},
        {id:7, name:'trophy7'},
        {id:8, name:'trophy8'},
        {id:9, name:'trophy9'},
    ];

    const groupList = [
        {id:1, name:'SSAFY 1반', goal:'아침 7시에 일어나기', team:20, my:10},
        {id:2, name:'밥은 먹고 코딩하자', goal:'react 2시간 공부', team:60, my:100},
        {id:3, name:'알고리즘 스터디', goal:'1일 1알고리즘', team:80, my:100},
        {id:4, name:'SSAFY 15반', goal:'미입실 미퇴실 0회 챌린지', team:60, my:30},
    ];

    return(
        <Wrapper>
            {/* header */}
            <div style={{margin:'15px'}}>
                <Typography variant="overline" style={{fontSize: 30}}>MY INFORMATION</Typography>
                <Grid container direction="row" >
                    <div>
                        <Grid container direction="column" alignItems = "center">
                            <Typography variant="h3">김싸피</Typography>
                            <Grid container direction="row">
                                <Button>정보수정</Button>
                                <Button>내 통계</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{marginLeft:'35px'}}>
                        <Grid container direction="column" style={{width: '500px'}}>
                            <Typography variant="overline" style={{fontSize: 20}}>BRONZE</Typography>
                            <BorderLinearProgress variant="determinate" value={50} />
                        </Grid>
                    </div>
                </Grid>
            </div>
            <div style={{width: '100%', height: '1px', background:'#A3CCA3'}}></div>
            {/* trophy */}
            <div style={{margin:'15px'}}>
                <Typography variant="overline" style={{fontSize: 30}}>MY TROPHY</Typography>
                <Grid style={{height:'300px'}}>
                    <Slider {...trophySettings}>
                        {trophyList.map(item=>{
                            return(
                                <div key={item.id}>
                                    <div style={{width:'150px', height:'200px', background:'#D6E6F5'}}>
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </Grid>
            </div>
            <div style={{width: '100%', height: '1px', background:'#A3CCA3'}}></div>
            {/* group */}
            <div style={{margin:'15px'}}>
                <Typography variant="overline" style={{fontSize: 30}}>MY GROUP</Typography>
                <Grid>
                    <Slider {...groupSettings}>
                        {groupList.map(item=>{
                            return(
                                <Card key={item.id} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h4" style={{margin:'1px'}}>{item.name}</Typography>
                                        <Typography variant="body1" style={{marginTop:'5px'}}>이번주 목표 : {item.goal}</Typography>
                                        <Typography variant="body2" style={{margin:'2px'}}>팀 달성률 : {item.team}%</Typography>
                                        <Typography variant="body2" style={{margin:'2px'}}>내 달성률 : {item.my}%</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">GROUP HOME</Button>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </Slider>
                </Grid>
            </div>
            
        </Wrapper>
    );
};

export default Userinfo;