<template>
  <div v-if="!showDetail">
    <b-overlay :show="true" rounded="sm">
      <b-card class="py-2">&nbsp;</b-card>
    </b-overlay>
  </div>
  <div v-else>
    <create-form
      :data="DataUser"
      status="edit"
    />
  </div>
</template>

<script>
import {
  BCard,
  BOverlay,
} from 'bootstrap-vue'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import { URLServices, getToken } from '@/services/UrlConfig'
import CreateForm from './create.vue'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
      id_user: this.$route.params.selectedUserID,
      showDetail: false,
      DataUser: [],
    }
  },
  components: {
    BCard,
    BOverlay,
    CreateForm,
  },
  created() {
    this.detail()
  },
  methods: {
    async detail() {
      this.showDetail = false
      await axios({
        url: URLServices.user.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          user_id: this.id_user,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.DataUser = result.data.data
          }
          this.showDetail = true
        })
        .catch(error => {
          this.showDetail = true
          const errorMessage = `. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal memperoleh detail data', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.$router.push({ name: 'user' })
        })
    },
  },
}
</script>
