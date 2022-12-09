import { types } from '../actions/types';

const initialState = {
    list: [],
};

export function resumesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.resumes.LOAD_AVAILABLE_RESUMES_SUCCES:
            return {
                ...state,
                list: payload.results,
            };
        case types.resumes.LOAD_AVAILABLE_RESUMES_FAIL:
            return {
                ...state,
                list: [],
            };
        case types.resumes.CREATE_NEW_RESUME_SUCCES:
        case types.resumes.CREATE_NEW_RESUME_FAIL:
        default:
            return state;
    }
}
