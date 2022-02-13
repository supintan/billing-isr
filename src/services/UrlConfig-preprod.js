// Base URL for Backend
// const base = 'https://pre-prod.backend.billing-isr.sdppi.go.id'
const base = 'http://103.17.164.91/billing-isr/backend'

// Default Services
const defaultURLConfig = {}

// Auth
defaultURLConfig.Auth = {
  login: `${base}/isr_auth/api/login`,
  setSessionRole: `${base}/isr_auth/api/setSessionRole`,
  updateSession: `${base}/isr_auth/api/updateSessionRole`,
  updatePassword: `${base}/isr_user/api/change_password`,
  logout: `${base}/isr_auth/api/logout`,
}

defaultURLConfig.Role = {
  index: `${base}/isr_acl/api/getPrivileges`,
}

// Master - Posisi
defaultURLConfig.position = {
  index: `${base}/isr_position/api/index`,
}

defaultURLConfig.client = {
  index: `${base}/isr_client/api/index`,
}

// Export into URL
export const URLServices = defaultURLConfig

export const baseURL = base

export const TokenType = 'Bearer'

export function getToken() {
  const token = localStorage.getItem('accessToken')
  return token
}
