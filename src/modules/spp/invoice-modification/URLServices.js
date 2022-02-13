import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.modification_appeal = {
  index: `${baseURLService}/isr_modification_appeal/api/index`,
  show: `${baseURLService}/isr_modification_appeal/api/show`,
  update: `${baseURLService}/isr_modification_appeal/api/update`,
  download: `${baseURLService}/isr_modification_appeal/api/download`,
}

export default URLModule
