import React from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { login } from '../../actions/auth';

import '../../css/auth.css';

function Login(props) {
    if (props.isAuthenticated) {
        return <Navigate to='/' replace />;
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
                    onSubmit={values => props.login(values)}
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
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, { login })(Login);
