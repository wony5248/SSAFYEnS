import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Mainimg from '../../images/evolution-3885331_1920.jpg'
const Main = props => {
    return(
        <div style={{height: '100%', display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Header />
            <img src={Mainimg} alt="main" width="100%"></img>
            <Footer />
        </div>
    );
};

export default Main;