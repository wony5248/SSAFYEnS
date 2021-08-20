import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import PlanAverage from '../../components/average';
import {Grid} from '@material-ui/core';

const Average = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid >
                <PlanAverage />
            </Grid>
            <Footer />
        </div>
    );
};

export default Average;