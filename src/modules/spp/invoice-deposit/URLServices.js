import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.invoiceDeposit = {
  index: `${baseURLService}/isr_deposit/api/index`,
  store: `${baseURLService}/isr_deposit/api/store`,
  get: `${baseURLService}/isr_invoice/api/get_settled_invoices`,
  show: `${baseURLService}/isr_deposit/api/show`,
  detail: `${baseURLService}/isr_deposit/api/get`,
  download: `${baseURLService}/isr_deposit/api/download`,
}
URLModule.depositRequest = {
  index: `${baseURLService}/isr_deposit_usage/api/index`,
  store: `${baseURLService}/isr_deposit_usage/api/store`,
  show: `${baseURLService}/isr_deposit_usage/api/show`,
  download: `${baseURLService}/isr_deposit_usage/api/download`,
  getDataTable: `${baseURLService}/isr_deposit_usage/api/get_deposit_list`,
}
URLModule.openInvoivesGet = {
  indexOpenGet: `${baseURLService}/isr_invoice/api/get_open_invoices`,
}

URLModule.depositSubmission = {
  index: `${baseURLService}/isr_deposit_usage_submission/api/index`,
  show: `${baseURLService}/isr_deposit_usage_submission/api/show`,
  download: `${baseURLService}/isr_deposit_usage_submission/api/download`,
  approve: `${baseURLService}/isr_deposit_usage_submission/api/approve`,
  reject: `${baseURLService}/isr_deposit_usage_submission/api/reject`,
}

URLModule.applicationDeposit = {
  indexDeposit: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}

URLModule.client_deposit = {
  index: `${baseURLService}/isr_client/api/index`,
}

URLModule.deposit_isr_application = {
  index_by_client_id: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}

export default URLModule
