import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link, NavLink } from 'react-router-dom';

import { loadUser, logout } from '../actions/auth';

function Profile(props) {
    useEffect(() => {
        props.loadUser();
    }, []);

    if (!props.isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (props.profile === null) {
        return <></>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div className='card' style={{ display: 'flex', flexDirection: 'column', padding: '1rem', borderRadius: '1rem' }}>
                <div>Фамилия: {props.profile.last_name}</div>
                <div>Имя: {props.profile.first_name}</div>
                <div>Логин: {props.profile.username}</div>
                <div>Email: {props.profile.email}</div>
                <button className='btn btn-danger mt-2' onClick={props.logout}>
                    Выйти
                </button>
                <NavLink className='btn btn-success mt-2' to='/resumes/add' >
                    Добавить резюме
                </NavLink>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, { loadUser, logout })(Profile);
