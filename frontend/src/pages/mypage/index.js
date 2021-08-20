import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Userinfo from '../../components/userinfo';
import {Grid} from '@material-ui/core';

const MyPage = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid>
                <Userinfo/>
            </Grid>
            <Footer />
        </div>
    );
};

export default MyPage;