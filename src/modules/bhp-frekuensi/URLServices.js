import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.BHPFrekuensi = {
  index: `${baseURLService}/isr_bhp_formula_regulation/api/index`,
  get: `${baseURLService}/isr_bhp_formula_regulation/api/show`,
  store: `${baseURLService}/isr_bhp_formula_regulation/api/store`,
  update: `${baseURLService}/isr_bhp_formula_regulation/api/update`,
  destroy: `${baseURLService}/isr_bhp_formula_regulation/api/destroy`,
  download: `${baseURLService}/isr_bhp_formula_regulation/api/download`,
}

URLModule.isr_bhp_formula = {
  index: `${baseURLService}/isr_bhp_formula/api/index`,
  get: `${baseURLService}/isr_bhp_formula/api/show`,
  update: `${baseURLService}/isr_bhp_formula/api/update`,
  store: `${baseURLService}/isr_bhp_formula/api/store`,
  destroy: `${baseURLService}/isr_bhp_formula/api/destroy`,
}

export default URLModule
