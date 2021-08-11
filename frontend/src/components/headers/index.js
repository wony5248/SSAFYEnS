import React, {useState, useEffect} from 'react';
import {AppBar, Typography, Toolbar, Button, Grid, IconButton, Divider, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import GroupIcon from '@material-ui/icons/Group';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Wrapper from './styles';
import logo from '../../images/logo2.png';
import PersonIcon from '@material-ui/icons/Person';
import CasinoIcon from '@material-ui/icons/Casino';
import {userAPI} from '../../utils/axios';


const Header = props=>{
    const [select, setSelect] = useState(false);
    const [open, setOpen] = useState(false);
    
    const handleDrawerOpen = () =>{  
        setOpen(true);
    };

    const handleDrawerClose = () =>{ 
        setOpen(false);
    };

    const [islogin, setLogin] = useState(false);

    const handleChange = async()=> {
        if (islogin){
            try{
                await userAPI.logout();
                setLogin(false);
                window.sessionStorage.clear();
                alert('정상적으로 로그아웃되었습니다.');
            }catch(error){
                // logout 실패
                console.log('로그아웃 실패');
            }
            
        }
    }
    

    useEffect(()=>{
        if(window.sessionStorage.getItem("id")===undefined || window.sessionStorage.getItem("id")===null){
            setLogin(false);
        }else{
            setLogin(true);
        }
        
    }, [])
  

    return(
        <Wrapper >
            <AppBar style={{background:'#ffffff', color:'#A3CCA3', height:"auto"}}>
                <Grid container justifyContent='space-between' direction = "row" alignItems = "center">     
                    <Grid>
                        <Toolbar>
                            <IconButton onClick = {handleDrawerOpen}>
                                <MenuIcon fontSize = "large" style={{color:'#A3CCA3'}} />
                            </IconButton>
                        </Toolbar>
                    </Grid>
                    <Grid >
                        <Typography variant = "h3" onClick={() => window.location.replace (`/`)}>
                            <img src={logo} style={{width:'250px', height:'80px', marginTop:'3px'}}/>
                        </Typography>
                    </Grid>
                    <Grid style ={{justifyContent:'space-between'}}>
                        {islogin?(
                            <div>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}} onClick={() => window.location.replace (`/mypage`)}>
                                    {window.sessionStorage.getItem('username')}님 환영합니다
                                </Button>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}} 
                                onClick={()=>select?null:handleChange()}
                                >로그아웃</Button>
                            </div>
                        ):(
                            <div>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}}
                                onClick={() => window.location.replace (`/signup`)}>회원가입</Button>
                                <Button size = "large" style={{color:'#A3CCA3', fontWeight:'bold'}}
                            onClick={() => window.location.replace (`/login`)}>로그인</Button>
                            </div>
                        )}
                    </Grid>
                </Grid>           
            </AppBar>
            <Drawer anchor = "left" open = {open}>
                <div>
                    <IconButton onClick = {handleDrawerClose} edge = 'end' >
                        <ArrowLeftIcon fontSize = "large" style={{color:'#A3CCA3'}} />
                    </IconButton>
                </div>
                <Divider/>
                {islogin?(
                    <div>
                        <List style = {{width : "250px"}}>
                            <ListItem button onClick={() => window.location.replace (`/plan`)}>
                                    <CalendarTodayIcon fontSize = "large" style={{color:'#A3CCA3', margin:'10px'}} />
                                    <ListItemText primary="일정" style={{color:'#A3CCA3', margin:'10px', fontWeight:'bold'}}/>
                            </ListItem>
                            <ListItem button onClick={() => window.location.replace (`/group`)}>
                                    <GroupIcon fontSize = "large" style={{color:'#A3CCA3', margin:'10px'}} />
                                    <ListItemText primary="그룹" style={{color:'#A3CCA3', margin:'10px', fontWeight:'bold'}}/>
                            </ListItem>
                            <ListItem button onClick={() => window.location.replace (`/group`)}>
                                    <CasinoIcon fontSize = "large" style={{color:'#A3CCA3', margin:'10px'}} />
                                    <ListItemText primary="챌린지" style={{color:'#A3CCA3', margin:'10px', fontWeight:'bold'}}/>
                            </ListItem>
                            <ListItem button onClick={() => window.location.replace (`/mypage`)}>
                                    <PersonIcon fontSize = "large" style={{color:'#A3CCA3', margin:'10px'}} />
                                    <ListItemText primary="내 정보" style={{color:'#A3CCA3', margin:'10px', fontWeight:'bold'}}/>
                            </ListItem>
                        </List>
                    </div>
                ):null}
            </Drawer>
        </Wrapper>
    );
};

export default Header;