import axios from 'axios'

// Fetching Token from local Storage
const tokenType = 'beare'

const token = localStorage.getItem('accessToken')

const baseURL = 'http://backend.billing-ipfr.sdppi.go.id'

const Config = {
  url: {
    login: `${baseURL}/auth/api/login`,
    setSessionRole: `${baseURL}/auth/api/setSessionRole`,
    chekStep2: `${baseURL}/index.php?param=step2`,
    validityToken: `${baseURL}/index.php?param=cek-token`,
    acl: `${baseURL}/acl/api/getPrivileges`,
    logout: `${baseURL}/auth/api/logout`,
  },
}

//     userManagement: {
//       index: `${baseURL}/user/api/index`,
//       getUserDetail: `${baseURL}/user/api/get`,
//       getRole: `${baseURL}/role/api/index`,
//       store: `${baseURL}/user/api/store`,
//       update: `${baseURL}/user/api/update`,
//       destroy: `${baseURL}/user/api/destroy`,
//     },
//     employee: {
//       index: `${baseURL}/employee/api/index`,
//       getUserDetail: `${baseURL}/employee/api/get`,
//       getRole: `${baseURL}/role/api/index`,
//       store: `${baseURL}/employee/api/store`,
//       update: `${baseURL}/employee/api/update`,
//       destroy: `${baseURL}/employee/api/destroy`,
//     },
//     position: {
//       getPosition: `${baseURL}/position/api/index`,
//     },
//     service_subservice: {
//       index: `${baseURL}/service_subservice/api/index`,
//       getData: `${baseURL}/service_subservice/api/get`,
//       update: `${baseURL}/service_subservice/api/update`,
//     },
//     formula: {
//       index: `${baseURL}/formula/api/index`,
//     },
//     digital_signature: {
//       index: `${baseURL}/digital_signature/api/index`,
//     },
//     invoice: {
//       index: `${baseURL}/invoice/api/index`,
//     },
//     configuration: {
//       index: `${baseURL}/config/api/index`,
//       get: `${baseURL}/config/api/get`,
//       update: `${baseURL}/config/api/update`,
//     },
//     // client: {
//     //   index: `${baseURL}/client/api/index`,
//     //   get: `${baseURL}/client/api/get`,
//     // },
//     province: {
//       index: `${baseURL}/province/api/index`,
//       get: `${baseURL}/province/api/get`,
//     },
//     district: {
//       index: `${baseURL}/district/api/index`,
//       get: `${baseURL}/district/api/get`,
//     },
//     city: {
//       index: `${baseURL}/city/api/index`,
//       get: `${baseURL}/city/api/get`,
//     },
//     zone: {
//       index: `${baseURL}/zone/api/index`,
//       get: `${baseURL}/zone/api/get`,
//     },
//     calculation: {
//       BiRate: `${baseURL}/calculator/api/Calculate_Invoice_Bi_Rate`,
//       NKICB: `${baseURL}/calculator/api/Calculate_Invoice_NKICB`,
//       ISR_IPFR: `${baseURL}/calculator/api/Calculate_Invoice_Isr_Ipfr`,
//       delta: `${baseURL}/calculator/api/Calculate_Invoice_Delta_Isr_Ipfr`,
//     },
//     simulation: {
//       index: `${baseURL}/simulation/api/index`,
//       store: `${baseURL}/simulation/api/store`,
//       get: `${baseURL}/simulation/api/get`,
//       update: `${baseURL}/simulation/api/update`,
//       destroy: `${baseURL}/simulation/api/destroy`,
//     },
//     // ministerial_decree: {
//     //   index: `${baseURL}/ministerial_decree/api/index`,
//     // },
//     decree_mechanism: {
//       index: `${baseURL}/decree_mechanism/api/index`,
//     },
//     decree_mechanism_formula: {
//       index: `${baseURL}/decree_mechanism_formula/api/index`,
//     },
//     application: {
//       index: `${baseURL}/application/api/index`,
//       store: `${baseURL}/application/api/store`,
//       get: `${baseURL}/application/api/get`,
//     },
//     template: {
//       index: `${baseURL}/template/api/index`,
//       store: `${baseURL}/template/api/store`,
//       get: `${baseURL}/template/api/get`,
//       download: `${baseURL}/template/api/download`,
//       update: `${baseURL}/template/api/update`,
//       destroy: `${baseURL}/template/api/destroy`,
//       type: `${baseURL}/template_type/api/index`,
//       parameter: `${baseURL}/template_parameter/api/index_by_template_type_id`,
//       history: `${baseURL}/template_history/api/index`,
//       history_download: `${baseURL}/template_history/api/download`,
//     },
//     externalPaymentGatewayLog: {
//       index: `${baseURL}/external_api_payment_gateway_log/api/index`,
//       get: `${baseURL}/external_api_payment_gateway_log/api/get`,
//     },
//     externalAPILog: {
//       index: `${baseURL}/external_api_log/api/index`,
//       get: `${baseURL}/external_api_log/api/get`,
//     },
//     externalDatawareHouseLog: {
//       index: `${baseURL}/external_api_datawarehouse_log/api/index`,
//       get: `${baseURL}/external_api_datawarehouse_log/api/get`,
//     },
//     k_value: {
//       index: `${baseURL}/k_value/api/index`,
//       store: `${baseURL}/k_value/api/store`,
//       get: `${baseURL}/k_value/api/get`,
//       update: `${baseURL}/k_value/api/update`,
//       download: `${baseURL}/k_value/api/download`,
//       destroy: `${baseURL}/k_value/api/destroy`,
//     },
//     k_value_frequency: {
//       index: `${baseURL}/k_value_frequency/api/index`,
//       store: `${baseURL}/k_value_frequency/api/store`,
//       get: `${baseURL}/k_value_frequency/api/get`,
//       update: `${baseURL}/k_value_frequency/api/update`,
//       destroy: `${baseURL}/k_value_frequency/api/destroy`,
//     },
//     bts_registration: {
//       index: `${baseURL}/bts_registrations/api/index`,
//       upload: `${baseURL}/bts_registrations/api/upload`,
//       download: `${baseURL}/bts_registrations/api/download`,
//       destroy: `${baseURL}/bts_registrations/api/destroy`,
//     },
//     bts_registration_detail: {
//       index: 'http://backend.billing-ipfr.sdppi.go.id/bts_registration_details/api/index',
//     },
//     // fine: {
//     //   get: `${baseURL}/fine/api/get`,
//     //   index: `${baseURL}/fine/api/index`,
//     //   store: `${baseURL}/fine/api/store`,
//     //   download: `${baseURL}/fine/api/download`,
//     //   destroy: `${baseURL}/fine/api/destroy`,
//     //   update: `${baseURL}/fine/api/update`,
//     // },
//     service_zone: {
//       get: `${baseURL}/service_zone/api/get`,
//       index: `${baseURL}/service_zone/api/index`,
//       store: `${baseURL}/service_zone/api/store`,
//       download: `${baseURL}/service_zone/api/download`,
//       destroy: `${baseURL}/service_zone/api/destroy`,
//       update: `${baseURL}/service_zone/api/update`,
//     },
//     c_value: {
//       index: 'http://backend.billing-ipfr.sdppi.go.id/c_value/api/index',
//       store: 'http://backend.billing-ipfr.sdppi.go.id/c_value/api/store',
//       get: 'http://backend.billing-ipfr.sdppi.go.id/c_value/api/get',
//       update: 'http://backend.billing-ipfr.sdppi.go.id/c_value/api/update',
//       destroy: 'http://backend.billing-ipfr.sdppi.go.id/c_value/api/destroy',
//       download: 'http://backend.billing-ipfr.sdppi.go.id/c_value/api/download',
//     },
//     c_value_population: {
//       index: 'http://backend.billing-ipfr.sdppi.go.id/c_value_population/api/index',
//       store: 'http://backend.billing-ipfr.sdppi.go.id/c_value_population/api/store',
//       get: 'http://backend.billing-ipfr.sdppi.go.id/c_value_population/api/get',
//       update: 'http://backend.billing-ipfr.sdppi.go.id/c_value_population/api/update',
//     },
//     n_value: {
//       index: 'http://backend.billing-ipfr.sdppi.go.id/n_value/api/index',
//       store: 'http://backend.billing-ipfr.sdppi.go.id/n_value/api/store',
//       get: 'http://backend.billing-ipfr.sdppi.go.id/n_value/api/get',
//       update: 'http://backend.billing-ipfr.sdppi.go.id/n_value/api/update',
//       download: 'http://backend.billing-ipfr.sdppi.go.id/n_value/api/download',
//       destroy: 'http://backend.billing-ipfr.sdppi.go.id/n_value/api/destroy',
//     },
//     province_service_zone: {
//       index: 'http://backend.billing-ipfr.sdppi.go.id/province_service_zone/api/index',
//       get: 'http://backend.billing-ipfr.sdppi.go.id/province_service_zone/api/get',
//       update: 'http://backend.billing-ipfr.sdppi.go.id/province_service_zone/api/update',
//     },
//     // base_price: {
//     //   get: `${baseURL}/ipfr_frequency_base_price/api/get`,
//     //   index: `${baseURL}/ipfr_frequency_base_price/api/index`,
//     //   store: `${baseURL}/ipfr_frequency_base_price/api/store`,
//     //   download: `${baseURL}/ipfr_frequency_base_price/api/download`,
//     //   destroy: `${baseURL}/ipfr_frequency_base_price/api/destroy`,
//     //   update: `${baseURL}/ipfr_frequency_base_price/api/update`,
//     // },
//     // base_price_detail: {
//     //   get: `${baseURL}/ipfr_frequency_base_price_detail/api/get`,
//     //   index: `${baseURL}/ipfr_frequency_base_price_detail/api/index`,
//     //   store: `${baseURL}/ipfr_frequency_base_price_detail/api/store`,
//     //   destroy: `${baseURL}/ipfr_frequency_base_price_detail/api/destroy`,
//     //   update: `${baseURL}/ipfr_frequency_base_price_detail/api/update`,
//     // },

