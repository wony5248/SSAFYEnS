import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Evalutaion from '../../components/calendar/evaluation';
import {Grid} from '@material-ui/core';

const DailyEvaluate = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <Evalutaion />
            </Grid>
            <Footer />
        </div>
    );
};

export default DailyEvaluate;