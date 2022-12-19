import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import { createNewResume } from '../../actions/resumes';

function AddResume(props) {
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
        createNewResume(values);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ width: '23rem', backgroundColor: '#4d5871', padding: '1.5rem', borderRadius: '0.4rem' }}>
                <div className='mt-3 pb-2'>
                    <h2 className='text-center text-shadow-sm'>Создать резюме</h2>
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
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, {  })(AddResume);
