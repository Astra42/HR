import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { updateProfile, loadCountries } from '../../actions/auth';

import '../../css/auth.css';

import logo from '../../img/logo.png'

function EditProfile(props) {
    const [countires, setCountries] = useState(null);

    useEffect(() => {
        loadCountries().then(c => setCountries(c));
    }, []);

    const [modalActive, setModalActive] = useState(false);

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
        },
        phone_one: {
            type: 'tel',
            placeholder: 'Основной',
            name: 'phone_one',
            required: false,
        },
        phone_two: {
            type: 'tel',
            placeholder: 'Запасной',
            name: 'phone_two',
            required: false,
        },
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
        console.log('cringe');

        props.updateProfile(values, props.profile.username).then(response => {
            const data = response?.data;

            if (data) {
            } else {
                setModalActive(true);
            }
        });
    }

    return (
        <div className='container rounded mt-5 mb-5 block-clr'>
            <Formik
                initialValues={{
                    last_name: props.profile.last_name,
                    first_name: props.profile.first_name,
                    username: props.profile.username,
                    email: props.profile.email,
                    birth_date: props.profile.birth_date || '',
                    country: Object.keys(countires).find(key => countires[key] === props.profile.country) || 'AF',
                    about_me: props.profile.about_me || '',
                    phone_one: props.profile.phone_one || '',
                    phone_two: props.profile.phone_two || '',
                }}
                onSubmit={values => handleSubmit(values)}
                validate={validate}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='row'>
                            <div className='col-md-4 border-clr'>
                                <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
                                    <div className='rounded-circle mt-5 avatar'>
                                        <img
                                            width='150px'
                                            src={logo}
                                        />
                                    </div>
                                    <span className='fw-bold fs-5'>
                                        {props.profile.last_name} {props.profile.first_name}
                                    </span>
                                    <span className='fw-light'>{props.profile.email}</span>
                                </div>
                                <div className='mt-0 text-center'>
                                    <button
                                        className='btn btn-success sign-in fw-600 rounded-5 ps-4 pe-4'
                                        type='submit'
                                        disabled={
                                            errors.first_name ||
                                            errors.last_name ||
                                            errors.username ||
                                            errors.email ||
                                            errors.emailInvalid ||
                                            errors.birth_date ||
                                            errors.country
                                        }
                                    >
                                        Сохранить изменения
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-8 ps-5 pe-5'>
                                <div className='p-3 py-5'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <h4 className='text-right'>Редактирование профиля</h4>
                                    </div>
                                    <div className='row-cols-4'>
                                        <div className='col-md-12'>
                                            <label className='labels mb-1 ps-2'>Имя пользователя</label>
                                            <Field
                                                className={`form-control ${
                                                    errors.username && touched.username ? 'invalid-field' : null
                                                }`}
                                                validate={validateRequired}
                                                {...inputFields.username}
                                            />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-6'>
                                            <label className='labels mb-1 ps-2'>Фамилия</label>
                                            <Field
                                                className={`form-control ${
                                                    errors.last_name && touched.last_name ? 'invalid-field' : null
                                                }`}
                                                validate={validateRequired}
                                                {...inputFields.last_name}
                                            />
                                        </div>
                                        <div className='col-md-6'>
                                            <label className='labels mb-1 ps-2'>Имя</label>
                                            <Field
                                                className={`form-control ${
                                                    errors.first_name && touched.first_name ? 'invalid-field' : null
                                                }`}
                                                validate={validateRequired}
                                                {...inputFields.first_name}
                                            />
                                        </div>
                                    </div>
                                    <div className='row mt-3 pb-2'>
                                        <div className='col-md-12'>
                                            <label className='labels mb-1 ps-2'>E-mail</label>
                                            <Field
                                                className={`form-control ${
                                                    (errors.email || errors.emailInvalid || errors.emailAlreadyUsed) &&
                                                    touched.email
                                                        ? 'invalid-field mb-2'
                                                        : 'mb-2'
                                                }`}
                                                validate={validateRequired}
                                                {...inputFields.email}
                                            />
                                            {!errors.email && errors.emailInvalid && touched.email ? (
                                                <div className='mt-2' style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                                    {errors.emailInvalid}
                                                </div>
                                            ) : null}
                                            {!errors.email && errors.emailAlreadyUsed && touched.email ? (
                                                <div className='mt-2' style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                                    {errors.emailAlreadyUsed}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label className='labels mb-1 ps-2'>Страна</label>
                                            <Field
                                                className='form-control'
                                                component='select'
                                                {...inputFields.country}
                                                validate={validateRequired}
                                                style={{ color: '#e8e9f3', backgroundColor: '#61708f' }}
                                            >
                                                {Object.keys(countires).map((code, index) => (
                                                    <option key={index} value={code}>
                                                        {countires[code]}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className='col-md-6 mt-1'>
                                            <label className='labels mb-1 ps-2'>Дата рождения</label>
                                            <Field
                                                className='form-control'
                                                {...inputFields.birth_date}
                                                validate={validateRequired}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 mt-3'>
                                            <label className='labels mb-1 ps-2'>Телефоны</label>
                                        </div>
                                        <div className='col-md-6'>
                                        <Field
                                                className={`form-control ${
                                                    errors.phone_one && touched.phone_one ? 'invalid-field' : null
                                                }`}
                                                validate={validateRequired}
                                                {...inputFields.phone_one}
                                            />
                                        </div>
                                        <div className='col-md-6'>
                                        <Field
                                                className={`form-control ${
                                                    errors.phone_two && touched.phone_two ? 'invalid-field' : null
                                                }`}
                                                validate={validateRequired}
                                                {...inputFields.phone_two}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 mt-3'>
                                            <label className='labels mb-1 ps-2'>Обо мне</label>
                                            <Field
                                                as={'textarea'}
                                                rows='6'
                                                className={`form-control ${
                                                    errors.about_me && touched.about_me ? 'invalid-field' : null
                                                }`}
                                                {...inputFields.about_me}
                                                validate={validateRequired}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal
                open={modalActive}
                onClose={() => {
                    setModalActive(false);
                    navigate(`/profile`);
                }}
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
                        Данные были успешны обновлены:
                    </Typography>
                    <hr className='my-1' style={{ color: 'black' }} />
                    <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                        <span style={{ fontWeight: 'bold' }}>Обновленная</span> информация о вашем профиле уже
                        отображается на сайте!
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, { updateProfile })(EditProfile);
