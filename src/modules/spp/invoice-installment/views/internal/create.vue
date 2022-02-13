<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            label-cols="4"
            label="Pelanggan"
            label-for="item-pelanggan"
          >
            <v-select
              id="item-pelanggan"
              v-model="selectedClient"
              box
              placeholder="-- Pilih Pelanggan --"
              label="spectra_ad_company"
              :options="client"
              @input="selectedAppInput"
            >
            </v-select>
          </b-form-group>
          <b-form-group class="mb-2" label="Aplikasi" label-cols="4">
            <v-select
              v-model="selectedNameApplication"
              label="name"
              box
              placeholder="-- Pilih Aplikasi --"
              :options="application"
              @input="selectedInputApplication"
            >
              <template v-slot:option="application">
                <span>{{ application.name }}</span>
              </template>
            </v-select>
          </b-form-group>
          <b-form-group class="mb-2" label="No. SPP" label-cols="4">
            <v-select
              v-model="selectedInvoice"
              box
              placeholder="-- Pilih SPP --"
              :options="dataInvoice"
              @input="selectedInvoiceInput"
            >
              <template v-slot:option="dataInvoice">
                <span>{{ dataInvoice.number }}</span>
              </template>
            </v-select>
          </b-form-group>
          <b-form-group class="mb-2" label="Nilai Pokok" label-cols="4">
            <b-input-group prepend="Rp.">
              <b-form-input
                v-model="selectedTotalAmount"
                id="readOnlyInput"
                class="text-right"
                readonly
              />
            </b-input-group>
          </b-form-group>
          <b-form-group class="mb-2" label="Nilai Denda" label-cols="4">
            <b-input-group prepend="Rp.">
              <b-form-input
                v-model="selectedFineAmount"
                id="readOnlyInput"
                class="text-right"
                readonly
              />
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tgl. Jatuh Tempo"
            label-for="tgl_jatuh_tempo"
            label-cols="4"
          >
            <b-form-datepicker
              v-model="selectedDueDate"
              class="font-weight-bold"
              id="isr_ipfr_tgl_mulai"
              locale="id"
              placeholder="YYYY-MM-DD"
              readonly
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tgl. Surat"
            label-for="tgl_surat"
            label-cols="4"
          >
            <b-form-datepicker
              v-model="appeal_publish_date"
              class="font-weight-bold"
              id="tgl_surat"
              locale="id"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Jumlah Bulan Cicilan"
            label-cols="4"
          >
            <b-form-input
              v-model="number_of_months_installment"
              class="font-weight-bold"
              value=""
            />
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="File Surat Permohonan*"
            label-for="file"
          >
            <b-form-file
              v-model="fileLoc"
              accept=".pdf"
              placeholder="Berkas yang diupload dalam format PDF"
              @change="createBase64File"
              src=""
            />
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="Dokumen Pendukung*"
            label-for="file"
          >
            <b-form-file
              v-model="fileLocZip"
              accept=".zip, .rar"
              placeholder="Berkas wajib dalam format zip/rar"
              drop-placeholder="Unggah File Zip..."
              @change="createBase64FileZip"
              src=""
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="No. Surat Permohonan"
            label-cols="4"
          >
            <b-form-input
              v-model="appeal_letter_number"
              class="font-weight-bold"
              value=""
            />
          </b-form-group>
          <b-form-group class="mb-2" label="Catatan Permohonan" label-cols="4">
            <b-form-textarea
              v-model="appeal_submission_note"
              id="textarea-rows"
              placeholder=""
              rows="3"
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
          >
            Batal
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-2"
            :disabled="!statusSave"
            @click="save()"
          >
            <!-- <b-spinner small v-if="isLoading" /> -->
            Simpan
          </b-button>
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
  BFormFile,
  BInputGroup,
  // BSpinner,
  // BFormSelect,
  // BTable,
  BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import axios from 'axios'
