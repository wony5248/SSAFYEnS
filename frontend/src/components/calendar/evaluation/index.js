import React, {useState} from 'react';
import Wrapper from './styles';
import {Grid, IconButton, Button, Box, withStyles, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import MicIcon from '@material-ui/icons/Mic';
import OpacityIcon from '@material-ui/icons/Opacity';
import {Thermometer} from 'react-feather';

const Evalutaion = () => {
    const [rating, setRating] = useState(0);
    const StyledRating = withStyles({
        iconFilled: {
            color: '#A3CCA3',
        },
      })(Rating);

    const [getMoment, setMoment] = useState(moment());
    const [context, setContext] = useState('');
    let today = getMoment;

    const handleContext = (event) => {
        setContext(event.target.value);
    };

    return (
        <Wrapper>
            {/* header */}
            <Grid container justifyContent= 'center' >
                <Grid container justifyContent='space-around' style={{width:'30%'}}>
                    <Grid item >
                        <div style={{background:'#A3CCA3', width:'150px', height:'40px', textAlign:'center', fontSize:25,
                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            {today.format('MM월 DD일')}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            {/* body */}
            <Grid container justifyContent= 'center' style={{marginTop: '30px'}}>
                <div style={{border:'1px solid #A3CCA3', width:'50%'}}>
                    <form>
                        <div style={{display: 'flex'}}>
                            <div style={{background:'#A3CCA3', width:'200px', height:'40px', textAlign:'center', fontSize:25, 
                                paddingTop:'5px', margin : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                하루 평가
                            </div>
                            <div style={{border:'1px solid #A3CCA3', width:'700px', height:'500px', textAlign:'center', 
                                paddingTop:'5px', margin : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold', 
                                justifyContent: 'center'}}>
                                <TextField type="text" placeholder="하루에 대한 평가 내용을 적어주세요" id="standard-basic" style={{width: '80%'}}
                                    value = {context} onChange={handleContext} />
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{background:'#A3CCA3', width:'200px', height:'40px', textAlign:'center', fontSize:25, 
                                paddingTop:'5px', margin : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                평균 평점
                            </div>
                            <Grid style={{width:'380px', marginLeft:'15px'}}>
                                <Box component="fieldset" mb={3} borderColor="transparent" style={{marginLeft:'-15px'}}>
                                    <StyledRating name="simple-controlled"
                                        value={rating}
                                        readOnly style={{marginTop:'12px'}} />
                                </Box>
                            </Grid>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{background:'#A3CCA3', width:'200px', height:'40px', textAlign:'center', fontSize:25, 
                                paddingTop:'5px', margin : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                평균 환경
                            </div>
                            <Grid style={{width:'400px', marginLeft:'10px', marginTop:'20px', align:'center', display: 'flex'}}>
                                <WbIncandescentIcon style={{color:'#A3CCA3'}}/> 
                                <div style={{marginLeft:'20px'}}>
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
                        </div>
                        <Grid container justifyContent="center" alignItems="center" style={{marginTop:'30px', marginBottom:'30px'}}>
                            <Button size='large' type = "submit" variant = "contained" style={{background:'#A3CCA3', color:'#FFFFFF', fontSize:20}} >제출하기</Button>
                        </Grid>
                    </form>
                </div>
                
            </Grid>
        </Wrapper>
    );

};

export default Evalutaion;