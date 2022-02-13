import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.invoiceManagement = {
  index: `${baseURLService}/isr_invoice/api/index`,
  show: `${baseURLService}/isr_invoice/api/show`,
  download: `${baseURLService}/isr_invoice/api/download`,
}

export default URLModule
