import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.fine = {
  show: `${baseURLService}/isr_fine/api/show`,
  index: `${baseURLService}/isr_fine/api/index`,
  store: `${baseURLService}/isr_fine/api/store`,
  download: `${baseURLService}/isr_fine/api/download`,
  destroy: `${baseURLService}/isr_fine/api/destroy`,
  update: `${baseURLService}/isr_fine/api/update`,
}

export default URLModule
