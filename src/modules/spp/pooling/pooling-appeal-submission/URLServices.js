import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.hkppoolingappealsubmission = {
  index: `${baseURLService}/isr_pooling_appeal_submission/api/index`,
  store: `${baseURLService}/isr_pooling_appeal_submission/api/store`,
  get: `${baseURLService}/isr_pooling_appeal_submission/api/get`,
  approve: `${baseURLService}/isr_pooling_appeal_submission/api/approve`,
  reject: `${baseURLService}/isr_pooling_appeal_submission/api/reject`,
  get_pooling_application_list: `${baseURLService}/isr_pooling_appeal_submission/api/get_pooling_application_list`,
}

export default URLModule
