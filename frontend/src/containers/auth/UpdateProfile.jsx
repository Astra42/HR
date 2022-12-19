import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { updateProfile, loadCountries } from '../../actions/auth';

import '../../css/auth.css';

function UpdateProfile(props) {
    const [countires, setCountries] = useState(null);

    useEffect(() => {
        loadCountries().then(c => setCountries(c))
    }, []);

    const [errorModalActive, setErrorModalActive] = useState(false);
    
    const navigate = useNavigate();

    if (!props.profile || !countires) {
        return <></>;
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
        birth_date: {
            type: 'date',
            placeholder: 'Дата рождения',
            name: 'birth_date',
            required: false,
        },
        country: {
            placeholder: 'Страна',
            name: 'country',
            required: false,
        },
        about_me: {
            type: 'text',
            placeholder: 'Обо мне',
            name: 'about_me',
            required: false,
        }
    };

    function validate(values) {
        let errors = {};

        if (!values.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            errors.emailInvalid = 'Некорректный адрес почты!';
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
        props.updateProfile(values, props.profile.username).then(response => {
            const data = response?.data;

            if (data) {
                setErrorModalActive(true);
            } else {
                navigate('/my_profile', {replace: true});
            }
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Профиль апдате</h2>
                </div>
                <Formik
                    initialValues={{
                        last_name: props.profile.last_name,
                        first_name: props.profile.first_name,
                        username: props.profile.username,
                        email: props.profile.email,
                        birth_date: '',
                        country: '',
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
                            <Field
                                className='form-control'
                                {...inputFields.birth_date}
                            />
                            <Field 
                                className='form-control mt-3'
                                component='select'
                                {...inputFields.country}
                            >
                                {Object.keys(countires).map(
                                    (code, index) => (<option key={index} value={code}>{countires[code]}</option>)
                                )}
                            </Field>
                            <Field
                                    className='form-control mt-3 select'
                                    {...inputFields.about_me}
                                />
                            <div>
                                {(errors.last_name && touched.last_name) ||
                                (errors.first_name && touched.first_name) ||
                                (errors.username && touched.username) ||
                                (errors.email && touched.email) ? (
                                    <div style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                        Все поля должны быть заполнены!
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
                                        errors.emailInvalid
                                    }
                                >
                                    Подтвердить изменения
                                </button>
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
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, { updateProfile })(UpdateProfile);
