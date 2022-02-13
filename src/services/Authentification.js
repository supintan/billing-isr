import axios from 'axios'
import { URLServices, getToken, TokenType } from './UrlConfig'
import uuid from 'uuid'
import DateConvertion from '@/helpers/date-convertion'

const AuthServices = {
  async login(username, password) {
    const result = await axios({
      url: URLServices.Auth.login,
      method: 'post',
      data: {
        request_id: uuid.v4(),
        name: username,
        password: password,
      },
    })
    return result
  },
  async fetchAbility() {
    const result = await axios({
      url: URLServices.Role.index,
      params: {
        request_id: uuid.v4(),
      },
      method: 'get',
      headers: {
        Authorization: `${TokenType} ${getToken()}`,
      },
    })
    return result.data.data.access_control_list
  },
  async setSessionRole(roleId) {
    const result = await axios({
      url: URLServices.Auth.setSessionRole,
      data: {
        role_id: roleId,
      },
      method: 'post',
      headers: {
        Authorization: `${TokenType} ${getToken()}`,
      },
    })
    return result
  },
  async updateSessionRole(roleId) {
    const result = await axios({
      url: URLServices.Auth.updateSession,
      data: {
        role_id: roleId,
      },
      method: 'post',
      headers: {
        Authorization: `${TokenType} ${getToken()}`,
      },
    })
    return result
  },
  async updatePassword(current_password, new_password) {
    const result = await axios({
      url: URLServices.Auth.updatePassword,
      data: {
        request_id: uuid.v4(),
        request_date_time: DateConvertion.getTimeNow(),
        data: {
          old_password: current_password,
          new_password: new_password,
        },
      },
      method: 'post',
      headers: {
        Authorization: `${TokenType} ${getToken()}`,
      },
    })
    return result
  },
  async logout() {
    const result = await axios({
      url: URLServices.Auth.logout,
      method: 'post',
      data: {
        request_id: uuid.v4(),
      },
      headers: {
        Authorization: `${TokenType} ${getToken()}`,
      },
    })
    return result
  },
}

export default AuthServices
