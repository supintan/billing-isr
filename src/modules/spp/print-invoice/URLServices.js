import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.print_invoice = {
  index: `${baseURLService}/isr_print_invoice/api/index`,
  get: `${baseURLService}/isr_print_invoice/api/show`,
  download: `${baseURLService}/isr_print_invoice/api/download`,
}

export default URLModule
