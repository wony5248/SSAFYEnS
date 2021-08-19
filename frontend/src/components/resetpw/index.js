import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import {Button, TextField, Grid} from '@material-ui/core';
import Wrapper from './styles';
import {userAPI} from '../../utils/axios';

const ResetPW = () =>{
    const location = useLocation();
    const clicked = false;
    const id = location.pathname.split("/")[2];
    const [password, setPassword] = useState('');
    const [check_password, setCheckPassword] = useState('');
    const [check, setCheck] = useState('');
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    };

    const reset = async ()=>{
        // 비밀번호 맞는지 확인 후 보내주기
        if(password.length<8){
            alert(`비밀번호는 8자 이상으로 설정해주세요.`);
        }else if(password!==check_password){
            alert('두 비밀번호가 일치하지 않습니다.');
        }else{
            await userAPI.resetPw(id, password);
            alert(`비밀번호가 변경되었습니다.
            다시 로그인해주세요!`);
            window.location.replace (`/login`);
        }
        
    }
    const handleCheckPassword = (event) =>{
        setCheckPassword(event.target.value);

        if (password === event.target.value){
            setCheck("비밀번호가 일치합니다.");
        }else{
            setCheck("비밀번호가 일치하지 않습니다.");
        }
    };
    return(
        <Wrapper>
            
            <form >
                <Grid container justifyContent= 'center' style={{marginBottom:'30px'}}>
                    <div style={{background:'#A3CCA3', width:'300px', height:'50px', textAlign:'center', 
                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            <div style={{fontSize:30}}>비밀번호 재설정</div>
                    </div>
                </Grid>
                <Grid container direction="row">
                    <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            <div style={{fontSize:28}}>비밀번호</div>
                    </div>
                    <div style={{marginLeft:'50px', marginTop:'10px'}}>
                        <TextField type="Password" label="" variant="outlined" id="outlined-password-input" 
                                value = {password} onChange={handlePassword} style={{width:'300px'}} />
                    </div>
                </Grid>
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
                <Grid container justifyContent= 'center' style={{marginTop:'50px'}}>
                    <Button size = "large" style={{width:'120px', height:'60px', fontSize:20, marginTop:'5px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                    onClick={clicked?null:reset}>확인</Button>
                </Grid>
            </form>
            
        </Wrapper>
    );
};

export default ResetPW;