import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.base_price = {
  index: `${baseURLService}/isr_base_price_regulations/api/index`,
  get: `${baseURLService}/isr_base_price_regulations/api/show`,
  store: `${baseURLService}/isr_base_price_regulations/api/store`,
  download: `${baseURLService}/isr_base_price_regulations/api/download`,
  destroy: `${baseURLService}/isr_base_price_regulations/api/destroy`,
  update: `${baseURLService}/isr_base_price_regulations/api/update`,
}

URLModule.base_price_detail = {
  get: `${baseURLService}/isr_base_price_detail/api/show`,
  index: `${baseURLService}/isr_base_price_detail/api/index`,
  store: `${baseURLService}/isr_base_price_detail/api/store`,
  destroy: `${baseURLService}/isr_base_price_detail/api/destroy`,
  update: `${baseURLService}/isr_base_price_detail/api/update`,
}

export default URLModule
