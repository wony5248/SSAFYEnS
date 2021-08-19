import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
// import Mainimg from '../../images/evolution-3885331_1920.jpg'
import {Grid} from '@material-ui/core';

import MainSession from '../../components/main';

const Main = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header  />
            <Grid>
                <MainSession/>
            </Grid>
            
            <Footer />
        </div>
    );
};


export default Main;