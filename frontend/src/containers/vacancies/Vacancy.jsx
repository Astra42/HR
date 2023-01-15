import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Box, Modal } from '@mui/material';

import { replyOnVacancy, loadVacancyBySlug, deleteVacancy } from '../../actions/vacancies';

function Vacancy(props) {
    const { slug } = useParams();

    const [modalActive, setModalActive] = useState(false);
    const [vacancy, setVacancy] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadVacancyBySlug({ slug: slug }).then(v => setVacancy(v));
    }, []);

    if (!vacancy) {
        return <></>;
    }

    function handleClick() {
        replyOnVacancy({ slug: slug }).then(response => {
            console.log(modalActive);
            setModalActive(true);
        });
    }

    console.log(vacancy);
    console.log(props.profile);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <div className='vacancy'>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <div style={{ overflowWrap: 'break-word' }}>
                            <h1>{vacancy.title}</h1>
                        </div>
                        <div style={{ flex: '1' }} />
                        {vacancy.department.title === props.profile?.departments?.title ? (
                            <div>
                                <NavLink to={`/vacancies/${slug}/replies`} className='btn btn-warning me-2'>
                                    Ответы
                                </NavLink>
                                <NavLink to={`/vacancies/${slug}/edit`} className='btn btn-info me-2'>
                                    Изменить
                                </NavLink>
                                <button
                                    className='btn btn-danger'
                                    type='submit'
                                    onClick={() => {
                                        deleteVacancy(slug);
                                        navigate('/vacancies');
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        ) : (
                            <button className='btn btn-primary' type='submit' onClick={handleClick}>
                                Откликнуться
                            </button>
                        )}
                    </div>
                    <div style={{ color: 'lightblue ' }}>
                        Требуемые навыки:
                        <div style={{ overflowWrap: 'break-word' }}>{vacancy.qualification}</div>
                    </div>
                    <hr />
                    <div style={{ color: 'lightblue ' }}>
                        Зарабатная плата:
                        <div style={{ overflowWrap: 'break-word' }}>
                            {vacancy.salary_from} - {vacancy.salary_to} руб.
                        </div>
                    </div>
                    <hr />
                    <div style={{ color: 'lightblue ' }}>
                        Описание:
                        <div style={{ overflowWrap: 'break-word' }}>
                            {vacancy.description.split('\n').map((str, index) => (
                                <div key={index}>{str ? str : <br />}</div>
                            ))}
                        </div>
                    </div>
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
                            Вы откликнулись на вакансию:
                        </Typography>
                        <hr className='my-1' style={{ color: 'black' }} />
                        <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                            Теперь работодатель сможет просмотреть <span style={{ fontWeight: 'bold' }}>ваше</span>{' '}
                            резюме!
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

export default connect(mapStateToProps, {})(Vacancy);
