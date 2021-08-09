import React, {useState} from 'react';
import {Button, TextField, Grid} from '@material-ui/core';
import Wrapper from './styles';

const CheckPassword = (props) =>{
    const {id} = props;
    const [password, setPassword] = useState('');
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    };

    const check = ()=>{
        // 비밀번호 맞는지 확인 후 보내주기
        console.log("check!");
        window.location.replace (`/modifyuserinfo/${id}`);
    }
    return(
        <Wrapper>
            <form >
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
                <Grid container justifyContent= 'center' style={{marginTop:'50px'}}>
                    <Button size = "large" style={{width:'120px', height:'60px', fontSize:20, marginTop:'5px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                    onClick={check}>확인</Button>
                </Grid>
            </form>
            
        </Wrapper>
    );
};

export default CheckPassword;