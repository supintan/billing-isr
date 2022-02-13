import axios from 'axios'
import uuid from 'uuid'
import { URLServices, getToken, TokenType } from './UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import router from '@/router/Router'

const FetchAbility = {
  async getData() {
    const hasil = await axios({
      url: URLServices.Role.index,
      params: {
        request_id: uuid.v4(),
      },
      method: 'get',
      headers: {
        Authorization: `${TokenType} ${getToken()}`,
      },
    })
      .then(result => result.data.data.access_control_list.action)
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            CustomNotification.notif('warning', 'Session telah berakhir', 'Silahkan login kembali')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            router.push({ name: 'login' })
          } else {
            CustomNotification.notif('warning', 'Gagal mendapatkan hak akses', 'Silahkan refresh halaman kembali')
          }
        }
      })
    return hasil
  },
}

export default FetchAbility
