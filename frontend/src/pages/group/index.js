import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Groupcom from '../../components/group';
import {Grid} from '@material-ui/core';

const Group = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <Groupcom />
            </Grid>
            <Footer />
        </div>
    );
};

export default Group;