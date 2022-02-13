<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Tambah Penundaan Pembayaran</h5>
        </b-card-text>
        <!--KM-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group
              label-cols="2"
              label="Client"
              label-for="item-posisi"
            >
              <v-select
                v-model="selectedClient"
                label="spectra_ad_company"
                :options="allClient"
                @input="selectedClientInput"
                placeholder="-- Pilih Klien --"
              >
                <template v-slot:option="allClient">
                  <span> {{ allClient.spectra_ad_company }}</span>
                </template>
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Aplikasi-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group
                label-cols="2"
                label="Aplikasi"
                label-for="item-aplikasi"
            >
              <v-select
                  id="item-aplikasi"
                  v-model="selectedNameApplication"
                  label="name"
                  :options="application"
                  @input="selectedInputApplication"
                  placeholder="-- Pilih Aplikasi --"
              >
              </v-select>
              <template v-slot:option="application">
                  <span> {{ application.name }}</span>
                </template>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Nomor SPP-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Nomor SPP" label-for="number" disabled>
              <b-form-input autocomplete="off" id="number" v-model="number" readonly />
              <b-form-input autocomplete="off" id="idSPP" v-model="idSPP"  hidden/>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Nilai SPP-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Nilai SPP" label-for="total_amount" disabled>
              <b-form-input autocomplete="off" id="total_amount" v-model="total_amount" readonly />
            </b-form-group>
          </b-col>
        </b-row>
        <!--Tangal Jatuh Tempo-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Tanggal Jatuh Tempo" label-for="due_date">
              <b-form-input type="date" autocomplete="off" id="due_date" v-model="due_date" readonly/>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Tanggal Surat-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Tanggal Surat" label-for="publish_date">
              <b-form-datepicker
                class="font-weight"
                id="publish_date"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                v-model="letter_date"
                placeholder="DD-MM-YYYY"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <!--Nomor Surat Permohonan-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Nomor Surat Permohonan" label-for="nomorSurat">
              <b-form-input autocomplete="off" id="nomorSurat" v-model="letter_number" required />
            </b-form-group>
          </b-col>
        </b-row>
        <!--Tanggal jatuh Tempo Baru-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Tanggal Jatuh Tempo Baru" label-for="publish_date2">
              <b-form-datepicker
                class="font-weight"
                id="publish_date2"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                v-model="new_due_date"
                placeholder="DD-MM-YYYY"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <!--File Surat Permohonan-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="File Surat Permohonan" label-for="file">
              <b-form-file
                  v-model="fileLoc"
                  accept=".pdf"
                  required
                  placeholder="Pilih upload dokumen..."
                  drop-placeholder="Drop file here..."
                  @change="createBase64File"
                  src=""
              />
            </b-form-group>
          </b-col>
        </b-row>
        <!--Catatan Permohonan-->
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Catatan Permohonan" label-for="description">
              <b-form-textarea
                  id="description"
                  v-model="description"
                  required
                  maxlength="200"
                  minlength="10"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-col offset-md="4">
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'invoice-postponement' }"
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
  BFormFile,
  BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import moment from 'moment'
// import { heightTransition } from '@core/mixins/ui/transition'
// import UserManagement from '@/services/UserManagement'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'

