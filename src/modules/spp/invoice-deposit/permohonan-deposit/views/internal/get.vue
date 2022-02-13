<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
        <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Review Permohonan Penggunaan</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="Tanggal Surat Permohonan" label-for="publish_date">
            <b-form-datepicker autocomplete="off" id="publish_date" v-model="publish_date" readonly/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group label-cols="2" label="No. Surat Permohonan" label-for="number_request_letter" for="example-locales" >
              <b-form-input autocomplete="off" id="number_request_letter" v-model="number_request_letter" readonly/>
            </b-form-group>
            <b-form-group label-cols="2" label="File Surat Permohonan" >
              <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-info" style="position: relative;" @click="onClick()"> Download File </button>
            </b-form-group>
            <b-form-group label-cols="2" label="Catatan permohonan" label-for="description">
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
          <b-col lg="10" sm="12">
            <b-form-group
              label-cols="2"
              label="Client"
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
                <b-col lg="10" sm="12">
                  <b-form-group
                    label-cols="2"
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
              <b-col lg="10" sm="12">
                <b-form-group label-cols="2" label="Nomor SPP" label-for="number" disabled>
                  <b-form-input autocomplete="off" id="number" v-model="number" readonly />
                  <b-form-input autocomplete="off" id="idSPP" v-model="idSPP"  hidden/>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="10" sm="12">
                <b-form-group label-cols="2" label="Nilai SPP" label-for="total_amount" disabled>
                  <b-input-group prepend="Rp.">
                    <b-form-input autocomplete="off" class="text-right" id="total_amount" v-model="total_amount" readonly />
                  </b-input-group>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="10" sm="12">
                <b-form-group label-cols="2" label="Tanggal Jatuh Tempo" label-for="due_date">
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
            <template #cell(field6)="dataField">
              <b-form-input
                :id="'Amountid' + dataField.index"
                class="font-weight-bold"
              />
            </template>
              <!-- <template #cell(deposit_balance_amount)="data">
                {{ Number(data.item.deposit_balance_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </template>
              <template #cell(deposit_usage_amount)="data">
                {{ Number(data.item.deposit_usage_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </template> -->
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
              <b-form-input type="number" class="text-right" v-model="CountDepositUsage" readonly/>
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
    <!-- <b-card>
      <h5 class="text-primary">REVIEW PERMOHONAN PENGUNAAN DEPOSIT</h5>
        Untuk menyetujui penggunaan deposit ini, pilih 'Setuju' dan klik tombol 'simpan'
      <div class="demo-inline-spacing" style="margin-left: 300px;">
        <b-form-radio
          v-model="Selected"
          name="some-radios"
          value="A"
          disabled
        >
          Tolak
        </b-form-radio>
        <b-form-radio
          v-model="Selected"
          name="some-radios"
          value="B"
          disabled
        >
          Setuju
        </b-form-radio>
        </div>
        <br/>
        <b-row>
        <b-col lg="12" sm="10">
          <b-form-group
            label-cols="3"
            label="Nomor Surat Keputusan"
            label-for=""
          >
          <b-form-input readonly/>
          </b-form-group>
          </b-col>
          <b-col lg="12" sm="10">
          <b-form-group
            label="Tgl Surat Permohonan"
            label-cols="3"
          >
          <b-form-datepicker
            id="tgl_Surat_Permohonan"
            v-model="tgl_Surat_Permohonan"
            locale="id"
            readonly
          />
          </b-form-group>
          </b-col>
          <b-col lg="12" sm="10">
            <b-form-group label-cols="3" label="File Surat Permohonan" >
              <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-info" style="position: relative;" @click="onClick()"> Download File </button>
            </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
          <b-form-group label-cols="3" label="Catatan Keputusan" label-for="submission_notes">
            <b-form-textarea
              id="submission_notes"
              v-model="submission_notes"
              required
              maxlength="200"
              minlength="10"
              readonly
            >
            </b-form-textarea>
          </b-form-group>
          </b-col>
          </b-row>
          <b-row>
          <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'permohonan-deposit' }"
            variant="success"
          >
            kembali
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            @click="save()"
            hidden
          >
            Simpan
          </b-button>
        </b-col>
      </b-row>
    </b-card> -->
    <b-card>
      <h5 class="text-primary">REVIEW PERMOHONAN PENGUNAAN DEPOSIT</h5>
        <b-row class="mb-1">
        <b-col lg="12" sm="10">
          <b-form-group label-cols="3" label="Keputusan" >
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
        <b-row>
        <b-col lg="12" sm="10">
          <b-form-group
            label-cols="3"
            label="Nomor Surat Keputusan"
            label-for=""
          >
          <b-form-input
            id="numberRequestLetter"
            v-model="numberRequestLetter"
            readonly/>
          </b-form-group>
        </b-col>
        <b-col lg="12" sm="10">
          <b-form-group
            label-cols="3"
            label="Template"
            label-for="item-template"
          >
            <template>
              <b-button @click="onPreview(templateId)">
                Tampilkan Preview
              </b-button>
            </template>
          </b-form-group>
        </b-col>
          <b-col lg="12" sm="10">
          <b-form-group
            label="Tgl Surat Permohonan"
            label-cols="3"
          >
          <b-form-datepicker
            id="tgl_Surat_Permohonan"
            v-model="dateRequestLetter"
            locale="id"
            readonly
          />
          </b-form-group>
          </b-col>
          <b-col lg="12" sm="10">
            <b-form-group label-cols="3" label="File Surat Keputusan" >
              <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-info" style="position: relative;" @click="onClickApprove()"> Download Dokumen </button>
            </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
          <b-form-group label-cols="3" label="Catatan Keputusan" label-for="submission_notes">
            <b-form-textarea
              id="descpritionReview"
              v-model="descpritionReview"
              required
              maxlength="200"
              minlength="10"
              readonly
            >
            </b-form-textarea>
          </b-form-group>
          </b-col>
          </b-row>
          <b-row>
          <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'verifikasi-deposit' }"
            variant="success"
          >
            kembali
          </b-button>
        </b-col>
      </b-row>
      <b-modal
        id="modalOnPreview"
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
  BFormRadioGroup,
  BModal,
  BEmbed,
} from 'bootstrap-vue'
import { uuid } from 'vue-uuid'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { heightTransition } from '@/helpers/transition'
import UserManagement from '@/services/UserManagement'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
// import { forEach } from 'postcss-rtl/lib/affected-props'

export default {
  mixins: [heightTransition],
  data() {
    return {
      selectedFormat: this.reviewer_status,
      fileOptions: [
        { item: 'DISETUJUI', name: 'DISETUJUI' },
        { item: 'DITOLAK', name: 'DITOLAK' },
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'decision_letter_number', label: 'Nomor Surat Keputusan' },
        { key: 'decision_letter_publish_date', label: 'Tanggal Surat' },
        { key: 'client_name', label: 'Client' },
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
      detailDepositId: this.$route.params.detailDepositId,
      idClientDeposit: this.$route.params.idClientDeposit,
      SubmissionDepositId: this.$route.params.SubmissionDepositId,
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
      dateRequestLetter: null,
      descpritionReview: '',
      numberRequestLetter: '',

      templateId: '',
      pdfFile: null,
      showFilePDF: false,
      template: [],
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
    BFormRadioGroup,
    BModal,
    BEmbed,
  },
  directives: {
    Ripple,
  },
  created() {
    // this.getClient()
    this.getDetailDeposit()
    this.GetDepositList()
    this.detail()
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
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
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.depositSubmission.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.SubmissionDepositId,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.numberRequestLetter = dataResult.review_letter_number
          this.dateRequestLetter = dataResult.review_date_time
          this.descpritionReview = dataResult.reviewer_notes
          this.selectedFormat = dataResult.reviewer_status
          this.getDetailUserSuccessed = true
          this.showDetailUser = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
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
          id: this.detailDepositId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          console.log(fileURL, 'logurl')
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
    onClickApprove() {
      axios({
        url: URLServices.depositSubmission.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.SubmissionDepositId,
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
    createRequestVariableFile(file) {
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
      params.deposit_usage_id = this.detailDepositId
      params.request_id = uuid.v4()
      params.request_date_time = today
      return params
    },
    async getDetailDeposit() {
      await axios({
        url: URLServices.depositRequest.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.detailDepositId,
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
          const total = this.detailDeposit[0].invoice_total_amount.replaceAll('.00000', '')
          this.total_amount = total
          this.due_date = this.detailDeposit[0].invoice_due_date
          this.templateId = this.detailDeposit[0].template_id
          this.CountDepositUsage = this.detailDeposit[0].deposit_usage_amount.replaceAll('.00000', '')
          console.log(this.CountDepositUsage)
          this.CountCreditAmount = this.detailDeposit[0].invoice_remaining_amount.replaceAll('.00000', '')
          this.detailDepositId = this.detailDeposit[0].deposit_usage_id
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
      const Param = this.createRequestVariableFile()
      console.log(Param)
      if (Param !== false) {
        await axios({
          url: URLServices.depositRequest.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            // employee_id: this.positions[index].id,
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              const responseMessage = `Berhasil menambahkan data baru.`
              CustomNotification.notif('success', 'Berhasil', responseMessage)
              this.$router.push({ name: 'permohonan-deposit' })
            } else {
              const responseMessage = `[${result.data.response_message}]`
              CustomNotification.notif('warning', 'Warning', responseMessage)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            const responseMessage = `[${notifError.message}]`
            CustomNotification.notif(notifError.status, notifError.status, responseMessage)
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
