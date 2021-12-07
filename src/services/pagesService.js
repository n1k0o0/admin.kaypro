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

  updateAboutPage(id,data) {
    const formData = new FormData()
    formData.append('_method','PUT')
    Object.keys(data).forEach(function (key) {
      if (!(data[key] instanceof File) && (key==='logo' || key==='contentImage_1' || key==='contentImage_2') && data[key]!=='' && data[key]!==null) {
        return
      }
      if (data[key] instanceof Object && !(data[key] instanceof File)){
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
