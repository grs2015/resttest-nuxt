export const state = () => ({
  snackbar: {
    show: false,
    text: '',
    status: '',
  },
})


export const getters = {
  snackbarState(state) {
    return state.snackbar.show
  },
  snackbarText(state) {
    return state.snackbar.text
  },
  snackbarStatus(state) {
    return state.snackbar.status
  }
}

export const mutations = {
  showSnackBar(state, snackbarObj) {
    state.snackbar.show = true
    state.snackbar.text = snackbarObj.message
    state.snackbar.status = snackbarObj.status
  },
  hideSnackBar(state) {
    state.snackbar.show = false
    state.snackbar.text = ''
    state.snackbar.status = ''
  }
}

export const actions = {
  nuxtServerInit(contextVuex, context) {
    return context.app.$axios.$get('/api/regions')
      .then(data => {
        for (const key in data.data) {
          delete data.data[key].links
        }
        contextVuex.commit('customers/setAllRegions', data.data )
      })
      .then(() => context.app.$axios.$get('/api/branches'))
      .then(data => {
        for (const key in data.data) {
          delete data.data[key].links
        }
        contextVuex.commit('customers/setAllBranches', data.data)
      })
      .catch(e => context.error(e))
  },
  showSnackBar({ commit }, snackbarObj) {
    commit('showSnackBar', snackbarObj)

  },
  hideSnackBar({ commit }) {
    commit('hideSnackBar')
  }
}

