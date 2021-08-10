import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import ModifyInfo from '../../components/modifyMyinfo';
import {Grid} from '@material-ui/core';

const ModifyUserInfo = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <Grid>
                <ModifyInfo/>
            </Grid>
            <Footer />
        </div>
    );
};

export default ModifyUserInfo;