import api from './api'

const ENDPOINT = '/users'
export default {

  USER_STATUSES: {
    email_verification: 'Не подтвержден',
    active            : 'Активен',
    disabled          : 'Заблокирован',
  },

  ENTITY_TYPES: {
    1: 'Да',
    0: 'Нет',
  },

  ENTITY_STATUSES: {
    'not_checked'    : 'Не проверялся',
    'on_verification': 'На проверке',
    'verified'       : 'Подтвержден',
    'rejected'       : 'Отклонен',
  },

  getUserEntityType (type) {
    return this.ENTITY_TYPES[type]
  },

  getUserEntityStatus (type) {
    return this.ENTITY_STATUSES[type]
  },

  getUserStatus (type) {
    return this.USER_STATUSES[type]
  },

  loadUsers (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT, { params })
  },

  removeUser (id) {
    return api.delete(`${ENDPOINT}/${id}`)
  },

  getUser (id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  updateUser (id, data) {
    return api.put(`${ENDPOINT}/${id}`, data)
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
