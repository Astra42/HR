import { types } from './types';
import RepliesService from '../services/replies'

export const inviteForPosition = (vSlug, rSlug) => {
    return RepliesService.inviteForPosition(vSlug, rSlug).then(
        data => {
            return Promise.resolve();
        },
        error => {
            // const message =
            //     (error.response && error.response.data && error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            return error.response;
        }
    )
};