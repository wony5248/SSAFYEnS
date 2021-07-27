import React, {useState} from 'react';
import Wrapper from './styles';
import {Grid, IconButton, Button, Box, withStyles } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';

const PlanList = () => {
    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);

    const [getMoment, setMoment] = useState(moment());

    const today = getMoment;
    const previousDay = () =>{
        setMoment(getMoment.clone().subtract(1, 'day'));
    };

    const nextDay = () =>{
        setMoment(getMoment.clone().add(1, 'day'));
    };

    let finish = true;

    const planListArr = () =>{
        let result = [];
        let listCnt = 4;
        for (let i = 0; i <listCnt; i++){
            result = result.concat(
                <Grid Contatiner style={{borderBottom:'1px solid #A3CCA3', width:'100%', height:'150px'}}>
                    {/* title */}
                    <div style={{display: 'flex', margin:'10px'}}>
                        <div  style={{fontWeight:'bold', marginRight:'10px'}}>
                            아이디어 회의
                        </div>
                        {finish?(
                            <div style={{background:'#A3CCA3', borderRadius:45, width:'45px', textAlign:'center', color:'#ffffff'}}>
                                완료
                            </div>
                        ):null}
                    </div>
                    {/* body */}
                    <Grid item style={{margin:'10px', height:'50px'}}>
                        <div>time 시작 time 마감</div>
                        <div>아 오늘도 야근이야..</div>
                    </Grid>
                    {/* footer */}
                    <div style={{margin:'10px', display: 'flex', justifyContent:'space-between', width:'100%'}}>
                        {finish?(
                            <div style={{ display: 'flex'}}>
                                <div style={{marginTop:'6px', marginRight:'10px'}}>평점</div>
                                <div style={{marginTop:'-2px'}}>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <StyledRating name="read-only" value={4} readOnly />
                                    </Box>
                                </div>
                            </div>
                            
                        ):<div> </div>}
                        <Button style={{background:'#A3CCA3', color:'#ffffff', height:'40px', marginRight:'30px'}} onClick={deletePlan}>삭제</Button>
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