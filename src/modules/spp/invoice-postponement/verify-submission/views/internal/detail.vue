<template>
  <b-overlay rounded="sm">
    <Penundaan
      v-bind="penundaanItem"
    />
    <Verifikasi
      v-bind="verifikasiItem"
    />
    <Review
      v-show="isReview"
      v-bind="reviewItem"
    />
  </b-overlay>
</template>

<script>
import {
  BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
// import { heightTransition } from '@core/mixins/ui/transition'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Penundaan from '@/modules/spp/invoice-postponement/views/component/Penundaan.vue'
import Verifikasi from '@/modules/spp/invoice-postponement/views/component/Verifikasi.vue'
import Review from '@/modules/spp/invoice-postponement/views/component/Review.vue'

export default {
  components: {
    Review,
    Verifikasi,
    BOverlay,
    Penundaan,
  },
  directives: {
    Ripple,
  },
  // mixins: [heightTransition],
  data() {
    return {
      penundaanItem: {},
      verifikasiItem: {},
      reviewItem: {},
      postponementId: this.$route.params.postponementId,
      appealId: this.$route.params.appealId,
      submissionId: this.$route.params.submissionId,
      isVerify: false,
      isReview: this.$route.params.isReview,
    }
  },
  created() {
    this.detail()
  },
  methods: {
    async getData(url, id, type) {
      await axios({
        url,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          id,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      }).then(result => {
        const dataResult = result.data.data[0]
        console.log(`result ${type}`, dataResult)
        if (type === 'penundaan') {
          this.penundaanItem = {
            title: 'Review Surat Permohonan Penundaan Pembayaran',
            isVerify: true,
            isReview: true,
            application_name: '',
            postponement_appeal_submissions_id: this.appealId,
            postponement_submissions_id: this.submissionId,
            ...dataResult,
          }
          this.getAppName()
        }
        console.log('sampe sini,', this.appealId)
        if (type === 'verifikasi') {
          this.verifikasiItem = {
            title: 'Verifikasi Surat Permohonan Penundaan',
            isVerify: dataResult.verification_date_time != null,
            isReview: this.isReview,
            postponement_id: this.postponementId,
            postponement_submissions_id: this.submissionId,
            ...dataResult,
          }
        }
        if (type === 'review') {
          this.reviewItem = {
            title: 'Review Permohonan Penundaan',
            routeName: 'verify-invoice-postponement',
            isReview: true,
            postponement_id: this.postponementId,
            postponement_appeal_submissions_id: this.appealId,
            ...dataResult,
          }
        }
      }).catch(error => {
        // console.log()
        const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('error', errorMessage)
        if (error.response.status && error.response.status === 401) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userData')
          this.$router.go({ name: 'session-time-out' })
        }
      })
    },
    async detail() {
      // get penundaan
      console.log('post', this.postponementId)
      await this.getData(URLServices.postponement.get, this.postponementId, 'penundaan')
      // get verifikasi penundaan
      await this.getData(URLServices.postponement_appeal.get, this.appealId, 'verifikasi')
      // get review penundaan
      if (this.isReview) {
        await this.getData(URLServices.postponement_submission.get, this.submissionId, 'review')
      }
    },
    async getAppName() {
      await axios({
        url: URLServices.applicationAPI.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.penundaanItem.application_id,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      }).then(result => {
        this.penundaanItem.application_name = result.data.data.offical_name
      }).catch(error => {
        // console.log('error', error)
        const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response}]`
        CustomNotification.notif('warning', errorMessage)
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

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
