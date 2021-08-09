import React, {useState} from 'react';
import {Grid,  Box, withStyles } from '@material-ui/core';
import Wrapper from './styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Chart from "react-apexcharts";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import MicIcon from '@material-ui/icons/Mic';
import OpacityIcon from '@material-ui/icons/Opacity';
import {Thermometer} from 'react-feather';
import Rating from '@material-ui/lab/Rating';

const Daily = () =>{
    const [rating, setRating] = useState(0);
    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);
    const [date, setDate] = useState(new Date());

    const graph = {
        options:{
            chart:{
                // chart 형태
                id:'basic-bar'
            },
            // x축
            xaxis:{
                categories:['일', '월', '화', '수', '목', '금', '토']
            }
        },
        series:[
            {   
                // y축
                name:'score',
                data:[1, 4, 5, 3, 2, 1, 5]
            }
        ]
    };

    const context = "test";

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
                                    일정수정
                                </div>
                            </div>
                            <div style={{border:'1px solid #A3CCA3', width:'400px', height:'200px', textAlign:'center', 
                                paddingTop:'5px', margin : '10px', borderRadius:45, color:'black', justifyContent: 'center'}}>
                                {context}
                            </div>
                            <div style={{ color:'#ffffff', borderRadius:45, width:'130px',background:'#A3CCA3', height:'45px'}}>
                                <div style={{marginTop:'10px', fontWeight:'bold', textAlign:'center' }}>
                                    평균 평점
                                </div>
                            </div>
                            <Grid style={{width:'380px', marginLeft:'15px'}}>
                                <Box component="fieldset" mb={3} borderColor="transparent" style={{marginLeft:'-15px'}}>
                                    <StyledRating name="simple-controlled"
                                        value={rating}
                                        readOnly style={{marginTop:'12px'}} />
                                </Box>
                            </Grid>
                            <div style={{ color:'#ffffff', borderRadius:45, width:'130px',background:'#A3CCA3', height:'45px'}}>
                                <div style={{marginTop:'10px', fontWeight:'bold', textAlign:'center' }}>
                                    평균 환경
                                </div>
                            </div>
                            <Grid style={{width:'400px', marginLeft:'10px', marginTop:'20px', align:'center', display: 'flex'}}>
                                <WbIncandescentIcon style={{color:'#A3CCA3'}}/> 
                                <div style={{marginLeft:'20px'}} onClick={()=>{alert(typeof startMonth)}}>
                                    밝기
                                </div>
                                <MicIcon style={{color:'#A3CCA3' , marginLeft:'30px'}}/> 
                                <div style={{marginLeft:'20px'}}>
                                    소음
                                </div>                                    
                                <OpacityIcon style={{color:'#A3CCA3' , marginLeft:'30px', marginTop:'-2px'}}/> 
                                <div style={{marginLeft:'20px'}}>
                                    습도
                                </div>
                                <Thermometer style={{color:'#A3CCA3' , marginLeft:'30px'}} />
                                <div style={{marginLeft:'20px'}}>
                                    온도
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