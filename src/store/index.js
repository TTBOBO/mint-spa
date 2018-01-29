import Vue from 'vue'
import Vuex from 'vuex'

import globel from './modules/globel'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		globel
	}
})

export default store