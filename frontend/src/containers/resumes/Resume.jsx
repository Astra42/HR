import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

function Resume(props) {
    const { slug } = useParams();

    const [resume, setResume] = useState(null);

    useEffect(() => {
        const getResume = async data => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('access')}`,
                    Accept: 'application/json',
                },
            };

            try {
                let res = await axios.get(`${process.env.REACT_APP_API_URL}/resumes/${data.slug}`, config);

                setResume(res.data);
            } catch (error) {
                setResume(null);
            }
        };

        getResume({ slug: slug });
    }, []);

    if (!resume) {
        return <></>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div className='vacancy'>
                <div>
                    <div style={{ overflowWrap: 'break-word' }}>
                        <h1>{resume.title}</h1>
                    </div>
                </div>
                <div style={{ color: 'lightblue ' }}>
                    Описание:
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

export default connect(mapStateToProps, {})(Resume);
