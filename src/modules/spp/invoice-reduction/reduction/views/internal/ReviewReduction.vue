<template>
<div>
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{
            name: 'invoice-reduction'
          }"
          class="mr-1 text-primary"
        >
          <feather-icon icon="CornerUpLeftIcon" /> kembali
        </b-button>
      </b-col>
    </b-row>
  <b-card header-tag="header">
    <template #header>
      <h5 class="text-primary">SURAT PERMOHONAN PENGURANGAN BHP</h5>
    </template>
    <b-form>
      <b-row>
        <b-col sm="8" lg="8" md="8">
          <b-form-group
            class="mb-4"
            label="Pelanggan"
            label-for="ministerial_decree_number"
            label-cols="4"
          >
            <b-form-input
              id="ministerial_decree_number"
              label-cols="2"
              v-model="this.detailReduction.client_name"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="No. Aplikasi"
            label-for="application_name"
            label-cols="4"
          >
            <b-form-input
              id="application_name"
              label-cols="2"
              v-model="this.detailReduction.application_name"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="No. SPP"
            label-for="invoice_number"
            label-cols="4"
          >
            <b-form-input
              id="invoice_number"
              placeholder="PP001"
              label-cols="2"
              v-model="this.detailReduction.invoice_number"
              readonly
            />
          </b-form-group>
          <!--
          <b-form-group
            class="mb-4"
            label="Nilai Invoice"
            label-cols="4"
          >
          <b-input-group prepend="Rp.">
            <b-form-input id="invoice_total_amount" v-model="this.detail_invoice_amount"  class="form-control text-left" readonly/>
          </b-input-group>
          </b-form-group>
          -->
          <b-form-group
            class="mb-4"
            label="Tanggal Jatuh Tempo"
            label-for="due_date"
            label-cols="4"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <feather-icon icon="CalendarIcon" />
              </b-input-group-prepend>
              <b-form-input  v-model="this.convDueDate" readonly/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Tanggal Surat"
            label-for="publish_date"
            label-cols="4"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <feather-icon icon="CalendarIcon" />
              </b-input-group-prepend>
              <b-form-input  v-model="this.convPublishDate" readonly/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Nomor Surat Permohonan"
            label-for="appeal_letter_number"
            label-cols="4"
          >
            <b-form-input
              id="appeal_letter_number"
              label-cols="2"
              readonly
              v-model="this.detailReduction.appeal_letter_number"
            />
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="Nilai Pokok"
            label-for="h-total_amount"
            class="mb-4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                autocomplete="off"
                class="text-right"
                id="total_amount"
                v-model="detail_invoice_amount"
                readonly
              />
            </b-input-group>
          </b-form-group>
          <b-form-group
            label="Nilai Pokok yang diajukan"
            class="mb-4"
            label-cols="4"
          >
          <b-input-group prepend="Rp.">
            <b-form-input id="appeal_total_amount" v-model="detail_appeal_total_amount"  class="form-control text-right" readonly/>
          </b-input-group>
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="Denda"
            label-for="total_amount"
            disabled
            class="mb-4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                autocomplete="off"
                class="text-right"
                id="total_amount"
                v-model="FineAmount"
                readonly
              />
            </b-input-group>
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="Denda yang diajukan"
            label-for="denda-dibayar"
            class="mb-4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                class="text-right"
                id="denda-dibayar"
                v-model="FineAmountPaid"
                readonly
              />
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-1"
            label="File Surat Permohonan"
            label-for="regulation_number_input"
            label-cols="4"
          >
          <b-form-group>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                 @click="download()"
              >
                Download File
              </b-button>
              <label class="d-block invalid-feedback">*Dokumen tersedia</label>
            </b-form-group>
          </b-form-group>
          <div v-if="showVerification">
            <b-form-group
              label-cols="4"
              label="Dokumen Pendukung*"
              label-for="docs"
              class="mb-4"
            >
              <b-form-file
                v-model="fileZip"
                accept=".zip"
                placeholder="Pilih dokumen pendukung (.zip)..."
                drop-placeholder="Drop file here..."
                @change="createBase64File"
                src=""
                autocomplete="off"
              />
              <small class="text-danger" v-if="fileZip === null">*Silakan unggah dokumen pendukung dalam bentuk zip !</small>
            </b-form-group>
          </div>
          <div>
            <b-form-group
              label-cols="4"
              label="Unduh Dokumen Pendukung*"
              label-for="docs"
              class="mb-4"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                 @click="download()"
              >
                Download File Pendukung
              </b-button>
              <label class="d-block invalid-feedback">*Dokumen tersedia</label>
            </b-form-group>
          </div>
          <b-form-group
            class="mb-4"
            label="Catatan Permohonan"
            label-for="submission_notes"
            label-cols="4"
          >
            <b-form-textarea
              id="submission_notes"
              label-cols="2"
              :rules="[(v) => !!v || 'Deskripsi wajib diisi']"
              v-model="this.detailReduction.submission_notes"
              autocomplete="off"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
  <b-card header-tag="header" v-show="showVerification" class="mt-4">
    <template #header>
      <h5 class="text-primary">VERIFIKASI SURAT PERMOHONAN PENGURANGAN BHP</h5>
    </template>
    <b-form>
      <b-row>
        <b-col sm="8" lg="8" md="8">
          <b-form-group
            class="mb-4"
            label="Catatan Verifikasi"
            label-for="detail_verification_notes"
            label-cols="4"
          >
            <b-form-textarea
              id="detail_verification_notes"
              label-cols="2"
              v-model="this.verification_notes_detail"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Tanggal verifikasi"
            label-for="detail_verification_date_time"
            label-cols="4"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <feather-icon icon="CalendarIcon" />
              </b-input-group-prepend>
              <b-form-input  v-model="this.convVerificationDate" readonly/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Petugas Verifikasi"
            label-for="detail_verification_employee_name"
            label-cols="4"
          >
            <b-form-input
              id="detail_verification_employee_name"
              label-cols="2"
              v-model="this.verification_employee"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
  <b-card header-tag="header" v-show="showReview" class="mt-4">
    <template #header>
      <div>
         <h5 class="text-primary my-2">REVIEW PERMOHONAN PENGURANGAN BHP</h5>
         <b-card-text>Semua form dibawah ini wajib diisi</b-card-text>
      </div>
    </template>
    <b-form>
      <b-row>
        <b-col sm="8" lg="8" md="8">
          <b-form-group label-cols="4" label="Keputusan" >
            <b-form-radio-group
              v-model="detailselectedFormat"
              :options="detailfileOptions"
              value-field="item"
              text-field="name"
              disabled-field="Enabled"
              class="demo-inline-spacing"
              disabled
            />
            </b-form-group>
          <b-form-group
            class="mb-4"
            label="Nomor Surat Keputusan"
            label-for="detail_reviewer_letter_number"
            label-cols="4"
          >
            <b-form-input
              id="detail_reviewer_letter_number"
              v-model="this.detailReductionSubmission.review_letter_number"
              label-cols="2"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="File Surat Keputusan"
            label-for="detail_decision_file"
            label-cols="4"
          >
          <b-form-group>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                 @click="downloadDecisionFile()"
              >
                Download File
              </b-button>
              <label class="d-block invalid-feedback">*Dokumen tersedia</label>
            </b-form-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Nilai Invoice baru"
            label-cols="4"
          >
          <b-input-group prepend="Rp.">
            <b-form-input id="detail_approved_total_amount" v-model="this.detail_approved_total_amount"  class="form-control text-left" readonly/>
          </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Tanggal Jatuh Tempo baru"
            label-for="detail_approved_due-date"
            label-cols="4"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <feather-icon icon="CalendarIcon" />
              </b-input-group-prepend>
              <b-form-input  v-model="this.detail_approved_due_date" readonly/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Tanggal Terbit baru"
            label-for="detail_review_publish_date"
            label-cols="4"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <feather-icon icon="CalendarIcon" />
              </b-input-group-prepend>
              <b-form-input  v-model="this.convReviewDate" readonly/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Catatan Keputusan"
            label-for="detail_reviewer_notes"
            label-cols="4"
          >
            <b-form-textarea
              id="detail_reviewer_notes"
              label-cols="2"
              v-model="this.detailReductionSubmission.reviewer_notes"
              autocomplete="off"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
  BForm,
  BFormTextarea,
  BFormRadioGroup,
  BInputGroupPrepend,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import DateConvertion from '@/helpers/date-convertion'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BForm,
    BFormTextarea,
    BFormRadioGroup,
    BInputGroupPrepend,
    BInputGroup,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      showVerification: false,
      submitVerification: false,
      showReview: false,

      // Save
      showActionButton: true,
      statusShowApplication: true,
      value: null,
      ident_Reduction: this.$route.params.reductionId,

      // detail reduction
      detailReduction: {},
      convPublishDate: '',
      convDueDate: '',
      detail_invoice_amount: null,
      detail_appeal_total_amount: '',

      // detail verification
      ReductionId: '',
      detailReductionAppeal: [],
      ReductionAppealId: '',
      convVerificationDate: '',
      idRedAppeal: '',
      idRed: '',

      // detail review
      detailReductionSubmission: [],
      detailselectedFormat: '',
      detailfileOptions: [
        { item: 'Setuju', name: 'Setuju' },
        { item: 'Tolak', name: 'Tolak' },
      ],
      ReductionSubmissionId: '',
      verification_employee: '',
      verification_notes_detail: '',
      convReviewDate: '',
      detailReductionInvoice: '',
      detail_approved_due_date: '',
      detail_approved_total_amount: '',
      guid_v4: uuid.v4(),
      fileZip: null,
      FineAmount: null,
      FineAmountPaid: null,
      InvoiceAmountPaid: null,
    }
  },
  computed: {
    statusSave() {
      return (this.nama_aplikasi && this.nama_resmi_aplikasi && this.selectedClient && this.selectedAppServices && this.selectedAppSubServices && this.selectedJenisIzin && this.selectedJenisMasaBerlaku && this.MasaBerlaku && this.MaksimumPerpanjangan)
    },
  },
  created() {
    this.getDetailReduction()
  },
  methods: {
    convDate(date) {
      if (date === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(date).format('D MMMM YYYY')
    },
    convAmount(amount) {
      if (amount === '-') {
        return '-'
      }
      const num = amount.split('.')
      const number = num[0]
      const format = number.toString().split('').reverse().join('')
      const convert = format.match(/\d{1,3}/g)
      const rupiah = convert.join('.').split('').reverse().join('')
      return rupiah
    },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }
      data.regulation_name = this.regulation_name_input
      data.invoice_number = 'test'
      data.regulation_description = this.regulation_description_input
      data.regulation_official_name = 'test'
      data.fine_percentage = InputFormat.convNumString(this.fine_percentage_input)
      data.maximum_amount = InputFormat.convNumString(this.maximum_amount_input)
      data.maximum_months_overdue = this.maximum_months_overdue_input
      data.appeal_letter_publish_date = this.appeal_letter_publish_date
      data.file_base64 = this.fileLoc

      return data
    },
    async getDetailReduction() {
      await axios({
        url: URLServices.reduction.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          id: this.ident_Reduction,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailReduction] = result.data.data
          this.convDueDate = this.convDate(this.detailReduction.invoice_due_date)
          this.convPublishDate = this.convDate(this.detailReduction.appeal_letter_publish_date)
          this.ReductionId = this.detailReduction.id
          this.ReductionAppealId = this.detailReduction.reduction_appeal_submission_id
          this.detail_invoice_amount = this.convAmount(this.detailReduction.invoice_total_amount)
          this.detail_appeal_total_amount = this.convAmount(this.detailReduction.appeal_total_amount)
          this.getDetailReductionAppeal(this.ReductionAppealId, this.ReductionId)
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Gagal mendapatkan role', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getDetailReductionAppeal(idRedAppeal, idRed) {
      await axios({
        url: URLServices.reduction_appeal_submission.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: idRedAppeal,
          reduction_id: idRed,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailReductionAppeal] = result.data.data
          this.convVerificationDate = DateConvertion.setValue(this.detailReductionAppeal.verification_date_time).getFullDateTime()
          this.verification_notes_detail = this.detailReductionAppeal.verification_notes
          this.verification_employee = this.detailReductionAppeal.verification_employee_name
          this.ReductionSubmissionId = this.detailReductionAppeal.reduction_submission_id
          if (((this.detailReductionAppeal.verification_decision === true) && (this.ReductionSubmissionId !== '-'))) {
            if (this.detailReductionAppeal.review_decision === '-') {
              this.showVerification = true
              this.showReview = false
            } else {
              this.showVerification = true
              this.showReview = true
              this.getDetailReductionSubmission(this.ReductionSubmissionId)
            }
          }
          if (((this.detailReductionAppeal.verification_decision === false) && (this.ReductionSubmissionId === '-'))) {
            this.showVerification = true
            this.showReview = false
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan role', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getDetailReductionSubmission(idRedSubmission) {
      await axios({
        url: URLServices.reduction_submission.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: idRedSubmission,
          reduction_appeal_submission_id: this.ReductionAppealId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailReductionSubmission] = result.data.data
          this.convReviewDate = this.convDate(this.detailReductionSubmission.approved_publish_date)
          this.decisionStatus = this.detailReductionSubmission.review_is_approved
          if (this.decisionStatus === '-') {
            this.showReview = false
            this.submitReview = true
          } else {
            this.showReview = true
            this.submitReview = false
          }
          this.getDecisionStatus(this.decisionStatus)
          this.detail_approved_total_amount = this.convAmount(this.detailReductionSubmission.approved_total_amount)
          this.detail_approved_due_date = this.convDate(this.detailReductionSubmission.approved_due_date)
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan role', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    getDecisionStatus(StatusReview) {
      if (StatusReview === true) {
        this.detailselectedFormat = 'Setuju'
      } else {
        this.detailselectedFormat = 'Tolak'
      }
    },
    download() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.reduction.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.ReductionId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mengunduh data regulasi', errorMessage)
        })
    },
    downloadDecisionFile() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.reduction_submission.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.ReductionSubmissionId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mengunduh surat keputusan', errorMessage)
        })
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
.width-150 {
  width: 150px;
}
</style>
