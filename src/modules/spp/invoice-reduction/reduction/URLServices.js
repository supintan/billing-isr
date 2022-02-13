import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.reduction = {
  index: `${baseURLService}/isr_reduction/api/index`,
  store: `${baseURLService}/isr_reduction/api/store`,
  get: `${baseURLService}/isr_reduction/api/show`,
  download: `${baseURLService}/isr_reduction/api/download`,
}

URLModule.reduction_application = {
  index_core_by_client_id: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}

URLModule.reduction_ministerial_decree = {
  index: `${baseURLService}/isr_ministerial_decree/api/index`,
}

URLModule.reduction_invoice = {
  get: `${baseURLService}/isr_invoice/api/get_open_invoices`,
  store: `${baseURLService}/isr_invoice/api/store`,
}

export default URLModule
