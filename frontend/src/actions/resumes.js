import { types } from './types';
import ResumesService from '../services/resumes'

export const loadAvailableResumes = () => dispatch => {
    return ResumesService.loadAvailableResumes().then(
        data => {
            dispatch({type: types.resumes.LOAD_AVAILABLE_RESUMES_SUCCES, payload: data});

            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            dispatch({ type: types.resumes.LOAD_AVAILABLE_RESUMES_FAIL });

            return Promise.reject();
        }
    )
};

export const loadResumeBySlug = data => {
    return ResumesService.loadResumeBySlug(data).then(
        data => {
            return data;
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return Promise.reject();
        }
    )
};

export const createNewResume = data => {
    return ResumesService.createNewResume(data).then(
        data => {
            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return Promise.reject();
        }
    )
};
