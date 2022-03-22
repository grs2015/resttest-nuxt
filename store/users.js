import UserGetters from './users/getters'
import UserActions from './users/actions'
import UserMutations from './users/mutations'

export const state = () => ({
  currentUser: {},
  links: {},
  meta: {}
})

export const getters = UserGetters
export const mutations = UserMutations
export const actions = UserActions
