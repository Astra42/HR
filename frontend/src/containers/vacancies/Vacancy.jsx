import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { replyOnVacancy } from '../../actions/vacancies';

import axios from 'axios';

function Vacancy(props) {
    const { slug } = useParams();

    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        const getVacancy = async data => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('access')}`,
                    Accept: 'application/json',
                },
            };

            try {
                let res = await axios.get(`${process.env.REACT_APP_API_URL}/vacancies/${data.slug}`, config);

                setVacancy(res.data);
            } catch (error) {
                setVacancy(null);
            }
        };

        getVacancy({ slug: slug });
    }, []);

    if (!vacancy) {
        return <></>;
    }

    function handleClick() {
        props.replyOnVacancy({slug: slug})
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div className='vacancy'>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%'  }}>
                        <div style={{overflowWrap: 'break-word'}}>
                            <h1>{vacancy.title}</h1>
                        </div>
                        <div style={{ flex: '1' }} />
                        <button className='btn btn-primary' type='submit' onClick={handleClick}>
                            Откликнуться
                        </button>
                    </div>
                    <div style={{ color: 'lightblue ' }}>
                        Описание:
                        <div style={{ overflowWrap: 'break-word' }}>{vacancy.description}</div>
                    </div>
                    <div style={{ color: 'lightblue ' }}>
                        Требуемые навыки:
                        <div style={{ overflowWrap: 'break-word' }}>{vacancy.qualification}</div>
                    </div>
                    <div style={{ color: 'lightblue ' }}>
                        Минимальная з/п:
                        <div style={{ overflowWrap: 'break-word' }}>{vacancy.salary_from} руб.</div>
                    </div>
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

export default connect(mapStateToProps, { replyOnVacancy })(Vacancy);
