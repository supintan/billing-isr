<template>
  <b-overlay rounded="sm" :show="showLoadingDetail">
    <b-row
      class="mb-2"
    >
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{ name: 'invoice-modification' }"
          class="mr-1 text-primary"
        >
          <feather-icon icon="CornerUpLeftIcon" /> kembali
        </b-button>
      </b-col>
    </b-row>

    <b-card class="shadow">
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Detail Modifikasi</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="ID Aplikasi" label-for="ApplicationId" class="mb-4">
              <b-form-input
                id="ApplicationId"
                v-model="ApplicationId"
                required
                maxlength="200"
                minlength="10"
                :readonly="!statusEdit"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="No. Surat Permohonan Modifikasi" label-for="LetterNumber" class="mb-4">
              <b-form-input
                id="LetterNumber"
                v-model="LetterNumber"
                required
                maxlength="200"
                minlength="10"
                :readonly="!statusEdit"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Perihal Surat" label-for="LetterSubject" class="mb-4">
              <b-form-input
                id="LetterSubject"
                v-model="LetterSubject"
                :readonly="!statusEdit"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Tgl. Surat" label-for="LetterDate" class="mb-4">
              <b-form-datepicker
                id="LetterDate"
                v-model="LetterDate"
                locale="id"
                :readonly="!statusEdit"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="File Surat" label-for="FileLetter" class="mb-4">
              <div v-if="statusEdit">
                <b-form-file
                  v-model="FileLetter"
                  accept=".pdf"
                  required
                  placeholder="Pilih surat balasan (.pdf)..."
                  drop-placeholder="Drop file here..."
                  src=""
                  @change="createBase64File"
                />
              </div>
              <div v-else>
                <b-overlay :show="ShowLoadingDownload" spinner-small rounded>
                  <b-button
                    ref="button"
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    variant="outline-primary"
                    @click="DownloadFile"
                  >
                    Download
                  </b-button>
                </b-overlay>
              </div>
              <!-- @change="createBase64FileLetter" -->
            </b-form-group>
          </b-col>
        </b-row>
        <b-row
          v-if="statusEdit"
          class="mb-1"
        >
          <b-col sm="8" lg="8" md="8" class="text-center">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'invoice-modification' }"
              variant="outline-secondary"
            >
              Batal
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="success"
              class="ml-1"
              @click.prevent="save()"
            >
              Simpan
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BButton,
  BCard,
  BCardText,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BForm,
  BFormDatepicker,
  BFormFile,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
// import InputFormat from '@/helpers/input-format'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  props: {
    statusEdit: {
      default: true,
      type: Boolean,
    }
  },
  data() {
    return {
      ApplicationId: null,
      FileLetter: null,
      fileLoc: null,
      LetterNumber: null,
      LetterDate: null,
      LetterSubject: null,
      showLoadingDetail: false,
      ModificationId: this.$route.params.selectedPaymentID,
      ShowLoadingDownload: false,
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BRow,
    BOverlay,
    BFormDatepicker,
    BFormFile,
  },
  directives: {
    Ripple,
  },
  created() {
    this.detail()
  },
  methods: {
    createBase64File(e) {
      const file = e.target.files[0]
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }
    },
    async save() {
      this.showCreteUserForm = true
      await axios({
        url: URLServices.modification_appeal.update,
        method: 'post',
        data: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id_modification_appeal: this.ModificationId,
          data: {
            appeal_letter_number: this.LetterNumber,
            appeal_letter_publish_date: this.LetterDate,
            appeal_letter_title: this.LetterSubject,
            file_base64: this.fileLoc,
          },
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menyimpan data', 'Halaman akan diarahkan ke index')
            this.$router.push({ name: 'invoice-modification' })
          } else {
            CustomNotification.notif('warning', 'Gagal menyimpan data', result.data.response_message)
          }
          this.showCreteUserForm = false
        })
        .catch(error => {
          CustomNotification.notif('error', 'Error', 'Mohon coba kembali')
          this.showCreteUserForm = false
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async detail() {
      this.showLoadingDetail = true
      await axios({
        url: URLServices.modification_appeal.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id_modification_appel: this.ModificationId,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.showLoadingDetail = false
          if (result.data.data) {
            const [data] = result.data.data
            this.ApplicationId = data.application_id
            this.FileLetter = data.appeal_letter_file_location
            this.LetterNumber = data.appeal_letter_number
            this.LetterDate = data.appeal_letter_publish_date
            this.LetterSubject = data.appeal_letter_title
          } else {
            this.ApplicationId = null
            this.FileLetter = null
            this.LetterNumber = null
            this.LetterDate = null
            this.LetterSubject = null
          }
        })
        .catch(error => {
          this.showLoadingDetail = false
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Gagal mendapatkan data', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async DownloadFile() {
      this.ShowLoadingDownload = true
      await axios({
        url: URLServices.modification_appeal.download,
        method: 'post',
        data: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.ModificationId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.ShowLoadingDownload = false
          if (result.data.file_base64) {
            const fileURL = result.data.file_base64
            const fileLink = document.createElement('a')
            const convert = 'data:application/pdf;base64, '
            fileLink.href = `${convert}${fileURL}`
            fileLink.setAttribute('download', result.data.file_name)
            document.body.appendChild(fileLink)
            fileLink.click()

          } else {
            CustomNotification.notif('danger', 'Gagal mengunduh SPP', 'Mohon coba kembali')
          }
        })
        .catch(error => {
          this.ShowLoadingDownload = false
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mengunduh SPP', errorMessage)
        })
    },
  },
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>
