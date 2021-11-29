import api from './api'

const ENDPOINT = '/applications'
export default {

  APPLICATION_STATUSES  : {
    'pending'  : 'На рассмотрении',
    'approved': 'Одобрена',
    'rejected': 'Отклонена',
  },

  getApplicationStatus (type) {
    return this.APPLICATION_STATUSES[type]
  },


  loadApplication (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT, { params })
  },

  createApplication (data) {
    return api.post(ENDPOINT, data)
  },

  removeApplication (id) {
    return api.delete(`${ENDPOINT}/${id}`)
  },

  getApplication (id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  updateApplication (id, data) {
    return api.put(`${ENDPOINT}/${id}`, data,)
  },

}
