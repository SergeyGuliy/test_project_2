
export const state = () => ({
  activeLanguage: ''
})

export const getters = {}

export const mutations = {
  toggleLang(state, lang) {
    state.activeLanguage = lang;
    this.$cookies.set('lang', lang)
  }
}

export const actions = {}
