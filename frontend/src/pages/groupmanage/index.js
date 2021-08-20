import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Groupcom from '../../components/groupmanage';
import {Grid} from '@material-ui/core';

const Groupmanage = ({match}) => {
    const {id} = match.params;
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <Groupcom id = {id}/>
            </Grid>
            <Footer />
        </div>
    );
};

export default Groupmanage;