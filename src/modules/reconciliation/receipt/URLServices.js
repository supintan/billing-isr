import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.revenue_reconciliation = {
  index: `${baseURLService}/isr_revenue_reconciliation/api/index`,
  download: `${baseURLService}/isr_revenue_reconciliation/api/download`,
}

export default URLModule
