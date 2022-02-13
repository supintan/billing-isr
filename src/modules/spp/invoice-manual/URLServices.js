import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.manual_invoice = {
  index: `${baseURLService}/isr_manual_invoice/api/index`,
  store: `${baseURLService}/isr_manual_invoice/api/store`,
  get: `${baseURLService}/isr_manual_invoice/api/show`,
//   update: `${baseURLService}/manual_invoice/api/update`,
//   destroy: `${baseURLService}/manual_invoice/api/destroy`,
}

URLModule.manual_invoice_isr_application = {
  index_by_client_id: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}

URLModule.client_invoice_manual = {
  index: `${baseURLService}/isr_client/api/index`,
}

URLModule.isr_invoice_submission = {
  index: `${baseURLService}/isr_invoice_submission/api/index`,
  show: `${baseURLService}/isr_invoice_submission/api/show`,
  // store: `${baseURLService}/isr_invoice_submission/api/store`,
  approve: `${baseURLService}/isr_invoice_submission/api/approve`,
  reject: `${baseURLService}/isr_invoice_submission/api/reject`,
}

export default URLModule
