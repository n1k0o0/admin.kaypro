import api from './api'

const ENDPOINT = '/products'
export default {

  STATUSES: {
    'active': 'Активен',
    'inactive': 'Не активен',
  },

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
    return api.post(ENDPOINT, data)
  },

  get (id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  update (id, data) {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    Object.keys(data).forEach(function (key) {
      if (data[key] === 'null' || data[key] === null) {
        data[key] = ''
      }
      if (key === 'logo_upload') {
        data[key].forEach((el) => {
          if (el.raw) {
            formData.append(`${key}[]`, el.raw)
          }
        })
      } else {
        if (Array.isArray(data[key])) {

          let arr = data[key]

          for (let i = 0; i < arr.length; i++) {
            formData.append(`${key}[${i}]`, arr[i])
          }

          return
        }
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
