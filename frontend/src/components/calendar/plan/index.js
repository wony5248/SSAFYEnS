import React, {useState} from 'react';
import Wrapper from './styles';
import ClearIcon from '@material-ui/icons/Clear';
import {Grid, Checkbox, FormGroup, FormControlLabel, Select
    , InputLabel, FormControl, MenuItem, Button, TextField} from '@material-ui/core';
import moment from 'moment';
import {scheduleAPI} from '../../../utils/axios';

const Plan = (props) =>{
    const { open, close } = props;
    const [state, setState] = useState({
        alarmYES: false,
    });

    const thisYear = moment().format('YY');

    const [timer, setTimer] = useState('');

    const [startYear, setStartYear] = useState(Number(moment().format('YYYY')));
    const [startMonth, setStartMonth] = useState(Number(moment().format('MM')));
    const [startDay, setStartDay] = useState(Number(moment().format('DD')));
    const [startHour, setStartHour] = useState('');
    const [startMin, setStartMin] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMin, setEndMin] = useState('');

    const [title, setTitle] =useState('');

    const addSchedule = async () => {
        const started_at = moment(`${startYear}-${startMonth}-${startDay} ${startHour}:${startMin}`).format('YYYY-MM-DD HH:mm');
        const deadline_at = moment(`${moment(started_at).format('YYYY-MM-DD')} ${endHour}:${endMin}`).format('YYYY-MM-DD HH:mm');
        if(started_at>deadline_at){
            alert("마감일이 시작일보다 빠릅니다");
        }
        else{
            try{
                if(!state.alarmYES){
                    await scheduleAPI.addSchedule(title, started_at, deadline_at, moment().format('YYYY-MM-DD'), state.alarmYES);
                    alert('등록성공');
                }else{
                    let alarmtime = moment(started_at).subtract(timer, 'minutes').format('YYYY-MM-DD HH:mm');
                    await scheduleAPI.addSchedule(title, started_at, deadline_at, moment().format('YYYY-MM-DD'), state.alarmYES, alarmtime);
                    alert('등록성공');
                }
                
            }catch(e){
                alert('등록에 실패했습니다');
                console.log(e);
            }
        }
    }

    const handleAlarm = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleTimer = (event) => {
        setTimer(event.target.value);
    };

    const handleStartYear = (event) => {
        setStartYear(event.target.value);
    };

    const handleStartMonth = (event) => {
        setStartMonth(event.target.value);
    };

    const handleStartDay = (event) => {
        setStartDay(event.target.value);
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

    const yearArr = ()=>{
        let result = [];
        for (let i=0; i<5; i++) {
            result = result.concat(<MenuItem value ={startYear+i}>{startYear+i}</MenuItem>);
        }
        return result;
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


    return(
        <div>
            {open? (
                <Wrapper>
                    {/* header */}
                    <Grid container justifyContent = 'flex-end' alignItems="center" 
                    style={{ color:'#ffffff', background:'#A3CCA3', height:'45px'}}>
                        <Grid style={{marginRight:'220px', fontWeight:'bold'}}>일정 등록</Grid>
                        <ClearIcon fontSize = "large" onClick={close}/>
                    </Grid>
                    <form>
                        {/* contents */}
                        <Grid container justifyContent = "space-between" alignItems = "flex-start" 
                        direction="column" style={{padding:'25px', height:'430px'}}>
                            <Grid container direction="row" alignItems = "center">
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
                                            id = "demo-simple-select" value = {startYear} key={startYear} onChange={handleStartYear}>
                                            {yearArr()}
                                        </Select>
                                    </FormControl>
                                    <div style={{marginRight:'20px'}}>년</div>
                                    <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                        <Select labelId="demo-simple-select-lable"
                                            id = "demo-simple-select" value = {startMonth} key={startMonth} onChange={handleStartMonth}>
                                            {monthArr()}
                                        </Select>
                                    </FormControl>
                                    <div style={{marginRight:'20px'}}>월</div>
                                    <FormControl style={{marginLeft:'15px', marginRight:'25px', marginBottom:'3px'}}>
                                        <Select labelId="demo-simple-select-lable"
                                            id = "demo-simple-select" value = {startDay} key={startDay} onChange={handleStartDay}>
                                            {startdayArr()}
                                        </Select>
                                    </FormControl>
                                    <div>일</div>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems = "center">
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
                            
                            <Grid container direction="row" alignItems = "center">
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
                            <Grid container direction="row" alignItems = "center">
                                <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                                , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                                    <Grid style={{marginTop:'3px'}}>일정 내용</Grid>
                                </Grid>
                                <Grid container justify="center" alignItems="center" style={{marginLeft:'50px', marginBottom:'3px', border:'1px solid #D6E6F5'
                                , borderRadius:25, width:'380px', height:'40px', textAlign:'center'}}>
                                    <TextField type="text" placeholder="일정 내용을 적어주세요" id="standard-basic" 
                                        value = {title} onChange={handleTitle} />
                                </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems = "center">
                                <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                                , textAlign:'center', borderRadius:25, color:'#ffffff'}}>
                                    <Grid style={{marginTop:'3px'}}>알림여부</Grid>
                                </Grid>
                                {/* checkbox */}
                                <Grid style={{marginLeft:'50px'}}>
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
                        </Grid>
                        {/* footer */}
                        <Grid container justifyContent="center" alignItems="center" style={{marginTop:'30px'}}>
                            <Button type = "submit" variant = "contained" style={{background:'#A3CCA3', color:'#FFFFFF'}} onClick={addSchedule}>등록하기</Button>
                        </Grid>
                    </form>
                </Wrapper>
            ) : null}
        </div>
    );
};

export default Plan;