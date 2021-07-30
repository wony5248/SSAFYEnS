import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import Wrapper from './styles';
import {Grid, IconButton, Button, Box, withStyles } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import {scheduleAPI} from '../../../utils/axios';

const PlanList = () => {
    let history = useHistory();
    const location = useLocation();
    const [query, setQuery] = useState('react');
    const [todayPlan, setTodayPlan] = useState({});
    let data = [];

    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);

    const [getMoment, setMoment] = useState(moment());

    let today = moment(`${getMoment.format('YYYY')}-${location.state.month}-${location.state.day}`);
    const previousDay = () =>{
        setMoment(getMoment.clone().subtract(1, 'day'));
    };

    const nextDay = () =>{
        setMoment(getMoment.clone().add(1, 'day'));
    };

    useEffect(()=>{
        let completed = false;
        
        async function getMonthlySchedule(){
            const result = await scheduleAPI.getMonthly(today.format('YYYY'), today.format('MM'));
            data = result.data;
            for(let i = 0; i < data.length;i++) {   
                if (today.format('MM-DD') === moment(data[i].started_at).format('MM-DD')){
                    setTodayPlan(data[i]);
                }
            }
        }
        getMonthlySchedule();
        return ()=>{
            completed = true;
        };
    }, [query]);


    const planListArr = () =>{
        let result = [];
        
        let rating = 4;

        for (let i = 0; i <1; i++){
            result = result.concat(
                <Grid Contatiner style={{borderBottom:'1px solid #A3CCA3', width:'100%', height:'150px'}}>
                    {/* title */}
                    <div style={{display: 'flex', margin:'10px'}}>
                        <div  style={{fontWeight:'bold', marginRight:'10px'}}>
                            {todayPlan['title']}
                            {/* 프로젝트 발표 */}
                        </div>
                        {todayPlan['is_finished']?(
                            <div style={{background:'#A3CCA3', borderRadius:45, width:'45px', textAlign:'center', color:'#ffffff'}}>
                                완료
                            </div>
                        ):null}
                    </div>
                    {/* body */}
                    <Grid item style={{margin:'10px', height:'50px', marginTop:'20px', marginBottom:'-10px'}}>
                        <div>{moment(todayPlan['started_at']).format('hh')} : {moment(todayPlan['started_at']).format('mm')} 시작 {moment(todayPlan['deadline_at']).format('HH')} : {moment(todayPlan['deadline_at']).format('mm')} 마감</div>
                    </Grid>
                    {/* footer */}
                    <div style={{margin:'10px', display: 'flex', justifyContent:'space-between', width:'100%'}}>
                        {todayPlan['is_finished']?(
                            <div style={{ display: 'flex'}}>
                                <div style={{marginTop:'6px', marginRight:'10px'}}>평점</div>
                                <div style={{marginTop:'-2px'}}>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <StyledRating name="read-only" value={rating} readOnly />
                                    </Box>
                                </div>
                            </div>
                            
                        ):<div> </div>}
                        <div>
                            <Button style={{background:'#A3CCA3', color:'#ffffff', height:'40px', marginRight:'20px'}} 
                            onClick={()=>{history.push({
                                pathname:'/planmodify',
                                state:{
                                    startMonth: today.format('MM') , 
                                    startDay: today.format('DD'),
                                    startHour : moment(todayPlan['started_at']).format('hh'),
                                    startMin : moment(todayPlan['started_at']).format('mm'),
                                    endHour : moment(todayPlan['deadline_at']).format('hh'),
                                    endMonth:today.format('MM') ,
                                    endDay: today.format('DD'),
                                    endMin : moment(todayPlan['deadline_at']).format('mm'),
                                    title:moment(todayPlan['title']),
                                    rating:rating
                                }
                            })}}>
                                수정
                            </Button>
                            <Button style={{background:'#A3CCA3', color:'#ffffff', height:'40px', marginRight:'30px'}} onClick={deletePlan}>삭제</Button>
                        </div>
                    </div>
                </Grid>
            )
        }
        return result;
        
    };

    const deletePlan = () => {
        let result = window.confirm("삭제하시겠습니까?");
        if (result){
            alert("삭제되었습니다.");
        }else{
            alert("취소되었습니다.");
        }
    };

    return (
        <Wrapper>
            {/* header */}
            <Grid container justifyContent= 'center' >
                <Grid container justifyContent='space-around' style={{width:'20%'}}>
                    <Grid item >
                        <IconButton onClick={previousDay}>
                            <KeyboardArrowLeftIcon fontSize = "large" style={{color:'#A3CCA3'}} />
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <div style={{background:'#A3CCA3', width:'130px', height:'30px', textAlign:'center', 
                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            {today.format('MM월 DD일')}
                        </div>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={nextDay}>
                            <KeyboardArrowRightIcon fontSize = "large" style={{color:'#A3CCA3'}} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            {/* body */}
            <Grid container justifyContent='center' style={{width:'100%', height:'50px'}}></Grid>
            <Grid container justifyContent= 'center'>
                <Grid Container style={{borderTop:'1px solid #A3CCA3', borderLeft:'1px solid #A3CCA3'
                , borderRight:'1px solid #A3CCA3', width:'50%'}}>
                    {planListArr()}
                </Grid>
            </Grid>
        </Wrapper>
    );

};

export default PlanList;