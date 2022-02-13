import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.externalAPILog = {
  index: `${baseURLService}/isr_external_api_log/api/index`,
  show: `${baseURLService}/isr_external_api_log/api/show`,
}

export default URLModule
