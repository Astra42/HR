import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadReplies } from '../../actions/vacancies';

import '../../css/vacancies.css';

import ShortResume from '../../components/resumes/ShortResume';

function Replies(props) {
    const [replies, setReplies] = useState();

    const { slug } = useParams();

    useEffect(() => {
        loadReplies(slug).then(r => setReplies(r));
    }, []);

    if (!replies || replies.length === 0) {
        return (
            <div
                style={{
                    display: 'flex',
                    padding: '1rem',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                Никто еще не откликнулся на вакансию
            </div>
        );
    }

    console.log(replies);

    return (
        <div
            style={{ display: 'flex', padding: '1rem', flexDirection: 'column', alignItems: 'center', height: '100%' }}
        >
            <div className='vacancies'>
                {replies.map((resume, index) => (
                    <ShortResume
                        key={index}
                        title={resume.title}
                        description={resume.experience}
                        to={`/vacancies/${slug}/replies/${resume.slug}`}
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

export default connect(mapStateToProps, {})(Replies);
