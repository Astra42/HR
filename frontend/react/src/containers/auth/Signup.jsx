import React from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import { signup } from '../../actions/auth';

import '../../css/auth.css';

function Signup(props) {
    if (props.isAuthenticated) {
        return <Navigate to='/' replace />;
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

    function handleChange(e) {
        switch (e.target.name) {
            case 'password': {
                let errors = [];

                if (!e.target.value.match(/[0-9]/g)) {
                    errors.push('Пароль должен содержать цифры!');
                }

                if (!e.target.value.match(/[A-Za-z]/g)) {
                    errors.push('Пароль должен содержать латинские буквы!');
                }

                if (e.target.value.length < 8) {
                    errors.push('Пароль должен содержать не меньше 8 символов!');
                }
                break;
            }
            default:
                break;
        }
    }

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
            error = 'Required!'
        }

        return error;
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
                    onSubmit={values => props.signup(values)}
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
                                    (errors.email || errors.emailInvalid) && touched.email ? 'invalid-field mb-2' : 'mb-3'
                                } ${errors.emailInvalid && errors.email ? 'mb-3' : null}`}
                                validate={validateRequired}
                                {...inputFields.email}
                            />
                            {!errors.email && errors.emailInvalid && touched.email ? (
                                <div className='mt-1' style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                    {errors.emailInvalid}
                                </div>
                            ) : null}
                            <div className='pb-2 mt-2' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span className='me-2'>
                                    Уже есть аккаунт?{' '}
                                    <Link className='link fw-600' to='/login'>
                                        Авторизуйтесь!
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

export default connect(mapStateToProps, { signup })(Signup);
