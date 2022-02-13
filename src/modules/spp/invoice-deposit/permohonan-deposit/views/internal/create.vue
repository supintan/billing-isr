<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
        <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Tambah Permohonan Penggunaan</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="8" sm="12">
            <b-form-group label-cols="4" label="Tanggal Surat Permohonan*" label-for="publish_date">
            <b-form-datepicker autocomplete="off" id="publish_date" v-model="publish_date" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="12">
            <b-form-group label-cols="4" label="No. Surat Permohonan*" label-for="number_request_letter" for="example-locales" >
              <b-form-input autocomplete="off" id="number_request_letter" placeholder="Nomor surat permohonan ..." v-model="number_request_letter" />
            </b-form-group>
            <b-form-group label-cols="4" label="Surat Permohonan*" label-for="file">
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
            <b-form-group label-cols="4" label="Catatan permohonan*" label-for="description">
            <b-form-textarea
              id="description"
              v-model="description"
              placeholder="Catatan permohonan ..."
              required
              maxlength="200"
              minlength="10"
              ></b-form-textarea>
            </b-form-group>
            <!-- <b-form-group
              label-cols="2"
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
            </b-form-group> -->
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="12">
            <b-form-group
              label-cols="4"
              label="Pelanggan*"
              label-for="item-pelanggan"
            >
            <v-select
              id="item-pelanggan"
              v-model="selectedClient"
              label="spectra_ad_company"
              :options="client"
              @input="selectedAppInput"
              placeholder="-- Pilih pelanggan --"
            >
            </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-row class="mb-1">
          <b-col lg="10" sm="12">
            <b-form-group
              label-cols="2"
              label="Keputusan Menteri"
              label-for="item-posisi"
            >
            <v-select
              v-model="selectedKmNumber"
              label="km"
              :options="allkm"
              @input="selectedKmInput"
            >
            <template v-slot:option="allkm">
              <span> {{ allkm.number }}</span>
            </template>
            </v-select>
            </b-form-group>
          </b-col>
        </b-row> -->
        <b-row class="mb-1">
                <b-col lg="8" sm="12">
                  <b-form-group
                    label-cols="4"
                    label="Aplikasi*"
                    label-for="item-posisi"
                  >
                    <v-select
                      placeholder="-- Pilih Aplikasi --"
                      v-model="selectedNameApplication"
                      label="name"
                      :options="application"
                      @input="selectedInputApplication"
                    >
                      <template v-slot:option="application">
                        <span> {{ application.name }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="8" sm="12">
                <b-form-group label-cols="4" label="Nomor SPP*" label-for="number" disabled>
                  <b-form-input autocomplete="off" id="number" v-model="number" placeholder="Nomor SPP ..." readonly />
                  <b-form-input autocomplete="off" id="idSPP" v-model="idSPP"  hidden/>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="8" sm="12">
                <b-form-group label-cols="4" label="Nilai SPP*" label-for="total_amount" disabled>
                  <b-input-group prepend="Rp.">
                    <b-form-input class="text-right" id="total_amount" v-model="total_amount" placeholder="Nilai SPP ..." readonly />
                  </b-input-group>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="8" sm="12">
                <b-form-group label-cols="4" label="Tanggal Jatuh Tempo*" label-for="due_date">
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
                class="font-weight"
              />
            </template>
            <template #cell(deposit_balance_amount)="data">
              {{ Number(data.item.deposit_balance_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
            </template>
            <template #cell(depositeUsageAmount)="data">
              <b-col>
                <b-form-input
                  type="number"
                  min="0"
                  class="font-weight"
                  v-model="dueDepositUsage[data.index]"
                />
                <!-- <b-input-group prepend="Rp.">
                  <cleave
                    id="price"
                    v-model="dueDepositUsage[data.index]"
                    class="form-control text-right"
                    placeholder="0"
                    :raw="false"
                    :options="options.number"
                    :min="0"
                    required
                    autocomplete="off"
                  />
                </b-input-group> -->
              </b-col>
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
            <!-- </div> -->
            <div class="text-right mt-0">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-success"
                @click="repeateAgain"
                v-if="$can('store', 'isr_deposit_usage')"
                hidden
              >
                <feather-icon icon="PlusIcon" class="mr-25" />
                <span>Simpan</span>
              </b-button>
            </div>
          <!-- </b-overlay> -->
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ path: '/permohonan-deposit' }"
              variant="outline-secondary"
            >
              Batal
            </b-button>
            <b-button
              id="tombolSimpan"
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
  BFormDatepicker,
  BTable,
  BEmbed,
  BModal,
} from 'bootstrap-vue'
import { uuid } from 'vue-uuid'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'
// import Cleave from 'vue-cleave-component'
import InputFormat from '@/helpers/input-format'
import { heightTransition } from '@/helpers/transition'
import UserManagement from '@/services/UserManagement'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  mixins: [heightTransition],
  data() {
    return {
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'decision_letter_number', label: 'Nomor Surat Permohonan' },
        { key: 'decision_letter_publish_date', label: 'Tanggal Surat' },
        { key: 'client_name', label: 'Pelanggan' },
        // { key: 'bank', label: 'BANK' },
        { key: 'deposit_balance_amount', label: 'Nilai Deposit' },
        { key: 'depositeUsageAmount', label: 'Nilai Deposit yang Digunakan' },
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
      variabelHitung: 0,
      perPage: 10,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      items: [],
      number_request_letter: '',
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
      disable: false,
      selectednameTemplate: null,
      template: [],
      selectedtemplateID: '',
      pdfFile: null,
      showFilePDF: false,
      options: {
        number: InputFormat.options('number'),
      },
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
    BFormDatepicker,
    BTable,
    BEmbed,
    BModal,
    // Cleave,
  },
  directives: {
    Ripple,
  },
  computed: {
    // CountDepositUsage() {
    //   let count = 0
    //   Object.keys(this.dueDepositUsage).forEach(key => {
    //     const minInput = this.dueDepositUsage[key] > 0 ? this.dueDepositUsage[key] : 0
    //     count += parseInt(minInput, 10)
    //     // this.variabelHitung += this.total
    //   })
    //   return count
    // },
    CountDepositUsage() {
      let count = 0
      // let countings = 0
      // const valueToString = []
      Object.keys(this.items).forEach(key => {
        // valueToString[key] = InputFormat.convNumString(this.dueDepositUsage[key])
        // console.log(valueToString[key], 'Nilai')
        this.varA = parseInt(this.dueDepositUsage[key], 10)
        this.varB = parseInt(this.items[key].deposit_balance_amount, 10)
        this.varC = parseInt(this.total_amount.replaceAll('.', ''), 10)
        console.log(this.varA, 'Nilai INPUTAN')
        console.log(this.varB, 'Nilai Deposit')
        console.log(this.varC, 'NILAI SPP')
        console.log(this.varA, ' > ', this.varC)
        // if (this.dueDepositUsage[key] > this.items[key].deposit_balance_amount) {
        if (this.varA > this.varC) {
          this.dueDepositUsage[key] = ''
          CustomNotification.notif('warning', 'Warning', 'Nilai deposit yang digunakan melebihi Nilai SPP.')
        }
        if (this.varA > this.varB) {
          this.dueDepositUsage[key] = ''
          CustomNotification.notif('warning', 'Warning', 'Saldo deposit tidak cukup.')
        }
        const minInput = this.dueDepositUsage[key] > 0 ? this.dueDepositUsage[key] : 0
        // const minInput = this.dueDepositUsage[key] > 0 ? this.dueDepositUsage[key] : 0
        count += parseInt(minInput, 10)
        // count += parseInt(minInput, 10)* 1000
        // countings = InputFormat.NumberFormat(count)
      })
      // return countings
      return InputFormat.NumberFormat(count)
    },
    CountCreditAmount() {
      let hasil = 0
      let hasilFIx = 0
      hasil = InputFormat.convNumString(this.total_amount) - this.CountDepositUsage
      hasilFIx = InputFormat.NumberFormat(hasil)
      return hasilFIx
    },
  },
  created() {
    this.getClient()
    this.getTemplate()
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
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
      // this.getKmData(this.selectedApp)
      this.getApplication(this.selectedApp)
      return true
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      // this.getApplication(this.selectedKm, this.selectedApp)
      // this.getSPPData(this.selectedKm)
    },
    selectedInputApplication(value) {
      // this.selectedApp = value.id
      this.selectedIdApplication = value.id
      this.selectedNameApplication = value.name
      this.getSPPData(this.selectedApp, this.selectedIdApplication)
      // this.GetDepositList(this.selectedApp)
      // this.getKmData(this.selectedIdApplication)
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
          length: 1000,
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
    async getApplication(clientId) {
      this.showPosisi = true
      await axios({
        url: URLServices.applicationDeposit.indexDeposit,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
          client_id: clientId,
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
    async getKmData(appId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.MinisterialDecreeByClient.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          client_id: appId,
          // application_id: appId,
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
    async getSPPData(client) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.openInvoivesGet.indexOpenGet,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          client_id: client,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.allkm = result.data
          const dataResult = result.data.data[0]
          this.number = dataResult.number
          this.total_amount = InputFormat.NumberFormat(dataResult.total_amount)
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
      // data.is_approved = 't' ,
      data.appeal_notes = this.description
      data.invoice_total_amount = InputFormat.convNumString(this.total_amount)
      data.deposit_amount = InputFormat.convNumString(this.CountDepositUsage)
      data.deposit_usage_amount = InputFormat.convNumString(this.CountDepositUsage)
      data.invoice_remaining_amount = InputFormat.convNumString(this.CountCreditAmount)
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

      params.client_id = this.clientId
      params.request_id = uuid.v4()
      params.request_date_time = today
      return params
    },
    async GetDepositList() {
      const param = this.getRequestParams(
        this.request_id,
        this.request_date_time,
        this.clientId
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
          this.DataDuedate.splice(0)
          this.DataAmount.splice(0)
          Object.keys(this.items).forEach(key => {
            this.DataDuedate[key] = this.items[key].due_date
            this.DataAmount[key] = this.items[key].amount_installment
            this.DataIdDeposit[key] = this.items[key].deposit_id
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
            const responseMessage = `[${result.data.response_message}]`
            CustomNotification.notif('success', 'Berhasil', responseMessage)
              this.$router.push({ name: 'verifikasi-deposit' })
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
