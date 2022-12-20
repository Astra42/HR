import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { loadUser, logout } from '../../actions/auth';

function Profile(props) {
    useEffect(() => {
        props.loadUser();
    }, []);

    if (props.profile === null) {
        return <></>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <div
                    className='card'
                    style={{ display: 'flex', flexDirection: 'column', padding: '1rem', borderRadius: '1rem' }}
                >
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Фамилия:</span> {props.profile.last_name}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Имя:</span> {props.profile.first_name}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Логин:</span> {props.profile.username}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Почта:</span> {props.profile.email}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Дата рождения:</span> {props.profile.birth_date}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Страна:</span> {props.profile.country}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Департамент:</span> {props.profile?.departments?.title || 'Не определен'}
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Глава департамента:</span> {props.profile.is_head ? 'Да' : 'Нет'}
                    </div>
                </div>
                <div
                    className='card'
                    style={{ display: 'flex', flexDirection: 'column', padding: '1rem', borderRadius: '1rem' }}
                >
                    <NavLink className='btn btn-info mt-2' to='/profile/edit'>
                        Редактировать профиль
                    </NavLink>
                    <NavLink className='btn btn-warning mt-2' to='/profile/edit-resume'>
                        Редактировать резюме
                    </NavLink>
                    {props.profile.is_head ? (<NavLink className='btn btn-success mt-2' to='/vacancies/add'>
                        Добавить вакансию
                    </NavLink>) : null}
                    <button className='btn btn-danger mt-2' onClick={props.logout}>
                        Выйти
                    </button>
                </div>
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
