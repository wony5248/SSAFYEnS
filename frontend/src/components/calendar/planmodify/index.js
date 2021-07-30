import React, {useState} from 'react';
import store from 'store';
import {useLocation, useHistory} from 'react-router-dom';
import Wrapper from './styles';
import {Grid, Checkbox, FormGroup, FormControlLabel, Select
    , InputLabel, FormControl, MenuItem, Button, TextField, Box, withStyles} from '@material-ui/core';
import moment from 'moment';
import Rating from '@material-ui/lab/Rating';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import MicIcon from '@material-ui/icons/Mic';
import OpacityIcon from '@material-ui/icons/Opacity';
import {Thermometer} from 'react-feather';


const PlanModify = () =>{
    let history = useHistory();
    const location = useLocation();

    let {startMonth, startDay, startHour, startMin, endHour, endMonth, endDay, endMin, title} = location.state || '';
    startMonth = Number(startMonth);
    startDay = Number(startDay);
    endMonth = Number(endMonth);
    endDay = Number(endDay);

    const [rating, setRating] = useState(location.state || 0);

    const [state, setState] = useState({
        alarmYES: true,
        completed: false
    });

    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);

    const thisYear = moment().format('YY');

    const [timer, setTimer] = useState('');

    const [setStartMonth, setStartDay, setStartHour, setStartMin
        , setEndMonth, setEndDay, setEndHour, setEndMin, setTitle] =useState('');

    const handleAlarm = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleComplete = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleTimer = (event) => {
        setTimer(event.target.value);
    };

    const handleStartMonth = (event) => {
        setStartMonth(event.target.value);
    };

    const handleEndMonth = (event) => {
        setEndMonth(event.target.value);
    };

    const handleStartDay = (event) => {
        setStartDay(event.target.value);
    };

    const handleEndDay = (event) => {
        setEndDay(event.target.value);
    };

    const handleStartHour = (event) => {
        setStartHour(event.target.value);
    };

    const handleEndHour = (event) => {
        setEndHour(event.target.value);
    };

    const handleStartMin = (event) => {
        setStartMin(event.target.value);
    };

    const handleEndMin = (event) => {
        setEndMin(event.target.value);
    };
    
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const monthArr = () =>{
        let result = [];
        for (let i = 1; i <=12 ; i++){
            result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
        }
        return result;
    };

    const startdayArr = () =>{
        let result = [];
        if (startMonth===1 || startMonth===3 || startMonth===5 || startMonth===7 || startMonth===8 || startMonth===10 || startMonth===12){
            for (let i = 1; i <=31 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }else if (startMonth===4 || startMonth===6 || startMonth===9 || startMonth===11 ){
            for (let i = 1; i <=30 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }else if (thisYear%4===0 && startMonth===2){
            for (let i = 1; i <=29 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }else if(startMonth===2){
            for (let i = 1; i <=28 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }
        
        return result;
    };

    const enddayArr = () =>{
        let result = [];
        if (endMonth===1 || endMonth===3 || endMonth===5 || endMonth===7 || endMonth===8 || endMonth===10 || endMonth===12){
            for (let i = 1; i <=31 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }else if (endMonth===4 || endMonth===6 || endMonth===9 || endMonth===11){
            for (let i = 1; i <=30 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }else if (thisYear%4===0 && endMonth===2){
            for (let i = 1; i <=29 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }else if(endMonth===2){
            for (let i = 1; i <=28 ; i++){
                result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
            }
        }
        
        return result;
    };


    const hourArr = () =>{
        let result = [];
        for (let i = 0; i <=23 ; i++){
            result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
        }
        return result;
    };

    const minArr = () =>{
        let result = [];
        for (let i = 0; i <=30 ; i+=30){
            result = result.concat(<MenuItem value ={i}>{i}</MenuItem>);
        }
        return result;
    };

    const onClickRedirectPathHandler = name => e =>{
        window.scrollTo(0, 0);
        if ( name === '/planlist'){
            if(history.location.pathname === name){
                history.goBack();
                store.remove('planlist');
            }else{
                history.push(name);
            }
        }
    };

    const modify = () =>{
        if (startMonth===endMonth && startDay===endDay && startHour>endHour || startHour===endHour && startDay>endDay){
            alert("시작시간이 마감시간보다 느립니다.");
        }
        else if(startMonth>endMonth){
            alert("시작일이 마감일보다 느립니다.");
        }
        else if(startMonth===endMonth && startDay>endDay) {
            alert("시작일이 마감일보다 느립니다.");
        
        }    
        else{
            alert(`start month : ${startMonth}월 ${startDay}일 ${startHour}시 ${startMin}분
        end Date : ${endMonth}월 ${endDay}일 ${endHour}시 ${endMin}분
        Plan : ${title}`);
            
        }
        onClickRedirectPathHandler('/planlist');
    };


    return(
        <Wrapper>
            {/* header */}
            <Grid container justifyContent = 'center' alignItems="center" style={{width:'100%'}}>
                <div style={{ color:'#ffffff', borderRadius:45, width:'130px',background:'#A3CCA3', height:'45px'}}>
                    <div style={{marginTop:'10px', fontWeight:'bold', textAlign:'center' }}>
                        일정수정
                    </div>
                </div>
            </Grid>
            <form>
                {/* contents */}
                <Grid container justifyContent = "space-between" alignItems = "flex-start" 
                    direction="column" style={{padding:'25px', height:'670px', width:'100%'}}>
                    <Grid container direction="row" alignItems = "center" justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                            , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                            <Grid style={{marginTop:'3px'}}>
                                시작일
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent = "center" alignItems = "center"
                            style={{marginLeft:'50px', marginBottom:'3px', border:'1px solid #D6E6F5'
                            , borderRadius:25, width:'380px', height:'40px', textAlign:'center'}}>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {startMonth} onChange={handleStartMonth}>
                                    {monthArr()}
                                </Select>
                            </FormControl>
                            <div style={{marginRight:'20px'}}>월</div>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {startDay} onChange={handleStartDay}>
                                    {startdayArr()}
                                </Select>
                            </FormControl>
                            <div>일</div>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                            , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                            <Grid style={{marginTop:'3px'}}>시작시간</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent = "center" alignItems = "center"
                            style={{marginLeft:'50px', border:'1px solid #D6E6F5'
                            , borderRadius:25, width:'380px', height:'70px', textAlign:'center'}}>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {startHour} onChange={handleStartHour}>
                                    {hourArr()}
                                </Select>
                            </FormControl>
                            <div style={{marginRight:'20px'}}>시</div>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {startMin} onChange={handleStartMin}>
                                    {minArr()}
                                </Select>
                            </FormControl>
                            <div>분</div>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                            , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                            <Grid style={{marginTop:'3px'}}>마감일</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent = "center" alignItems = "center"
                            style={{marginLeft:'50px', marginBottom:'3px', border:'1px solid #D6E6F5'
                            , borderRadius:25, width:'380px', height:'40px', textAlign:'center'}}>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {endMonth} onChange={handleEndMonth}>
                                    {monthArr()}
                                </Select>
                            </FormControl>
                            <div style={{marginRight:'20px'}}>월</div>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {endDay} onChange={handleEndDay}>
                                    {enddayArr()}
                                </Select>
                            </FormControl>
                            <div>일</div>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                        , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                            <Grid style={{marginTop:'3px'}}>마감시간</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent = "center" alignItems = "center"
                            style={{marginLeft:'50px', border:'1px solid #D6E6F5'
                            , borderRadius:25, width:'380px', height:'70px', textAlign:'center'}}>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {endHour} onChange={handleEndHour}>
                                    {hourArr()}
                                </Select>
                            </FormControl>
                            <div style={{marginRight:'20px'}}>시</div>
                            <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                <Select labelId="demo-simple-select-lable"
                                    id = "demo-simple-select" value = {endMin} onChange={handleEndMin}>
                                    {minArr()}
                                </Select>
                            </FormControl>
                            <div>분</div>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                        , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                            <Grid style={{marginTop:'3px'}}>일정 내용</Grid>
                        </Grid>
                        <Grid container justify="center" alignItems="center" style={{marginLeft:'50px', marginBottom:'3px', border:'1px solid #D6E6F5'
                        , borderRadius:25, width:'380px', height:'60px', textAlign:'center'}}>
                            <TextField type="text" placeholder="일정 내용을 적어주세요" id="standard-basic" 
                                value = {title} onChange={handleTitle} />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                        , textAlign:'center', borderRadius:25, color:'#ffffff', marginTop:'10px'}}>
                            <Grid style={{marginTop:'3px'}}>알림여부</Grid>
                        </Grid>
                        {/* checkbox */}
                        <Grid style={{marginLeft:'50px', width:'380px', marginTop:'3px'}}>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox checked={state.alarmCheck} onChange={handleAlarm}
                                name = "alarmYES" style={{color:'#A3CCA3'}}/>} label="YES" style={{marginTop:'10px'}}/>
                                
                                <FormControl style={{marginLeft:'15px', marginRight:'25px'}}>
                                    <InputLabel id = "demo-simple-select-lable">시간</InputLabel>
                                    <Select labelId="demo-simple-select-lable" style={{width:'100px'}}
                                    id = "demo-simple-select" value = {timer} onChange={handleTimer}>
                                        <MenuItem value ={10}>10분 전</MenuItem>
                                        <MenuItem value ={15}>15분 전</MenuItem>
                                        <MenuItem value ={30}>30분 전</MenuItem>
                                        <MenuItem value ={60}>1시간 전</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                        , textAlign:'center', borderRadius:25, color:'#ffffff', marginTop:'10px'}}>
                            <Grid style={{marginTop:'3px'}}>완료여부</Grid>
                        </Grid>
                        {/* checkbox */}
                        <Grid style={{width:'380px', marginLeft:'50px', marginTop:'3px'}}>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox checked={state.completed} onChange={handleComplete}
                                name = "completed" style={{color:'#A3CCA3'}}/>} label="YES" style={{marginTop:'10px'}}/>
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                        , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                            <Grid style={{marginTop:'3px'}}>평점</Grid>
                        </Grid>
                        {/* rating */}
                        <Grid style={{width:'380px', marginLeft:'50px'}}>
                            <Box component="fieldset" mb={3} borderColor="transparent" style={{marginLeft:'-15px'}}>
                                <StyledRating name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }} style={{marginTop:'20px'}} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                        <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                        , textAlign:'center', borderRadius:25, color:'#ffffff', marginLeft:'20px'}}>
                            <Grid style={{marginTop:'3px'}}>환경</Grid>
                        </Grid>
                        {/* environment */}
                        <Grid style={{width:'400px', marginLeft:'50px', marginTop:'3px', align:'center', display: 'flex'}}>
                            <WbIncandescentIcon style={{color:'#A3CCA3' , marginRight:'20px'}}/> 
                            <div style={{marginRight:'20px'}} onClick={()=>{alert(typeof startMonth)}}>
                                밝기
                            </div>
                            <MicIcon style={{color:'#A3CCA3' , marginRight:'20px'}}/> 
                            <div style={{marginRight:'20px'}}>
                                소음
                            </div>                                    
                            <OpacityIcon style={{color:'#A3CCA3' , marginRight:'20px', marginTop:'-2px'}}/> 
                            <div style={{marginRight:'20px'}}>
                                습도
                            </div>
                            <Thermometer style={{color:'#A3CCA3' , marginRight:'20px'}} />
                            <div style={{marginRight:'20px'}}>
                                온도
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {/* footer */}
                <Grid container justifyContent="center" alignItems="center" style={{marginTop:'30px'}}>
                    <Button type = "submit" variant = "contained" style={{background:'#A3CCA3', color:'#FFFFFF'}} onClick={modify}>수정하기</Button>
                </Grid>
            </form>
        </Wrapper>
    );
};

export default PlanModify;