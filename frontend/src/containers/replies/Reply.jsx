import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Box, Modal } from '@mui/material';

import { loadResumeBySlug } from '../../actions/resumes';
import { loadVacancyBySlug } from '../../actions/vacancies';
import { inviteForPosition } from '../../actions/replies';

function Reply(props) {
    const { slug, rslug } = useParams();

    const [resume, setResume] = useState(null);
    const [vacancy, setVacancy] = useState(null);
    const [modalActive, setModalActive] = useState(false);

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
                        {props.profile.is_head && vacancy.department.title === props.profile?.departments?.title ? (
                            <div>
                                <button className='btn btn-warning me-2' onClick={() => {inviteForPosition(slug, rslug); setModalActive(true)}}>
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
                <Modal
                    open={modalActive}
                    onClose={() => setModalActive(false)}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '26rem',
                            backgroundColor: '#2c892c',
                            padding: '0.5rem',
                            borderRadius: '0.4rem',
                        }}
                    >
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Вы пригласили соискателя на позицию:
                        </Typography>
                        <hr className='my-1' style={{ color: 'black' }} />
                        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                            Соискатель был <span style={{ fontWeight: 'bold' }}>уведомлен</span> о приглашении на позцию!
                        </Typography>
                    </Box>
                </Modal>
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
