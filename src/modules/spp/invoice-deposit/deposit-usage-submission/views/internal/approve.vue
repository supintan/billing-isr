<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
        <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Review Permohonan Penggunaan Deposit</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="8" sm="12">
            <b-form-group label-cols="4" label="Tanggal Surat Permohonan" label-for="publish_date">
            <b-form-datepicker autocomplete="off" id="publish_date" v-model="publish_date" readonly/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="12">
            <b-form-group label-cols="4" label="No. Surat Permohonan" label-for="number_request_letter" for="example-locales" >
              <b-form-input autocomplete="off" id="number_request_letter" v-model="number_request_letter" readonly/>
            </b-form-group>
            <b-form-group label-cols="4" label="File Surat Permohonan" >
              <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-info" style="position: relative;" @click="onClick()"> Download File </button>
            </b-form-group>
            <b-form-group label-cols="4" label="Catatan permohonan" label-for="description">
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
        <b-row class="mb-1">
          <b-col lg="8" sm="12">
            <b-form-group
              label-cols="4"
              label="Pelanggan"
              label-for="item-pelanggan"
            >
            <b-form-input
                id="readOnlyInput"
                class="font-weight"
                v-model="selectedClient"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
                <b-col lg="8" sm="12">
                  <b-form-group
                    label-cols="4"
                    label="Aplikasi"
                    label-for="item-posisi"
                  >
                  <b-form-input
                    id="readOnlyInput"
                    class="font-weight"
                    v-model="selectedNameApplication"
                    readonly
                  />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="8" sm="12">
                <b-form-group label-cols="4" label="Nomor SPP" label-for="number" disabled>
                  <b-form-input autocomplete="off" id="number" v-model="number" readonly />
                  <b-form-input autocomplete="off" id="idSPP" v-model="idSPP"  hidden/>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="8" sm="12">
                <b-form-group label-cols="4" label="Nilai SPP" label-for="total_amount" disabled>
                  <b-input-group prepend="Rp.">
                    <b-form-input autocomplete="off" class="text-right" id="total_amount" v-model="total_amount" readonly />
                  </b-input-group>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="8" sm="12">
                <b-form-group label-cols="4" label="Tanggal Jatuh Tempo" label-for="due_date">
                  <b-form-input type="date" autocomplete="off" id="due_date" v-model="due_date" readonly/>
                  <b-form-input type="date" autocomplete="off" id="DataIdDeposit" v-model="DataIdDeposit" hidden/>
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
          >
            <template #cell(no)="data">
              {{ perPage * (currentPage - 1) + data.index + 1 }}
            </template>
            <template #cell(decision_letter_publish_date)="data">
              {{ convDate(data.item.decision_letter_publish_date) }}
            </template>
            <template #cell(field6)="dataField">
              <b-form-input
                :id="'Amountid' + dataField.index"
                class="font-weight-bold"
              />
            </template>
            <template #cell(deposit_balance_amount)="data">
              <div style="width: 150px">
                {{ `Rp. ${NumberFormat(data.item.deposit_balance_amount)}` }}
              </div>
            </template>
            <template #cell(deposit_usage_amount)="data">
              <div style="width: 150px">
                {{ `Rp. ${NumberFormat(data.item.deposit_usage_amount)}` }}
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <br>
          <b-form-group
            class="mb-2"
            label="Total Penggunaaan Deposit"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input class="text-right" v-model="CountDepositUsage" readonly/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Kurang Bayar"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input class="text-right" v-model="CountCreditAmount" readonly/>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
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
        </b-form>
    </b-card>
    <b-card>
      <h5 class="text-primary">REVIEW PERMOHONAN PENGUNAAN DEPOSIT</h5>
        Untuk menyetujui penggunaan deposit ini, pilih 'Setuju' dan klik tombol 'simpan'
        <br/>
        <br/>
        <b-row>
        <b-col lg="8" sm="10">
          <b-form-group label-cols="4" label="Keputusan" >
            <b-form-radio-group
              v-model="selectedFormat"
              :options="fileOptions"
              value-field="item"
              text-field="name"
              disabled-field="Enabled"
              class="demo-inline-spacing"
            />
            <hr>
            <b-button size="sm" @click="resetSelectedFormat">Reset Keputusan</b-button>
          </b-form-group>
        </b-col>
        <b-col lg="8" sm="10" v-if="selectedFormat !== 'Setuju' && selectedFormat !== 'Tidak Setuju'">
          <b-form-group label-cols="4" label="Surat Balasan*" label-for="file">
            <b-form-file
              v-model="fileLetter"
              accept=".pdf"
              required
              placeholder="Pilih surat balasan (.pdf)..."
              drop-placeholder="Drop file here..."
              @change="createBase64FileLetter"
              src=""
            />
          </b-form-group>
          </b-col>
        <b-col lg="8" sm="10" v-if="selectedFormat === 'Setuju' || selectedFormat === 'Tidak Setuju'">
          <b-form-group
            label-cols="4"
            label="Nomor Surat Keputusan"
            label-for=""
          >
          <b-form-input v-model="approveNumberRequest"/>
          </b-form-group>
          </b-col>
          <b-col lg="8" sm="10" v-if="selectedFormat === 'Setuju' || selectedFormat === 'Tidak Setuju'">
            <b-form-group label-cols="4" label="Tanggal Surat Keputusan" label-for="review_date">
              <b-form-datepicker autocomplete="off" id="review_date" v-model="reviewDate"/>
            </b-form-group>
          </b-col>
          <!-- <b-col lg="12" sm="10" v-if="selectedFormat !== 'Tidak Setuju'">
            <b-form-group
              label-cols="3"
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
              >
              </v-select>
              <div class="mb-1"></div>
                <template>
                  <b-button @click="preview">
                    Tampilkan Preview
                  </b-button>
                </template>
            </b-form-group>
          </b-col> -->
          <b-col lg="12" sm="10">
          <!-- <b-form-group
            label="Tgl Surat Permohonan"
            label-cols="3"
          >
          <b-form-datepicker
            id="tgl_Surat_Permohonan"
            v-model="approveDateRequest"
            locale="id"
          />
          </b-form-group> -->
          </b-col>
          <b-col lg="8" sm="10" v-if="selectedFormat === 'Setuju' || selectedFormat === 'Tidak Setuju'">
          <b-form-group label-cols="4" label="Surat Keputusan*" label-for="file">
            <b-form-file
              v-model="fileLoc"
              accept=".pdf"
              required
              placeholder="Pilih surat keputusan (.pdf)..."
              drop-placeholder="Drop file here..."
              @change="createBase64File"
              src=""
            />
          </b-form-group>
          </b-col>
          <b-col lg="8" sm="12" v-if="selectedFormat === 'Setuju' || selectedFormat === 'Tidak Setuju'">
          <b-form-group label-cols="4" label="Catatan Keputusan" label-for="approveSubmissionNotesRequest">
            <b-form-textarea
              id="approveSubmissionNotesRequest"
              v-model="approveSubmissionNotesRequest"
              required
              maxlength="200"
              minlength="10"
            >
            </b-form-textarea>
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
            <div>
              <b-overlay>
                <b-card-text>
                  Berikut ini adalah preview Pooling SPP
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
            :to="{ name: 'deposit-submission' }"
            variant="outline-secondary"
          >
            Batal
          </b-button>
          <b-button
            v-if="selectedFormat === 'Setuju' || selectedFormat === 'Tidak Setuju'"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            @click="save()"
          >
            Simpan
          </b-button>
          <b-button
            v-if="selectedFormat !== 'Setuju' && selectedFormat !== 'Tidak Setuju'"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            @click="update()"
          >
            Update
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
  BCardText,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BForm,
  BFormTextarea,
  BFormDatepicker,
  BTable,
  BFormFile,
  BFormRadioGroup,
  BModal,
  BEmbed,
} from 'bootstrap-vue'
import { uuid } from 'vue-uuid'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'
import axios from 'axios'
import moment from 'moment'
import InputFormat from '@/helpers/input-format'
import { heightTransition } from '@/helpers/transition'
import UserManagement from '@/services/UserManagement'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  mixins: [heightTransition],
  data() {
    return {
      selectedFormat: null,
      fileOptions: [
        { item: 'Setuju', name: 'Disetujui' },
        { item: 'Tidak Setuju', name: 'Ditolak' },
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'decision_letter_number', label: 'Nomor Surat Permohonan' },
        { key: 'decision_letter_publish_date', label: 'Tanggal Surat' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'deposit_balance_amount', label: 'Nilai Deposit' },
        { key: 'deposit_usage_amount', label: 'Nilai Deposit yang Digunakan' },
      ],
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
      IddetailDeposit: this.$route.params.IddetailDeposit,
      idClientDeposit: this.$route.params.idClientDeposit,
      idDepositUsageSubmission: this.$route.params.idDepositUsageSubmission,
      idDepositUsage: '',
      variabelHitung: 0,
      perPage: 10,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      items: [],
      detailDeposit: [],
      DataDuedate: [],
      DataAmount: [],
      DataIdDeposit: [],
      selectedClient: null,
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
      statusShowClient: true,
      selectedKmNumber: '',
      number: null,
      total_amount: 0,
      due_date: '',
      idSPP: '',
      number_request_letter: null,
      // BANK: '',
      total: 0,

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
      dueDepositUsage: [],
      approveSubmissionNotesRequest: '',
      approveDateRequest: null,
      approveNumberRequest: '',
      templateId: '',
      selectednameTemplate: null,
      template: [],
      pdfFile: null,
      showFilePDF: false,
      reviewDate: null,
      fileLetter: null,
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
    BFormDatepicker,
    BTable,
    BFormFile,
    BFormRadioGroup,
    // vSelect,
    BModal,
    BEmbed,
  },
  directives: {
    Ripple,
  },
  // computed: {
  //   CountDepositUsage() {
  //     let count = 0
  //     Object.keys(this.dueDepositUsage).forEach(key => {
  //       const minInput = this.dueDepositUsage[key] > 0 ? this.dueDepositUsage[key] : 0
  //       count += parseInt(minInput, 10)
  //       // this.variabelHitung += this.total
  //     })
  //     return count
  //   },
  //   CountCreditAmount() {
  //     // let sumCredit = 0
  //     let hasil = 0
  //     hasil = this.total_amount - this.CountDepositUsage
  //     // sumCredit = hasil
  //     return hasil
  //   },
  // },
  created() {
    // this.getClient()
    this.getDetailDeposit()
    this.GetDepositList()
    this.getTemplate()
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    NumberFormat(number) {
      this.value = number
      if (this.value) {
        return Number(this.value).toLocaleString('in-ID', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 5,
        })
      }
      return 0
    },
    convHepengString(number) {
      this.value = number
      let newValue = 0

      if (this.value) {
        if (this.value !== null && this.value.length > 0) {
          const newValue1 = this.value.replaceAll('.', ',')
          newValue = newValue1.replaceAll(',', '.')
        }
      }
      return newValue
    },
    resetSelectedFormat() {
      this.selectedFormat = null
    },
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    selectedtemplateInput(value) {
      this.selectedtemplateID = value.id
      this.selectednameTemplate = value.name
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
          Authorization: `${TokenType} ${getToken()} `,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.showFilePDF = true
          }
          this.showFilePDF = false
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplete. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', 'Error', errorMessage)
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
          length: 100,
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
          const errorMessage = `Gagal mendapatkan data template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getEmployee() {
      this.showPosisi = true
      await axios({
        url: URLServices.employee.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.posisi = result.data.employee_list
          this.employee = result.data.data.employee_list
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
    selectedAppInput(value) {
      // this.selectedApp = value.id
      this.selectedApp = value.id
      this.selectedClient = value.spectra_ad_company

      this.getApplication(this.selectedApp)
      return true
    },
    selectedInputApplication(value) {
      // this.selectedApp = value.id
      this.selectedIdApplication = value.id
      this.selectedNameApplication = value.client_name

      this.getKmData(this.selectedIdApplication)
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      this.getSPPData(this.selectedKm)
    },
    onPreview(templateId) {
      this.pdfFile = null
      this.$bvModal.show('modalOnPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: templateId,
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
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplete. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
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
          length: 10,
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
					CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getApplication() {
      this.showPosisi = true
      await axios({
        url: URLServices.applicationDeposit.indexDeposit,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10,
          client_id: this.selectedApp,
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
					CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    onClick() {
      axios({
        url: URLServices.depositRequest.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.IddetailDeposit,
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
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    async getKmData(appId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.ministerial_decree.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          application_id: appId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.allkm = result.data.data
          this.dataKm.selectedKmNumber = this.allkm.number
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
					CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async getSPPData(appId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.openInvoivesGet.indexOpenGet,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          ministerial_decree_id: appId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.allkm = result.data
          const dataResult = result.data.data[0]
          this.number = dataResult.number
          this.total_amount = dataResult.total_amount
          this.due_date = dataResult.due_date
          this.idSPP = dataResult.id
          this.clientId = dataResult.client_id

          this.GetDepositList(this.clientId)
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
					CustomNotification.notif('warning', 'Warning', errorMessage)
        })
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
      this.createRequestVariableFile(file)
    },
    createBase64FileLetter(e) {
      const filez = e.target.files[0]
      this.createRequestVariableLetter(filez)
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
      data.appeal_letter_publish_date = this.publish_date
      data.appeal_letter_number = this.number_request_letter
      data.file_base64 = this.fileLoc
      data.invoice_id = this.idSPP
      data.payment_date = this.due_date
      // data.bank = this.BANK
      data.appeal_notes = this.description
      data.invoice_total_amount = this.total_amount
      data.deposit_amount = this.CountDepositUsage
      data.deposit_usage_amount = this.CountDepositUsage
      data.invoice_remaining_amount = this.CountCreditAmount
      data.deposit_usage = this.createRequestVariable()
      // const Params = this.createRequestVariable()

      return data
    },
    createRequestVariable() {
      const data = {}
      Object.keys(this.dueDepositUsage).forEach(key => {
        data[key] = {
          deposit_id: this.DataIdDeposit[key],
          // deposit_id: key,
          deposit_usage_amount: this.dueDepositUsage[key],
        }
      })

      return data
    },
    getRequestParams() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}

      // params.client_id = this.clientId
      params.client_id = this.idClientDeposit
      params.deposit_usage_id = this.IddetailDeposit
      params.request_id = uuid.v4()
      params.request_date_time = today
      return params
    },
    async getDetailDeposit() {
      console.log(this.IddetailDeposit, 'aasas')
      await axios({
        url: URLServices.depositRequest.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.IddetailDeposit,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.detailDeposit = response.data.data
          this.publish_date = this.detailDeposit[0].appeal_letter_publish_date
          this.number_request_letter = this.detailDeposit[0].appeal_letter_number
          this.description = this.detailDeposit[0].submission_notes ? this.detailDeposit[0].submission_notes : '-'
          this.selectedClient = this.detailDeposit[0].client_name
          this.selectedNameApplication = this.detailDeposit[0].application_name
          this.selectedKmNumber = this.detailDeposit[0].ministerial_decree_number
          this.number = this.detailDeposit[0].invoice_number
          this.total_amount = InputFormat.NumberFormat(this.detailDeposit[0].invoice_total_amount)
          this.due_date = this.detailDeposit[0].invoice_due_date
          this.CountDepositUsage = InputFormat.NumberFormat(this.detailDeposit[0].deposit_usage_amount)
          this.CountCreditAmount = InputFormat.NumberFormat(this.detailDeposit[0].invoice_remaining_amount)
          this.idDepositUsage = this.detailDeposit[0].deposit_usage_id
          console.log(this.detailDeposit, 'data detail deposit')
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
    async GetDepositList() {
      const param = this.getRequestParams(
        this.request_id,
        this.request_date_time,
        this.client_id,
        this.deposit_usage_id,
      )
      await axios({
        url: URLServices.depositRequest.getDataTable,
        method: 'get',
        params: param,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.items = data
          this.amountdeposit = data.deposit_balance_amount.replaceAll('.00000', '')
          this.DataDuedate.splice(0)
          this.DataAmount.splice(0)
          this.DataIdDeposit.splice(0)
          this.DataDepositbalance.splice(0)
          Object.keys(this.items).forEach(key => {
            this.DataDuedate[key] = this.items[key].due_date
            this.DataAmount[key] = this.items[key].deposit_usage_amount.replaceAll('.00000', '')
            this.DataIdDeposit[key] = this.items[key].deposit_id
            this.DataDepositbalance[key] = this.items[key].deposit_balance_amount.replaceAll('.00000', '')

            console.log(this.DataAmount[key])
            console.log('test Aing Jawara')
          })
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data kalkulasi. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async save() {
      this.showCreteUserForm = true
      if (this.selectedFormat === 'Setuju') {
        // if (1 !== 2) {
          await axios({
            url: URLServices.depositSubmission.approve,
            method: 'post',
            data: {
              request_id: uuid.v4(),
              request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
              data: {
                id: this.idDepositUsageSubmission,
                review_letter_publish_date: this.approveDateRequest,
                review_letter_number: this.approveNumberRequest,
                reviewer_notes: this.approveSubmissionNotesRequest,
                review_date_time: this.reviewDate,
                file_base64: this.fileLoc,
              },
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
                CustomNotification.notif('success', 'Sukses !', 'Berhasil memperbaharui data')
                this.$router.push({ name: 'deposit-submission' })
              } else {
                CustomNotification.notif('warning', 'Error !', result.data.response_message)
              }
              this.showCreteUserForm = false
            })
            .catch(error => {
              const notifError = UserManagement.Handling(error)
              CustomNotification.notif('error', notifError.message)
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        // }
      }
      if (this.selectedFormat === 'Tidak Setuju') {
        // if (1 !== 2) {
          await axios({
            url: URLServices.depositSubmission.reject,
            method: 'post',
            data: {
              request_id: uuid.v4(),
              request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
              data: {
                id: this.idDepositUsageSubmission,
                review_letter_publish_date: this.approveDateRequest,
                review_letter_number: this.approveNumberRequest,
                reviewer_notes: this.approveSubmissionNotesRequest,
                review_date_time: this.reviewDate,
                file_base64: this.fileLoc,
              },
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
                CustomNotification.notif('success', 'Berhasil memperbaharui data')
                this.$router.push({ name: 'deposit-submission' })
              } else {
                CustomNotification.notif('warning', result.data.response_message)
              }
              this.showCreteUserForm = false
            })
            .catch(error => {
              const notifError = UserManagement.Handling(error)
              CustomNotification.notif('error', notifError.message)
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        // }
      }
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
