import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.invoice_email = {
  index: `${baseURLService}/isr_invoice_email/api/index`,
  get: `${baseURLService}/isr_invoice_email/api/show`,
}

export default URLModule
