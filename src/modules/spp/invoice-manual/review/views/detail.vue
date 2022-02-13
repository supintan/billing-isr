<template>
  <b-overlay rounded="sm">
    <b-card v-if="DataSubmission.is_approved === null">
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Jenis SPP"
            label-for="jenis-spp"
            label-cols="4"
          >
            <b-form-input
              id="jenis-spp"
              v-model="DataSubmission.invoice_type"
              required
              class="font-weight"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Masa Laku Awal"
            label-for="masaLakuAwal"
            label-cols="4"
          >
            <b-form-input
              id="masaLakuAwal"
              v-model="DataSubmission.billing_begin_date"
              required
              class="font-weight"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Masa Laku Akhir"
            label-for="masaLakuAkhir"
            label-cols="4"
          >
            <b-form-input
              id="masaLakuAkhir"
              v-model="DataSubmission.billing_end_date"
              required
              class="font-weight"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Periode Jatuh Tempo"
            label-for="tempoPeriod"
            label-cols="4"
          >
            <b-form-input
              id="tempoPeriod"
              :value="DataSubmission.number_of_period_overdue + ' hari'"
              required
              class="font-weight"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal Pokok"
            label-for="annual"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                id="annual"
                v-model="its_annual_amount"
                required
                class="font-weight"
                readonly
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal Denda"
            label-for="fine"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                id="fine"
                v-model="its_fine_amount"
                required
                class="font-weight"
                readonly
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal TOTAL"
            label-for="total"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                id="total"
                v-model="its_total_amount"
                required
                class="font-weight"
                readonly
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal TOTAL (terbilang)"
            label-for="totalAmountIW"
            label-cols="4"
          >
            <b-form-textarea
              id="totalAmountIW"
              v-model="totalAmountInWord"
              required
              class="font-weight"
              readonly
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Keterangan"
            label-for="ket"
            label-cols="4"
          >
            <b-form-textarea
              id="ket"
              v-model="DataSubmission.internal_notes"
              class="font-weight"
              required
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Keterangan Eksternal"
            label-for="ket"
            label-cols="4"
          >
            <b-form-textarea
              id="ket"
              v-model="invoice.description"
              class="font-weight-bold"
              required
            />
          </b-form-group>
        </b-col> -->
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-4"
            label="File SPP"
            label-for="docFile"
            label-cols="4"
          >
            <b-overlay
              :show="waitDownload"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
            >
              <b-link
                @click="onClick()"
              >
                <feather-icon icon="DownloadIcon" /> Download file
              </b-link>
            </b-overlay>
          </b-form-group>
        </b-col>
        <!-- <b-col v-if="ViewMode !== 'review'" sm="12" md="12" lg="12" class="text-right">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            :class="StatusApproved === 1 ? 'mr-1' : 'float-right'"
            :disabled="statusloadingSave"
            :to="linkBack"
          >
            {{ StatusApproved === 1 ? 'Batal' : 'Kembali' }}
          </b-button>
        </b-col> -->
      </b-row>
    </b-card>
    <b-card v-if="DataSubmission.is_approved !== null">
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Jenis SPP"
            label-for="jenis-spp"
            label-cols="4"
          >
            <b-form-input
              id="jenis-spp"
              v-model="DataSubmission.invoice_type"
              readonly
              class="font-weight"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Masa Laku Awal"
            label-for="masaLakuAwal"
            label-cols="4"
          >
            <b-form-input
              id="masaLakuAwal"
              v-model="DataSubmission.billing_begin_date"
              readonly
              class="font-weight"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Masa Laku Akhir"
            label-for="masaLakuAkhir"
            label-cols="4"
          >
            <b-form-input
              id="masaLakuAkhir"
              v-model="DataSubmission.billing_end_date"
              readonly
              class="font-weight"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Periode Jatuh Tempo"
            label-for="tempoPeriod"
            label-cols="4"
          >
            <b-form-input
              id="tempoPeriod"
              :value="DataSubmission.number_of_period_overdue + ' hari'"
              readonly
              class="font-weight"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal Pokok"
            label-for="annual"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                id="annual"
                v-model="its_annual_amount"
                readonly
                class="font-weight"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal Denda"
            label-for="fine"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                id="fine"
                v-model="its_fine_amount"
                readonly
                class="font-weight-"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal TOTAL"
            label-for="total"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input
                id="total"
                v-model="its_total_amount"
                readonly
                class="font-weight"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Nominal TOTAL (terbilang)"
            label-for="totalAmountIW"
            label-cols="4"
          >
            <b-form-textarea
              id="totalAmountIW"
              v-model="totalAmountInWord"
              readonly
              class="font-weight"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Keterangan"
            label-for="ket"
            label-cols="4"
          >
            <b-form-textarea
              id="ket"
              v-model="DataSubmission.internal_notes"
              class="font-weight"
              readonly
            />
          </b-form-group>
        </b-col>
        <!-- <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Keterangan Eksternal"
            label-for="ket"
            label-cols="4"
          >
            <b-form-textarea
              id="ket"
              v-model="invoice.description"
              class="font-weight-bold"
              readonly
            />
          </b-form-group>
        </b-col> -->
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-4"
            label="File SPP"
            label-for="docFile"
            label-cols="4"
          >
            <b-overlay
              :show="waitDownload"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
            >
              <b-link
                @click="onClick()"
              >
                <feather-icon icon="DownloadIcon" /> Download file
              </b-link>
            </b-overlay>
          </b-form-group>
        </b-col>
        <!-- <b-col v-if="ViewMode !== 'review'" sm="12" md="12" lg="12" class="text-right">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            :class="StatusApproved === 1 ? 'mr-1' : 'float-right'"
            :disabled="statusloadingSave"
            :to="linkBack"
          >
            {{ StatusApproved === 1 ? 'Batal' : 'Kembali' }}
          </b-button>
        </b-col> -->
      </b-row>
    </b-card>
    <b-card>
      <h5 class="font-weight-bold text-primary mb-2">
        Review SPP
      </h5>
      <b-row v-if="DataSubmission.is_approved !== null">
        <b-col sm="12" md="12" lg="12">
          <b-form-group
            label="Keputusan"
            label-for="h-keputusan"
            label-cols="3"
            class="mb-1"
          >
            <div class="d-flex justify-content-left">
              <b-form-radio
                v-model="is_approve"
                name="is_approve"
                class="mr-5"
                value="1"
                :disabled="StatusApproved !== 1"
              >
                Setuju
              </b-form-radio>
              <b-form-radio
                v-model="is_approve"
                name="is_approve"
                value="0"
                :disabled="StatusApproved !== 1"
              >
                Tolak
              </b-form-radio>
            </div>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12">
          <b-form-group
            label="Catatan Review"
            label-for="h-catatan-review"
            label-cols="3"
            class="mb-1"
          >
            <b-form-textarea
              readonly
              id="h-catatan-review"
              v-model="ReviewNotes"
              :required="StatusApproved !== 1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="DataSubmission.is_approved === null">
        <b-col sm="12" md="12" lg="12">
          <b-form-group
            label="Keputusan"
            label-for="h-keputusan"
            label-cols="3"
            class="mb-1"
          >
            <div class="d-flex justify-content-left">
              <b-form-radio
                v-model="is_approve"
                name="is_approve"
                class="mr-5"
                value="1"
                :disabled="StatusApproved !== 1"
              >
                Setuju
              </b-form-radio>
              <b-form-radio
                v-model="is_approve"
                name="is_approve"
                value="0"
                :disabled="StatusApproved !== 1"
              >
                Tolak
              </b-form-radio>
            </div>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" lg="12">
          <b-form-group
            label="Catatan Review"
            label-for="h-catatan-review"
            label-cols="3"
            class="mb-1"
          >
            <b-form-textarea
              id="h-catatan-review"
              v-model="ReviewNotes"
              :required="StatusApproved !== 1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <div
        :class="
          StatusApproved !== 1 ? 'd-flex justify-content-between' : 'text-right'
        "
      >
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="reset"
          variant="primary"
          :class="StatusApproved !== 1 ? 'mr-1' : 'float-left'"
          :disabled="statusloadingSave"
          :to="linkBack"
        >
          {{ StatusApproved === 1 ? 'Kembali' : 'Kembali' }}
        </b-button>
        <b-overlay
          :show="statusloadingSave"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
        >
          <b-button
            v-if="StatusApproved === 1"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            @click="InvoiceSubmission"
          >
            Simpan
          </b-button>
        </b-overlay>
      </div>
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
  BInputGroup,
  BFormTextarea,
  BFormRadio,
  BLink,
} from 'bootstrap-vue'
import axios from 'axios'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import moment from 'moment'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import InputFormat from '@/helpers/input-format'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'
import angkaTerbilang from '@develoka/angka-terbilang-js'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BInputGroup,
    BFormTextarea,
    BFormRadio,
    BLink,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      invoice: {},
      ReviewNotes: '',
      is_approve: null,
      StatusApproved: null,
      statusShowInvoiceDetail: true,
      statusloadingSave: false,
      Id: this.$route.params.IdInvoice,
      IdInvoiceReal: this.$route.params.IdInvoiceReal,
      IdApplication: this.$route.params.IdApplication,
      ViewMode: this.$route.params.ViewMode,
      statusDetail: this.$route.params.review_status,
      DataSubmission: {},

      // PDF
      pdfFile: null,
      pdfFileName: null,
      waitDownload: false,
      linkBack: '',
      options: {
        number: InputFormat.options('number'),
      },
      totalAmountInWord: '',
    }
  },
  computed: {
    its_annual_amount() {
      return this.NumberFormat(this.DataSubmission.invoice_annual_amount)
    },
    its_fine_amount() {
      return this.NumberFormat(this.DataSubmission.invoice_fine_amount)
    },
    its_total_amount() {
      return this.NumberFormat(this.DataSubmission.invoice_total_amount)
    },
  },
  created() {
    this.initVariable()
  },
  methods: {
    getTerbilang() {
      if (this.DataSubmission.invoice_total_amount) {
        // a = InputFormat.convNumString()
        console.log(this.DataSubmission.invoice_total_amount)
        const a = angkaTerbilang(parseInt(this.DataSubmission.invoice_total_amount)).toUpperCase()
        this.totalAmountInWord = `${a} RUPIAH`
        console.log(this.totalAmountInWord)
      } else {
        this.totalAmountInWord = ''
      }
      return ''
    },
    NumberFormat(number) {
    this.value = number
      if (this.value) {
        return Number(this.value).toLocaleString('in-ID', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 5,
        })
      }
      return '-'
    },
    initVariable() {
      if (this.ViewMode === 'detail') {
        this.linkBack = {
          name: 'detail-internal-application',
          params: {
            selectedApplication: this.IdApplication,
          },
        }
        this.statusShowInvoiceDetail = false
        this.IdInvoice = this.Id
        this.getInvoiceDetail()
      } else {
        this.linkBack = {
          name: 'review-invoice',
        }
        this.getInvoiceSubmission()
      }
    },
    validation() {
      if (this.is_approve === null) {
        CustomNotification.notif('warning', 'Anda belum memilih persetujuan')
        return false
      }
      if (this.ReviewNotes) {
        if (this.ReviewNotes.length < 5) {
          CustomNotification.notif('warning', 'Catatan persetujuan minimal 5 karakter')
          return false
        }
      } else {
        CustomNotification.notif('warning', 'Anda belum mengisikan catatan persetujuan')
        return false
      }
      return true
    },
    async InvoiceSubmission() {
      if (this.validation()) {
        this.statusloadingSave = true
        const URL = parseInt(this.is_approve, 10) === 1 ? URLServices.isr_invoice_submission.approve : URLServices.isr_invoice_submission.reject
        await axios({
          url: URL,
          data: {
            request_id: uuid.v4(),
            request_date_time: DateConvertion.getTimeNow(),
            data: {
              id: this.DataSubmission.id,
              is_approve: this.is_approve,
              reviewer_notes: this.ReviewNotes,
            },
          },
          method: 'post',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then(response => {
            if (response.data.response_code === '00') {
              CustomNotification.notif('success', 'Sukses !','Berhasil menyimpan persetujuan')
              this.$router.push({
                name: 'review-invoice',
              })
            } else {
              CustomNotification.notif('error', 'Error !', `Gagal menyimpan persetujuan [code ${response.data.response_code}]. Mohon coba kembali`)
            }
            this.statusloadingSave = false
          })
          .catch(error => {
            this.statusloadingSave = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'login' })
            }
            CustomNotification.notif('error', `Gagal menyimpan persetujuan [code ${error.response.status}]. Mohon coba kembali`)
          })
      }
    },
    async onClick() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.invoiceManagement.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.Id,
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
    async getInvoiceSubmission() {
      this.statusShowInvoiceDetail = false
      await axios({
        url: URLServices.isr_invoice_submission.show,
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          id: this.Id,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.data) {
            [this.DataSubmission] = response.data.data
            this.IdInvoice = this.DataSubmission.invoice_id
            this.getTerbilang()
            this.item = this.DataSubmission.is_approved
            if (this.DataSubmission.is_approved !== null) {
              this.is_approve = this.DataSubmission.is_approved ? 1 : 0
            }
            this.ReviewNotes = this.DataSubmission.reviewer_notes

            switch (this.DataSubmission.is_approved) {
              case false:
                this.StatusApproved = 0
                break
              case true:
                this.StatusApproved = 2
                break
              default:
                this.StatusApproved = 1
            }
            // this.getInvoiceDetail()
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('error', 'Gagal memperoleh data KM. Mohon coba kembali')
        })
    },
    async getInvoiceDetail() {
      await axios({
        url: URLServices.ApplicationInvoice.get,
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          id: this.IdInvoice,
        },
        method: 'get',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.data) {
            [this.invoice] = response.data.data
            this.invoice.billing_begin_date = DateConvertion.setValue(this.invoice.billing_begin_date).getFullDate()
            this.invoice.billing_end_date = DateConvertion.setValue(this.invoice.billing_end_date).getFullDate()
            this.invoice.total_amount = InputFormat.NumberFormat(this.invoice.total_amount)
            this.invoice.annual_amount = InputFormat.NumberFormat(this.invoice.annual_amount)
            this.statusShowInvoiceDetail = true
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('error', `Gagal memperoleh data Invoice [code ${error.response.status}]. Mohon coba kembali`)
        })
    },
    downloadPDF() {
      const linkSource = `data:application/pdf;base64,${this.pdfFile}`
      const downloadLink = document.createElement('a')

      downloadLink.href = linkSource
      downloadLink.download = this.pdfFileName
      downloadLink.click()
      CustomNotification.notif('success', 'File PDF berhasil dibuat')
      this.waitDownload = false
    },
    async getBase64PDF() {
      this.pdfFile = null
      this.waitDownload = true
      await axios({
        url: URLServices.ApplicationInvoice.download,
        method: 'post',
        data: {
          request_id: 'guid_v4',
          request_date_time: DateConvertion.getTimeNow(),
          id: this.IdInvoice,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.pdfFileName = result.data.file_name
            this.downloadPDF()
          }
        })
        .catch(error => {
          this.waitDownload = false
          const errorMessage = `Gagal mendapatkan file Invoice. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)

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

