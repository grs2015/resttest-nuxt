import customerGetters from './customers/getters'
import customerMutations from './customers/mutations'
import customerActions from './customers/actions'

export const state = () => ({
  currentCustomer: {},
  allRegions: [],
  allBranches: [],
  allCustomers: [],
  links: {},
  meta: {}
})

export const getters = customerGetters
export const mutations = customerMutations
export const actions = customerActions


