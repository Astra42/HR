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

    loadDepartamentVacancies() {
        return api
            .get(
                '/vacancies/dep_vacancies/'
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

    updateVacancy(slug, data) {
        const body = JSON.stringify({ ...data });

        return api
            .put(
                `/vacancies/${slug}/`, body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    loadReplies(slug) {
        return api
            .get(
                `/vacancies/${slug}/replies/`
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    editVacancy(slug, data) {
        const body = JSON.stringify({ ...data });

        return api
            .put(
                `/vacancies/${slug}/`, body
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    deleteVacancy(slug) {
        return api
            .delete(
                `/vacancies/${slug}/`
            ).then(
                response => {
                    return response.data;
                }
            )
    }

    searchVacancies(keywords) {
        return api
            .get(
                `/vacancies/?search=${keywords}`
            ).then(
                response => {
                    return response.data;
                }
            )
    }
}

export default new VacanciesService();