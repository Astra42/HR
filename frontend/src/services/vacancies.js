import { api } from "./api";

class VacanciesService {
    loadAvailableVacancies() {
        return api
            .get(
                '/vacancies/'
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    loadVacancyBySlug(data) {
        const slug = data.slug;

        return api
            .get(
                `/vacancies/${slug}/`
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    createNewVacancy(data) {
        const body = JSON.stringify({ ...data });

        return api
            .post(
                '/vacancies/', body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    replyOnVacancy(data) {
        const slug = data.slug;

        return api
            .patch(
                `/vacancies/${slug}/respond/`
            ).then(
                response => {
                    return response.data;
                }
            )
    }
}

export default new VacanciesService();