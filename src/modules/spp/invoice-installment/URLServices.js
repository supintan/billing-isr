import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.installment = {
  index: `${baseURLService}/isr_installment/api/index`,
  store: `${baseURLService}/isr_installment/api/store`,
  get: `${baseURLService}/isr_installment/api/show`,
  update: `${baseURLService}/isr_installment/api/update`,
  destroy: `${baseURLService}/installment/api/destroy`,
  download: `${baseURLService}/isr_installment/api/download`,
  downloadZip: `${baseURLService}/isr_installment/api/download_supporting_documents`,
  installment_calculate: `${baseURLService}/isr_installment/api/isr_installment_calculate`,
}

// URLModule.application = {
//   indexOld: `${baseURLService}/application/api/index`,
// }

URLModule.invoiceGetOpenInvoice = {
  get_open_invoice: `${baseURLService}/isr_invoice/api/get_open_invoices`,
}

URLModule.installment_invoice = {
  get: `${baseURLService}/installment_invoice/api/get`,
}

URLModule.applicationIdByClientID = {
  index_core_by_client_id: `${baseURLService}/isr_application/api/index_core_by_client_id`,
}
// URLModule.application = {
//   index_core: `${baseURLService}/application/api/index_core`,
// }
export default URLModule
