import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import SignUp from '../../components/signup';
import {Grid} from '@material-ui/core';

const Signup = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid>
                <SignUp/>
            </Grid>
            <Footer />
        </div>
    );
};

export default Signup;