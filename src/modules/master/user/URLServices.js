import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.user = {
  index: `${baseURLService}/isr_user/api/index`,
  get: `${baseURLService}/isr_user/api/show`,
  getRole: `${baseURLService}/role/api/index`,
  store: `${baseURLService}/isr_user/api/store`,
  update: `${baseURLService}/isr_user/api/update`,
  destroy: `${baseURLService}/isr_user/api/destroy`,
}

export default URLModule
