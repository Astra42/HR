import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import { createNewVacancy } from '../../actions/vacancies';

function AddVacancy(props) {
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
        createNewVacancy(values);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Создать вакансию</h2>
                </div>
                <Formik
                    initialValues={{
                        title: '',
                        salary_from: '',
                        salary_to: '',
                        qualification: '',
                        description: '',
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
                                    
                                >
                                    Создать
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
    };
}

export default connect(mapStateToProps, {})(AddVacancy);
