import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import ResetPW from '../../components/resetpw';
import {Grid} from '@material-ui/core';

const ResetPassword = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <ResetPW />
            </Grid>
            <Footer />
        </div>
    );
};

export default ResetPassword;