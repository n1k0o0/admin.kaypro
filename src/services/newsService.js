import api from './api'

const ENDPOINT = '/news'
export default {

  TRAINING_VISIBILITY: {
    0: 'Невидим',
    1: 'Видим',
  },

  getNewsVisibility (type) {
    return this.TRAINING_VISIBILITY[type]
  },

  loadNews (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT, { params })
  },

  removeNews(id) {
    return api.delete(`${ENDPOINT}/${id}`)
  },

  getNews(id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  updateNews(id,data) {
    const formData = new FormData()
    formData.append('_method','PUT')
    Object.keys(data).forEach(function (key) {
      if(data[key]==='null' || data[key]===null) {
        data[key]=''
      }
      if (!(data[key] instanceof File) && key==='logo' && data[key]!=='' && data[key]!==null) {
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

  createNews(data) {
    const formData = new FormData()
    Object.keys(data).forEach(function (key) {
      formData.append(`${key}`, data[key])
    })

    return api.post(ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  prepareList (list) {
    let result = []

    for (let i in list) {
      result.push({
        'id'   : i,
        'value': list[i],
      })
    }

    return result
  },
}
