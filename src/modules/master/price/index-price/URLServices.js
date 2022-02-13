import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.index_price = {
  show: `${baseURLService}/isr_index_price_regulations/api/show`,
  index: `${baseURLService}/isr_index_price_regulations/api/index`,
  store: `${baseURLService}/isr_index_price_regulations/api/store`,
  download: `${baseURLService}/isr_index_price_regulations/api/download`,
  destroy: `${baseURLService}/isr_index_price_regulations/api/destroy`,
  update: `${baseURLService}/isr_index_price_regulations/api/update`,
}

URLModule.index_price_detail = {
  get: `${baseURLService}/isr_index_price_details/api/get`,
  index: `${baseURLService}/isr_index_price_details/api/index`,
  store: `${baseURLService}/isr_index_price_details/api/store`,
  destroy: `${baseURLService}/isr_index_price_details/api/destroy`,
  update: `${baseURLService}/isr_index_price_details/api/update`,
  show: `${baseURLService}/isr_index_price_details/api/show`,
}

export default URLModule
