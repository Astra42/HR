import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import FormInput from '../../components/FormInput';

import { createNewResume } from '../../actions/resumes';

function AddResume(props) {
    const [formData, setFormData] = useState({
        title: '',
        experience: '',
        description: '',
    });

    if (!props.isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        console.log(formData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.createNewResume(formData);
    }

    const inputs = [
        {
            type: 'text',
            placeholder: 'Заголовок',
            name: 'title',
            required: true,
        },
        {
            type: 'text',
            placeholder: 'Опыт',
            name: 'experience',
            required: true,
        },
    ];

    return (
        <div className='container mt-5'>
            <h1>Добавить резюме</h1>
            <form onSubmit={e => handleSubmit(e)}>
                {inputs.map((input, index) => (
                    <FormInput key={index} {...input} handleChange={handleChange} />
                ))}
                <div className='mt-2'>
                    <textarea
                        placeholder='О себе'
                        className='mt-2'
                        name='description'
                        cols='60'
                        rows='10'
                        onChange={handleChange}
                    ></textarea>
                </div>
                <Link className='btn btn-secondary mt-2' to='/vacancies'>
                    Назад
                </Link>
                <button className='ms-3 btn btn-primary mt-2' type='submit'>
                    Создать
                </button>
            </form>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, { createNewResume })(AddResume);
