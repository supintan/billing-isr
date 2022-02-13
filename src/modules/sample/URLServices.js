import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.sample = {
  index: `${baseURLService}/sample/api/index`,
  get: `${baseURLService}/sample/api/get`,
}

export default URLModule
