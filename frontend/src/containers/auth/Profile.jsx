import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { loadUser, logout } from '../../actions/auth';

import '../../css/profile.css';

function Profile(props) {
    useEffect(() => {
        props.loadUser();
    }, []);

    if (props.profile === null) {
        return <></>;
    }

    return (
        <div className='container rounded mt-5 mb-5 block-clr' style={{ width: '35rem' }}>
            <div className='row'>
                <div className='col-md-12 pt-3'>
                    <div className='d-flex flex-column align-items-center text-center p-3 pb-0'>
                        <div className='rounded-circle avatar'>
                            <img
                                width='150px'
                                src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png'
                            />
                        </div>
                        <span className='fw-bold fs-5'>{props.profile.last_name} {props.profile.first_name}</span>
                        <span className='fw-light clr-primary text-purple'>{props.profile.is_head ? 'Руководитель департамента' : 'Рядовой сотрудник'}</span>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 d-flex flex-column align-items-center text-center ps-5 pt-4'>
                    <span className='fw-light'>Почта: {props.profile.email}</span>
                    <span className='fw-light'>Основной тел.: +88005553535</span>
                    <span className='fw-light'>Запасной тел.: +88005553535</span>
                </div>
                <div className='col-md-6 d-flex flex-column align-items-center text-center pe-5 pt-4'>
                    <span className='fw-light'>Департамент: {props.profile.departments.title}</span>
                    <span className='fw-light'>Страна: {props.profile.country}</span>
                    <span className='fw-light'>Дата рождения: {props.profile.birth_date}</span>
                </div>
            </div>
            <div className='row mt-1 mb-4'>
                <div className='col-md-6 d-flex flex-column align-items-center text-center ps-5'>
                    <div className='col-auto px-5 text-center'>
                        <div className='mb-0 mt-3 text-center'>
                            <NavLink className='btn btn-success sign-in fw-600 rounded-2 ps-4 pe-4 btn-profile' type='button' to='/profile/edit'>
                                Редактировать профиль
                            </NavLink>
                        </div>
                    </div>
                    <div className='col-auto px-5 text-center'>
                        <div className='mb-0 mt-3 text-center'>
                            <NavLink className='btn btn-warning sign-in fw-600 rounded-2 ps-4 pe-4 btn-profile' type='button' to='/vacancies/department'>
                                Вакансии деп.
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 d-flex flex-column align-items-center text-center pe-5'>
                    <div className='col-auto px-5 text-center'>
                        <div className='mb-0 mt-3 text-center'>
                            <a className='btn btn-primary sign-in fw-600 rounded-2 ps-4 pe-4 btn-profile' type='button' to='/profile/edit-resume'>
                                Редактировать резюме
                            </a>
                        </div>
                    </div>
                    <div className='col-auto px-5 text-center'>
                        <div className='mb-0 mt-3 text-center'>
                            <button className='btn btn-danger sign-in fw-600 rounded-2 ps-4 pe-4 btn-profile' onClick={props.logout}>
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12 px-5 mb-3 text-center'>
                    <p className='text-justify'>{props.profile.about_me}</p>
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
