import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.externalPaymentGatewayLog = {
  index: `${baseURLService}/isr_external_api_payment_gateway_log/api/index`,
  show: `${baseURLService}/isr_external_api_payment_gateway_log/api/show`,
}
export default URLModule
