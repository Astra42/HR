import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { loadAvailableVacancies } from '../../actions/vacancies';

import '../../css/vacancies.css';

import ShortVacancy from '../../components/vacancies/ShortVacancy';

function Vacancies(props) {
    useEffect(() => {
        props.loadAvailableVacancies();
    }, []);

    if (!props.isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div style={{ display: 'flex', padding: '1rem', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
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
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        vacancies: state.vacancies.vacancies,
        profile: state.auth.profile,
    };
}

export default connect(mapStateToProps, { loadAvailableVacancies })(Vacancies);
