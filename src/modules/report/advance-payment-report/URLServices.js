import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.upfront_fee_payment_report = {
  index: `${baseURLService}/isr_upfront_fee_payment_report/api/index`,
}

export default URLModule
