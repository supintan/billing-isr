import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.service = {
    index: `${baseURLService}/isr_service/api/index`,
    getData: `${baseURLService}/isr_service/api/show`,
    update: `${baseURLService}/isr_service/api/update`,
  }
  
  URLModule.service_subservice = {
    index: `${baseURLService}/isr_subservice/api/index`,
    getData: `${baseURLService}/isr_subservice/api/show`,
    update: `${baseURLService}/isr_subservice/api/update`,
  }

export default URLModule