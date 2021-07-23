import React from 'react';
import Header from '../../components/headers';
import Footer from '../../components/footers';
import Calendar from '../../components/calendar';

const Plan = props => {
    return(
        <div>
            <Header />
            <div>
                <Calendar/>
            </div>
            <Footer />
        </div>
    );
};

export default Plan;