import React from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { Typography, Box, Modal } from '@mui/material';
import { resetPassword } from '../../actions/auth';

function ResetPassword() {
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
        resetPassword(values);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Восстановление пароля</h2>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validate={validate}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className='pb-2 mt-3'>
                                <label>Введите почту для подтверждения:</label>
                                <Field
                                    className={`form-control mt-2 ${
                                        errors.last_name && touched.last_name ? 'invalid-field' : null
                                    }`}
                                    validate={validateRequired}
                                    type='email'
                                    name='email'
                                    required={true}
                                    placeholder='Почта'
                                />
                            </div>
                            {!errors.email && errors.emailInvalid && touched.email ? (
                                <div style={{ color: '#f75050', fontSize: '0.9rem' }}>{errors.emailInvalid}</div>
                            ) : null}
                            {errors.email && touched.email ? (
                                <div style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                    Все поля должны быть заполнены!
                                </div>
                            ) : null}
                            <div className='mt-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    className='btn btn-primary sign-in fw-600 rounded-5'
                                    type='submit'
                                    style={{ width: '100%' }}
                                    disabled={errors.email || errors.emailInvalid || !touched.email}
                                >
                                    Отправить
                                </button>
                            </div>
                            <div className='col-12 mt-3 text-center'>
                                <span className='me-2'>
                                    Вспомнили пароль?{' '}
                                    <NavLink className='link fw-600' to='/login'>
                                        Войти!
                                    </NavLink>
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {/* <Modal
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
            </Modal> */}
        </div>
    );
}

export default ResetPassword;
