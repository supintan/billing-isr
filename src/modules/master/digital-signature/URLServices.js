import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.digital_signature = {
  index: `${baseURLService}/isr_digital_signature/api/index`,
  store: `${baseURLService}/isr_digital_signature/api/store`,
}
URLModule.position = {
  index: `${baseURLService}/position/api/index`,
}

export default URLModule
