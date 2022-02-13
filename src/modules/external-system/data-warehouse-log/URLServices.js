import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.externalDatawareHouseLog = {
  index: `${baseURLService}/isr_external_api_datawarehouse_log/api/index`,
  show: `${baseURLService}/isr_external_api_datawarehouse_log/api/show`,
}

export default URLModule
