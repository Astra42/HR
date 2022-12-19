import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { loadAvailableResumes } from '../../actions/resumes';

import '../../css/vacancies.css';

import ShortResume from '../../components/resumes/ShortResume';

function Resumes(props) {
    useEffect(() => {
        props.loadAvailableResumes();
    }, []);
    
    return (
        <div style={{ display: 'flex', padding: '1rem', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <div className='vacancies'>
                {props.resumes.map((resume, index) => (
                    <ShortResume
                        key={index}
                        title={resume.title}
                        description={resume.description}
                        to={`/resumes/${resume.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        resumes: state.resumes.resumes,
    };
}

export default connect(mapStateToProps, { loadAvailableResumes })(Resumes);
