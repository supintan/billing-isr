import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.hkppooling = {
  index: `${baseURLService}/isr_pooling/api/index`,
  store: `${baseURLService}/isr_pooling/api/store`,
  // get: `${baseURLService}/isr_pooling/api/get`,
  get: `${baseURLService}/isr_pooling/api/show`,
  download: `${baseURLService}/isr_pooling/api/download`,
}

URLModule.pooling_billing_parameter = {
//   index: `${baseURLService}/simulation/api/index`,
//   store: `${baseURLService}/simulation/api/store`,
//   get: `${baseURLService}/simulation/api/get`,
//   update: `${baseURLService}/simulation/api/update`,
  get_unpublished_invoices: `${baseURLService}/isr_pooling_billing_parameter/api/get_unpublished_invoices`,
  calculate: `${baseURLService}/isr_pooling_billing_parameter/api/calculate`,
}

export default URLModule