//     // API LOG
//     external_api_log: {
//       index: `${baseURL}/external_api_log/api/index`,
//       get: `${baseURL}/external_api_log/api/get`,
//     },

//     // Report
//     upfront_fee_payment_report: {
//       index: `${baseURL}/upfront_fee_payment_report/api/index`,
//     },

//     accessTokenLocal: token,
//   },
// }

// Base URL
const apiBaseURL = 'http://billing-ipfr.sdppi.go.id'

// Initiation Configuration before Request
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
const Req = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  method: 'POST',
})

// Method to handling when error occures during request
const Handling = error => {
  const result = {
    icon: 'WarningIcon',
    status: 'warning',
    message: '',
  }
  let errorMessage = ''
  let errorCode = ''

  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    switch (error.response.status) {
      case 404:
        errorMessage = 'Sistem tidak dapat dijangkau.'
        break
      case 408:
        errorMessage = 'Sistem merespon terlalu lama.'
        break
      case 401:
        errorMessage = 'anda belum diautorisasi.'
        break
      case 403:
        errorMessage = 'anda tidak diizinkan melakukan aksi ini.'
        break
      default:
        errorMessage = 'Kesalahan Sistem'
        break
    }
    errorCode = `[Error Code: ${error.response.status}]`
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    errorMessage = 'Tidak dapat menjangkau Sistem'
    errorCode = '[Error Code: CORS]'
  } else {
    // Something happened in setting up the request and triggered an Error
    // console.log('Error', error.message)
    errorMessage = 'Kesalahan internal. Mohon ulangi beberapa saat kembali.'
    errorCode = '[Internal Error]'
  }

  result.message = `Maaf, ${errorMessage} ${errorCode}`
  return result
}

const setItem = (name, value) => {
  localStorage.setItem(name, value)
}

export default {
  Config,
  Req,
  tokenType,
  token,
  Handling,
  setItem,
}
