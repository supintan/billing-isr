import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.role = {
  index: `${baseURLService}/isr_role/api/index`,
  store: `${baseURLService}/isr_role/api/store`,
  update: `${baseURLService}/isr_role/api/update`,
  destroy: `${baseURLService}/isr_role/api/destroy`,
  user_list: `${baseURLService}/isr_role/api/user_list`,
  menu_list: `${baseURLService}/isr_role/api/menu_list`,
}

export default URLModule
