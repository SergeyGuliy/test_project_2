
export const state = () => ({
  activeLanguage: ''
})

export const getters = {}

export const mutations = {
  toggleLang(state, lang) {
    state.activeLanguage = lang;
    localStorage.setItem('lang', lang)
  }
}

export const actions = {}
