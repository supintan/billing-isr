<template>
  <div>
    <create-regulation :statusEdit="true" v-if="!showForm" :DataCreate="DetailBhp" />
  </div>
</template>

<script>
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, getToken, TokenType } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'
import CreateRegulation from './create'

export default {
  data() {
    return {
      showForm: false,
      showPosisi: false,
      FinalResult: '',
      StartDate: null,
      file: null,
      fileLoc: null,
      NamaRegulasi: null,
      NomorPeraturan: null,
      NamaResmiPeraturan: null,
      DeskripsiPeraturan: null,
      // EndDate: null,
      IdBHPFrekuensi: this.$route.params.selectedIdFormula,
      DetailBhp: {
        file: null,
        fileLoc: null,
        NamaRegulasi: null,
        NomorPeraturan: null,
        NamaResmiPeraturan: null,
        DeskripsiPeraturan: null,
        // EndDate: null,
        StartDate: null,
      },
    }
  },
  components: {
    CreateRegulation,
  },
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      this.showForm = true

      await axios({
        url: URLServices.BHPFrekuensi.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          id: this.IdBHPFrekuensi,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            const Detail = result.data.data[0]
            this.DetailBhp = {
              file: null,
              fileLoc: null,
              NamaRegulasi: Detail.regulation_name,
              NomorPeraturan: Detail.regulation_number,
              NamaResmiPeraturan: Detail.regulation_official_name,
              DeskripsiPeraturan: Detail.regulation_description,
              EndDate: null, // update backend
              StartDate: Detail.publish_date,
            }
            this.showForm = false
          } else {
            this.DetailBhp = {}
            CustomNotification.notif(
              'warning',
              'Gagal memuat data',
              result.data.response_message
            )
            this.showForm = false
          }
        })
        .catch(error => {
          CustomNotification.notif(
            'danger',
            'Gagal memuat data',
            'Mohon coba beberapa saat kembali'
          )

          this.showForm = false
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
  },
}
</script>
