import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.fine_relaxation = {
  index: `${baseURLService}/isr_fine_relaxation/api/index`,
  store: `${baseURLService}/isr_fine_relaxation/api/store`,
  get: `${baseURLService}/isr_fine_relaxation/api/show`,
  download: `${baseURLService}/isr_fine_relaxation/api/download`,
}

URLModule.fine_relaxation_invoice = {
  get_open_invoice: `${baseURLService}/isr_fine_relaxation_invoice/api/get_open_invoices`,
  store: `${baseURLService}/isr_fine_relaxation_invoice/api/store`,
}

export default URLModule
