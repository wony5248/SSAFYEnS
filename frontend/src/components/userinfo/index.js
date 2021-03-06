import React, {useState, useEffect} from 'react';
import {Grid, Button, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Wrapper from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import trophyImg from '../../images/trophy_test.png'
import {userAPI} from '../../utils/axios';
import moment from 'moment';

const Userinfo = () =>{
    const [select, setSelect] = useState(false);
    const [query, setQuery] = useState("react");
    const [data, setData] = useState([]);
    const [exp, setExp] = useState(0);

    const [trophyList, setTrophy] = useState([]);
    const [groupList, setGroup] = useState([]);
    const [isgroup, setIsGroup] = useState(false);
    const [istrophy, setIsTrophy] = useState(false);

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
        slidesToShow: trophyList.length<6 ? trophyList.length : 6,
        slideseToScroll:1
    };

    const groupSettings = {
        dots: true,
        infinite : true,
        speed: 500,
        slidesToShow: groupList.length<3 ? groupList.length : 3,
        slideseToScroll:1
    };

    useEffect(() => {
        let completed = false;
    
        async function getMyPage() {
            try{
              let result = await userAPI.mypage(
                window.sessionStorage.getItem('id')
                );
                setData(result.data);
                setExp(result.data.exp);
                if(result.data.mytrophies.length>0) {
                    setTrophy(result.data.mytrophies);
                    setIsTrophy(true);
                }else{
                    setTrophy([{trophy_id:0, title:'?????? ???????????? ????????????.'}]);
                }
                if(result.data.mygroups.length>0) {
                    setGroup(result.data.mygroups);
                    setIsGroup(true);
                }else{
                    setGroup([{group_id:0, name:'????????? ????????? ????????????.', ranking:'????????? ?????????????????? !'}]);
                }
            }catch (err) {
                console.log(err);
            }
        }
        getMyPage();
        return () => {
          completed = true;
        };
      }, [query]);

    const rank = ()=>{
        if (exp<1000){
            return 'BRONZE';
        }else if(exp<5000){
            return 'SILVER';
        }else if(exp<10000){
            return 'GOLD';
        }else{
            return 'DIAMOND';
        }
    }
    
    return(
        <Wrapper>
            {/* header */}
            <div style={{margin:'15px'}}>
                <Typography variant="overline" style={{fontSize: 30}}>MY INFORMATION</Typography>
                <Grid container direction="row" >
                    <div>
                        <Grid container direction="column" alignItems = "center">
                            <Typography variant="h3">{data.name}</Typography>
                            <Grid container direction="row">
                                <Button onClick={() => window.location.replace (`/checkpassword/${window.sessionStorage.getItem('id')}`)}>????????????</Button>
                                <Button onClick={() => window.location.replace (`/average/${window.sessionStorage.getItem('id')}`)}>??? ??????</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{marginLeft:'35px'}}>
                        <Grid container direction="column" style={{width: '500px'}}>
                            <Typography variant="overline" style={{fontSize: 20}}>{rank()}</Typography>
                            <BorderLinearProgress variant="determinate" value={exp} />
                        </Grid>
                    </div>
                </Grid>
            </div>
            <div style={{width: '100%', height: '1px', background:'#A3CCA3'}}></div>
            {/* trophy */}
            <div style={{margin:'15px'}}>
                <Typography variant="overline" style={{fontSize: 30}}>MY TROPHY</Typography>
                <Grid style={{height:'350px', width:'90%'}}>
                    <Slider {...trophySettings}>
                        {trophyList.map(item=>{
                            return(
                                <Card key={item.trophy_id} variant="outlined" style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <CardContent style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <div style={{width:'200px', height:'280px'}}>
                                            {istrophy?(<img src={trophyImg} alt="main" width="100%"></img>):null}
                                            <div style={{textAlign:'center', marginTop:'15px'}}>{item.title}</div>
                                            {istrophy?(<div style={{textAlign:'center', marginTop:'15px'}}>{moment(item.achieved_at).format('YY.MM.DD')}</div>):null}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Slider>
                </Grid>
            </div>
            <div style={{width: '100%', height: '1px', background:'#A3CCA3'}}></div>
            {/* group */}
            <div style={{margin:'15px'}}>
                <Typography variant="overline" style={{fontSize: 30}}>MY GROUP</Typography>
                <Grid style={{ width:'90%'}}>
                    <Slider {...groupSettings}>
                        {groupList.map(item=>{
                            return(
                                <Card key={item.group_id} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h4" style={{margin:'1px'}}>{item.name}</Typography>
                                    </CardContent>
                                    {isgroup?(<CardActions>
                                        <Button size="small" onClick={()=>select? window.location.replace(`/group/${item.group_id}`) : window.location.replace(`/group/${item.group_id}`) }>GROUP HOME</Button>
                                    </CardActions>):null}
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