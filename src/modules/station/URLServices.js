import { baseURL } from '@/services/UrlConfig'

const baseURLService = baseURL

const URLModule = {}

URLModule.isr_station_registrations = {
  index: `${baseURLService}/isr_station_registrations/api/index`,
  upload: `${baseURLService}/isr_station_registrations/api/upload`,
  download: `${baseURLService}/isr_station_registrations/api/download`,
  destroy: `${baseURLService}/isr_station_registrations/api/destroy`,
}

URLModule.isr_station_registrations_detail = {
  index: `${baseURLService}/isr_station_registration_details/api/index`,
  get: `${baseURLService}/isr_station_registration_details/api/get`,
}

export default URLModule
