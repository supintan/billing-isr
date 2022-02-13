<template>
  <b-overlay rounded="sm">
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{ name: 'invoice-manual-payment' }"
          class="mr-1 text-primary"
        >
          <feather-icon icon="CornerUpLeftIcon" /> kembali
        </b-button>
      </b-col>
    </b-row>
    <b-card class="shadow">
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Detail Payment Manual</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Pelanggan" label-for="client_name" class="mb-4">
              <b-form-input
                id="client_name"
                v-model="client_name"
                required
                maxlength="200"
                minlength="10"
                readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="No. Aplikasi" label-for="application_name" class="mb-4">
              <b-form-input
                id="application_name"
                v-model="application_name"
                required
                maxlength="200"
                minlength="10"
                readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="No. SPP" label-for="invoice_number" class="mb-4">
              <b-form-input
                id="invoice_number"
                v-model="invoice_number"
                required
                maxlength="200"
                minlength="10"
                readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Nilai Pokok" label-for="h-invoice_amount" class="mb-4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="invoice_amount"
                  v-model="invoice_amount"
                  class="text-right"
                  readonly
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Nilai Pokok yang Dibayarkan" label-for="h-invoice_amount" class="mb-4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="invoice_amount"
                  v-model="InvoiceAmountPaid"
                  class="text-right"
                  readonly
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Denda" label-for="denda" class="mb-4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="invoice_amount"
                  v-model="FineAmount"
                  class="text-right"
                  readonly
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Denda yang Dibayarkan" label-for="h-invoice_amount" class="mb-4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="invoice_amount"
                  v-model="FineAmountPaid"
                  class="text-right"
                  readonly
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Tgl. Jatuh Tempo" label-for="billing_end_date" class="mb-4">
              <b-form-datepicker
                id="billing_end_date"
                v-model="billing_end_date"
                locale="id"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Tgl. Bayar" label-for="payment_date" class="mb-4">
              <b-form-datepicker
                id="payment_date"
                v-model="payment_date"
                locale="id"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="BANK" label-for="bank" class="mb-4">
              <b-form-input
                id="bank"
                v-model="bank"
                required
                maxlength="200"
                minlength="10"
                readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Bukti Resi Bayar" >
              <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-info" style="position: relative;" @click="DownloadFile()"> Download File </button>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Deskripsi" label-for="description" class="mb-4">
              <b-form-textarea
                id="description"
                v-model="description"
                required
                maxlength="200"
                minlength="10"
                readonly
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card class="mt-4 shadow" v-if="StatusApproval">
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Keputusan"  class="mb-4">
            <b-form-radio-group
              v-model="selectedFormat"
              :options="fileOptions"
              value-field="item"
              text-field="name"
              disabled-field="Enabled"
              class="demo-inline-spacing"
              disabled
            />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Petugas Review"  class="mb-4">
              <b-form-input
                v-model="ReviewerName"
                disabled
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Catatan Keputusan" label-for="submission_notes"  class="mb-4">
              <b-form-textarea
                id="submission_notes"
                v-model="submission_notes"
                required
                maxlength="200"
                minlength="10"
                readonly
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-overlay :show="showPosisi" rounded="sm">
          <div v-for="(item, index) in positions" :key="index" ref="div">
            <b-row class="mb-1">
              <b-col cols="12">
                <div class="text-right">
                  <b-button
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    variant="outline-danger"
                    class="mt-0 mt-md-2"
                    @click="removeItem(index)"
                    v-if="positions.length !== 1"
                  >
                    <feather-icon icon="TrashIcon" class="mr-25" />
                    <span>Hapus</span>
                  </b-button>
                  <hr />
                </div>
              </b-col>
            </b-row>
          </div>
        </b-overlay>
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
  BFormTextarea,
  BInputGroup,
  BFormRadioGroup,
  BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
