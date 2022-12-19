import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../svg/logo.svg';

import Navbar from './Navbar';

function Header(props) {
    return (
        <header>
            {props.isAuthenticated ? (
                <div
                    style={{
                        height: '4rem',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <div style={{ marginLeft: '10%', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <NavLink to='/'>
                            <img src={logo} alt='logo' style={{ height: '2.5rem' }} />
                        </NavLink>
                    </div>
                    <Navbar />
                </div>
            ) : (
                <div style={{ height: '4rem', display: 'flex', alignItems: 'center', marginLeft: '10%' }}>
                    <img src={logo} alt='logo' style={{ height: '2.5rem' }} />
                </div>
            )}
        </header>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, null)(Header);
