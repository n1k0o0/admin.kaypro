import api from './api'

const ENDPOINT = '/sliders'
export default {

  getStatus (type) {
    return this.STATUSES[type]
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
    const formData = new FormData()
    Object.keys(data).forEach(function (key) {
      if (data[key] === 'null' || data[key] === null) {
        data[key] = ''
      }
      formData.append(`${key}`, data[key])
    })
    return api.post(ENDPOINT, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  get (id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  updateOrder ( data) {
    return api.post(`${ENDPOINT}/update-orders`, { sliders: data.map(item => ({ id: item.id, order: item.order })) })
  },

  update (id, data) {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    Object.keys(data).forEach(function (key) {
      if (data[key] === 'null' || data[key] === null) {
        data[key] = ''
      }

        if (Array.isArray(data[key])) {
          let arr = data[key]
          for (let i = 0; i < arr.length; i++) {
            formData.append(`${key}[${i}]`, arr[i])
          }
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

  remove (id) {
    return api.delete(`${ENDPOINT}/${id}`)
  },
}
