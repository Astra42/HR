import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { loadAvailableVacancies } from '../actions/vacancies';

import '../css/vacancies.css';

import ShortVacancy from '../components/vacancies/ShortVacancy';

function Vacancies(props) {
    useEffect(() => {
        props.loadAvailableVacancies();
    }, []);

    if (!props.isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div style={{ display: 'flex', marginTop: '3%', flexDirection: 'column', alignItems: 'center', maxHeight: '80%' }}>
            <div className='vacancies'>
                {props.vacancies.map((vacancy, index) => (
                    <ShortVacancy
                        key={index}
                        title={vacancy.title}
                        description={vacancy.description}
                        to={`/vacancies/${vacancy.slug}`}
                    />
                ))}
            </div>
            {!props.profile || !props.profile.is_head ? null : (
                <Link
                    to='/vacancies/add'
                    className='btn btn-success'
                    style={{ marginTop: '2rem' }}
                >
                    Добавить вакансию
                </Link>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        vacancies: state.vacancies.list,
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, { loadAvailableVacancies })(Vacancies);
