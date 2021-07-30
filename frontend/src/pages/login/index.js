import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Login from '../../components/login';
import {Grid} from '@material-ui/core';

const LogIn = props => {
    return(
        <div style={{height: '100%'}}>
            <Header />
            <Grid style={{minHeight:'100%'}}>
                <Login/>
            </Grid>
            <Footer />
        </div>
    );
};

export default LogIn;