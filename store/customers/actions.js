export default {
  setCurrentCustomer({ commit }, customerData) {
    commit('setCurrentCustomer', customerData)
  },

  storeCustomer(VuexContext, customerData) {
    const branchIndex = customerData.routeData.branchIndex
    const regionIndex = customerData.routeData.regionIndex

    return this.$axios.$post(`/api/branches/${branchIndex}/regions/${regionIndex}/customers`, customerData.commonData)
      .catch(e => console.log(e))
  },

  deleteCustomer(_, customerIndex) {
    return this.$axios.$delete(`/api/admin/customers/${customerIndex}`)
  },

  setMetaLinksCustomer({ commit }, metaData) {
    commit('setMetaLinksCustomer', metaData)
  },

  getPaginatedData({ commit }, paginateParams) {
    const { page, itemsPerPage, sortBy, sortDesc } = paginateParams
    let sortColumn = (sortBy[0] === 'customer_title') ? 'title'
      : (sortBy[0] === 'customer_region') ? 'region'
      : (sortBy[0] === 'customer_branch') ? 'branch' : ''
    let sortDirect = (sortDesc[0]) ? 'desc' : 'asc'
    let sortQuery = sortColumn ? (sortColumn + '=' + sortDirect) : ''
    return this.$axios.$get(`/api/admin/customers?per_page=${itemsPerPage}&page=${page}&${sortQuery}`)
  },

  getSearchData({ getters }, searchData) {
    return this.$axios.$get(`/api/admin/customers?search=${searchData}`)
  },

  setCustomerList({ commit }, customerData) {
    const customerList = []
    customerData.forEach(customer => {
      customerList.push({ id: customer.identifier, title: customer.title })
    })
    commit('setAllCustomers', customerList)
  }


}
