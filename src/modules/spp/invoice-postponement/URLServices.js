import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.postponement = {
  index: `${baseURLService}/isr_postponement/api/index`,
  store: `${baseURLService}/isr_postponement/api/store`,
  get: `${baseURLService}/isr_postponement/api/show`,
  download: `${baseURLService}/isr_postponement/api/download`,
  // destroy: `${baseURLService}/postponement/destroy`,
}

URLModule.postponement_appeal = {
  index: `${baseURLService}/isr_postponement_appeal_submission/api/index`,
  store: `${baseURLService}/isr_postponement_appeal_submission/api/store`,
  get: `${baseURLService}/isr_postponement_appeal_submission/api/show`,
  approve: `${baseURLService}/isr_postponement_appeal_submission/api/approve`,
  reject: `${baseURLService}/isr_postponement_appeal_submission/api/reject`,
}

URLModule.postponement_submission = {
  index: `${baseURLService}/isr_postponement_submission/api/index`,
  store: `${baseURLService}/isr_postponement_submission/api/store`,
  get: `${baseURLService}/isr_postponement_submission/api/show`,
  approve: `${baseURLService}/isr_postponement_submission/api/approve`,
  reject: `${baseURLService}/isr_postponement_submission/api/reject`,
  download: `${baseURLService}/isr_postponement_submission/api/download`,
}

URLModule.applicationAPI = {
  index_by_client_id: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}

URLModule.invoiceAPI = {
  get: `${baseURLService}/isr_invoice/api/get_open_invoices`,
}

URLModule.ministerial_decreeAPI = {
  index: `${baseURLService}/ministerial_decree/api/index`,
}

export default URLModule
