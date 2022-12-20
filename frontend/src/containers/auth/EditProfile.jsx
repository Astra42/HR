import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { updateProfile, loadCountries } from '../../actions/auth';

import '../../css/auth.css';

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
            } else {
                setModalActive(true);
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
                        birth_date: props.profile.birth_date || '',
                        country: Object.keys(countires).find(key => countires[key] === props.profile.country) || 'AF',
                        about_me: props.profile.about_me || '',
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
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Field
                                    className='form-control'
                                    {...inputFields.birth_date}
                                    validate={validateRequired}
                                />
                                <Field
                                    className='form-control'
                                    component='select'
                                    {...inputFields.country}
                                    validate={validateRequired}
                                    style={{color: '#e8e9f3', backgroundColor: '#61708f'}}
                                >
                                    {Object.keys(countires).map((code, index) => (
                                        <option key={index} value={code}>
                                            {countires[code]}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className='mt-3 pb-2'>
                                <Field
                                    as={'textarea'}
                                    rows='5'
                                    className='form-control'
                                    {...inputFields.about_me}
                                    validate={validateRequired}
                                />
                            </div>
                            <div>
                                {(errors.last_name && touched.last_name) ||
                                (errors.first_name && touched.first_name) ||
                                (errors.username && touched.username) ||
                                (errors.email && touched.email) ||
                                (errors.birth_date && touched.birth_date) ||
                                (errors.country && touched.country) ||
                                (errors.about_me && touched.about_me) ? (
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
                                        errors.emailInvalid ||
                                        errors.about_me ||
                                        errors.birth_date ||
                                        errors.country
                                    }
                                >
                                    Подтвердить изменения
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
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
                    <span style={{ fontWeight: 'bold' }}>Обновленная</span> информация о вашем профиле уже отображается на сайте!
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
