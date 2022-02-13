import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.hkppoolingsubmission = {
  index: `${baseURLService}/isr_pooling_submission/api/index`,
  store: `${baseURLService}/isr_pooling_submission/api/store`,
  show: `${baseURLService}/isr_pooling_submission/api/show`,
  approve: `${baseURLService}/isr_pooling_submission/api/approve`,
  reject: `${baseURLService}/isr_pooling_submission/api/reject`,
  download: `${baseURLService}/isr_pooling_submission/api/download`,
}

export default URLModule
