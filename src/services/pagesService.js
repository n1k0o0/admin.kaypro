import api from './api'
import { ElNotification } from 'element-plus'

const ENDPOINT = '/pages'
export default {

  loadPages (search, page = null, limit = null) {
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

  update(id,data) {
    const formData = new FormData()
    formData.append('_method','PUT')
    Object.keys(data).forEach(function (key) {
      if(data[key]==='null' || data[key]===null) {
        data[key]=''
      }
      if (key === 'instagram') {
        data[key].forEach((el) => {
          if (el.raw) {
            formData.append(`${key}[]`, el.raw)
          }
        })
      }
      if (key==='deleted_files') {

        let arr = data[key]

        for (let i = 0; i < arr.length; i++) {
          formData.append(`${key}[${i}]`, arr[i])
        }

      }else if (data[key] instanceof Object && !(data[key] instanceof File)){
        formData.append(`${key}`,JSON.stringify( data[key]))
      }else {
        formData.append(`${key}`, data[key])
      }
    })

    return api.post(`${ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(()=>{
      ElNotification({ type: 'success', title: 'Успешно' })
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

}
