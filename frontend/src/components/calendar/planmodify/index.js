import React, {useState, useEffect} from 'react';
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
import {scheduleAPI} from '../../../utils/axios';

const PlanModify = () =>{
    let history = useHistory();
    const location = useLocation();
    const [query, setQuery] = useState('react');
    const select = false;

    const id = location.pathname.split('/')[3];
    const date = location.pathname.split('/')[2];

    const [rating, setRating] = useState(0);
    const [startYear, setStartYear] =useState('');
    const [startMonth, setStartMonth] =useState('');
    const [startDay, setStartDay] =useState('');
    const [startHour, setStartHour] =useState('');
    const [startMin, setStartMin] =useState();

    const [endHour, setEndHour] =useState('');
    const [endMin, setEndMin] =useState();
    const [title, setTitle] =useState('');

    const [humi, setHumi] = useState(0);
    const [illumi, setIllumi] = useState(0);
    const [noise, setNoise] = useState(0);
    const [temp, setTemp] = useState(0);

    const [state, setState] = useState({
        alarmCheck: true,
        completed: false
    });

    const [timer, setTimer] = useState('');
    const [data, setData] = useState({});

    useEffect(()=>{
        let completed = false;
        
        async function getMonthlySchedule(){
            const result = await scheduleAPI.getSchedule(id);
            setData(result.data);

            setStartYear(Number(moment(result.data.started_at).format('YYYY')));
            setStartMonth(Number(moment(result.data.started_at).format('MM')));
            setStartDay(Number(moment(result.data.started_at).format('DD')));
            setStartHour(Number(moment(result.data.started_at).format('HH')));
            setStartMin(moment(result.data.started_at).format('mm'));
            
            setEndHour(Number(moment(result.data.finished_at).format('HH')));
            setEndMin(moment(result.data.finished_at).format('mm'));
            setTitle(result.data.title);
            setRating(result.data.point/20);
            setHumi(result.data.humidity);
            setNoise(result.data.noise);
            setIllumi(result.data.illuminance);
            setTemp(result.data.temperature);
            let start = moment(result.data.started_at).format('YYYY-MM-DD HH:mm');
            let end = moment(result.data.notificationtime).format('YYYY-MM-DD HH:mm');
            setTimer(moment(start).subtract(end, 'minutes').format('mm'));
            setState({completed:result.data.is_finished,
                alarmCheck:result.data.notification});            

        }
        getMonthlySchedule();
        return ()=>{
            completed = true;
        };
    }, [query]);

    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);

    const thisYear = moment().format('YY');

    const handleAlarm = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleComplete = (event) => {
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
        for (let i=0; i<5; i++){
            result = result.concat(<MenuItem value ={startYear+i}>{startYear+i}</MenuItem>);
        }
        return result;
    }

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
        result = result.concat(<MenuItem value ={'00'}>00</MenuItem>);
        result = result.concat(<MenuItem value ={'30'}>30</MenuItem>);
        
        return result;
    };

    const modify = async () =>{
        let started_at = moment(`${moment().format('YYYY')}-${startMonth}-${startDay} ${startHour}:${startMin}`).format('YYYY-MM-DD HH:mm');
        let deadline_at = moment(`${moment().format('YYYY')}-${startMonth}-${startDay} ${endHour}:${endMin}`).format('YYYY-MM-DD HH:mm');

        if(started_at>deadline_at){
            alert("마감일이 시작일보다 빠릅니다");
        }
        else{
            try{
                if(!state.alarmCheck){
                    await scheduleAPI.modifySchedule(id, moment(data.date).format('YYYYMMDD'), title, state.alarmCheck, started_at, deadline_at, moment(data.finished_at).format('YYYY-MM-DD HH:mm'));
                }else{
                    let alarmtime = moment(started_at).subtract(timer, 'minutes').format('YYYY-MM-DD HH:mm');
                    await scheduleAPI.modifySchedule(id, moment(data.date).format('YYYYMMDD'), title, state.alarmCheck, started_at, deadline_at, moment(data.finished_at).format('YYYY-MM-DD HH:mm'), alarmtime);
                }
                alert("변경이 완료되었습니다.")
                window.location.href = `/planlist/${date}`;
            }
            catch (e) {
                alert('수정에 실패했습니다.');
            }

        }
        
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
                                    id = "demo-simple-select" key = {startYear} value = {startYear} onChange={handleStartYear}>
                                    {yearArr()}
                                </Select>
                            </FormControl>
                            <div style={{marginRight:'20px'}}>년</div>
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
                                    id = "demo-simple-select" value = {startMin} key = {startMin} onChange={handleStartMin}>
                                    {minArr()}
                                </Select>
                            </FormControl>
                            <div>분</div>
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
                                    id = "demo-simple-select" value = {endMin} key = {endMin} onChange={handleEndMin}>
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
                                name = "alarmCheck" style={{color:'#A3CCA3'}}/>} label="YES" style={{marginTop:'10px'}}/>
                                
                                <FormControl style={{marginLeft:'15px', marginRight:'25px'}}>
                                    <InputLabel id = "demo-simple-select-lable">시간</InputLabel>
                                    <Select labelId="demo-simple-select-lable" style={{width:'100px'}}
                                    id = "demo-simple-select" value = {timer} key={timer} onChange={handleTimer}>
                                        <MenuItem value ={10}>10분 전</MenuItem>
                                        <MenuItem value ={15}>15분 전</MenuItem>
                                        <MenuItem value ={30}>30분 전</MenuItem>
                                        <MenuItem value ={60}>1시간 전</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        </Grid>
                    </Grid>
                    
                    {state.completed?(
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
                                        readOnly
                                        style={{marginTop:'20px'}} />
                                </Box>
                            </Grid>
                        </Grid>):null}
                    {state.completed?(
                        <Grid container direction="row" alignItems = "center"  justifyContent = "center">
                            <Grid style={{width:'100px', background:'#A3CCA3', height:'30px'
                            , textAlign:'center', borderRadius:25, color:'#ffffff', marginLeft:'20px'}}>
                                <Grid style={{marginTop:'3px'}}>환경</Grid>
                            </Grid>
                            {/* environment */}
                            <Grid style={{width:'400px', marginLeft:'50px', marginTop:'3px', align:'center', display: 'flex'}}>
                                <WbIncandescentIcon style={{color:'#A3CCA3' , marginRight:'20px'}}/> 
                                <div style={{marginRight:'20px'}} onClick={()=>{alert(typeof startMonth)}}>
                                    {illumi}
                                </div>
                                <MicIcon style={{color:'#A3CCA3' , marginRight:'20px'}}/> 
                                <div style={{marginRight:'20px'}}>
                                    {noise}
                                </div>                                    
                                <OpacityIcon style={{color:'#A3CCA3' , marginRight:'20px', marginTop:'-2px'}}/> 
                                <div style={{marginRight:'20px'}}>
                                    {humi}
                                </div>
                                <Thermometer style={{color:'#A3CCA3' , marginRight:'20px'}} />
                                <div style={{marginRight:'20px'}}>
                                    {temp}
                                </div>
                            </Grid>
                        </Grid>
                    ):null}
                </Grid>
                {/* footer */}
                <Grid container justifyContent="center" alignItems="center" style={{marginTop:'30px', display:"flex",}}>
                <Button type = "button" variant = "contained" style={{background:'#A3CCA3', color:'#FFFFFF',marginRight:"32px"}} onClick={()=> window.location.href = `/planlist/${date}`}>뒤로가기</Button>
                <Button type = "submit" variant = "contained" style={{background:'#A3CCA3', color:'#FFFFFF'}} onClick={select?null:modify}>수정하기</Button>
                </Grid>
            </form>
        </Wrapper>
    );
};

export default PlanModify;