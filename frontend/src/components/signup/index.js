import React, {useState} from 'react';
import {Grid, Button, TextField} from '@material-ui/core';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
import {userAPI} from '../../utils/axios';

const SignUp = () =>{
    let history = useHistory();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [check_password, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [check, setCheck] = useState('');
    const [checkemail, setCheckEmail] = useState('');
    const [checkid, setCheckId] = useState('');
    const [checknumber, setCheckNumber] = useState('');

    const [idLabel, setIdLabel] = useState(false);
    const [emailLabel, setEmailLabel] = useState(false);
    const [numberLabel, setNumberLabel] = useState(false);

    const handleId = (event) =>{
        setId(event.target.value);
    };

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

    const handleEmail = (event) =>{
        setEmail(event.target.value);
    };

    const handleNumber = (event) =>{
        setNumber(event.target.value);
    };

    const handleIdLabel = async () => {
        try {
            const result = await userAPI.checkUserId(id);
            console.log(result)
            setIdLabel(true);
            setCheckId('사용 가능한 아이디입니다.');
        } catch (error) {
            setCheckId('ID가 이미 존재합니다.');
        }
    };

    const handleNumberLabel = async () => {
        try{    
            const result = await userAPI.checkUserPhone(number);
            setNumberLabel(true);
            setCheckNumber('사용 가능한 전화번호입니다.');
        }catch (error){
            setCheckNumber('전화번호가 이미 존재합니다.');
        }
    };

    const handleEmailLabel = async () => {
        try{ 
            const result = await userAPI.checkUserEmail(email);
            setEmailLabel(true);
            setCheckEmail('사용 가능한 email입니다.');
        }catch (error){
            setCheckEmail('email이 이미 존재합니다.');
        }
    };

    const addUserSignUp = async () => {
        if (idLabel==='false' || emailLabel==='false' || numberLabel==='false' ){
            alert('중복확인을 해주세요.');
        }
        else{
            try{
                const result = await userAPI.addUser(id, name, email, number, password);
                alert("회원가입을 축하합니다!");
                history.push('/');
            }catch(error){
                alert("회원가입에 실패했습니다.");
            }
        }
    };

    return (
        <Wrapper>
            <Grid container justifyContent= 'center' direction='column' alignItems = "center">
                <Grid justifyContent='space-around'>
                    <Grid container justifyContent= 'center' style={{justifyContent:'center', alignItems:'center'}}>
                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                        paddingTop:'5px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                            <div style={{fontSize:30}}>회원 가입</div>
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
                                            {idLabel?(
                                                <TextField disabled type='text' label="" variant="outlined" id="outlined-basic" 
                                                    value = {id} onChange={handleId} style={{width:'300px'}}/>
                                                ):(
                                                    <TextField type='text' label="" variant="outlined" id="outlined-basic" 
                                                    value = {id} onChange={handleId} style={{width:'300px'}}/>
                                            )}
                                        </div>
                                        <div style={{marginLeft:'20px', marginTop:'10px'}}>
                                            <Button style={{height:'50px'}} onClick={handleIdLabel}>중복 확인</Button>
                                        </div>
                                    </Grid>
                                    <Grid style={{marginTop:'15px', marginLeft:'290px'}}>
                                        {checkid}
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
                                            {emailLabel?(
                                            <TextField disabled type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {email} onChange={handleEmail} style={{width:'300px'}}/>
                                            ):(
                                                <TextField type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {email} onChange={handleEmail} style={{width:'300px'}}/>
                                            )}
                                        </div>
                                        <div style={{marginLeft:'20px', marginTop:'10px'}}>
                                            <Button style={{height:'50px'}} onClick={handleEmailLabel}>중복 확인</Button>
                                        </div>
                                    </Grid>
                                    <Grid style={{marginTop:'15px', marginLeft:'290px'}}>
                                        {checkemail}
                                    </Grid>
                                    {/* phone */}
                                    <Grid container direction="row" style={{marginTop:'15px'}}>
                                        <div style={{background:'#A3CCA3', width:'200px', height:'50px', textAlign:'center', 
                                        paddingTop:'5px', marginTop : '10px', borderRadius:45, color:'#ffffff', fontWeight:'bold'}}>
                                            <div style={{fontSize:30}}>전화번호</div>
                                        </div>
                                        <div style={{marginLeft:'50px', marginTop:'10px'}}>
                                            {numberLabel?(
                                                <TextField disabled type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {number} onChange={handleNumber} style={{width:'300px'}}/>
                                            ):(
                                                <TextField type="text" label="" variant="outlined" id="outlined-basic" 
                                                    value = {number} onChange={handleNumber} style={{width:'300px'}}/>
                                            )}
                                        </div>
                                        <div style={{marginLeft:'20px', marginTop:'10px'}}>
                                            <Button style={{height:'50px'}} onClick={handleNumberLabel}>중복 확인</Button>
                                        </div>
                                    </Grid>
                                    <Grid style={{marginTop:'15px', marginLeft:'290px'}}>
                                        {checknumber}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent= 'center' style={{marginTop:'50px'}}>
                                <Button size = "large" style={{width:'120px', height:'60px', fontSize:20, marginTop:'5px', background:'#A3CCA3', fontWeight:'bold', color:'#ffffff'}}
                                onClick={addUserSignUp}>등록하기</Button>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default SignUp;