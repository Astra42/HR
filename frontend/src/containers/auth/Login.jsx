import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { login } from '../../actions/auth';

import '../../css/auth.css';

function Login(props) {
    const [modalActive, setModalActive] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (props.isAuthenticated) {
        return <Navigate to={from} replace />
    }

    const inputFields = [
        {
            type: 'text',
            placeholder: 'Логин',
            name: 'username',
            required: true,
        },
        {
            type: 'password',
            placeholder: 'Пароль',
            name: 'password',
            required: true,
        },
    ];

    function validateRequired(value) {
        let error;

        if (!value) {
            error = 'Required!';
        }

        return error;
    }

    function handleSubmit(values) {
        props.login(values).then(response => {
            const data = response?.data;

            if (data) {
                setModalActive(true);
            }
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Авторизация</h2>
                </div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {inputFields.map((input, index) => (
                                <div key={index}>
                                    <Field
                                        {...input}
                                        className={`form-control mt-3 ${
                                            errors[input.name] && touched[input.name] ? 'invalid-field' : null
                                        }`}
                                        validate={validateRequired}
                                    />
                                </div>
                            ))}
                            <div className='col-12 mt-2'>
                                <Link href='' className='link ms-1 message'>
                                    Забыли пароль?{' '}
                                </Link>
                            </div>
                            {(errors.password && touched.password) || (errors.username && touched.username) ? (
                                <div className='mt-2' style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                    Все поля должны быть заполнены!
                                </div>
                            ) : null}
                            <div className='d-grip gap-2 mt-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    className='btn btn-primary sign-in fw-600 rounded-5'
                                    type='submit'
                                    style={{ width: '100%' }}
                                    disabled={errors.password || errors.username || !touched.username}
                                >
                                    Войти
                                </button>
                            </div>
                            <div className='col-12 mt-3 text-center'>
                                <span className='me-2'>
                                    Все еще нет аккаунта?{' '}
                                    <Link className='link fw-600' to='/signup'>
                                        Создайте!
                                    </Link>
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Modal
                open={modalActive}
                onClose={() => setModalActive(false)}
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
                        Что-то пошло не так:
                    </Typography>
                    <hr className='my-1' style={{ color: 'black' }} />
                    <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                        Ваши <span style={{ fontWeight: 'bold' }}>логин</span> и/или{' '}
                        <span style={{ fontWeight: 'bold' }}>пароль</span> были введены неверно!
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

export default connect(mapStateToProps, { login })(Login);
