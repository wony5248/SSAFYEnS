import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Calendar from '../../components/calendar';
import {Grid} from '@material-ui/core';

const Plan = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <Calendar/>
            </Grid>
            <Footer />
        </div>
    );
};

export default Plan;