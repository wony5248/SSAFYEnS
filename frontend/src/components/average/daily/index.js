import React, {useState, useEffect} from 'react';
import {Grid,  Box, withStyles} from '@material-ui/core';
import Wrapper from './styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Chart from "react-apexcharts";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import MicIcon from '@material-ui/icons/Mic';
import OpacityIcon from '@material-ui/icons/Opacity';
import {Thermometer} from 'react-feather';
import Rating from '@material-ui/lab/Rating';
import { scheduleAPI } from "../../../utils/axios";
import moment from "moment";

const Daily = () =>{
    const [context, setContext] = useState('');
    const [rate, setRate] = useState(0);
    const [data, setData] = useState([]);
    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);
    const [date, setDate] = useState(new Date());

    let [category, setCategory] = useState([]);
    let [time, setTime] = useState([]);

    const [illumi, setIllumi] = useState(0);
    const [noise, setNoise] = useState(0);
    const [temp, setTemp] = useState(0);
    const [humi, setHumi] = useState(0);

    let graph = {
        options:{
            chart:{
                // chart 형태
                id:'basic-bar'
            },
            // x축
            xaxis:{
                categories:category
            }
        },
        series:[
            {   
                // y축
                name:'minute',
                data:time
            }
        ]
    };

    useEffect(() => {
        let completed = false;
        async function getMonthlySchedule() {
            try{
                const result = await scheduleAPI.getDailyAverage(moment(date).format('YYYY-MM-DD'));
                setData(result.data);
                let c = [];
                let t = [];
                let text = [];
                for(let i=0; i<result.data.schedules.length; i++){
                    c[i] = result.data.schedules[i].title;
                    t[i] = moment.duration(moment(result.data.schedules[i].finished_at).diff(moment(result.data.schedules[i].started_at))).asMinutes();
                    text = text.concat(result.data.schedules[i].context);
                }
                setCategory(c);
                setTime(t);
                setHumi((data.sum_humidity/data.schedules.length).toFixed(2));
                setIllumi((data.sum_illuminance/data.schedules.length).toFixed(2));
                setNoise((data.sum_noise/data.schedules.length).toFixed(2));
                setTemp((data.sum_temperature/data.schedules.length).toFixed(2));
                setRate(data.sum_point/20);
                setContext(text); 
            }catch(e){
                alert('일정이 없습니다.');
                setCategory([]);
                setTime([]);
                setRate(0);
                setHumi(0);
                setIllumi(0);
                setNoise(0);
                setTemp(0);
                setContext('');
            }
        }
        getMonthlySchedule();
        return () => {
          completed = true;
        };
      }, [date]);

    return(
        <Wrapper>
            {/* header */}
            <div style={{margin:'15px'}}>
                <Grid container direction="row" justifyContent="space-around">
                    <div>
                        <Calendar calendarType="US" onChange={setDate} value={date}/>
                    </div>
                    <div>
                        <Chart options={graph.options} series={graph.series} type="bar" width='500'/>
                    </div>
                    <div>
                        <Grid container direction="column">
                            <div style={{ color:'#ffffff', borderRadius:45, width:'130px',background:'#A3CCA3', height:'45px'}}>
                                <div style={{marginTop:'10px', fontWeight:'bold', textAlign:'center' }}>
                                    평가 내용
                                </div>
                            </div>
                            <div style={{border:'1px solid #A3CCA3', width:'400px', height:'200px', textAlign:'center', 
                                paddingTop:'5px', margin : '10px', borderRadius:45, color:'black', justifyContent: 'center'}}>
                                <div style={{marginTop:'15px'}}>
                                    {context}
                                </div>
                            </div>
                            <div style={{ color:'#ffffff', borderRadius:45, width:'130px',background:'#A3CCA3', height:'45px', marginTop:'10px'}}>
                                <div style={{marginTop:'10px', fontWeight:'bold', textAlign:'center' }}>
                                    평균 평점
                                </div>
                            </div>
                            <Grid style={{width:'380px', marginLeft:'15px'}}>
                                <Box component="fieldset" mb={3} borderColor="transparent" style={{marginLeft:'-15px'}}>
                                    <StyledRating name="simple-controlled"
                                        value={rate}
                                        readOnly style={{marginTop:'12px'}} />
                                </Box>
                            </Grid>
                            <div style={{ color:'#ffffff', borderRadius:45, width:'130px',background:'#A3CCA3', height:'45px'}}>
                                <div style={{marginTop:'10px', fontWeight:'bold', textAlign:'center' }}>
                                    평균 환경
                                </div>
                            </div>
                            <Grid style={{width:'500px', marginLeft:'10px', marginTop:'20px', align:'center', display: 'flex'}}>
                                <WbIncandescentIcon style={{color:'#A3CCA3'}}/> 
                                <div style={{marginLeft:'20px'}} >
                                    {illumi}
                                </div>
                                <MicIcon style={{color:'#A3CCA3' , marginLeft:'30px'}}/> 
                                <div style={{marginLeft:'20px'}}>
                                    {noise}
                                </div>                                    
                                <OpacityIcon style={{color:'#A3CCA3' , marginLeft:'30px', marginTop:'-2px'}}/> 
                                <div style={{marginLeft:'20px'}}>
                                    {humi}
                                </div>
                                <Thermometer style={{color:'#A3CCA3' , marginLeft:'30px'}} />
                                <div style={{marginLeft:'20px'}}>
                                    {temp}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </div>            
        </Wrapper>
    );
};

export default Daily;