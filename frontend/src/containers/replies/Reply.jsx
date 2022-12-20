import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadResumeBySlug } from '../../actions/resumes';

function Reply(props) {
    const { rslug } = useParams();

    const [resume, setResume] = useState(null);

    useEffect(() => {
        loadResumeBySlug({slug: rslug})
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
                    Опыт:
                    <div style={{ overflowWrap: 'break-word' }}>{resume.experience.split('\n').map((str, index) => (
                                <div key={index}>{str ? str : <br/>}</div>
                            ))}</div>
                </div>
                <hr />
                <div style={{ color: 'lightblue ' }}>
                    О себе:
                    <div style={{ overflowWrap: 'break-word' }}>{resume.description.split('\n').map((str, index) => (
                                <div key={index}>{str ? str : <br/>}</div>
                            ))}</div>
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

export default connect(mapStateToProps, {  })(Reply);
