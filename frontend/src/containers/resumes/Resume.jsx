import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadResumeBySlug } from '../../actions/resumes';

function Resume(props) {
    const { slug } = useParams();

    const [resume, setResume] = useState(null);

    useEffect(() => {
        loadResumeBySlug({slug: slug})
            .then(r => setResume(r))
    }, []);

    if (!resume) {
        return <></>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <div className='vacancy'>
                <div>
                    <div style={{ overflowWrap: 'break-word' }}>
                        <h1>{resume.title}</h1>
                    </div>
                </div>
                <div style={{ color: 'lightblue ' }}>
                    О себе:
                    <div style={{ overflowWrap: 'break-word' }}>{resume.description}</div>
                </div>
                <div style={{ color: 'lightblue ' }}>
                    Опыт:
                    <div style={{ overflowWrap: 'break-word' }}>{resume.experience}</div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, {  })(Resume);
