import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.mutation = {
  index: `${baseURLService}/isr_mutation/api/generate_report`,
  download: `${baseURLService}/isr_mutation/api/download`,
}

export default URLModule
