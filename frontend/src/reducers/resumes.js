import { types } from '../actions/types';

const initialState = {
    resumes: [],
};

export function resumesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.resumes.LOAD_AVAILABLE_RESUMES_SUCCES:
            return {
                ...state,
                resumes: payload.results,
            };
        case types.resumes.LOAD_AVAILABLE_RESUMES_FAIL:
            return {
                ...state,
                resumes: [],
            };
        default:
            return state;
    }
}
