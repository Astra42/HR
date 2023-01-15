import { api } from "./api";

class RepliesService {
    inviteForPosition(vSlug, rSlug) {
        return api
            .post(
                `/vacancies/${vSlug}/replies/?resume_slug=${rSlug}`
            ).then(
                response => {
                    return response.data;
                }
            )
    }
}

export default new RepliesService();