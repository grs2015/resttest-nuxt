export default {
  setMetaLinksUser({ commit }, metaData) {
    commit('setMetaLinksUser', metaData)
  },

  storeUser(_, userData) {
    const customerIndex = userData.routeData.customerIdentifier

    return this.$axios.$post(`/api/customers/${customerIndex}/users`, userData.commonData)
  },

  deleteUser(_, deleteUserData) {
    const { customer_id, user_id } = deleteUserData
    return this.$axios.$delete(`/api/customers/${customer_id}/users/${user_id}`)
  },

  getSearchData({ getters }, searchData) {
    return this.$axios.$get(`/api/admin/users?search=${searchData}`)
  },

  getPaginatedData({ commit }, paginateParams) {
    const { page, itemsPerPage, sortBy, sortDesc } = paginateParams
    console.log(paginateParams)
    let sortColumn = (sortBy[0] === 'user_first_name') ? 'first_name'
      : (sortBy[0] === 'user_last_name') ? 'last_name' : ''
    let sortDirect = (sortDesc[0]) ? 'desc' : 'asc'
    let sortQuery = sortColumn ? (sortColumn + '=' + sortDirect) : ''
    return this.$axios.$get(`/api/admin/users?per_page=${itemsPerPage}&page=${page}&${sortQuery}`)
  },
}
