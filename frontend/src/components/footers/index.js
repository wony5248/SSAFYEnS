import React from 'react';
import {Grid} from '@material-ui/core';
import Wrapper from './styles';

const Footer = () => {
    return (
        <Wrapper>
            {/* <Grid container justify = "space-around" >
                <Grid item style={{marginRight:'150px'}}>
                    <h3>SSAFY Improve n Success</h3>
                    <h4>김송현 김지환 신은지 이태용 장범진 허애리</h4>
                </Grid>
                <Grid item style = {{marginLeft:'150px'}}>
                    <h2>Contact us</h2>
                    <Grid container justify = "space-around" alignItems="center">
                        <Grid item >
                            <h4>embedded</h4>
                            <p>Ssej0221@gmail.com</p>
                            <h4>embedded web & server</h4>
                            <p>wony5248@gmail.com</p>
                        </Grid>
                        <Grid item style = {{marginLeft:'25px'}}>
                            <h4>server and service</h4>
                            <p>tyl1996@gmail.com / bure5kzam@gmail.com</p>
                            <h4>web page</h4>
                            <p>heoeari51@gmail.com / wony5248@gmail.com</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
            <Grid container justify = "space-around" alignItems = "center">
                <Grid item style={{ marginBottom:'10px', marginTop:'10px', fontWeight:'bold'}}>
                    SSAFY 5th | SSAFY Improve n Success | 김송현 김지환 신은지 이태용 장범진 허애리
                </Grid>
                <Grid item style={{ marginBottom:'10px', marginTop:'10px', fontWeight:'bold'}}>
                    Copyright &copy; 2021 SSAFYInS. All rights reserved. | Design by SSAFYInS.
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default Footer;