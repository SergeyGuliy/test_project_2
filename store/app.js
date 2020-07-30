export const state = () => ({
  activeLanguage: '',
  errorStatus: false,
  errorType: '',
  errorMessage: '',
})

export const getters = {}

export const mutations = {
  toggleLang(state, lang) {
    state.activeLanguage = lang;
    this.$cookies.set('lang', lang)
  },
  setError(state, {type = 'info', message = 'UNKNOWN MESSAGE'}) {
    state.errorMessage = message
    state.errorType = type
    state.errorStatus = true
  },
  closeModal(state){
    state.errorStatus = false
  }
}
