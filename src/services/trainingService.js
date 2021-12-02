import api from './api'

const ENDPOINT = '/trainings'
export default {

  TRAINING_STATUSES  : {
    'planned'  : 'Планируется',
    'continues': 'Идет сейчас',
    'completed': 'Проведен',
  },
  TRAINING_VISIBILITY: {
    0: 'Невидим',
    1: 'Видим',
  },

  getTrainingStatus (type) {
    return this.TRAINING_STATUSES[type]
  },

  getTrainingVisibility (type) {
    return this.TRAINING_VISIBILITY[type]
  },

  loadTraining (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT, { params })
  },

  createTraining (data) {
    const formData = new FormData()
    Object.keys(data).forEach(function (key) {
      if (key === 'days') {
        formData.append(`${key}`, JSON.stringify(data[key]))
      } else {
        formData.append(`${key}`, data[key])
      }
    })

    return api.post(ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  removeTraining (id) {
    return api.delete(`${ENDPOINT}/${id}`)
  },

  getTraining (id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  updateTraining (id, data) {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    Object.keys(data).forEach(function (key) {
      if (!(data[key] instanceof File) && (key === 'logo_upload' || (key === 'lecturer_avatar_upload' && data[key]!=='' && data[key]!==null))) {
        return
      }
      if (key === 'days') {
        formData.append(`${key}`, JSON.stringify(data[key]))
      } else {
        formData.append(`${key}`, data[key])
      }

    })

    return api.post(`${ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

}
