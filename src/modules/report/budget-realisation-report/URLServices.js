import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.isr_lra = {
  index_recap: `${baseURLService}/isr_lra/api/index_recap`,
  index_h2h_isr: `${baseURLService}/isr_lra/api/index_h2h_isr`,
  index_non_h2h_isr: `${baseURLService}/isr_lra/api/index_non_h2h_isr`,
}

export default URLModule
