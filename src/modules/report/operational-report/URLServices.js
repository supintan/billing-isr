import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.isr_operational_report = {
  index: `${baseURLService}/isr_operational_report/api/index`,
  show: `${baseURLService}/isr_operational_report/api/show`,
  download: `${baseURLService}/isr_operational_report/api/download`,
}

export default URLModule