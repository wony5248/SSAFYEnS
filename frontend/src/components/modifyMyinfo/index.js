import React, {useState} from 'react';
import {Grid, Button, TextField} from '@material-ui/core';
import Wrapper from './styles';
// import {userAPI} from '../../utils/axios';

const ModifyInfo = () =>{
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check_password, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [check, setCheck] = useState('');
    const [number, setNumber] = useState('');


    const handlePassword = (event) =>{
        setPassword(event.target.value);
    };

    const handleCheckPassword = (event) =>{
        setCheckPassword(event.target.value);

        if (password === event.target.value){
            setCheck("비밀번호가 일치합니다.");
        }else{
            setCheck("비밀번호가 일치하지 않습니다.");
        }
    };

    const handleName = (event) =>{
        setName(event.target.value);
    };

    const modifyUser = async () => {
        try{
            // const result = await userAPI.addUser(id, name, email, number, password);
            // alert("회원가입을 축하합니다!");
            // history.push('/');
            alert('test');
        }catch(error){
            alert("정보 수정에 실패했습니다.");
        }
    };

    return (
        <Wrapper>
            <Grid container justifyContent= 'center' direction='column' alignItems = "center">
                <Grid justifyContent='space-around'>
                    <Grid container justifyContent= 'center' style={{justifyContent:'center', alignItems:'center'}}>
                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                        paddingTop:'5px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            <div style={{fontSize:30}}>정보 수정</div>
                        </div>
                    </Grid>
                    
                    {/* form */}
                    <div style={{marginTop:'40px', marginLeft:'-50px'}}>
                        <form>
                            <Grid container justifyContent= 'center' alignItems = "center" direction="row">
                                <Grid>
                                    {/* ID */}
                                    <Grid container direction="row">
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:30}}>ID</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            <TextField disabled type='text' label="" variant="outlined" id="outlined-basic" 
                                                    value = {id} style={{width:'300px'}}/>
                                        </div>
                                    </Grid>
                                    {/* passwd */}
                                    <Grid container direction="row" style={{marginTop:'15px'}}>
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:28}}>비밀번호</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            <TextField type="Password" label="" variant="outlined" id="outlined-password-input" 
                                                    value = {password} onChange={handlePassword} style={{width:'300px'}} />
                                        </div>
                                    </Grid>
                                    {/* password check */}
                                    <Grid container direction="row" style={{marginTop:'15px'}}>
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:28}}>비밀번호 확인</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            <TextField type="Password" label="" variant="outlined" id="outlined-password-input" 
                                                    value = {check_password} onChange={handleCheckPassword} style={{width:'300px'}} />
                                        </div>
                                    </Grid>
                                    <Grid style={{marginTop:'15px', marginLeft:'290px'}}>
                                        {check}
                                        {/* password 같은지 확인 */}
                                    </Grid>
                                    {/* name */}
                                    <Grid container direction="row" style={{marginTop:'15px'}}>
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:30}}>이름</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            <TextField type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {name} onChange={handleName} style={{width:'300px'}}/>
                                        </div>
                                    </Grid>
                                    {/* email */}
                                    <Grid container direction="row" style={{marginTop:'15px'}}>
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:30}}>Email</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            <TextField disabled type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {email} style={{width:'300px'}}/>
                                        </div>
                                    </Grid>
                                    {/* phone */}
                                    <Grid container direction="row" style={{marginTop:'15px'}}>
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:30}}>전화번호</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            <TextField disabled type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {number} style={{width:'300px'}}/>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent= 'center' style={{marginTop:'50px'}}>
                                <Button size = "large" style={{width:'120px', height:'60px', fontSize:20, marginTop:'5px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                                onClick={modifyUser}
                                >수정하기</Button>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default ModifyInfo;