import moment from 'moment'
import vSelect from 'vue-select'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import { required } from '@/helpers/validations'
import InputFormat from '@/helpers/input-format'
// import Cleave from 'vue-cleave-component'
import { uuid } from 'vue-uuid'

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
    BFormFile,
    BInputGroup,
    // BSpinner,
    // BTable,
    BFormTextarea,
    // BCardCode,
    // BFormSelect,
    vSelect,
    // Cleave,
  },
  data() {
    return {
      required,
      selectedClient: null,
      client: [],
      guid_v4: uuid.v4(),
      dataInvoice: [],
      dataAplikasi: [],
      dataKm: [],
      selectedInvoice: null,
      selectedApplication: null,
      selectedKm: null,
      statusShowClient: true,
      selectedTotalAmount: '',
      selectedDueDate: null,
      selected: null,
      fileLoc: null,
      fileLocZip: null,
      datafileZip: null,
      fileBase64: '',
      fileBase64Zip: '',
      appeal_publish_date: '',
      number_of_months_installment: '',
      appeal_letter_number: '',
      appeal_submission_note: '',
      selectedNameApplication: null,
      application: [],
      // showActionButton: true,
      // isLoading: false,
      dataField: [
        {
          field1: '1',
          field2: '1 Januari 2021',
          field3: '31 Januari 2021',
          field4: '50.000.000',
        },
        {
          field1: '2',
          field2: '1 Februari 2021',
          field3: '28 Februari 2021',
          field4: '50.000.000',
        },
      ],
      options: {
        number: InputFormat.options('number'),
      },
      selectedFineAmount: null,
    }
  },
  computed: {
    statusSave() {
      return (
        this.selectedClient &&
        this.selectedNameApplication &&
        this.appeal_publish_date &&
        this.appeal_letter_number &&
        this.selectedInvoice &&
        this.selectedTotalAmount &&
        this.selectedDueDate &&
        this.number_of_months_installment &&
        this.appeal_submission_note
      )
    },
  },
  directives: {
    Ripple,
  },
  created() {
    this.getClient()
    // this.getApplication()
    // this.getKM()
    // this.alertTrial()
  },
  methods: {
    alertTrial() {
      const succesMessage = `Data berhasil ditampilkan.`
      CustomNotification.notif('success', 'Berhasil', succesMessage)
    },
    async getClient() {
      this.showPosisi = true
      await axios({
        url: URLServices.client.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.posisi = result.data.employee_list
          this.client = result.data.data
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getSPPData(appId, clientID) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.invoiceGetOpenInvoice.get_open_invoice,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          application_id: appId,
          client_id: clientID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataInvoice = response.data.data
          this.statusInvoice = true
          console.log(this.dataInvoice, 'data invoice')
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'warning', errorMessage)
        })
    },
    selectedAppInput(value) {
      // this.selectedApp = value.id
      this.selectedApp = value.id
      this.selectedClient = value.spectra_ad_company

      this.getApplication(this.selectedApp)
      // this.getKmData(this.selectedApp)
      return true
    },
    selectedInputApplication(value) {
      // this.selectedApp = value.id
      this.selectedIdApplication = value.id
      this.selectedNameApplication = value.name
      this.getSPPData(this.selectedIdApplication, this.selectedApp)

      // this.getKmData(this.selectedIdApplication)
    },
    // selectedApplicationInput(value) {
    //   this.seletedApp = value.id
    //   this.selectedAppName = value.official_name

    //   this.getApplication(this.selectedApplication)
    //   this.getKM(this.seletedApp)
    // },
    selectedInvoiceInput(value) {
      this.seletedInvoiceId = value.id
      this.selectedInvoice = value.number
      this.selectedTotalAmount = InputFormat.NumberFormat(value.total_amount)
      this.selectedFineAmount = InputFormat.NumberFormat(value.fine_amount)
      this.selectedDueDate = value.due_date
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
      // const data = {}
      const reader = new FileReader()
      if (fileZip) {
        reader.onloadend = e => {
          // this.fileLoc = e.target.result
          this.fileLocZip = e.target.result
          // this.fileBase64 = this.fileLoc
          this.fileBase64Zip = this.fileLocZip
        }

        reader.readAsDataURL(fileZip)
      }
      this.datafileZip = this.fileLocZip
      // data.supporting_documents_file_base64 = this.fileLocZip
      return this.datafileZip
    },

    createRequestVariableFile(file) {
      const data = {}
      const reader = new FileReader()
      const dataZip = this.createRequestVariableFileZip()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          // this.fileLocZip = e.target.result
          this.fileBase64 = this.fileLoc
          // this.fileBase64Zip = this.fileLocZip
        }

        reader.readAsDataURL(file)
      }
      // else if (fileZip) {
      //   reader.onloadend = e => {
      //     // this.fileLoc = e.target.result
      //     this.fileLocZip = e.target.result
      //     // this.fileBase64 = this.fileLoc
      //     this.fileBase64 = this.fileLocZip
      //   }

      //   reader.readAsDataURL(fileZip)
      // }

      data.appeal_letter_number = this.appeal_letter_number
      data.appeal_publish_date = this.appeal_publish_date
      data.application_id = this.selectedIdApplication
      // data.ministerial_decree_id = this.selectedKm
      data.invoice_id = this.seletedInvoiceId
      data.number_of_months_installment = this.number_of_months_installment
      data.file_base_64 = this.fileLoc
      data.supporting_documents_file_base64 = dataZip
      data.appeal_submission_note = this.appeal_submission_note
      return data
    },
    async getApplication(clientID) {
      this.showPosisi = true
      await axios({
        url: URLServices.applicationIdByClientID.index_core_by_client_id,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          client_id: clientID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.posisi = result.data.employee_list
          this.application = result.data.data
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getKM(idKm) {
      this.statusKm = false
      axios({
        url: URLServices.ministerial_decree.index,
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
          application_id: idKm,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataKm = response.data.data
          this.statusKm = true
        })
        .catch(error => {
          this.statusKm = true
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          this.showTable = false
          CustomNotification.notif(
            'error',
            'Gagal memperbaharui data. Mohon coba kembali'
          )
        })
    },
    // async getInvoice(idGetKm) {
    //   this.statusKm = false
    //   axios({
    //     url: URLServices.invoice.get_open_invoice,
    //     params: {
    //       request_id: this.guid_v4,
    //       request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
    //       page: 1,
    //       length: 1000,
    //       client_id: '',
    //       application_id: '',
    //       ministerial_decree_id: idGetKm,

    //     },
    //     method: 'get',
    //     headers: {
    //       Authorization: `${TokenType} ${getToken()}`,
    //     },
    //   })
    //     .then(response => {
    //       this.dataInvoice = response.data.data
    //       this.statusInvoice = true
    //       console.log(this.dataInvoice, 'data invoice')
    //     })
    //     .catch(error => {
    //       this.statusInvoice = true
    //       if (error.response.status && error.response.status === 401) {
    //         localStorage.removeItem('accessToken')
    //         localStorage.removeItem('userData')
    //         this.$router.go({ name: 'login' })
    //       }
    //       this.showTable = false
    //       CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
    //     })
    // },
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
        const errorMessage = `Anda harus memilih minimal 1 role`
        CustomNotification.notif('warning', 'warning', errorMessage)
        // this.showCreteSimulasiForm = false
        return false
      }

      return data
    },
    async save() {
      // this.showActionButton = false
      // this.isLoading = true
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      this.showCreteUserForm = true
      const Param = this.createRequestVariableFile()
      if (!this.fileLoc) {
        CustomNotification.notif(
          'warning',
          'Surat Permohonan belum diupload',
          'Mohon periksa kembali'
        )
        return false
      }

      if (!this.fileLocZip) {
        CustomNotification.notif(
          'warning',
          'Dokumen Pendukung belum diupload',
          'Mohon periksa kembali'
        )
        return false
      }

      if (Param !== false) {
        await axios({
          url: URLServices.installment.store,
          method: 'post',
          data: {
            request_id: this.guid_v4,
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
              const successMessage = `Berhasil menambahkan permohonan cicilan baru`
              CustomNotification.notif('success', 'Berhasil', successMessage)
              this.$router.push({ name: 'invoice-installment' })
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
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
