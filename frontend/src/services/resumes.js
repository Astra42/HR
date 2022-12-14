import { api } from "./api";

class ResumesService {
    loadAvailableResumes() {
        return api
            .get(
                '/resumes/'
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    loadResumeBySlug(data) {
        const slug = data.slug;

        return api
            .get(
                `/resumes/${slug}/`
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    createNewResume(data) {
        const body = JSON.stringify({ ...data });

        return api
            .post(
                '/resumes/', body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    updateResume(slug, data) {
        const body = JSON.stringify({ ...data });

        return api
            .patch(
                `/resumes/${slug}/`, body
            ).then(
                response => {
                    console.log(response.data);
                        
                    return response.data;
                }
            )
    }
}

export default new ResumesService();