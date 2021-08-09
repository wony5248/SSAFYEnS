import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import FindUser from '../../components/findUser';
import {Grid} from '@material-ui/core';

const Find = props => {
    return(
        <div style={{height: '100%'}}>
            <Header />
            <Grid style={{minHeight:'100%'}}>
                <FindUser/>
            </Grid>
            <Footer />
        </div>
    );
};

export default Find;