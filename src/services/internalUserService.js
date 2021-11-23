import api from './api'

const ENDPOINT = '/moderators'
export default {
  USER_TYPES: {
    admin    : 'Админ',
    moderator: 'Модератор',
  },

  USER_STATUSES: {
    email_verification: 'Не подтвержден',
    active            : 'Активен',
    disabled          : 'Заблокирован',
  },


  getUserType (type) {
    return this.USER_TYPES[type]
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

  removeUser(id) {
    return api.delete(`${ENDPOINT}/${id}`)
  },

  getUser(id) {
    return api.get(`${ENDPOINT}/${id}`)
  },

  updateUser(id,data) {
    return api.put(`${ENDPOINT}/${id}`,data)
  },

  createUser(data) {
    return api.post(ENDPOINT,data)
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
