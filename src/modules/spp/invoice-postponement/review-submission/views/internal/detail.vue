<template>
  <b-overlay rounded="sm">
    <Penundaan
        v-bind="penundaanItem"
    />
    <Verifikasi
        v-bind="verifikasiItem"
        :is-verify="true"
    />
    <Review
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
import InputFormat from '@/helpers/input-format'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Penundaan from '@/modules/spp/invoice-postponement/views/component/Penundaan.vue'
import Verifikasi from '@/modules/spp/invoice-postponement/views/component/Verifikasi.vue'
import Review from '@/modules/spp/invoice-postponement/views/component/Review.vue'

export default {
  components: {
    BOverlay,
    Penundaan,
    Verifikasi,
    Review,
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
      isVerify: '',
      submission_notes: '',
      selectedFormat: '',
      fileOptions: [
        { item: 'DISETUJUI', name: 'DISETUJUI' },
        { item: 'DITOLAK', name: 'DITOLAK' },
      ],

      // Avatar
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      positions: [],
      posisi: [],
      reviewer_notes: '',

      // DOWNLOAD PDF
      fileLoc: null,
      fileBase64: '',
      downloadUrl: null,
      downloadfilename: null,
      options: {
        number: InputFormat.options('number'),
      },
    }
  },
  created() {
    // console.log('isVerify', this.isVerify)
    this.detail()
    // window.addEventListener('resize', this.initTrHeight)
  },
  methods: {
    repeateAgain() {
      this.positions.push({
        index: (this.nextTodoId += this.nextTodoId),
      })
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.div[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.positions.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },
    onClick() {
      axios({
        url: URLServices.postponement_submission.download,
        method: 'POST',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.submissionId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      }).then(result => {
        // console.log(result.data)
        const fileURL = result.data.file_base64
        const fileLink = document.createElement('a')
        const convert = 'data:application/pdf;base64, '
        // console.log(fileURL)
        fileLink.href = `${convert}${fileURL}`
        // console.log(fileLink.href)
        fileLink.setAttribute('download', result.data.file_name)
        document.body.appendChild(fileLink)
        fileLink.click()
      }).catch(error => {
        const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('error', errorMessage)
      })
    },
    async getData(url, id, type) {
      await axios({
        url,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          // id: this.postponementId,
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
            title: 'Review Permohonan Cicilan',
            isVerify: true,
            isReview: true,
            postponement_appeal_submissions_id: this.appealId,
            postponement_submissions_id: this.submissionId,
            ...dataResult,
          }
          this.getAppName()
        }
        if (type === 'verifikasi') {
          this.verifikasiItem = {
            title: 'Review Surat Permohonan Penundaan',
            isReview: true,
            postponement_id: this.postponementId,
            postponement_submissions_id: this.submissionId,
            ...dataResult,
          }
        }
        if (type === 'review') {
          this.reviewItem = {
            title: 'Review Permohonan Penundaan',
            isReview: dataResult.review_date_time != null,
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
      await this.getData(URLServices.postponement.get, this.postponementId, 'penundaan')
      // get verifikasi penundaan
      await this.getData(URLServices.postponement_appeal.get, this.appealId, 'verifikasi')
      // get review penundaan
      await this.getData(URLServices.postponement_submission.get, this.submissionId, 'review')
    },
    async getAppName() {
      // console.log('application_id', this.penundaanItem.application_id)
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
        // this.application_name = result.data.data.offical_name
        this.penundaanItem.application_name = result.data.data.offical_name
        // console.log('this.application_name', this.application_name)
        console.log('penundaanItem', this.penundaanItem)
        // this.showPosisi = false
      }).catch(error => {
        console.log('error', error)
        const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response}]`
        CustomNotification.notif('warning', errorMessage)
        if (error.response.status && error.response.status === 401) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userData')
          this.$router.go({ name: 'session-time-out' })
        }
        // this.showPosisi = false
      })
    },
    async getVerify() {
      console.log('get data Verify by ID')
    },
    async getReview() {
      console.log('get data review by ID')
    },
  },
}
</script>

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
