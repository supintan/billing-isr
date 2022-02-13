<template>
  <b-overlay :show="showCreteSimulasiForm" rounded="sm">
    <div v-if="dataInvoice == ''">
      <b-card>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Surat Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Aplikasi" label-cols="4">
              <b-form-input
                id="readOnlyInput"
                v-model="applicationName"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nomor SPP" label-cols="4">
              <b-form-input
                v-model="InvoiceNumber"
                id="readOnlyInput"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nilai SPP" label-cols="4">
              <b-input-group prepend="Rp.">
                <b-form-input
                v-model="InvoiceTotalNumber"
                  id="readOnlyInput"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Jatuh Tempo"
              label-for="tgl_jatuh_tempo"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="InvoiceDueDate"
                id="isr_ipfr_tgl_mulai"
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
            >
              <b-form-datepicker
                v-model="AppealLetterPublishDate"
                id="tgl_surat"
                locale="id"
                placeholder="YYYY-MM-DD"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Bulan Cicilan"
              label-cols="4"
            >
              <b-form-input
                v-model="NumberOfMonthsInstallment"
                readonly
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
                @click="download()"
              >
              <!-- {{this.InvoiceSubmissionNotes}} -->
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
                @click="downloadZip()"
              >
              <!-- {{this.InvoiceSubmissionNotes}} -->
                Download Dokumen Pendukung
              </b-button>
            </b-form-group>
            <b-form-group class="mb-2" label="Catatan Permohonan" label-cols="4">
              <b-form-textarea
                v-model="SubmissionNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card
      label>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Verifikasi Surat Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group
              class="mb-2"
              label="Keputusan Verifikasi"
              label-cols="4"
            >
            <b-form-radio
              v-model="Selected"
              name="some-radio9"
              value="1"
              class="custom-control-success"
            >
              Setuju
            </b-form-radio>
            <b-form-radio
              v-model="Selected"
              name="some-radio9"
              value="0"
              class="custom-control-danger"
              cols ='4'
            >
              Tolak
            </b-form-radio>
            </b-form-group>
            <!-- <b-form-group
            label-cols="4"
            label="Template"
            label-for="item-template"
            >
            <v-select
              id="item-template"
              v-model="selectednameTemplate"
              box
              placeholder="-- Pilih Template --"
              label="name"
              :options="template"
              @input="selectedtemplateInput"
            > -->
            <!-- <template v-slot:option="template">
            <span>{{ template.name }}</span>
          </template> -->
            <!-- </v-select>
            <div class="mb-1"></div>
            <template>
              <b-button active v-b-modal.modalPreview @click="preview">
                Tampilkan Preview
              </b-button> -->
              <!-- <small
                type="button"
                style="color:blue"
                v-b-modal.modalPreview
                @click="preview"
              >
                Tampilkan preview
              </small> -->
            <!-- </template>
          </b-form-group> -->
          <b-form-group
            label-cols="4"
            label="Surat Balasan*"
            label-for="file"
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
              class="mb-2"
              label="Catatan Verifikasi"
              label-cols="4"
            >
            <b-form-textarea
              v-model="VerifikasiNotes"
              id="textarea-rows"
              placeholder=""
              rows="3"
            />
            </b-form-group>
          </b-col>
        </b-row>
        <b-modal
        id="modalPreview"
        size="xl"
        ref="modal"
        modal-class="modal-primary"
        ok-title="Tutup"
        ok-only
      >
         <!-- v-if="pdfFile" -->
        <div>
          <!-- :show="showFilePDF" -->
          <b-overlay>
            <b-card-text>
              Berikut ini adalah preview pengurangan SPP
            </b-card-text>
            <b-embed
              :data="'data:application/pdf;base64,' + pdfFile"
              file
              type="object"
              width="100%"
              height="700px;"
            />
          </b-overlay>
        </div>
      </b-modal>
        <b-row>
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'verifikasi-cicilan' }"
              variant="outline-secondary"
            >
              Batal
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="success"
              class="ml-1"
              v-if="$can('store', 'isr_installment')"
              @click="thissave()"
            >
              Simpan
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div v-else>
      <b-card>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Surat Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Aplikasi" label-cols="4">
              <b-form-input
                id="readOnlyInput"
                v-model="applicationName"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nomor SPP" label-cols="4">
              <b-form-input
                v-model="InvoiceNumber"
                id="readOnlyInput"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nilai Pokok" label-cols="4">
              <b-input-group prepend="Rp.">
                <!-- <b-form-input
                v-model="{{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}"
                  id="readOnlyInput"
                  class="text-right"
                  readonly
                /> -->
                <!-- <label class="form-control" readonly>{{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}</label> -->
                <!-- {{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }} -->
                <b-form-input
                  v-model="InvoiceTotalNumber"
                  id="readOnlyInput"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nilai Denda"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  v-model="InvoiceFineNumber"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Jatuh Tempo"
              label-for="tgl_jatuh_tempo"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="InvoiceDueDate"
                id="isr_ipfr_tgl_mulai"
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
            >
              <b-form-datepicker
                v-model="AppealLetterPublishDate"
                id="tgl_surat"
                locale="id"
                placeholder="YYYY-MM-DD"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Bulan Cicilan"
              label-cols="4"
            >
              <b-form-input
                v-model="NumberOfMonthsInstallment"
                readonly
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
                @click="download()"
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
                @click="downloadZip()"
              >
              <!-- {{this.InvoiceSubmissionNotes}} -->
                Download Dokumen Pendukung
              </b-button>
            </b-form-group>
            <b-form-group class="mb-2" label="Catatan Permohonan" label-cols="4">
              <b-form-textarea
                v-model="SubmissionNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card label>
        <b-row>
          <b-col sm="12" lg="8" md="8">
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
            <!-- <b-form-group
              class="mb-2"
              label="File Template SPP"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <b-button active @click="cek_preview(templateIdAppeal)">
                Tampilkan Preview
              </b-button>
            </b-form-group> -->
            <!-- <b-modal
              id="modalPreviewGet"
              size="xl"
              ref="modal"
              modal-class="modal-primary"
              ok-title="Tutup"
              ok-only
            >
              <div>
                <b-overlay>
                  <b-card-text>
                    Berikut ini adalah preview pengurangan SPP GET
                  </b-card-text>
                  <b-embed
                    :data="'data:application/pdf;base64,' + pdfFile"
                    file
                    type="object"
                    width="100%"
                    height="700px;"
                  />
                </b-overlay>
              </div>
            </b-modal> -->
            <b-form-group
              class="mb-2"
              label="Surat Balasan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
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
            <b-form-group class="mb-2" label="Catatan Verifikasi" label-cols="4">
              <b-form-textarea
                v-model="AppealVerificationNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Review Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Keputusan" label-cols="4">
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
                v-model="ReviewLetterNumber"
                id="readOnlyInput"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="File Surat Keputusan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
              readonly
              v-if="ReviewNotes != '-'"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="info"
                class="ml-1"
                @click="downloadsubmission(SubmissionId)"
              >
              Download File
              </b-button>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="File Surat Keputusan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
              readonly
              hidden
              v-else
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="info"
                class="ml-1"
                disabled
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
            <b-form-group class="mb-2" label="Catatan Review" label-cols="4">
              <b-form-textarea
                v-model="ReviewNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
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
    </div>
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
  // BFormFile,
  BInputGroup,
  // BFormSelect,
  BTable,
  BFormTextarea,
  BFormRadio,
  BEmbed,
  BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import axios from 'axios'
// import vSelect from 'vue-select'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import InputFormat from '@/helpers/input-format'
import { uuid } from 'vue-uuid'
import moment from 'moment'

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
    // BFormFile,
    BInputGroup,
    BTable,
    BFormTextarea,
    // BCardCode,
    // BFormSelect,
    BFormRadio,
    BCardText,
    // vSelect,
    BEmbed,
  },
  data() {
    return {
      SelectedTemplate: null,
      idAppeal: this.$route.params.idAppeal,
      idInstallment: this.$route.params.idInstallment,
      detailInstallment: [],
      dataAppeal: [],
      selectednameTemplate: null,
      showCreteSimulasiForm: false,
      application_name: null,
      Selected: null,
      template: [],
      VerifikasiNotes: '',
      InstallmentId: '',
      applicationName: '',
      InvoiceNumber: '',
      InvoiceTotalNumber: '',
      InvoiceFineNumber: null,
      InvoiceDueDate: '',
      SelectedAppeal: null,
      AppealLetterNumber: '',
      AppealLetterPublishDate: '',
      NumberOfMonthsInstallment: '',
      UploadDateTime: '',
      dataInvoice: [],
      AppealVerificationNotes: '',
      SubmissionNotes: null,
      ReviewNotes: '',
      pdfFile: '',
      fileLoc: null,
      fileBase64: '',
      items: [],
      fields: [
        { key: 'month_sequence_number', label: 'Bulan ke' },
        { key: 'approved_due_date', label: 'Tanggal Jatuh Tempo' },
        { key: 'annual_amount', label: 'Nilai Cicilan Pokok' },
        { key: 'fine_amount', label: 'Nilai Cicilan Denda' },
      ],
    }
  },
  directives: {
    Ripple,
  },
  created() {
    this.getDetailInstallment()
    this.getDetail()
    this.getDetailsubmission()
    this.getDetailInvoice()
    // this.getTemplate()
  },
  methods: {
    convDate(dateconv) {
      // console.log(dateconv)
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY')
    },
    cek_preview(value) {
      this.pdfFile = null
      this.$bvModal.show('modalPreviewGet')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: value,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            // console.log(this.pdfFile, 'this.pdfFile')
            this.showFilePDF = true
          }
          this.showFilePDF = false
          // const fileURL = result.data.file_base64
          // const fileLink = document.createElement('a')
          // const convert = 'data:application/pdf;base64, '
          // fileLink.href = `${convert}${fileURL}`
          // fileLink.setAttribute('download', result.data.file_name)
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplate. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async getTemplate() {
      this.showPosisi = true
      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.template = response.data.data
          // console.log(this.template, 'response tem')
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    createBase64File(e) {
      const file = e.target.files[0]
      const fileZip = e.target.files[0]
      this.createRequestVariableFile(file, fileZip)
    },
    createRequestVariableFile(file) {
      const data = {}
      const reader = new FileReader()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }
      data.file_base64 = this.fileLoc
      data.submission_notes = this.VerifikasiNotes
      return data
    },
    selectedtemplateInput(value) {
      // this.selectedApp = value.id
      this.selectedtemplateID = value.id
      this.selectednameTemplate = value.name
      // this.getApplication(this.selectedApp)
      // this.preview(this.selectedtemplateID)
      // console.log(this.selectedtemplateID, 'value')
      return true
    },
    preview() {
      this.pdfFile = null
      this.$bvModal.show('modalPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.selectedtemplateID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.showFilePDF = true
          }
          this.showFilePDF = false
          // const fileURL = result.data.file_base64
          // const fileLink = document.createElement('a')
          // const convert = 'data:application/pdf;base64, '
          // fileLink.href = `${convert}${fileURL}`
          // fileLink.setAttribute('download', result.data.file_name)
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplete. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async download() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment.download,
        method: 'post',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.idInstallment,
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
    async downloadFileVerification() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment_appeal_submission.download,
        method: 'post',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.idAppeal,
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
    async downloadZip() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment.downloadZip,
        method: 'post',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.idInstallment,
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
    async getDetailInstallment() {
      await axios({
        url: URLServices.installment.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.idInstallment,
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
          this.InvoiceTotalNumber = InputFormat.NumberFormat(this.detailInstallment[0].invoice_total_amount)
          this.InvoiceFineNumber = InputFormat.NumberFormat(this.detailInstallment[0].invoice_fine_amount)
          this.InvoiceDueDate = this.detailInstallment[0].invoice_due_date
          this.AppealLetterNumber = this.detailInstallment[0].appeal_letter_number
          this.AppealLetterPublishDate = this.detailInstallment[0].appeal_letter_publish_date
          this.NumberOfMonthsInstallment = this.detailInstallment[0].number_of_months_installment
          this.UploadDateTime = this.detailInstallment[0].upload_date_time
          // this.convDueDate = this.convDate(this.detailInstallment.invoice_due_date)
          // this.convPublishDate = this.convDate(this.detailInstallment.appeal_letter_publish_date)
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getDetail() {
      await axios({
        url: URLServices.installment_appeal_submission.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.idAppeal,
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
          this.templateIdAppeal = this.dataAppeal[0].template_id
          this.cek_preview(this.templateIdAppeal)
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
          request_id: uuid.v4(),
          installment_id: this.idInstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataInvoice = response.data.data
          // console.log(this.dataInvoice, 'log submission')
          this.SubmissionId = this.dataInvoice[0].id
          this.InvoiceSubmissionNotes = this.dataInvoice[0].submission_notes
          this.Selectedsubmission = this.dataInvoice[0].review_status
          this.templateId = this.dataInvoice[0].template_id
          this.ReviewNotes = this.dataInvoice[0].review_notes
          // console.log(this.templateId, 'log templateId')
          this.cek_preview(this.templateId)
          // if (this.dataInvoice[0].review_decision === true) {
          //   this.SelectedTrue = true
          // } else {
          //   this.SelectedFalse = false
          // }
          this.ReviewLetterNumber = this.dataInvoice[0].review_letter_number
          this.ApprovedNumberOfMonthsInstallment = this.dataInvoice[0].approved_number_of_months_installment
          
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
    async getDetailInvoice() {
      await axios({
        url: URLServices.installment_invoice.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          installment_id: this.idInstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.items = data
          // console.log(this.items, 'items')
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
    createRequestVariable() {
      const data = {}
      data.id = this.idAppeal
      data.is_approve = this.Selected
      data.reviewer_notes = this.VerifikasiNotes
      data.template_id = this.selectedtemplateID
      return data
    },
    async downloadsubmission(SubmissionId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment_submission.download,
        method: 'post',
        params: {
          request_id: uuid.v4(),
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
          const errorMessage = `Gagal mengunduh data surat review. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    thissave() {
      this.update()
      this.save()
      // if (this.fileLoc !== null && this.VerifikasiNotes !== null) {
      //   this.update()
      // } else if (this.Selected !== null && this.fileLoc !== null && this.VerifikasiNotes !== null) {
      //   this.save()
      //   this.update()
      // }

      // const ParamSuratBalasan = this.createRequestVariableFile()
      // const ParamPermohonan = this.createRequestVariable()
      // if (ParamSuratBalasan !== false) {
      //   if (ParamSuratBalasan.fileLoc !== null && ParamSuratBalasan.VerifikasiNotes !== '') {
      //     this.update()
      //   }
      // } else if (ParamPermohonan !== false && ParamSuratBalasan !== false) {
      //   this.update()
      //   this.save()
      // }
    },
    async update() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      this.showCreteUserForm = true
      const Param = this.createRequestVariableFile()

      if (Param !== false) {
        await axios({
          url: URLServices.installment_appeal_submission.update,
          method: 'post',
          data: {
          id: this.idAppeal,
          request_id: uuid.v4(),
          request_date_time: today,
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            // this.showActionButton = true
            // this.isLoading = false
            if (result.data.response_code === '00') {
              // const successMessage = `Berhasil menambahkan permohonan cicilan baru`
              // CustomNotification.notif('success', 'Berhasil', successMessage)
              const successMessage = `[${result.data.response_message}]`
              CustomNotification.notif('success', 'Berhasil', successMessage)
              this.$router.push({ name: 'verifikasi-cicilan' })
            } else {
              const successMessage = `[${result.data.response_message}]`
              CustomNotification.notif('warning', 'Warning', successMessage)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            CustomNotification.notif(notifError.status, 'Warning', notifError)
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    async save() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      this.showCreteSimulasiForm = true
      const Param = this.createRequestVariable()
      // console.log(Param)
      if (Param !== false) {
        if (Param.is_approve === '1') {
          await axios({
            url: URLServices.installment_appeal_submission.approve,
            method: 'post',
            data: {
              request_id: uuid.v4(),
              request_date_time: today,
              data: Param,
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
                const responsesMessage = `Berhasil menambahkan permohonan cicilan baru. [${result.data.response_message}]`
                CustomNotification.notif('success', 'Berhasil', responsesMessage)
                this.$router.push({ name: 'verifikasi-cicilan' })
              } else {
                const responsesMessage = `[${result.data.response_message}]`
                CustomNotification.notif('warning', 'Warning', responsesMessage)
              }
              this.showCreteUserForm = false
            })
            .catch(error => {
              const notifError = UserManagement.Handling(error)
              CustomNotification.notif(notifError.status, notifError.status, notifError)
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        } else {
          await axios({
            url: URLServices.installment_appeal_submission.reject,
            method: 'post',
            data: {
              request_id: uuid.v4(),
              request_date_time: today,
              data: Param,
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
                const responsesMessage = `Berhasil menambahkan permohonan cicilan baru. [${result.data.response_message}]`
                CustomNotification.notif('success', 'Berhasil', responsesMessage)
                this.$router.push({ name: 'verifikasi-cicilan' })
              } else {
                const responsesMessage = `[${result.data.response_message}]`
                CustomNotification.notif('warning', 'Warning', responsesMessage)
              }
              this.showCreteUserForm = false
            })
            .catch(error => {
              const notifError = UserManagement.Handling(error)
              CustomNotification.notif(notifError.status, notifError.status, notifError)
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
