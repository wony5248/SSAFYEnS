import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Groupinfo from '../../components/groupinfo';
import {Grid} from '@material-ui/core';

const GroupInfo = ({match}) => {
    const {id} = match.params;
    console.log(id)
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
            <Header />
            <Grid style ={{marginTop: "100px"}}>
                <Groupinfo id={id}/>
            </Grid>
            <Footer />
        </div>
    );
};

export default GroupInfo;