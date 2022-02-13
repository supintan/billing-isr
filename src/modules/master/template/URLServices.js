import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.template = {
  index: `${baseURLService}/isr_template/api/index`,
  store: `${baseURLService}/isr_template/api/store`,
  get: `${baseURLService}/isr_template/api/get`,
  download: `${baseURLService}/isr_template/api/download`,
  update: `${baseURLService}/isr_template/api/update`,
  destroy: `${baseURLService}/isr_template/api/destroy`,
  type: `${baseURLService}/isr_template_type/api/index`,
  parameter: `${baseURLService}/isr_template_parameter/api/index_by_template_type_id`,
  history: `${baseURLService}/isr_template_history/api/index`,
  history_download: `${baseURLService}/isr_template_history/api/download`,
}

export default URLModule
