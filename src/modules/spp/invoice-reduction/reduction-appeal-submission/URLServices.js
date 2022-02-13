import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.reduction_appeal_submission = {
  index: `${baseURLService}/isr_reduction_appeal_submission/api/index`,
  get: `${baseURLService}/isr_reduction_appeal_submission/api/show`,
  approve: `${baseURLService}/isr_reduction_appeal_submission/api/approve`,
  reject: `${baseURLService}/isr_reduction_appeal_submission/api/reject`,
}

export default URLModule
