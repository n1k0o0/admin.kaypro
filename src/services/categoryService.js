import api from './api'

const ENDPOINT = '/product-categories'
export default {

  MOBILE_VISIBILITY: {
    0: 'Невидим',
    1: 'Видим',
  },

  getMobileVisibility (type) {
    return this.MOBILE_VISIBILITY[type]
  },

  load (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT, { params })
  },

  create (data) {
    return api.post(ENDPOINT, data)
  },

  get (id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  update (id, data) {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    Object.keys(data).forEach(function (key) {
      if (!(data[key] instanceof File) && (key === 'logo' || key === 'banner') && data[key] !== '' && data[key] !== null) {
        return
      }
      formData.append(`${key}`, data[key])
    })

    return api.post(`${ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

}
