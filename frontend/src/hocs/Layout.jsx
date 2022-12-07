import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { checkAuthenticated } from '../actions/auth';

import Header from '../containers/index/Header';
import Navbar from '../containers/index/Navbar';

function Layout(props) {
    useEffect(() => {
        props.checkAuthenticated();
    }, []);

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header />
            <div style={{width: '100%', height: '100%', paddingTop: '4rem'}}>
                {props.children}
            </div>
        </div>
    );
}

export default connect(null, { checkAuthenticated })(Layout);
