import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.dashboard = {
  index: `${baseURLService}/isr_dashboard/api/index`,
}

export default URLModule
