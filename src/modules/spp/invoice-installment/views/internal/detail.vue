<template>
  <b-overlay
    :show="showCreteSimulasiForm"
    rounded="sm"
  >
    <b-card>
      <b-row>
        <b-col
          sm="12"
          lg="8"
          md="8"
        >
          <b-card-text>
            <h5 class="text-primary my-2">
              Surat Permohonan Cicilan
            </h5>
          </b-card-text>
          <b-form-group
            class="mb-2"
            label="Aplikasi"
            label-cols="4"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="applicationName"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nomor SPP"
            label-cols="4"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="InvoiceNumber"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nomor Surat Permohonan"
            label-cols="4"
            v-if="SelectedAppeal === null"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="AppealLetterNumber"
            />
          </b-form-group>
          
          <b-form-group
            class="mb-2"
            label="Nomor Surat Permohonan"
            label-cols="4"
            v-if="SelectedAppeal !== null"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="AppealLetterNumber"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nilai Pokok"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <label
                class="form-control text-right"
                readonly>{{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </label>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nilai Denda"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <label
                class="form-control text-right"
                readonly>{{ Number(InvoiceFineNumber).toLocaleString('in-ID', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </label>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tanggal Jatuh Tempo"
            label-for="tgl_jatuh_tempo"
            label-cols="4"
          >
            <b-form-datepicker
              id="isr_ipfr_tgl_mulai"
              v-model="InvoiceDueDate"
              locale="id"
              placeholder="YYYY-MM-DD"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tanggal Surat"
            label-for="tgl_surat"
            label-cols="4"
            v-if="SelectedAppeal === null"
          >
            <b-form-datepicker
              id="tgl_surat"
              v-model="AppealLetterPublishDate"
              locale="id"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tanggal Surat"
            label-for="tgl_surat"
            label-cols="4"
            v-if="SelectedAppeal !== null"
          >
            <b-form-datepicker
              id="tgl_surat"
              v-model="AppealLetterPublishDate"
              locale="id"
              placeholder="YYYY-MM-DD"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Jumlah Bulan Cicilan"
            label-cols="4"
            v-if="SelectedAppeal !== null"
          >
            <b-form-input
              v-model="NumberOfMonthsInstallment"
              value="5"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Jumlah Bulan Cicilan"
            label-cols="4"
            v-if="SelectedAppeal === null"
          >
            <b-form-input
              v-model="NumberOfMonthsInstallment"
              value="5"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="File Surat Permohonan"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
            <!-- <b-form-file /> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="info"
              class="ml-1"
              @click="downloadappealsubmission()"
            >
              Download File Permohonan
            </b-button>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Dokumen Pendukung"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
            <!-- <b-form-file /> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="info"
              class="ml-1"
              @click="downloadappealsubmissionZIP()"
            >
              Download Dokumen Pedukung
            </b-button>
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="File Surat Permohonan*"
            label-for="file"
            v-if="SelectedAppeal === null"
          >
            <b-form-file
              v-model="fileLoc"
              accept=".pdf"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              @change="createBase64File"
              src=""
            />
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="Dokumen Pendukung*"
            label-for="file"
            v-if="SelectedAppeal === null"
          >
            <b-form-file
              v-model="fileLocZip"
              accept=".zip, .rar"
              placeholder="Silahkan Unggah Ulang Dokumen Pendukung dalam bentuk zip..."
              drop-placeholder="Unggah File Zip..."
              @change="createBase64FileZip"
              src=""
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Catatan Permohonan"
            label-cols="4"
            v-if="SelectedAppeal === null"
          >
            <b-form-textarea
              id="textarea-rows"
              v-model="SubmissionNotes"
              placeholder=""
              rows="6"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Catatan Permohonan"
            label-cols="4"
            v-if="SelectedAppeal !== null"
          >
            <b-form-textarea
              id="textarea-rows"
              v-model="SubmissionNotes"
              placeholder=""
              rows="6"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'Pengajuan' }"
            variant="outline-secondary"
            hidden
          >
            Batal
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            v-if="SelectedAppeal === null"
            class="ml-2"
            @click="save()"
          >
              <!-- <b-spinner small v-if="isLoading" /> -->
              Simpan
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card label>
      <b-row>
        <b-col
          sm="12"
          lg="8"
          md="8"
        >
          <b-card-text>
            <h5 class="text-primary my-2">
              Verifikasi Surat Permohonan Cicilan
            </h5>
          </b-card-text>
          <b-form-group
            class="mb-2"
            label="Keputusan Verifikasi"
            label-cols="4"
          >
            <b-form-radio
              v-model="SelectedAppeal"
              name="some-radio9"
              value="true"
              class="custom-control-success"
              disabled
            >
              Setuju
            </b-form-radio>
            <b-form-radio
              v-model="SelectedAppeal"
              name="some-radio9"
              value="false"
              class="custom-control-danger"
              cols="4"
              disabled
            >
              Tolak
            </b-form-radio>
          </b-form-group>
          <b-form-group
              class="mb-2"
              label="Surat Balasan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
              v-if="SelectedAppeal !== null"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1"
                @click="downloadFileVerification()"
              >
              <!-- {{this.InvoiceSubmissionNotes}} -->
                Download Surat Balasan
              </b-button>
            </b-form-group>
          <b-form-group
            class="mb-2"
            label="Catatan Verifikasi"
            label-cols="4"
          >
            <b-form-textarea
              id="textarea-rows"
              v-model="AppealVerificationNotes"
              placeholder=""
              rows="6"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card v-if="SelectedAppeal !== null">
      <b-row>
        <b-col
          sm="12"
          lg="8"
          md="8"
        >
          <b-card-text>
            <h5 class="text-primary my-2">
              Review Permohonan Cicilan
            </h5>
          </b-card-text>
          <b-form-group
            class="mb-2"
            label="Keputusan"
            label-cols="4"
          >
            <b-col>
              <b-form-radio
                v-model="Selectedsubmission"
                value="diterima"
                class="custom-control-success"
                disabled
              >
                Setuju
              </b-form-radio>
            </b-col>
            <b-col>
              <b-form-radio
                v-model="Selectedsubmission"
                value="ditolak"
                class="custom-control-danger"
                cols="4"
                disabled
              >
                Tolak
              </b-form-radio>
            </b-col>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nomor Surat Keputusan"
            label-cols="4"
          >
            <b-form-input
              id="readOnlyInput"
              v-model="ReviewLetterNumber"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="File Surat Keputusan"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
            v-if="Selectedsubmission !== '-'"
            readonly
          >
            <!-- <b-form-file /> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="info"
              class="ml-1"
              @click="downloadsubmission(SubmissionId)"
            >
              Download File
            </b-button>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Jumlah Bulan Cicilan Disetujui"
            label-cols="4"
          >
            <b-form-input
              v-model="ApprovedNumberOfMonthsInstallment"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Catatan Review"
            label-cols="4"
          >
            <b-form-textarea
              id="textarea-rows"
              v-model="ReviewNotes"
              placeholder=""
              rows="6"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            id="tableData"
            striped
            hover
            class="position-relative bg-white"
            :items="items"
            :fields="fields"
            readonly
          >
            <template #cell(approved_due_date)="data">
              {{ convDate(data.item.approved_due_date) }}
            </template>
            <!-- <template #cell(approved_total_amount)="data">
              {{ Number(data.item.approved_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template> -->
            <template #cell(annual_amount)="data">
              {{ Number(data.item.annual_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
            <template #cell(fine_amount)="data">
              {{ Number(data.item.fine_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BButton,
  BCard,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BFormDatepicker,
  BInputGroup,
  BTable,
  BFormTextarea,
  BFormRadio,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import axios from 'axios'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { uuid } from 'vue-uuid'
import moment from 'moment'
import CustomNotification from '@/helpers/custom-notification'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BFormDatepicker,
    BInputGroup,
    BTable,
    BFormTextarea,
    BFormRadio,
  },
  data() {
    return {
      guid_v4: uuid.v4(),
      identINstallment: this.$route.params.idinstallment,
      detailInstallment: [],
      dataInstallment: [],
      dataInvoice: [],
      InstallmentId: '',
      applicationName: '',
      showCreteSimulasiForm: false,
      InvoiceNumber: '',
      InvoiceTotalNumber: null,
      InvoiceFineNumber: null,
      AppealLetterNumber: '',
      ReviewLetterNumber: '',
      AppealLetterPublishDate: '',
      NumberOfMonthsInstallment: '',
      ApprovedNumberOfMonthsInstallment: '',
      UploadDateTime: '',
      SubmissionNotes: '',
      InvoiceDueDate: '',
      AppealVerificationNotes: '',
      Selectedsubmission: '',
      SelectedAppeal: '',
      ReviewNotes: '',
      fileLoc: null,
      fileLocZip: null,
      datafileZip: null,
      fileBase64: '',
      fileBase64Zip: '',
      items: [],
      fields: [
        { key: 'month_sequence_number', label: 'Bulan ke' },
        { key: 'approved_due_date', label: 'Tanggal Jatuh Tempo' },
        { key: 'annual_amount', label: 'Nilai Cicilan Pokok' },
        { key: 'fine_amount', label: 'Nilai Cicilan Denda' },
      ],
      SubmissionId: '',
    }
  },
  directives: {
    Ripple,
  },
  created() {
    this.getDetail()
    this.getDetailApeal()
    this.getDetailsubmission()
    this.getDetailInvoice()
  },
  methods: {
    alertTrial() {
      const successMessage = `Data berhasil didapatkan.`
      CustomNotification.notif('success', 'Berhasil', successMessage)
    },
    convDate(dateconv) {
      console.log(dateconv)
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY')
    },
    async getDetail() {
      await axios({
        url: URLServices.installment.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          id: this.identINstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.detailInstallment = response.data.data
          this.InstallmentId = this.detailInstallment[0].id
          this.applicationName = this.detailInstallment[0].application_name
          this.InvoiceNumber = this.detailInstallment[0].invoice_number
          this.InvoiceTotalNumber = this.detailInstallment[0].invoice_total_amount
          this.InvoiceFineNumber = this.detailInstallment[0].invoice_fine_amount
          this.InvoiceDueDate = this.detailInstallment[0].invoice_due_date
          this.AppealLetterNumber = this.detailInstallment[0].appeal_letter_number
          this.AppealLetterPublishDate = this.detailInstallment[0].appeal_letter_publish_date
          this.NumberOfMonthsInstallment = this.detailInstallment[0].number_of_months_installment
          this.UploadDateTime = this.detailInstallment[0].upload_date_time
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    
    createBase64File(e) {
      const file = e.target.files[0]
      const fileZip = e.target.files[0]
      this.createRequestVariableFile(file, fileZip)
    },
    createBase64FileZip(e) {
      const fileZip = e.target.files[0]
      this.createRequestVariableFileZip(fileZip)
    },

    createRequestVariableFileZip(fileZip) {
      const reader = new FileReader()
      if (fileZip) {
        reader.onloadend = e => {
          this.fileLocZip = e.target.result
          this.fileBase64Zip = this.fileLocZip
        }

        reader.readAsDataURL(fileZip)
      }
      this.datafileZip = this.fileLocZip
      return this.datafileZip
    },
    createRequestVariableFile(file) {
      const data = {}
      const reader = new FileReader()
      const dataZip = this.createRequestVariableFileZip()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }

      data.appeal_letter_number = this.AppealLetterNumber
      data.appeal_letter_publish_date = this.AppealLetterPublishDate
      data.number_of_months_installment = this.NumberOfMonthsInstallment
      data.file_base64 = this.fileLoc
      data.supporting_documents_file_base64 = dataZip
      data.appeal_submission_note = this.SubmissionNotes
      return data
    },
    async getDetailApeal() {
      await axios({
        url: URLServices.installment_appeal_submission.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          installment_id: this.identINstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataAppeal = response.data.data
          this.AppealId = this.dataAppeal[0].id
          this.SubmissionNotes = this.dataAppeal[0].submission_notes
          this.AppealVerificationNotes = this.dataAppeal[0].verification_notes
          this.SelectedAppeal = this.dataAppeal[0].verification_decision
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getDetailsubmission() {
      await axios({
        url: URLServices.installment_submission.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          installment_id: this.identINstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataInvoice = response.data.data
          this.SubmissionId = this.dataInvoice[0].id
          this.InvoiceSubmissionNotes = this.dataInvoice[0].submission_notes
          this.Selectedsubmission = this.dataInvoice[0].review_status
          this.ReviewLetterNumber = this.dataInvoice[0].review_letter_number
          this.ApprovedNumberOfMonthsInstallment = this.dataInvoice[0].approved_number_of_months_installment
          this.ReviewNotes = this.dataInvoice[0].review_notes
        })
        .catch(error => {
          // const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali.`
          console.log(error)
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getDetailInvoice() {
      await axios({
        url: URLServices.installment_invoice.index,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          installment_id: this.identINstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.items = data
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async downloadappealsubmission() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.identINstallment,
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
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Warning', errorMessage)
        })
    },
    async downloadFileVerification() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment_appeal_submission.download,
        method: 'post',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.AppealId,
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
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async downloadappealsubmissionZIP() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment.downloadZip,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.identINstallment,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/x-zip-compressed;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Warning', errorMessage)
        })
    },
    async downloadsubmission(SubmissionId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment_submission.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: SubmissionId,
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
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    createRequestVariable() {
      const data = {}
      data.nik = this.nik
      data.full_name = this.fullName
      data.password = this.password2
      data.email = this.email
      data.role = {
        role_id: this.formulaelected,
      }

      // Mapping Selected roles
      const lengthRole = this.formulaelected.length
      if (lengthRole === 0) {
        CustomNotification.notif('warning', 'Anda harus memilih minimal 1 role')
        this.showCreteSimulasiForm = false
        return false
      }

      return data
    },
    async save() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      this.showCreteSimulasiForm = true
      const Param = this.createRequestVariableFile()

      if (Param !== false) {
        await axios({
          url: URLServices.installment.update,
          method: 'post',
          data: {
            request_id: this.guid_v4,
            request_date_time: today,
            id: this.identINstallment,
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif('success', 'Berhasil menambahkan data baru', result.data.response_message)
              this.$router.push({ name: 'invoice-installment' })
            } else {
              const errorMessage = `[${result.data.response_message}]`
              CustomNotification.notif('warning', 'Warning', errorMessage)
            }
            this.showCreteSimulasiForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            const errorMessage = `[${notifError.message}]`
            CustomNotification.notif(notifError.status, notifError.status, errorMessage)
            this.showCreteSimulasiForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
