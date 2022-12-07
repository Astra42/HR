import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import profile from '../svg/profile.svg';
import resumes from '../svg/resumes.svg';
import vacancies from '../svg/vacancies.svg';

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
                    <div style={{ flex: '1' }} />
                    <div style={{ marginRight: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <NavLink to='/profile'>
                            <img
                                src={profile}
                                alt='profile'
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    filter: 'invert(22%) sepia(9%) saturate(1455%) hue-rotate(186deg) brightness(97%) contrast(89%)',
                                }}
                            />
                        </NavLink>
                    </div>
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
