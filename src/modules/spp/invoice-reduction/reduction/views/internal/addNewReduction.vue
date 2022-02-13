<template>
  <b-card>
    <b-overlay :show="showLoadingSave">
      <b-form>
        <b-row class="mt-3">
          <b-col sm="8" lg="8" md="8">
            <b-form-group class="mb-3" label="Pelanggan*" label-cols="4">
              <b-overlay :show="showClient" rounded="sm">
                <v-select
                  v-model="selectedClient"
                  placeholder="-- Pilih Pelanggan --"
                  :options="ClientList"
                  :reduce="ClientList => ClientList.id"
                  label="spectra_ad_company"
                  index="id"
                  @input="selectClient"
                />
              </b-overlay>
            </b-form-group>
            <b-form-group class="mb-4" label="No. Aplikasi*" label-cols="4">
              <v-select
                v-model="selectedApplication"
                placeholder="-- Pilih Nomor Aplikasi --"
                :options="dataAplikasi"
                :reduce="dataAplikasi => dataAplikasi.id"
                label="name"
                index="id"
              />
            </b-form-group>
            <b-overlay :show="ShowLoadingGetDetailInvoice">
              <b-form-group class="mb-4" label="No. SPP*" label-cols="4">
                <b-input-group>
                  <b-form-input
                    id="selectedInvoiceNumber"
                    v-model="selectedInvoiceNumber"
                    readonly
                  />
                  <b-form-input
                    id="selectedInvoice"
                    v-model="selectedInvoiceId"
                    hidden
                  />
                </b-input-group>
              </b-form-group>
              <!-- <b-form-group class="mb-4" label="Nilai SPP*" label-cols="4">
                <b-input-group prepend="Rp.">
                  <b-form-input
                    v-model="selectedTotalAmount"
                    placeholder="0.000"
                    autocomplete="off"
                    readonly
                  />
                </b-input-group>
              </b-form-group> -->
              <b-form-group
                class="mb-4"
                label="Tanggal Jatuh Tempo*"
                label-for="due_date"
                label-cols="4"
              >
                <b-form-datepicker
                  v-model="selectedDueDate"
                  id="due_date"
                  locale="id"
                  placeholder="YYYY-MM-DD"
                  readonly
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
                    v-model="selectedTotalAmount"
                    readonly
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols="4"
                label="Nilai Pokok yang diajukan"
                label-for="pokok-dibayar"
                class="mb-4"
              >
                <b-input-group prepend="Rp.">
                  <cleave
                    id="pokok-dibayar"
                    v-model="InvoiceAmountPaid"
                    class="form-control text-right"
                    :raw="false"
                    :options="options.number"
                    placeholder="0,00000"
                    maxlength="50"
                    minlength="1"
                    required
                    autocomplete="off"
                  />
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
                label="Nilai Denda yang diajukan"
                label-for="denda-dibayar"
                class="mb-4"
              >
                <b-input-group prepend="Rp.">
                  <cleave
                    id="denda-dibayar"
                    v-model="FineAmountPaid"
                    class="form-control text-right"
                    :raw="false"
                    :options="options.number"
                    placeholder="0,00000"
                    maxlength="50"
                    minlength="1"
                    required
                    autocomplete="off"
                  />
                </b-input-group>
              </b-form-group>
            </b-overlay>
            <b-form-group
              class="mb-4"
              label="Tanggal Surat*"
              label-for="appeal_letter_publish_date"
              label-cols="4"
            >
              <b-form-datepicker
                id="publish_date"
                v-model="publish_date"
                locale="id"
              />
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Nomor Surat Permohonan*"
              label-for="appeal_letter_number"
              label-cols="4"
            >
              <b-form-input
                id="appeal_letter_number"
                v-model="appeal_letter_number"
                label-cols="2"
                required
                :rules="[v => !!v || 'Nomor Surat Permohonan wajib diisi']"
                autocomplete="off"
              />
            </b-form-group>
            <!-- 
            <b-form-group
              class="mb-4"
              label="Nilai Invoice yang diajukan*"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  v-model="appeal_total_amount"
                  placeholder="0.000"
                  autocomplete="off"
                />
              </b-input-group>
            </b-form-group>
            -->
            <b-form-group
              label-cols="4"
              label="File Surat Permohonan*"
              label-for="file"
            >
              <b-form-file
                v-model="fileLoc[0]"
                accept=".pdf"
                placeholder="Pilih file surat permohonan..."
                drop-placeholder="Drop file here..."
                @change="createBase64File"
                src=""
                autocomplete="off"
              />
              <small class="text-danger" v-if="fileLoc[0] === null">*Silakan unggah file surat permohonan !</small>
            </b-form-group>
            <b-form-group
              label-cols="4"
              label="Dokumen Pendukung*"
              label-for="docs"
            >
              <b-form-file
                v-model="fileZip[0]"
                accept=".zip"
                placeholder="Pilih dokumen pendukung (.zip)..."
                drop-placeholder="Drop file here..."
                @change="createBase64FileDocs"
                src=""
                autocomplete="off"
              />
              <small class="text-danger" v-if="fileZip[0] === null">*Silakan unggah dokumen pendukung dalam bentuk zip !</small>
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="Catatan Permohonan*"
              label-for="appeal_submission_notes"
              label-cols="4"
            >
              <b-form-textarea
                id="appeal_submission_notes"
                placeholder="Masukkan catatan permohonan"
                label-cols="2"
                :rules="[v => !!v || 'Catatan Permohonan wajib diisi']"
                v-model="appeal_submission_notes"
                autocomplete="off"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="8" lg="8" md="8">
            <p class="text-center">
              <feather-icon icon="InfoIcon" /> Pastikan data sudah benar. Data
              yang telah disimpan tidak dapat diubah.
            </p>
          </b-col>
          <b-col sm="8" lg="8" md="8" class="text-center">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'invoice-reduction' }"
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
              :disabled="!statusSave"
            >
              Simpan
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-overlay>
  </b-card>
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
  BInputGroup,
  BOverlay,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'
