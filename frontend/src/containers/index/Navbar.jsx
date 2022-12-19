import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import resumes from '../../svg/resumes.svg';
import vacancies from '../../svg/vacancies.svg';

import profile from '../../svg/profile.svg';

function Navbar(props) {
    return (
        <nav style={{ marginLeft: '5%', display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <NavLink
                    className={data => (data.isActive ? 'nav-link-active' : 'nav-link')}
                    style={{ paddingTop: '0.2rem', marginTop: '2.2rem' }}
                    to='/vacancies'
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <img src={vacancies} alt='vacancies' style={{ height: '1.5rem' }} />
                        <span style={{ fontWeight: 'bold', marginLeft: '0.2rem' }}>Вакансии</span>
                    </div>
                </NavLink>
                {props.profile && props.profile.is_head && (
                    <NavLink
                        className={data => (data.isActive ? 'nav-link-active' : 'nav-link')}
                        style={{ paddingTop: '0.2rem', marginTop: '2.2rem' }}
                        to='/resumes'
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <img src={resumes} alt='resumes' style={{ height: '1.5rem' }} />
                            <span style={{ fontWeight: 'bold', marginLeft: '0.2rem' }}>Резюме</span>
                        </div>
                    </NavLink>
                )}
            </div>
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
        </nav>
    );
}

function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, null)(Navbar);
