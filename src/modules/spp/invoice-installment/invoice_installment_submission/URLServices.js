import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.installment_submission = {
  index: `${baseURLService}/isr_installment_submission/api/index`,
  store: `${baseURLService}/isr_installment_submission/api/store`,
  get: `${baseURLService}/isr_installment_submission/api/show`,
  approve: `${baseURLService}/isr_installment_submission/api/approve`,
  reject: `${baseURLService}/isr_installment_submission/api/reject`,
  download: `${baseURLService}/isr_installment_submission/api/download`,
}

URLModule.installment_invoice = {
  index: `${baseURLService}/isr_installment_invoice/api/index`,
  store: `${baseURLService}/isr_installment_invoice/api/store`,
}

export default URLModule
