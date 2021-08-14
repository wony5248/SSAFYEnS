import React, {useState} from 'react';
import {Grid, Button, TextField} from '@material-ui/core';
import Wrapper from './styles';
import {userAPI} from '../../utils/axios';
import { useHistory } from 'react-router-dom';

const Login = () =>{
    let history = useHistory();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (event) =>{
        setId(event.target.value);
    };

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const login = async()=>{
        if (id===''){
            alert('ID를 입력해주세요.');
        }
        if (password===''){
            alert('비밀번호를 입력해주세요.');
        }
        if(id!=='' && password!==''){
            try{
                await userAPI.login(id, password);
                window.sessionStorage.setItem("islogin", JSON.stringify(true));
                const result = await userAPI.mypage(id);
                window.sessionStorage.setItem('id',result.data.user_id);
                window.sessionStorage.setItem("username", result.data.name);
                alert(`${window.sessionStorage.getItem("username")}님 환영합니다!`);
                history.push('/');
            }catch(e){
                alert('아이디 혹은 비밀번호를 틀리셨습니다.');
                setId('');
                setPassword('');
            }
        }
    }

    return (
        <Wrapper>
            <Grid container justifyContent= 'center' direction='column' alignItems = "center">
                <Grid container justifyContent='space-around' style={{width:'20%'}}>
                    <Grid item >
                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                        paddingTop:'5px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            <div style={{fontSize:30}}>로그인</div>
                        </div>
                    </Grid>
                </Grid>
                <Grid style={{marginTop:'80px', marginLeft:'-50px'}}>
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
                                        <TextField type="text" label="" variant="outlined" id="outlined-basic" 
                                                value = {id} onChange={handleId} style={{width:'300px'}}/>
                                    </div>
                                </Grid>
                                {/* passwd */}
                                <Grid container direction="row" style={{marginTop:'30px'}}>
                                    <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                    paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                        <div style={{fontSize:30}}>PASSWORD</div>
                                    </div>
                                    <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                        <TextField type="Password" label="" variant="outlined" id="outlined-password-input" 
                                                value = {password} onChange={handlePassword} style={{width:'300px'}} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Button size = "large" style={{width:'120px', height:'150px', fontSize:20, marginTop:'5px', marginLeft:'40px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                            onClick={login}>LOGIN</Button>
                        </Grid>
                    </form>
                    <Grid container direction="row" justifyContent="center" style={{marginTop:'30px', marginLeft:'40px'}}>
                        <Button style={{margin:'10px'}}
                        onClick={() => (window.location.replace('/signup'))}>회원가입</Button>
                        <Button style={{margin:'10px'}}
                        onClick={() => (window.location.replace('/find'))}>아이디/비밀번호 찾기</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
        
    );
};

export default Login;