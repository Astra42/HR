import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadResumeBySlug } from '../../actions/resumes';
import { loadVacancyBySlug } from '../../actions/vacancies';
import { inviteForPosition } from '../../actions/replies';

function Reply(props) {
    const { slug, rslug } = useParams();

    const [resume, setResume] = useState(null);
    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        loadResumeBySlug({slug: rslug})
            .then(r => setResume(r))
        loadVacancyBySlug({slug: slug}).then(v => setVacancy(v))
    }, []);

    if (!resume || !vacancy) {
        return <></>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <div className='vacancy'>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <div style={{ overflowWrap: 'break-word' }}>
                            <h1>{resume.title}</h1>
                        </div>
                        <div style={{ flex: '1' }} />
                        {vacancy.department.title === props.profile?.departments?.title ? (
                            <div>
                                <button className='btn btn-warning me-2' onClick={() => inviteForPosition(slug, rslug)}>
                                    Пригласить
                                </button>
                            </div>
                        ) : null}
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
        profile: state.auth.profile,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, {  })(Reply);
