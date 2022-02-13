<template>
  <div>
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{ name: 'invoice-reduction-submission' }"
          class="mr-1 text-primary"
        >
          <feather-icon icon="CornerUpLeftIcon" /> kembali
        </b-button>
      </b-col>
    </b-row>
    <b-card header-tag="header" class="mb-4">
      <template #header>
        <div>
          <h5 class="text-primary">SURAT PERMOHONAN PENGURANGAN BHP</h5>
        </div>
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
            <!--
            <b-form-group class="mb-4" label="Nilai SPP" label-cols="4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="invoice_total_amount"
                  v-model="this.detail_invoice_amount"
                  class="form-control text-left"
                  readonly
                />
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
                <b-form-input v-model="this.convDueDate" readonly />
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
                <b-form-input v-model="this.convPublishDate" readonly />
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
            <!--
            <b-form-group
              class="mb-4"
              label="Nilai Invoice yang diajukan"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="appeal_total_amount"
                  v-model="this.detail_appeal_total_amount"
                  class="form-control text-left"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            -->
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
              class="mb-4"
              label="Nilai Pokok yang diajukan"
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
              class="mb-4"
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
                <label class="d-block invalid-feedback"
                  >*Dokumen tersedia</label
                >
              </b-form-group>
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Catatan Permohonan*"
              label-for="submission_notes"
              label-cols="4"
            >
              <b-form-textarea
                id="submission_notes"
                label-cols="2"
                :rules="[v => !!v || 'Deskripsi wajib diisi']"
                v-model="this.detailReduction.submission_notes"
                autocomplete="off"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card header-tag="header" class="mt-4">
      <template #header>
        <h5 class="text-primary">
          VERIFIKASI SURAT PERMOHONAN PENGURANGAN BHP
        </h5>
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
                <b-form-input v-model="this.convVerificationDate" readonly />
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
        <h5 class="text-primary">REVIEW PERMOHONAN PENGURANGAN BHP</h5>
      </template>
      <b-form>
        <b-row>
          <b-col sm="8" lg="8" md="8">
            <b-form-group label-cols="4" label="Keputusan">
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
                <label class="d-block invalid-feedback"
                  >*Dokumen tersedia</label
                >
              </b-form-group>
            </b-form-group>
            <b-form-group class="mb-4" label="Nilai SPP yang Disetujui" label-cols="4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="detail_approved_total_amount"
                  v-model="this.detail_approved_total_amount"
                  class="form-control text-left"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols="4"
              label="Denda yang Disetujui"
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
              class="mb-4"
              label="Tanggal Jatuh Tempo baru"
              label-for="detail_approved_due-date"
              label-cols="4"
            >
              <b-input-group>
                <b-input-group-prepend is-text>
                  <feather-icon icon="CalendarIcon" />
                </b-input-group-prepend>
                <b-form-input
                  v-model="this.detail_approved_due_date"
                  readonly
                />
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
                <b-form-input v-model="this.convReviewDate" readonly />
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
    <b-card header-tag="header" v-show="submitReview" class="mt-4">
      <template #header>
        <div>
          <h5 class="text-primary">REVIEW PERMOHONAN PENGURANGAN BHP</h5>
          <b-card-text>Semua form dibawah ini wajib diisi</b-card-text>
        </div>
      </template>
      <b-form>
        <b-row>
          <b-col sm="8" lg="8" md="8">
            <b-form-group label-cols="4" label="Keputusan*">
              <b-form-radio-group
                v-model="selectedFormat"
                :options="fileOptions"
                value-field="item"
                text-field="name"
                disabled-field="Enabled"
                class="demo-inline-spacing"
                v-on:change="DecisionCheck"
              />
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Nomor Surat Keputusan*"
              label-for="reviewer_letter_number"
              label-cols="4"
            >
              <b-form-input
                id="reviewer_letter_number"
                v-model="reviewer_letter_number"
                label-cols="2"
                required
                :rules="[v => !!v || 'Nomor Surat Permohonan']"
                autocomplete="off"
              />
            </b-form-group>
            <b-form-group
              label-cols="4"
              label="File Surat Keputusan*"
              label-for="file"
            >
              <b-form-file
                v-model="fileLoc"
                accept=".pdf"
                required
                placeholder="Pilih surat keputusan (.pdf)..."
                drop-placeholder="Drop file here..."
                @change="createBase64File"
                src=""
              />
              <small class="text-danger" v-if="fileLoc === null">*Silakan pilih file surat keputusan yang akan diunggah !</small>
            </b-form-group>
            <b-form-group class="mb-4" label="Nilai Pokok Baru*" label-cols="4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="approved_total_amount"
                  v-model="approved_total_amount"
                  class="form-control text-right"
                  autocomplete="off"
                />
              </b-input-group>
            </b-form-group>
            <b-form-group class="mb-4" label="Denda Baru*" label-cols="4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="approved_fine"
                  v-model="ApprovedFine"
                  class="form-control text-right"
                  autocomplete="off"
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Tanggal Jatuh Tempo baru*"
              label-for="approved_due_date"
              label-cols="4"
            >
              <b-form-datepicker
                id="approved_due_date"
                v-model="this.setDueDate"
                locale="id"
                :readonly="shouldDisableApprovedDueDate"
                disabled
              />
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Tanggal Terbit baru*"
              label-for="review_publish_date"
              label-cols="4"
            >
              <b-form-datepicker
                id="review_publish_date"
                v-model="review_publish_date"
                locale="id"
                :readonly="shouldDisablePublishDate"
                disabled
              />
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Catatan Keputusan*"
              label-for="reviewer_notes"
              label-cols="4"
            >
              <b-form-textarea
                id="reviewer_notes"
                placeholder="Masukkan catatan permohonan"
                label-cols="2"
                :rules="[v => !!v || 'Catatan permohonan wajib diisi']"
                v-model="reviewer_notes"
                autocomplete="off"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'invoice-reduction-submission' }"
            variant="outline-secondary"
          >
            Kembali
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            @click.prevent="saveReview()"
            :disabled="!statusSave"
          >
            Simpan
          </b-button>
        </b-col>
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
  BFormDatepicker,
  BFormFile,
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
import DateConvertion from '@/helpers/date-convertion'
import InputFormat from '@/helpers/input-format'
// import Cleave from 'vue-cleave-component'

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
    BFormDatepicker,
    BFormFile,
    BFormRadioGroup,
    BInputGroupPrepend,
    BInputGroup,
    // Cleave,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      showReview: true, // ubah sebaliknya
      submitReview: true, // ubah sebaliknya
      // Save
      showActionButton: true,
      statusShowApplication: true,
      value: null,

      // detail reduction
      ident_Reduction: this.$route.params.reductionId,

      // detail reduction
      detailReduction: [],
      convPublishDate: '',
      convDueDate: '',
      detail_invoice_amount: '',
      detail_appeal_total_amount: '',
      // // detail verification
      // ReductionAppealId: '',
      // detailReductionAppeal: [],
      // convVerificationDate: '',
      // verification_notes: '',
      // verification_employee: '',
      // detail verification
      ReductionId: '',
      detailReductionAppeal: [],
      ReductionAppealId: '',
      convVerificationDate: '',

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

      // submit review
      showCreteUserForm: false,
      selectedFormat: ' ',
      fileOptions: [
        { item: 'Setuju', name: 'Setuju' },
        { item: 'Tolak', name: 'Tolak' },
      ],
      reviewer_letter_number: '',
      approved_total_amount: null,
      options: {
        number: InputFormat.options('number'),
      },
      fileLoc: null,
      review_publish_date: moment(new Date()).format('YYYY-MM-DD'),
      reviewer_notes: '',
      shouldDisableApprovedAmount: false,
      shouldDisablePublishDate: false,
      shouldDisableApprovedDueDate: false,
      setDueDate: '',
      reqDueDate: '',
      new_total_amount: '',
      guid_v4: uuid.v4(),

      FineAmount: null,
      FineAmountPaid: null,
      ApprovedFine: null,
    }
  },
  computed: {
    statusSave() {
      return (
        this.selectedFormat &&
        this.reviewer_letter_number &&
        this.fileLoc &&
        this.reviewer_notes
      )
    },
  },
  created() {
    this.getDetailReduction()
    this.getDueDate()
  },
  methods: {
    DecisionCheck() {
      if (this.selectedFormat === 'Setuju') {
        this.shouldDisableApprovedAmount = false
        this.shouldDisablePublishDate = true
        this.shouldDisableApprovedDueDate = true
      }
      if (this.selectedFormat === 'Tolak') {
        this.shouldDisableApprovedAmount = true
        this.shouldDisablePublishDate = true
        this.shouldDisableApprovedDueDate = true
      }
    },
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
      const format = number
        .toString()
        .split('')
        .reverse()
        .join('')
      const convert = format.match(/\d{1,3}/g)
      const rupiah = convert
        .join('.')
        .split('')
        .reverse()
        .join('')
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

      if (this.selectedFormat === 'Setuju') {
        data.id = this.ReductionSubmissionId
        data.is_approved = true
        data.reviewer_notes = this.reviewer_notes
        data.reviewer_letter_number = this.reviewer_letter_number
        data.approved_total_amount = InputFormat.convNumString(
          this.approved_total_amount
        )
        data.file_base64 = this.fileLoc
      }

      if (this.selectedFormat === 'Tolak') {
        data.id = this.ReductionSubmissionId
        data.is_approved = false
        data.reviewer_notes = this.reviewer_notes
        data.reviewer_letter_number = this.reviewer_letter_number
        data.file_base64 = this.fileLoc
      }
      data.approved_due_date = this.detailReductionSubmission.approved_due_date
      return data
    },
    getDueDate() {
      const current = new Date()
      current.setDate(current.getDate() + 30)
      current.setDate(current.getDate() - 1)
      this.setDueDate = current
      this.reqDueDate = moment(this.setDueDate).format('YYYY-MM-DD')
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
          this.convDueDate = this.convDate(
            this.detailReduction.invoice_due_date
          )
          this.convPublishDate = this.convDate(
            this.detailReduction.appeal_letter_publish_date
          )
          this.ReductionId = this.detailReduction.id
          this.ReductionAppealId = this.detailReduction.reduction_appeal_submission_id
          this.detail_invoice_amount = this.convAmount(
            this.detailReduction.invoice_total_amount
          )
          this.detail_appeal_total_amount = this.convAmount(
            this.detailReduction.appeal_total_amount
          )
          this.getDetailReductionAppeal(
            this.ReductionAppealId,
            this.ReductionId
          )
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'error',
            'Gagal mendapatkan role',
            errorMessage
          )

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
          this.convVerificationDate = DateConvertion.setValue(
            this.detailReductionAppeal.verification_date_time
          ).getFullDateTime()
          this.verification_notes_detail = this.detailReductionAppeal.verification_notes
          this.verification_employee = this.detailReductionAppeal.verification_employee_name
          this.ReductionSubmissionId = this.detailReductionAppeal.reduction_submission_id
          this.getDetailReductionSubmission(this.ReductionSubmissionId)
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'error',
            'Gagal mendapatkan role',
            errorMessage
          )

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
          this.convReviewDate = this.convDate(
            this.detailReductionSubmission.approved_publish_date
          )
          this.decisionStatus = this.detailReductionSubmission.review_is_approved
          if (this.decisionStatus === '-') {
            this.showReview = false
            this.submitReview = true
          } else {
            this.showReview = true
            this.submitReview = false
          }
          this.getDecisionStatus(this.decisionStatus)
          this.detail_approved_total_amount = this.convAmount(
            this.detailReductionSubmission.approved_total_amount
          )
          this.detail_approved_due_date = this.convDate(
            this.detailReductionSubmission.approved_due_date
          )
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'error',
            'Gagal mendapatkan role',
            errorMessage
          )

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    getDecisionStatus(status) {
      if (status === true) {
        this.detailselectedFormat = 'Setuju'
      }
      if (status === false) {
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
          CustomNotification.notif(
            'error',
            'Gagal mengunduh data regulasi',
            errorMessage
          )
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
          CustomNotification.notif(
            'error',
            'Gagal mengunduh surat keputusan',
            errorMessage
          )
        })
    },
    async saveReview() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()
      if (this.selectedFormat === 'Setuju') {
        this.new_total_amount = Param.approved_total_amount

        const NewInvoiceAmount = this.detailReduction.invoice_total_amount.replaceAll(
          '.00000',
          ''
        )

        if (this.new_total_amount < NewInvoiceAmount) {
          await axios({
            url: URLServices.reduction_submission.approve,
            method: 'post',
            data: {
              request_id: this.guid_v4,
              request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
              data: Param,
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
                CustomNotification.notif(
                  'success',
                  'Berhasil memperbaharui data',
                  'Halaman akan dialihkan ke index'
                )
                this.saveReductionInvoice()
                this.$router.push({ name: 'invoice-reduction-submission' })
              } else {
                CustomNotification.notif(
                  'warning',
                  'Gagal memperbaharui data',
                  result.data.response_message
                )
              }
              this.showCreteUserForm = false
            })
            .catch(error => {
              CustomNotification.notif(
                'danger',
                'Gagal menyimpan data',
                'Mohon coba kembali'
              )
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        } else {
          CustomNotification.notif(
            'warning',
            'Pengisian salah',
            'Nilai Invoice baru tidak boleh lebih besar dari Invoice lama!'
          )
        }
      }
      if (this.selectedFormat === 'Tolak') {
        const Params = this.createRequestVariable()
        await axios({
          url: URLServices.reduction_submission.reject,
          method: 'post',
          data: {
            request_id: this.guid_v4,
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            data: Params,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif(
                'success',
                'Berhasil memperbaharui data',
                'Halaman akan diarahkan ke index'
              )
              this.$router.push({ name: 'invoice-reduction-submission' })
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal memperbaharui data',
                result.data.response_message
              )
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Gagal memperbaharui data',
              'Mohon coba kembali'
            )
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    async saveReductionInvoice() {
      await axios({
        url: URLServices.reduction_submission_invoice.store,
        method: 'post',
        data: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          data: {
            reduction_submission_id: this.ReductionSubmissionId,
            approved_total_amount: InputFormat.convNumString(
              this.approved_total_amount
            ),
            approved_due_date: this.reqDueDate,
          },
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailReductionAppeal] = result.data.data
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'error',
            'Gagal mendapatkan role',
            errorMessage
          )
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
@import 'vue-select/src/scss/vue-select.scss';
.width-150 {
  width: 150px;
}
</style>
