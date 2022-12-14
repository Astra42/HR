import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import resumes from '../../svg/resumes.svg';
import vacancies from '../../svg/vacancies.svg';

function Navbar(props) {
    return (
        <nav style={{ marginLeft: '5%' }}>
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
        </nav>
    );
}

function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, null)(Navbar);
