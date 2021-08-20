import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import CheckPassword from '../../components/checkpw';
import {Grid} from '@material-ui/core';

const CheckPw = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <CheckPassword />
            </Grid>
            <Footer />
        </div>
    );
};

export default CheckPw;