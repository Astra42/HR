import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { createNewResume, updateResume } from '../../actions/resumes';
import { loadResume } from '../../actions/auth';

function EditResume(props) {
    const [post, setPost] = useState(true);
    const [resume, setResume] = useState(null);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        loadResume().then(r => {
            setResume(r);
            setPost(r?.status === 404);
        });
    }, []);

    const navigate = useNavigate();

    if (!resume) {
        return <></>;
    }

    const inputFields = {
        title: {
            type: 'text',
            placeholder: 'Должность',
            name: 'title',
            required: true,
        },
        experience: {
            type: 'text',
            placeholder: 'Опыт',
            name: 'experience',
            required: true,
        },
        description: {
            type: 'text',
            placeholder: 'О себе',
            name: 'description',
            required: true,
        },
    };

    function validateRequired(value) {
        let error;

        if (!value) {
            error = 'Required!';
        }

        return error;
    }

    function handleSubmit(values) {
        if (post) {
            createNewResume(values).then(response => {
                setModalActive(true);
            });
        } else {
            updateResume(resume.slug, values).then(response => {
                setModalActive(true);
            });
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Редактировать резюме</h2>
                </div>
                <Formik
                    initialValues={{
                        title: resume?.title || '',
                        experience: resume?.experience || '',
                        description: resume?.description || '',
                    }}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                className={`form-control mt-3 ${
                                    errors.title && touched.title ? 'invalid-field' : null
                                }`}
                                validate={validateRequired}
                                {...inputFields.title}
                            />
                            <Field
                                as={'textarea'}
                                className={`form-control mt-3 ${
                                    errors.experience && touched.experience ? 'invalid-field' : null
                                }`}
                                rows='3'
                                validate={validateRequired}
                                {...inputFields.experience}
                            />
                            <div className='pb-2'>
                                <Field
                                    as={'textarea'}
                                    className={`form-control mt-3 ${
                                        errors.description && touched.description ? 'invalid-field' : null
                                    }`}
                                    rows='5'
                                    validate={validateRequired}
                                    {...inputFields.description}
                                />
                            </div>
                            {(errors.title && touched.title) ||
                            (errors.experience && touched.experience) ||
                            (errors.description && touched.description) ? (
                                <div style={{ color: '#f75050', fontSize: '0.9rem' }}>
                                    Все поля должны быть заполнены!
                                </div>
                            ) : null}
                            <div className='mt-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    className='btn btn-primary sign-in fw-600 rounded-5'
                                    type='submit'
                                    style={{ width: '100%' }}
                                    disabled={
                                        errors.experience ||
                                        errors.description || 
                                        errors.title
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
                        <span style={{ fontWeight: 'bold' }}>Обновленная</span> информация о вашем резюме уже
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

export default connect(mapStateToProps, {})(EditResume);
