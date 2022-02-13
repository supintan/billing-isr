import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.manual_payment_submission = {
  index: `${baseURLService}/isr_manual_payment_submission/api/index`,
  store: `${baseURLService}/isr_manual_payment_submission/api/store`,
  get: `${baseURLService}/isr_manual_payment_submission/api/show`,
  approve: `${baseURLService}/isr_manual_payment_submission/api/approve`,
  reject: `${baseURLService}/isr_manual_payment_submission/api/reject`,
  download: `${baseURLService}/isr_manual_payment_submission/api/download`,
}

URLModule.ManualPaymentMinisterialDecreeByClient = {
  index: `${baseURLService}/isr_application/api/index`,
}

URLModule.applicationIdByMinisterialDecree = {
  index: `${baseURLService}/isr_application/api/index_by_ministerial_decree_id`,
}

URLModule.sppByApplicationId = {
  index: `${baseURLService}/isr_invoice/api/index_by_application_id`,
}

URLModule.applicationId = {
  index: `${baseURLService}/isr_application/api/index_core`,
}

URLModule.applicationByClient = {
  index: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}

URLModule.PaymentManualSPP = {
  get: `${baseURLService}/isr_invoice/api/get_open_invoices`,
  show: `${baseURLService}/isr_invoice/api/show`,
}

URLModule.PaymentManualSPPListById = {
  get: `${baseURLService}/isr_invoice/api/index_by_client_id`,
}

URLModule.ClientManualInvoicePayment = {
  index: `${baseURLService}/isr_client/api/index`,
}

export default URLModule
