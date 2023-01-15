import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Typography, Box, Modal } from '@mui/material';

import { loadVacancyBySlug, editVacancy } from '../../actions/vacancies';

function EditVacancy() {
    const navigate = useNavigate();

    const { slug } = useParams();

    const [modalActive, setModalActive] = useState(false);
    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        loadVacancyBySlug({ slug: slug }).then(v => setVacancy(v));
    }, []);

    if (!vacancy) {
        return <></>;
    }

    const inputFields = {
        title: {
            type: 'text',
            placeholder: 'Должность',
            name: 'title',
            required: true,
        },
        salary_from: {
            type: 'number',
            placeholder: 'Мин. з/п',
            name: 'salary_from',
            required: true,
        },
        salary_to: {
            type: 'number',
            placeholder: 'Макс. з/п',
            name: 'salary_to',
            required: true,
        },
        qualification: {
            type: 'text',
            placeholder: 'Навыки',
            name: 'qualification',
            required: true,
        },
        description: {
            type: 'text',
            placeholder: 'Описание',
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
        editVacancy(slug, values).then(response => {
            setModalActive(true);
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Редактировать вакансию</h2>
                </div>
                <Formik
                    initialValues={{
                        title: vacancy.title,
                        salary_from: vacancy.salary_from,
                        salary_to: vacancy.salary_to,
                        qualification: vacancy.qualification,
                        description: vacancy.description,
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
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Field
                                    className={`form-control mt-3 ${
                                        errors.salary_from && touched.salary_from ? 'invalid-field' : null
                                    }`}
                                    validate={validateRequired}
                                    {...inputFields.salary_from}
                                />
                                <Field
                                    className={`form-control mt-3 ${
                                        errors.salary_to && touched.salary_to ? 'invalid-field' : null
                                    }`}
                                    validate={validateRequired}
                                    {...inputFields.salary_to}
                                />
                            </div>
                            <Field
                                as={'textarea'}
                                className={`form-control mt-3 ${
                                    errors.qualification && touched.qualification ? 'invalid-field' : null
                                }`}
                                rows='2'
                                validate={validateRequired}
                                {...inputFields.qualification}
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
                            (errors.salary_from && touched.salary_from) ||
                            (errors.salary_to && touched.salary_to) ||
                            (errors.qualification && touched.qualification) ||
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
                                        errors.title ||
                                        errors.salary_from ||
                                        errors.salary_to ||
                                        errors.qualification ||
                                        errors.description
                                    }
                                >
                                    Сохранить изменения
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
                    navigate(`/vacancies/${slug}`);
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
                    <span style={{ fontWeight: 'bold' }}>Обновленная</span> информация о вашей вакансии уже отображается на сайте!
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, {})(EditVacancy);