import InputFormat from '@/helpers/input-format'
import Cleave from 'vue-cleave-component'

export default {
  components: {
    vSelect,
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
    Cleave,
    BInputGroup,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      dataAplikasi: [],
      selectedApplication: null,
      selectedApp: null,
      dataKm: [],
      selectedKm: null,
      dataInvoice: [],
      selectedInvoice: null,
      selectedInvoiceId: null,
      selectedInvoiceNumber: null,
      appeal_letter_number: '',
      appeal_total_amount: null,
      appeal_submission_notes: '',
      fileLoc: [],
      fileZip: [],
      selectedTotalAmount: 0,
      selectedDueDate: '',

      // Services
      selectedAppServices: null,
      appServices: [],
      service_id: null,
      statusShowAppServices: true,
      selectedAppSubServicesName: null,
      showLoadingSave: false,
      selectedAppServicesName: null,

      // Sub Services
      selectedAppSubServices: null,

      // Jenis Izin
      selectedJenisIzin: null,
      jenisIzin: [
        { id: 1, text: 'Dapat Diperbaharui' },
        { id: 2, text: 'Sementara' },
      ],
      // Save
      showActionButton: true,
      statusShowApplication: true,
      publish_date: moment(new Date()).format('YYYY-MM-DD'),
      options: {
        number: InputFormat.options('number'),
      },
      guid_v4: uuid.v4(),

      showClient: false,
      ClientList: [],
      selectedClient: null,

      FineAmount: 0,
      InvoiceAmountPaid: 0,
      FineAmountPaid: 0,
      ShowLoadingGetDetailInvoice: false,
    }
  },
  created() {
    // this.getKM()
    this.getClient()
  },
  computed: {
    statusSave() {
      return (this.selectedApplication && this.selectedClient && this.selectedInvoiceId && this.InvoiceAmountPaid && this.FineAmountPaid  && this.selectedDueDate && this.appeal_letter_number && this.appeal_submission_notes && this.fileLoc[0])
    },
  },
  watch: {
    selectedApplication() {
      if (this.selectedApplication) {
        this.selectedApplicationInput()
      } else {
        this.selectedInvoiceNumber = null
        this.selectedTotalAmount = null
        this.selectedDueDate = null
        this.publish_date = null
      }
    }
  },
  methods: {
    async getClient(){
      this.showClient = true
      await axios({
        url: URLServices.client.index,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: DateConvertion.getTimeNow(),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.ClientList = result.data.data
          this.showClient = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan Service. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          this.showClient = false

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    selectClient() {
      this.selectedApplication = null
      this.getApplication()
    },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
    createBase64FileDocs(e) {
      const filez = e.target.files[0]
      this.createRequestVariableZip(filez)
    },
    createRequestVariableZip(filez) {
      const readerZIp = new FileReader()
      let a = []

      if (filez) {
        readerZIp.onloadend = e => {
          this.fileZip[0] = e.target.result
        }

        readerZIp.readAsDataURL(filez)
      }
      a = this.fileZip[0]
      return a
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()
      const dataZip = this.createRequestVariableZip()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc[0] = e.target.result
        }

        reader.readAsDataURL(file)
      }
      
      data.client_id = this.selectedClient
      data.application_id = this.selectedApplication
      data.invoice_id = this.selectedInvoiceId
      data.appeal_letter_number = this.appeal_letter_number
      data.appeal_letter_publish_date = this.publish_date
      data.appeal_total_amount = InputFormat.convNumString(this.InvoiceAmountPaid)
      data.appeal_submission_notes = this.appeal_submission_notes
      data.file_base64 = this.fileLoc.join()
      data.supporting_documents_file_base64 = dataZip
      data.annual_payment_amount = InputFormat.convNumString(this.InvoiceAmountPaid)
      data.fine_payment_amount = InputFormat.convNumString(this.FineAmountPaid)
      return data
    },
    selectedApplicationInput() {
      this.getInvoice(this.selectedApplication, this.selectedClientId)
    },
    async save() {
      const Param = this.createRequestVariable()

      if (parseInt(Param.annual_payment_amount,10) > parseInt(Param.appeal_total_amount,10)) {
        CustomNotification.notif(
          'warning',
          'Pokok yang diajukan melebihi pokok awal',
          'Mohon periksa kembali',
        )
        return false
      }

      if (parseInt(Param.fine_payment_amount,10) > parseInt(InputFormat.convNumString(this.FineAmount),10)) {
        CustomNotification.notif(
          'warning',
          'Denda yang diajukan melebihi denda awal',
          'Mohon periksa kembali',
        )
        return false
      }

      if ((!Param.annual_payment_amount && !Param.fine_payment_amount) || (Param.annual_payment_amount < 1 && Param.fine_payment_amount < 1)) {
        CustomNotification.notif(
          'warning',
          'Nilai pokok dan denda yang diajukan tidak boleh 0',
          'Mohon periksa kembali',
        )
        return false
      }

      this.showLoadingSave = true
      if (Param !== false) {
        await axios({
          url: URLServices.reduction.store,
          method: 'post',
          data: {
            request_id: this.guid_v4,
            request_date_time: DateConvertion.getTimeNow(),
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif('success', 'Berhasil menambahkan', 'Halaman akan diarahkan ke index')
              this.$router.push({ name: 'invoice-reduction' })
            } else {
              CustomNotification.notif('warning', 'Gagal menambahkan', 'Mohon coba beberapa saat kembali')
            }
            this.showLoadingSave = false
          })
          .catch(error => {
            CustomNotification.notif('danger', 'Gagal menambahkan', 'Mohon coba beberapa saat kembali')

            this.showLoadingSave = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    // async getServices() {
    //   this.statusShowAppServices = false
    //   await axios({
    //     url: URLServices.service_subservice.index,
    //     method: 'get',
    //     params: {
    //       request_id: 'guid_v4',
    //       request_date_time: DateConvertion.getTimeNow(),
    //       page: 1,
    //       length: 1000,
    //     },
    //     headers: {
    //       Authorization: `${TokenType} ${getToken()}`,
    //     },
    //   })
    //     .then(result => {
    //       this.appServices = result.data.data
    //       this.statusShowAppServices = true
    //     })
    //     .catch(error => {
    //       const errorMessage = `Gagal mendapatkan Service. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
    //       CustomNotification.notif('error', errorMessage)

    //       if (error.response.status && error.response.status === 401) {
    //         localStorage.removeItem('accessToken')
    //         localStorage.removeItem('userData')
    //         this.$router.go({ name: 'session-time-out' })
    //       }
    //     })
    // },
    // async getKM() {
    //   this.statusKm = false
    //   axios({
    //     url: URLServices.reduction_ministerial_decree.index,
    //     params: {
    //       request_id: this.guid_v4,
    //       request_date_time: DateConvertion.getTimeNow(),
    //       page: 1,
    //       length: 1000,
    //       application_id: '',
    //     },
    //     method: 'get',
    //     headers: {
    //       Authorization: `${TokenType} ${getToken()}`,
    //     },
    //   })
    //     .then(response => {
    //       this.dataKm = response.data.data
    //       this.statusKm = true
    //     })
    //     .catch(error => {
    //       this.statusKm = true
    //       if (error.response.status && error.response.status === 401) {
    //         localStorage.removeItem('accessToken')
    //         localStorage.removeItem('userData')
    //         this.$router.go({ name: 'login' })
    //       }
    //       this.showTable = false
    //       CustomNotification.notif('error', 'Gagal memuat data. Mohon coba kembali')
    //     })
    // },
    async getApplication() {
      this.statusApplication = false
      await axios({
        url: URLServices.reduction_application.index_core_by_client_id,
        params: {
          request_id: this.guid_v4,
          request_date_time: DateConvertion.getTimeNow(),
          client_id: this.selectedClient,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataAplikasi = response.data.data
          this.statusApplication = true
        })
        .catch(error => {
          this.statusApplication = true
          console.log(error)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'login' })
          // }
          this.showTable = false
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
        })
    },
    async getInvoice(idApp, idKM) {
      this.statusInvoice = false
      this.ShowLoadingGetDetailInvoice = true
      await axios({
        url: URLServices.reduction_invoice.get,
        params: {
          request_id: this.guid_v4,
          request_date_time: DateConvertion.getTimeNow(),
          ministerial_decree_id: idKM,
          application_id: idApp,

        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          // this.dataInvoice = response.data.data
          const dataInvoice = response.data.data[0]
          this.selectedInvoiceNumber = dataInvoice.invoice_number
          const tempAnnualAmount = InputFormat.NumberFormat(dataInvoice.invoice_total_amount)
          this.selectedTotalAmount = InputFormat.NumberFormat(InputFormat.convNumString(tempAnnualAmount))
          this.selectedDueDate = dataInvoice.invoice_due_date
          this.FineAmount = InputFormat.NumberFormat(dataInvoice.fine_amount)
          this.selectedInvoiceId = dataInvoice.id
          this.statusInvoice = true
          this.ShowLoadingGetDetailInvoice = false
        })
        .catch(error => {
          this.statusInvoice = true
          this.ShowLoadingGetDetailInvoice = false
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          this.showTable = false
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
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
