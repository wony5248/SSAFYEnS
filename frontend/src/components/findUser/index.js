import React, {useState} from 'react';
import {Grid, Button, TextField} from '@material-ui/core';
import Wrapper from './styles';

const FindUser = () =>{
    const [id, setId] = useState('');
    const [name1, setName1] = useState('');
    const [email1, setEmail1] = useState('');
    const [name2, setName2] = useState('');
    const [email2, setEmail2] = useState('');

    const handleId = (event) =>{
        setId(event.target.value);
    };

    const handleName1 = (event) =>{
        setName1(event.target.value);
    };

    const handleEmail1 = (event)=> {
        setEmail1(event.target.value);
    };

    const handleName2 = (event) =>{
        setName2(event.target.value);
    };

    const handleEmail2 = (event)=> {
        setEmail2(event.target.value);
    };

    const checkId = () =>{
        alert(`${name1}님의 ID는 abcd 입니다.`);
    };


    return(
        <Wrapper>
            <Grid container direction = 'row' justifyContent="center">
                {/* id 찾기 */}
                <div>
                    <Grid container justifyContent= 'center' direction='column' alignItems = "center">
                        <Grid container justifyContent='space-around' style={{width:'20%'}}>
                            <Grid item >
                                <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                paddingTop:'5px', marginTop : '50px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                    <div style={{fontSize:30}}>ID 찾기</div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid style={{marginTop:'60px', marginLeft:'-50px'}}>
                            <form>
                                <Grid container justifyContent= 'center' alignItems = "center" direction="row">
                                    <Grid>
                                        {/* name */}
                                        <Grid container direction="row" >
                                            <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                            paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                                <div style={{fontSize:30}}>이름</div>
                                            </div>
                                            <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                                <TextField type="text" label="" variant="outlined" id="outlined-password-input" 
                                                        value = {name1} onChange={handleName1} style={{width:'300px'}} />
                                            </div>
                                        </Grid>
                                        {/* Email */}
                                        <Grid container direction="row" style={{marginTop:'30px'}}>
                                            <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                            paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                                <div style={{fontSize:30}}>이메일</div>
                                            </div>
                                            <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                                <TextField type="text" label="" variant="outlined" id="outlined-basic" 
                                                        value = {email1} onChange={handleEmail1} style={{width:'300px'}}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent= 'center' style={{marginTop:'50px'}}>
                                    <Button size = "large" style={{width:'120px', height:'60px', fontSize:20, marginTop:'5px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                                    onClick={checkId}>ID 찾기</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </div>
                <div style={{marginRight:'80px', marginTop:'40px', marginLeft:'30px', height:"100%"}}>
                    <Grid container justifyContent= 'center'>
                        <div style={{width:'1px', height:'500px', background:'#A3CCA3'}}></div>
                    </Grid>
                </div>
                {/* passwd 찾기 */}
                <div>   
                    <Grid container justifyContent= 'center' direction='column' alignItems = "center">
                        <Grid container justifyContent='space-around' style={{width:'20%'}}>
                            <Grid item >
                                <div style={{background:'#A3CCA3', width:'250px', height:'50px', textAlign:'center', 
                                paddingTop:'5px', marginTop : '50px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                    <div style={{fontSize:30}}>PASSWORD 찾기</div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid style={{marginTop:'60px', marginLeft:'-50px'}}>
                            <form>
                                <Grid container justifyContent= 'center' alignItems = "center" direction="row">
                                    <Grid>
                                        {/* id */}
                                        <Grid container direction="row" >
                                            <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                            paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                                <div style={{fontSize:30}}>ID</div>
                                            </div>
                                            <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                                <TextField type="text" label="" variant="outlined" id="outlined-password-input" 
                                                        value = {id} onChange={handleId} style={{width:'300px'}} />
                                            </div>
                                        </Grid>
                                        {/* name */}
                                        <Grid container direction="row" style={{marginTop:'30px'}}>
                                            <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                            paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                                <div style={{fontSize:30}}>이름</div>
                                            </div>
                                            <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                                <TextField type="text" label="" variant="outlined" id="outlined-password-input" 
                                                        value = {name2} onChange={handleName2} style={{width:'300px'}} />
                                            </div>
                                        </Grid>
                                        {/* Email */}
                                        <Grid container direction="row" style={{marginTop:'30px'}}>
                                            <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                            paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                                <div style={{fontSize:30}}>이메일</div>
                                            </div>
                                            <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                                <TextField type="text" label="" variant="outlined" id="outlined-basic" 
                                                        value = {email2} onChange={handleEmail2} style={{width:'300px'}}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent= 'center' style={{marginTop:'50px'}}>
                                    <Button size = "large" style={{width:'200px', height:'60px', fontSize:20, marginTop:'5px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                                    >PASSWORD 찾기</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Wrapper>
    );
};

export default FindUser;