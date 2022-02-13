import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import store from './store/Store'
import router from './router/Router'
import './assets/scss/style.scss'
import FeatherIcon from './components/feather-icon/FeatherIcon.vue'

import App from './App.vue'
import VueFeather from 'vue-feather'
import InstantSearch from 'vue-instantsearch'
// i18n
import i18n from './i18n/i18n.js'
import 'vue-hljs/dist/style.css'

import VueClipboard from 'vue-clipboard2'

// Modules
import { modulesData } from './modules.js'
import { registerModules } from './register-modules.js'
registerModules(modulesData)

Vue.use(VueFeather)

Vue.config.productionTip = false

import vueHljs from 'vue-hljs'
import hljs from 'highlight.js'

//use
Vue.use(vueHljs, { hljs })
Vue.use(InstantSearch)

Vue.use(VueClipboard)

// Vue Debounce
import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)

// Roles and Permissions
import { abilitiesPlugin } from '@casl/vue'
import ability from './config/Ability'
// import getAbility from './services/Ability'

// getAbility()
// .then(data => {
//     if (data) ability.update(data.action)
// })

Vue.component(FeatherIcon.name, FeatherIcon)

Vue.config.productionTip = false

Vue.use(abilitiesPlugin, ability)

new Vue({
  store,
  router,
  i18n,
//   ability,
  render: h => h(App),
}).$mount('#app')
