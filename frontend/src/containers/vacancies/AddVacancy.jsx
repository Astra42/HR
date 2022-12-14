import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FormInput from '../../components/FormInput';

import { createNewVacancy } from '../../actions/vacancies';

function AddVacancy(props) {
    const [formData, setFormData] = useState({
        title: '',
        salary_from: '',
        salary_to: '',
        qualification: '',
        description: '',
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        createNewVacancy(formData);
    }

    const inputs = [
        {
            type: 'text',
            placeholder: 'Должность',
            label: 'Должность',
            name: 'title',
            required: true,
        },
        {
            type: 'number',
            placeholder: 'Минимальная з/п',
            label: 'Минимальная з/п',
            name: 'salary_from',
            required: true,
        },
        {
            type: 'number',
            placeholder: 'Максимальная з/п',
            label: 'Максимальная з/п',
            name: 'salary_to',
            required: true,
        },
        {
            type: 'text',
            placeholder: 'Навыки',
            label: 'Навыки',
            name: 'qualification',
            required: true,
        },
    ];

    return (
        <div className='container mt-5'>
            <h1>Добавить вакансию</h1>
            <form onSubmit={e => handleSubmit(e)}>
                {inputs.map((input, index) => (
                    <FormInput key={index} {...input} handleChange={handleChange} />
                ))}
                <div className='mt-2'>
                    <textarea placeholder='Описание' className='mt-2' name='description' cols='60' rows='10' onChange={handleChange}></textarea>
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
    };
}

export default connect(mapStateToProps, {  })(AddVacancy);
