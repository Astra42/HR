import axios from 'axios';

export const createNewResume = data => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json',
        },
    };

    const body = JSON.stringify({ ...data });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/resumes/`, body, config)
    } catch (error) {}
};
