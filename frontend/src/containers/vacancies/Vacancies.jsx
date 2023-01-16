import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { loadAvailableVacancies } from '../../actions/vacancies';

import '../../css/vacancies.css';

import ShortVacancy from '../../components/vacancies/ShortVacancy';

import add from '../../svg/add.svg';

function Vacancies(props) {
    useEffect(() => {
        props.loadAvailableVacancies();
    }, []);

    if (!props.isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (!props.profile) {
        return <></>;
    }

    return (
        <div
            style={{
                display: 'flex',
                padding: '1rem',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
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
            {props.profile.is_head ? (<div
                style={{
                    backgroundColor: '#4d5971',
                    marginLeft: '2rem',
                    height: '2.5rem',
                    width: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%'
                }}
            >
                <NavLink to='/vacancies/add'>
                <img src={add} alt='add' style={{ height: '2rem' }} />
                </NavLink>
            </div>) : null}
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
