import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.reduction_submission = {
  index: `${baseURLService}/isr_reduction_submission/api/index`,
  approve: `${baseURLService}/isr_reduction_submission/api/approve`,
  reject: `${baseURLService}/isr_reduction_submission/api/reject`,
  get: `${baseURLService}/isr_reduction_submission/api/show`,
  download: `${baseURLService}/isr_reduction_submission/api/download`,
}

URLModule.reduction_submission_invoice = {
  store: `${baseURLService}/isr_reduction_invoice/api/store`,
  index: `${baseURLService}/isr_reduction_invoice/api/index`,
}

export default URLModule
