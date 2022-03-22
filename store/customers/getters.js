export default {
  getCustomerTitle(state) {
    return state.title
  },
  getCustomerBranch(state) {
    return state.branch
  },
  getCustomerRegion(state) {
    return state.region
  },
  getCustomerDescription(state) {
    return state.description
  },
  getCustomerPhone(state) {
    return state.phone
  },
  getCustomerEmail(state) {
    return state.email
  },
  getCustomerWebsite(state) {
    return state.website
  },
  getAllRegions(state) {
    return state.allRegions
  },
  getAllBranches(state) {
    return state.allBranches
  },
  getRegionList(state) {
    const regionArray = []
    state.allRegions.forEach(region => {
      regionArray.push(region.title)
    })
    return regionArray
  },
  getBranchList(state) {
    const branchArray = []
    state.allBranches.forEach(branch => {
      branchArray.push(branch.title)
    })
    return branchArray
  },
  getCurrentCustomer(state) {
    return state.currentCustomer
  },
  getMetaData(state) {
    return state.meta
  },
  getLinksData(state) {
    return state.links
  },
  getCustomerList(state) {
    return state.allCustomers
  }
}
