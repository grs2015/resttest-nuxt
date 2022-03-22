export default {
  setAllRegions(state, allRegions) {
    state.allRegions = allRegions
  },
  setAllBranches(state, allBranches) {
    state.allBranches = allBranches
  },
  setCurrentCustomer(state, customerData) {
    state.currentCustomer = customerData
  },
  setMetaLinksCustomer(state, metaData) {
    state.links = metaData.links
    state.meta = metaData.meta
  },
  setAllCustomers(state, allCustomers) {
    state.allCustomers = allCustomers
  }
}