// import Cleave from 'vue-cleave-component'
import { uuid } from 'vue-uuid'
import { heightTransition } from '@/helpers/transition'
import InputFormat from '@/helpers/input-format'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  mixins: [heightTransition],
  data() {
    return {
      FineAmount: null,
      nextTodoId: 2,
      regulation_name: '...',
      regulation_number: '...',
      regulation_description: '...',
      regulation_official_name: '...',
      fine_percentage: '...',
      invoice_amount: 0,
      maximum_months_overdue: '...',
      publish_date: '...',
      file_location: '...',
      client_name: '',
      application_name: '',
      ministerial_decree_name: '',
      invoice_number: '',
      billing_end_date: '',
      payment_date: '',
      bank: '',
      description: '',
      password: '',
      password2: '',
      timestamp: '',
      showPosisi: false,
      showCreteUserForm: false,
      positions: [],
      posisi: [],
      submission_notes: '',
      PaymentId: this.$route.params.selectedPaymentID,
      selectedFormat: this.review_status,
      fileOptions: [
        { item: 'DISETUJUI', name: 'DISETUJUI' },
        { item: 'DITOLAK', name: 'DITOLAK' },
      ],
      fileLoc: null,
      fileBase64: '',
      downloadUrl: null,
      downloadfilename: null,
      options: {
        number: InputFormat.options('number'),
      },
      StatusApproval: false,
      InvoiceAmountPaid: null,
      FineAmountPaid: null,
      ReviewerName: null,
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
    BFormTextarea,
    // Cleave,
    BInputGroup,
    BFormRadioGroup,
    BFormDatepicker,
  },
  directives: {
    Ripple,
  },
  created() {
    this.detail()
    window.addEventListener('resize', this.initTrHeight)
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    convertNumber(number) {
      if (!number) return '-'
      return InputFormat.NumberFormat(number)
    },
    downLoadImage(imgUrl) {
      const timestamp = new Date().getTime()
      const name = imgUrl.substring(22, 30)
      const name2 = `${name}${timestamp}.pdf`
      this.downloadUrl = imgUrl
      this.downloadfilename = name2
      setTimeout(() => {
        this.$refs.download.click()
      }, 200)
    },
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
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const param = {
        username: this.username,
        email: this.email,
        password: this.password,
      }
      const reader = new FileReader()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }
      return param
    },
    async save() {
      this.showCreteUserForm = true
      await axios({
        url: URLServices.fine.update,
        method: 'post',
        data: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.PaymentId,
          data: {
            regulation_name: this.regulation_name,
            regulation_number: this.regulation_number,
            regulation_description: this.regulation_description,
            regulation_official_name: this.regulation_official_name,
            fine_percentage: InputFormat.convNumString(this.fine_percentage),
            invoice_amount: InputFormat.convNumString(this.invoice_amount),
            maximum_months_overdue: this.maximum_months_overdue,
            publish_date: this.publish_date,
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
            this.$router.push({ name: 'fine' })
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
    DownloadFile() {
      axios({
        url: URLServices.manual_payment_submission.download,
        method: 'POST',
        data: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.PaymentId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            const fileURL = result.data.file_base64
            const fileLink = document.createElement('a')
            const convert = 'data:application/pdf;base64, '
            fileLink.href = `${convert}${fileURL}`
            fileLink.setAttribute('download', result.data.file_name)
            document.body.appendChild(fileLink)
            fileLink.click()
          } else {
            CustomNotification.notif('warning', 'Dokumen gagal didownload', `Mohon coba kembali`)
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Dokumen gagal didownload', errorMessage)
        })
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.manual_payment_submission.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.PaymentId,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            const [dataResult] = result.data.data
            this.client_name = dataResult.client_name
            this.application_name = dataResult.application_name
            this.ministerial_decree_name = dataResult.ministerial_decree_name
            this.invoice_number = dataResult.invoice_number
            this.invoice_amount = InputFormat.NumberFormat(dataResult.invoice_amount)
            this.billing_end_date = dataResult.billing_end_date
            this.payment_date = dataResult.payment_date
            this.bank = dataResult.bank
            this.regulation_file = dataResult.regulation_file
            this.description = dataResult.description
            this.reviewer_notes = dataResult.reviewer_notes
            this.submission_notes = dataResult.submission_notes
            this.selectedFormat = dataResult.review_status
            this.FineAmount = InputFormat.NumberFormat(dataResult.fine_amount)
            this.getDetailUserSuccessed = true
            this.showDetailUser = false
            this.StatusApproval = dataResult.is_approved !== null
            this.InvoiceAmountPaid = dataResult.annual_payment_amount
            this.FineAmountPaid = dataResult.fine_payment_amount
            this.ReviewerName = dataResult.reviewer_employee_name
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Gagal mendapatkan data', errorMessage)
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

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>
