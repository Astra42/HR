import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate, Navigate, NavLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { signup } from '../../actions/auth';

import '../../css/auth.css';

function Signup(props) {
    const [responseErrors, setResponseErrors] = useState({ username: null, email: null });
    const [errorModalActive, setErrorModalActive] = useState(false);
    const [successModalActive, setSuccessModalActive] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (props.isAuthenticated) {
        return <Navigate to={from}/>;
    }

    const inputFields = {
        last_name: {
            type: 'text',
            placeholder: 'Фамилия',
            name: 'last_name',
            required: true,
        },
        first_name: {
            type: 'text',
            placeholder: 'Имя',
            name: 'first_name',
            required: true,
        },
        username: {
            type: 'text',
            placeholder: 'Логин',
            name: 'username',
            required: true,
        },
        email: {
            type: 'email',
            placeholder: 'Почта',
            name: 'email',
            required: true,
        },
        password: {
            type: 'password',
            placeholder: 'Пароль',
            name: 'password',
            required: true,
        },
        password2: {
            type: 'password',
            placeholder: 'Подтвердите',
            name: 'password2',
            required: true,
        },
    };

    function validate(values) {
        let errors = {};

        if (!values.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            errors.emailInvalid = 'Некорректный адрес почты!';
        }
        if (!values.password.match(/[0-9]/g)) {
            errors.passwordNumbers = 'Пароль должен содержать цифры!';
        }
        if (!values.password.match(/[A-Za-z]/g)) {
            errors.passwordLetters = 'Пароль должен содержать латинские буквы!';
        }
        if (values.password.length < 8) {
            errors.passwordLength = 'Длина пароля меньше 8 символов!';
        }
        if (values.password !== values.password2) {
            errors.password2Unsimilar = 'Пароли должны совпадать!';
        }

        return errors;
    }

    function validateRequired(value) {
        let error;

        if (!value) {
            error = 'Required!';
        }

        return error;
    }

    function handleSubmit(values) {
        props.signup(values).then(response => {
            const data = response?.data;

            if (data) {
                setResponseErrors({ username: data?.username, email: data?.email });
                setErrorModalActive(true);
            }
            else {
                setSuccessModalActive(true);
            }
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Регистрация</h2>
                </div>
                <Formik
                    initialValues={{
                        last_name: '',
                        first_name: '',
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validate={validate}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Field
                                    className={`form-control mt-3 ${
                                        errors.last_name && touched.last_name ? 'invalid-field' : null
                                    }`}
                                    validate={validateRequired}
                                    {...inputFields.last_name}
                                />
                                <Field
                                    className={`form-control mt-3 ${
                                        errors.first_name && touched.first_name ? 'invalid-field' : null
                                    }`}
                                    validate={validateRequired}
                                    {...inputFields.first_name}
                                />
                            </div>
                            <Field
                                className={`form-control mt-3 ${
                                    errors.username && touched.username ? 'invalid-field' : null
                                }`}
                                validate={validateRequired}
                                {...inputFields.username}
                            />
                            <Field
                                className={`form-control mt-3 ${
                                    (errors.email || errors.emailInvalid || errors.emailAlreadyUsed) && touched.email
                                        ? 'invalid-field mb-2'
                                        : 'mb-3'
                                } ${(errors.emailInvalid || errors.emailAlreadyUsed) && errors.email ? 'mb-3' : null}`}
                                validate={validateRequired}
                                {...inputFields.email}
                            />
                            {!errors.email && errors.emailInvalid && touched.email ? (
                                <div className='mt-1' style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                    {errors.emailInvalid}
                                </div>
                            ) : null}
                            {!errors.email && errors.emailAlreadyUsed && touched.email ? (
                                <div className='mt-1' style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                    {errors.emailAlreadyUsed}
                                </div>
                            ) : null}
                            <div
                                className='pb-2 mt-2'
                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                            >
                                <Field
                                    className={`form-control ${
                                        (errors.password ||
                                            errors.passwordLength ||
                                            errors.passwordLetters ||
                                            errors.passwordNumbers) &&
                                        touched.password
                                            ? 'invalid-field'
                                            : null
                                    }`}
                                    validate={validateRequired}
                                    {...inputFields.password}
                                />
                                <Field
                                    className={`form-control ${
                                        (errors.password2 || errors.password2Unsimilar) && touched.password2
                                            ? 'invalid-field'
                                            : null
                                    }`}
                                    validate={validateRequired}
                                    {...inputFields.password2}
                                />
                            </div>
                            <div>
                                {(errors.last_name && touched.last_name) ||
                                (errors.first_name && touched.first_name) ||
                                (errors.username && touched.username) ||
                                (errors.email && touched.email) ||
                                (errors.password && touched.password) ||
                                (errors.password2 && touched.password2) ? (
                                    <div style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                        Все поля должны быть заполнены!
                                    </div>
                                ) : null}
                                {!errors.password && errors.passwordLength && touched.password ? (
                                    <div style={{ color: '#f75050', fontSize: '0.9rem' }}>{errors.passwordLength}</div>
                                ) : null}
                                {!errors.password && errors.passwordNumbers && touched.password ? (
                                    <div style={{ color: '#f75050', fontSize: '0.9rem' }}>{errors.passwordNumbers}</div>
                                ) : null}
                                {!errors.password && errors.passwordLetters && touched.password ? (
                                    <div style={{ color: '#f75050', fontSize: '0.9rem' }}>{errors.passwordLetters}</div>
                                ) : null}
                                {!errors.password2 && errors.password2Unsimilar && touched.password2 ? (
                                    <div style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                        {errors.password2Unsimilar}
                                    </div>
                                ) : null}
                            </div>
                            <div className='mt-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    className='btn btn-success sign-in fw-600 rounded-5'
                                    type='submit'
                                    style={{ width: '100%' }}
                                    disabled={
                                        errors.first_name ||
                                        errors.last_name ||
                                        errors.username ||
                                        errors.email ||
                                        errors.emailInvalid ||
                                        errors.password ||
                                        errors.password2 ||
                                        errors.password2Unsimilar ||
                                        errors.passwordNumbers ||
                                        errors.passwordLetters ||
                                        errors.passwordLength ||
                                        !touched.first_name
                                    }
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span className='me-2'>
                                    Уже есть аккаунт?{' '}
                                    <NavLink className='link fw-600' to='/login'>
                                        Авторизуйтесь!
                                    </NavLink>
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Modal
                open={errorModalActive}
                onClose={() => setErrorModalActive(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '26rem',
                        backgroundColor: '#ad3434',
                        padding: '0.5rem',
                        borderRadius: '0.4rem',
                    }}
                >
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Данные поля должны быть уникальны:
                    </Typography>
                    <hr className='my-1' style={{color: 'black'}}/>
                    <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                        {responseErrors.username ? (
                            <span>
                                <span style={{ fontWeight: 'bold' }}>Логин:</span> данное имя пользователя уже занято!
                            </span>
                        ) : null}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                        {responseErrors.email ? (
                            <span>
                                <span style={{ fontWeight: 'bold' }}>Email:</span> пользователь с данным адресом почты
                                уже зарегистрирован!
                            </span>
                        ) : null}
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={successModalActive}
                onClose={() => {setSuccessModalActive(false); navigate('/login', {replace: true}); }}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '26rem',
                        backgroundColor: '#2c892c',
                        padding: '0.5rem',
                        borderRadius: '0.4rem',
                    }}
                >
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Регистрация прошла успешно:
                    </Typography>
                    <hr className='my-1' style={{color: 'black'}}/>
                    <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                        Перейдите на почту, дабы <span style={{ fontWeight: 'bold' }}>активировать</span> аккаунт!
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, { signup })(Signup);
