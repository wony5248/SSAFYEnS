import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import PlanList from '../../components/calendar/planlist';
import {Grid} from '@material-ui/core';

const Plan = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style={{minHeight:'100%'}}>
                <PlanList/>
            </Grid>
            <Footer />
        </div>
    );
};

export default Plan;