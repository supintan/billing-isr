import router from './router/Router'
import { URLServices } from './services/UrlConfig'

// Remove because unused
// import store from "./store";
// if (module.store) {
//  store.registerModule(name, module.store);
// }

const registerModule = module => {
  if (module.URLModule) {
    Object.keys(module.URLModule).forEach(key => {
      URLServices[key] = module.URLModule[key]
    })
  }

  if (module.router) {
    module.router(router)
  }
}

export const test = ax => ax

export const registerModules = modules => {
  Object.keys(modules).forEach(moduleKey => {
    const module = modules[moduleKey]
    registerModule(module)
  })
}
