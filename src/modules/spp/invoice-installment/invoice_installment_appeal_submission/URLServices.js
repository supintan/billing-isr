import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.installment_appeal_submission = {
  index: `${baseURLService}/isr_installment_appeal_submission/api/index`,
  store: `${baseURLService}/isr_installment_appeal_submission/api/store`,
  get: `${baseURLService}/isr_installment_appeal_submission/api/show`,
  approve: `${baseURLService}/isr_installment_appeal_submission/api/approve`,
  reject: `${baseURLService}/isr_installment_appeal_submission/api/reject`,
  destroy: `${baseURLService}isr_installment_appeal_submission/api/destroy`,
  update: `${baseURLService}/isr_installment_appeal_submission/api/update`,
  download: `${baseURLService}/isr_installment_appeal_submission/api/download`,
}

export default URLModule