export default {
  // mixins: [heightTransition],
  data() {
    return {
      positions: [
        {
          id: null,
          appointment_letter_number: '',
          start_date: null,
          end_date: null,
        },
      ],
      selectedCategory: [
        {
          id: null,
          nik: null,
          full_name: null,
        },
      ],
      // Client
      selectedAplikasi: null,
      selectedApplication: null,
      selectedMinisterialDecree: null,
      selectedApp: null,
      selectedIdApplication: null,
      selectedNameApplication: null,
      client: [],
      dataKm: [],
      application: [],
      ministerial_decree: [],
      selectedKm: null,
      selectedKmAppId: null,
      allkm: [],
      allClient: [],
      statusShowClient: true,
      selectedKmNumber: '',
      selectedClient: '',
      selectedClientId: '',
      number: null,
      total_amount: null,
      due_date: '',
      idSPP: '',
      BANK: '',
      new_due_date: '',
      letter_number: '',
      letter_date: '',

      nextTodoId: 2,
      // Biodata
      nik: '',
      description: '',
      full_name: '',
      gender: '',
      phone_number: '',
      date_of_birth: '',
      address: '',
      email: '',
      username: '',
      email_login: '',
      password: '',
      password2: '',
      official_name: '',
      publish_date: null,
      name: '',
      // Avatar
      fileLoc: null,
      fileBase64: '',
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],
      employee: [],
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
    BFormFile,
    BRow,
    BOverlay,
    vSelect,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  created() {
    // this.getClient()
    this.getKmData()
  },
  // mounted() {
  //   this.initTrHeight()
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.initTrHeight)
  // },
  methods: {
    selectedClientInput(value) {
      this.selectedClientId = value.id
      this.selectedClient = value.spectra_ad_company
      this.getApplication(this.selectedClientId)
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      this.getApplication(this.selectedKm)
    },
    selectedInputApplication(value) {
      this.selectedIdApplication = value.id
      this.selectedNameApplication = value.name
      this.getSPPData(this.selectedIdApplication, this.selectedClientId)
    },
    async getApplication(idClient) {
      this.showPosisi = false
      await axios({
        url: URLServices.applicationAPI.index_by_client_id,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          client_id: idClient,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      }).then(response => {
        // this.posisi = result.data.employee_list
        this.application = response.data.data
        this.showPosisi = true
      }).catch(error => {
        const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('warning', errorMessage)
        if (error.response.status && error.response.status === 401) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userData')
          this.$router.go({ name: 'session-time-out' })
        }
        this.showPosisi = false
      })
    },
    async getKmData() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.client_invoice_manual.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          page: 1,
          length: 1000,
          search: '',
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      }).then(result => {
        this.allClient = result.data.data
        this.client.selectedClient = this.allClient.spectra_ad_company
      }).catch(error => {
        const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('warning', errorMessage)
      })
    },
    async getSPPData(appId, clientId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.invoiceAPI.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          client_id: clientId,
          application_id: appId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      }).then(result => {
        // this.allkm = result.data
        const dataResult = result.data.data[0]
        this.number = dataResult.invoice_number
        this.total_amount = Number(dataResult.invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
        this.due_date = dataResult.invoice_due_date
        this.idSPP = dataResult.id
      }).catch(error => {
        const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('warning', errorMessage)
      })
    },
    // initTrHeight() {
    //   this.trSetHeight(null)
    //   this.$nextTick(() => {
    //     this.trSetHeight(this.$refs.form.scrollHeight)
    //   })
    // },
    createBase64File(e) {
      // console.log('apa ini leeeee', e)
      const file = e.target.files[0]
      // console.log(e.target.files, 'ini files')
      // console.log(file, 'ini file')
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          console.log(this.fileLoc)
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }
      data.appeal_letter_number = this.letter_number // nomor surat
      data.appeal_publish_date = this.letter_date // tanggal surat
      data.invoice_id = this.idSPP
      data.appeal_due_date = this.new_due_date // jatuh tempo baru
      data.appeal_submission_notes = this.description // descrpisi
      data.file_base64 = this.fileLoc // fileupload
      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()
      console.log('payload', Param)
      if (Param !== false) {
        await axios({
          url: URLServices.postponement.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        }).then(result => {
          if (result.data.response_code === '00') {
            const successMessage = 'Berhasil menambahkan data baru'
            CustomNotification.notif('success', 'Sukses !', successMessage)
            this.$router.push({ name: 'penundaan-manual' })
          } else {
            const responseMessage = result.data.response_message
            CustomNotification.notif('warning', 'Error !', responseMessage)
          }
          this.showCreteUserForm = false
        }).catch(error => {
          const notifError = '500: Internal Server Error'
          CustomNotification.notif('warning', 'Error !',notifError)
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

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
