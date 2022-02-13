import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.employee = {
  index: `${baseURLService}/isr_employee/api/index`,
  getUserDetail: `${baseURLService}/isr_employee/api/get`,
  getRole: `${baseURLService}/isr_role/api/index`,
  store: `${baseURLService}/isr_employee/api/store`,
  update: `${baseURLService}/isr_employee/api/update`,
  destroy: `${baseURLService}/isr_employee/api/destroy`,
}

export default URLModule
