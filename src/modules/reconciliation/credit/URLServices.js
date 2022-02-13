import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.bhp_account_receivable_reconciliation = {
  index: `${baseURLService}/isr_bhp_account_receivable_reconciliation/api/index`,
  download: `${baseURLService}/isr_bhp_account_receivable_reconciliation/api/download`,
}

export default URLModule
