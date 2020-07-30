import apiRequest from "~/plugins/apiRequest";

export const state = () => ({
  userData: null,
  companies: null
})

export const getters = {
  getCompanies(state) {
    return !!state.userData ? state.userData.companies : []
  }
}

export const mutations = {
  setUserData(state, data) {
    state.userData = data
  },
  cleanUserData(state) {
    state.userData = null
  },
}

export const actions = {
  async nuxtServerInit({commit, dispatch }, { $cookies, redirect }){
    if (!!$cookies.get('token')) {
      try {
        let res = await apiRequest.get('auth/init', $cookies.get('token'))
        commit('setUserData', res.data)
      } catch (e) {
        // Log out user if auth error
        if (e.response.status === 401) {
          dispatch('logOut')
          redirect('/login')
        }
        else {
          // Other variable errors, 404 ....
        }

      }
    }

    // Set default language to ru, if selected by user is empty
    if ($cookies.get('lang')){
      commit('app/toggleLang', $cookies.get('lang'))
    } else {
      commit('app/toggleLang', 'ru')
    }
  },
  async logOut({commit}) {
    try {
      let res = await apiRequest.logOut('auth/logout')
      if (res.status === 200) {
        commit('cleanUserData')
        this.$cookies.removeAll()
        commit('app/setError', {
          message: 'Вы вышли из ситемы'
        })
      }
    } catch (e) {
      // Some additional logic to log out
      console.dir(e)
    }

  }
}
