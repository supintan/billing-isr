<template>
  <b-overlay rounded="sm">
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col sm="12" lg="9">
            <b-form-group
              class="mb-2"
              label="No. SPP"
              label-for="spp"
              label-cols="4"
            >
              <v-select
                v-model="selectedInvoiceName"
                label="invoice_number"
                box
                placeholder="-- Pilih Nomor SPP -- "
                :options="invoices"
                disabled
              >
                <template v-slot:option="invoices">
                  <span> {{ invoices.invoice_number }}</span>
                </template>
              </v-select>
            </b-form-group>
          </b-col>
            <b-col sm="12" lg="9">
            <b-form-group
              class="mb-2"
              label="Client"
              label-for="km"
              label-cols="4"
            >
              <v-select
                v-model="selectedClientName"
                label="client_name"
                box
                placeholder="-- Pilih Client -- "
                :options="allClient"
                @input="selectedClientInput"
                disabled
              >
                <template v-slot:option="allClient">
                  <span> {{ allClient.client_name }}</span>
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          </b-row>
        </b-form>
        <b-row>
          <b-col sm="12" lg="9">
              <b-form-group
                class="mb-2"
                label="Aplikasi"
                label-for="app"
                label-cols="4"
              >
                <v-select
                  v-model="selectedAppName"
                  label="app"
                  box
                  placeholder="-- Pilih Aplikasi -- "
                  :options="applications"
                  @input="selectedAppInput"
                  disabled
                >
                  <template v-slot:option="applications">
                    <span> {{ applications.official_name }}</span>
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
          <!-- <b-col sm="12" lg="9">
              <b-form-group
                class="mb-2"
                label="Jenis SPP"
                label-for="invoice_type"
                label-cols="4"
              >
                <v-select
                  v-model="selectedInvoiceName"
                  label="app"
                  box
                  placeholder="-- Pilih Jenis SPP -- "
                  :options="applications"
                  @input="selectedAppInput"
                  disabled
                >
                  <template v-slot:option="applications">
                    <span> {{ applications.official_name }}</span>
                  </template>
                </v-select>
              </b-form-group>
            </b-col> -->
          <!-- <b-col sm="12" lg="9">
              <b-form-group
                class="mb-2"
                label="Jenis Template"
                label-for="template_type"
                label-cols="4"
              >
                <v-select
                  v-model="selectedInvoiceName"
                  label="app"
                  box
                  placeholder="-- Pilih Template -- "
                  :options="applications"
                  @input="selectedAppInput"
                  disabled
                >
                  <template v-slot:option="applications">
                    <span> {{ applications.official_name }}</span>
                  </template>
                </v-select>
              </b-form-group>
            </b-col> -->
          <!-- <b-col sm="12" lg="3" md="3">
            <b-form-group>
              <b-button variant="info" size="sm">Preview</b-button>
            </b-form-group>
          </b-col> -->
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Masa Laku Awal"
              label-for="masaLakuAwal"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="billingStartDate"
                class="font-weight text-left"
                id="masaLakuAwal"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                placeholder="DD-MM-YYYY"
                :min="min"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Masa Laku Akhir"
              label-for="masaLakuAkhir"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="billingEndDate"
                class="font-weight text-left"
                id="masaLakuAkhir"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                placeholder="DD-MM-YYYY"
                :max="max"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Tanggal Jatuh Tempo"
              label-for="due_date"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="dueDatePeriod"
                class="font-weight text-left"
                id="due_date"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                placeholder="DD-MM-YYYY"
                :max="max"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Nominal Pokok"
              label-for="annual"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="annual"
                  v-model="annualAmount"
                  class="form-control text-right"
                  :raw="false"
                  required
                  autocomplete="off"
                  :disabled="selectedSPP === 'Denda'"
                  readonly
                />
                <!-- <cleave
                  id="annual"
                  v-model="annualAmount"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  required
                  autocomplete="off"
                  :disabled="selectedSPP === 'Denda'"
                  readonly
                /> -->
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Nominal Denda"
              label-for="fine"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="fine"
                  v-model="fineAmount"
                  class="form-control text-right"
                  :raw="false"
                  required
                  autocomplete="off"
                  :disabled="selectedSPP === 'Pokok'"
                  readonly
                />
                <!-- <cleave
                  id="fine"
                  v-model="fineAmount"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  required
                  autocomplete="off"
                  :disabled="selectedSPP === 'Pokok'"
                  readonly
                /> -->
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Nominal TOTAL"
              label-for="total"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="total"
                  v-model="totalAmount"
                  class="form-control text-right"
                  :raw="false"
                  readonly
                />
                <!-- <cleave
                  id="total"
                  v-model="totalAmount"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  readonly
                /> -->
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Status"
              label-for="status"
              label-cols="4"
            >
              <b-form-input
                id="status"
                class="font-weight"
                type="text"
                placeholder="0"
                v-model="status"
                autocomplete="off"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Keterangan"
              label-for="ket"
              label-cols="4"
            >
              <b-form-textarea
                id="ket"
                v-model="desc"
                placeholder="DENDA TAMBAHAN MENURUT PP..."
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <!-- <b-row>
          <b-col offset-md="3">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="success"
              @click="save()"
            >
              Simpan
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'manual-invoice' }"
              variant="outline-secondary"
              class="ml-2"
            >
              Batal
            </b-button>
          </b-col>
        </b-row> -->
      </validation-observer>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  // BButton,
  BCard,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BInputGroup,
  BFormDatepicker,
  // BFormSelect,
  // BFormCheckbox,
  // BTable,
  BFormTextarea,
  // BFormFile,
  // BSpinner,
  BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import axios from 'axios'
import moment from 'moment'
// import Cleave from 'vue-cleave-component'
import { ValidationObserver } from 'vee-validate'
// import UserManagement from '@/services/UserManagement'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
// import ServiceConfig from '@/services/ServiceConfig'
import InputFormat from '@/helpers/input-format'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  data() {
    return {
      min: '',
      max: '',
      showFdd: false,
      showTdd: false,
      itsMode: '',
      dataFreq: [],
      fieldsTdd: [
        { key: 'no', label: 'No.' },
        { key: 'mode', label: 'Moda Frekuensi' },
        { key: 'link', label: 'Link' },
      ],
      fieldsFdd: [
        { key: 'no', label: 'No.' },
        { key: 'mode', label: 'Moda Frekuensi' },
        { key: 'uplink', label: 'UpLink' },
        { key: 'downlink', label: 'DownLink' },
      ],
      dataField: [
        {
          field1: '1',
          field2: 'Test/1234',
          field3: '10.000.000',
        },
      ],
      selectedApp: null,
      selectedAppName: null,
      applications: [],
      selectedKm: null,
      selectedKmAppId: null,
      allkm: [],
      allClient: [],
      selectedSPP: null,
      SPPs: [
        { value: null, text: '-- Pilih Jenis SPP --' },
        { value: 'Pokok', text: 'Pokok' },
        { value: 'Denda', text: 'Denda' },
        { value: 'Pokok + Denda', text: 'Pokok + Denda' },
        // { value: { C: '3PO' }, text: 'This is an option with object value' },
        // { value: 'app03', text: 'This one is disabled', disabled: true },
      ],
      selectedModa: null,
      selectedModaFreq: null,
      selectedFreqDesc: null,
      modas: [],
      frequencies: [],
      selectedTempo: null,
      tempos: [
        { value: null, text: '-- Pilih Periode --' },
        { value: 'D', text: 'Hari' },
        { value: 'M', text: 'Bulan' },
        // { value: { C: '3PO' }, text: 'This is an option with object value' },
        // { value: 'app03', text: 'This one is disabled', disabled: true },
      ],
      guid_v4: uuid.v4(),
      selectedKmNumber: '',
      selectedClientName: '',
      dataKm: [],
      kmStartPeriod: '',
      kmEndPeriod: '',
      showFrequency: false,
      dueDatePeriod: '',
      status: '',
      billingStartDate: null,
      billingEndDate: null,
      annualAmount: 0,
      fineAmount: 0,
      totalAmount: '',
      totalAmountInWord: null,
      desc: null,
      tempo: '',
      fileUpdate: [],
      perPage: 10,
      items: [],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      activeFilter: null,
      filterOn: [],
      currentPage: 1,
      uplink: '',
      downlink: '',
      moda: [],
      allUp: [],
      allDown: [],
      freqDesc: '',
      options: {
        number: InputFormat.options('number'),
      },
      formulaId: '',
      invId: this.$route.params.invoiceId,
      invoiceNumber: '',
      invoices: [],
      selectedInvoiceName: null,
      number: '',
      total_amount: 0,
      due_date: null,
      idSPP: '',
    }
  },
  components: {
    // BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BInputGroup,
    BFormDatepicker,
    // BFormCheckbox,
    // vSelect,
    // BTable,
    // FeatherIcon,
    BFormTextarea,
    // BFormFile,
    // BFormSelect,
    vSelect,
    // BSpinner,
    ValidationObserver,
    BForm,
    // Cleave,
  },
  directives: {
    Ripple,
  },
  created() {
    // this.getAppData()
    this.getDetail()
    this.showFdd = false
    this.showTdd = false
  },
  methods: {
    selectedAppInput(value) {
      this.selectedApp = value.id
      this.selectedAppName = value.official_name

      this.getKmData(this.selectedApp)
    },
    selectedClientInput(value) {
      this.selectedClient = value.id
      this.selectedClientName = value.spectra_ad_company
      this.getAppData(this.selectedClient)
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      this.formulaId = value.formula_id
      this.min = value.start_date
      this.max = value.end_date

      this.getKmPeriod(this.selectedKm)
      this.getKmModa(this.selectedKmAppId)
    },
    selectedModaInput(value) {
      this.selectedModa = value.id
      this.selectedModaFreq = value.frequency_mode
    },
    selectedFddInput(value) {
      this.selectedFdd = value.id
      this.selectedFreqDesc = value.description
    },
    async getDetail() {
      this.showDetail = true
      await axios({
        url: URLServices.manual_invoice.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.invId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.selectedClientName = result.data.data[0].client_name
            this.selectedAppName = result.data.data[0].application_name
            this.selectedKmNumber = result.data.data[0].ministerial_decree_number
            this.billingStartDate = result.data.data[0].billing_begin_date
            this.billingEndDate = result.data.data[0].billing_end_date
            this.dueDatePeriod = result.data.data[0].due_date
            this.annualAmount = result.data.data[0].annual_amount
            this.fineAmount = result.data.data[0].fine_amount
            this.totalAmount = result.data.data[0].total_amount
            this.status = result.data.data[0].submission_status
            this.desc = result.data.data[0].description
            this.selectedInvoiceName = result.data.data[0].invoice_number
          }
          this.showDetail = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showDetail = false
        })
    },
    getRequestParams(currentPage, perPage) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}

      if (this.filter) {
        params.search = this.filter
      } else {
        if (currentPage) {
          params.page = currentPage
        }
        if (perPage) {
          params.length = perPage
        }
      }

      params.request_id = this.guid_v4
      params.request_date_time = today

      return params
    },
    getRequestParamsModa(currentPage, perPage, kmAppId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}

      if (this.filter) {
        params.search = this.filter
      } else {
        if (currentPage) {
          params.page = currentPage
        }
        if (perPage) {
          params.length = perPage
        }
      }

      params.request_id = this.guid_v4
      params.request_date_time = today
      params.application_id = kmAppId

      return params
    },
    getRequestParamsFreq(currentPage, perPage, modeRangeId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}

      if (this.filter) {
        params.search = this.filter
      } else {
        if (currentPage) {
          params.page = currentPage
        }
        if (perPage) {
          params.length = perPage
        }
      }

      params.request_id = this.guid_v4
      params.request_date_time = today
      params.application_frequency_mode_id = modeRangeId

      return params
    },
    async getAppData() {
      this.showTable = true
      this.isBusy = true
      const param = this.getRequestParams(
        this.currentPage,
        this.perPage,
      )

      await axios({
        url: URLServices.application.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.applications = data
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = 'Gagal Mendapatkan data. Mohon coba kembali'
          CustomNotification.notif('warning', errorMessage)
        })
    },
    async getKmData(appId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.ministerial_decree.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: appId,
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
          CustomNotification.notif('error', errorMessage)
        })
    },
    async getKmPeriod(kmId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.ministerial_decree.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: kmId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const kmData = result.data.data[0]
          this.kmStartPeriod = kmData.start_date
          this.kmEndPeriod = kmData.end_date
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    async getKmModa(kmAppId) {
      this.isBusy = true
      const param = this.getRequestParamsModa(
        this.currentPage,
        this.perPage,
        kmAppId,
      )

      await axios({
        url: URLServices.application_frequency_mode.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.modas = data
          this.totalRows = recordsTotal
          this.isBusy = false

          this.getKmRentangFreq(this.modas[0].id)
        })
        .catch(() => {
          this.isBusy = false
          const errorMessage = 'Gagal Mendapatkan data. Mohon coba kembali'
          CustomNotification.notif('error', errorMessage)
        })
    },
    async getKmRentangFreq(modeRangeId) {
      this.isBusy = true
      const param = this.getRequestParamsFreq(
        this.currentPage,
        this.perPage,
        modeRangeId,
      )

      await axios({
        url: URLServices.application_frequency_mode_ranges.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.frequencies = data
          this.totalRows = recordsTotal
          this.isBusy = false

          // const array = {}
          // Object.keys(this.frequencies).forEach(key => {
          //   array[this.frequencies[key].id] = this.frequencies[key].type
          // })

          if (this.modas[0].frequency_mode === 'FDD') {
            this.showFdd = true
            this.showTdd = false
            for (let index = 0; index < this.frequencies.length; index += 1) {
              const element = this.frequencies[index].type
              const freqDesc = this.frequencies[index].description
              const freMode = this.modas[0].frequency_mode
              if (element === 'UPLINK') {
                this.uplink = freqDesc
                this.itsMode = freMode
              } else if (element === 'DOWNLINK') {
                this.downlink = freqDesc
                this.itsMode = freMode
              }
            }
            this.dataFreq.push({
              id: this.modas[0].id,
              mode: this.itsMode,
              uplink: this.uplink,
              downlink: this.downlink,
            })
          } else {
            this.showFdd = false
            this.showTdd = true
            for (let index = 0; index < this.frequencies.length; index += 1) {
              this.freqDesc = this.frequencies[index].description
              const freMode = this.modas[0].frequency_mode
              this.itsMode = freMode
            }
            this.dataFreq.push({
              id: this.modas[0].id,
              mode: this.itsMode,
              link: this.freqDesc,
            })
          }
        })
        .catch(() => {
          this.isBusy = false
          const errorMessage = 'Gagal Mendapatkan data. Mohon coba kembali'
          CustomNotification.notif('error', errorMessage)
        })
    },
    async getBHP() {
      this.showBHP = true
      await axios({
        url: URLServices.invoice.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10,
          year: moment(new Date()).format('YYYY') - 1,
          is_paid: false,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.bhp = result.data.data
          this.showBHP = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showBHP = false
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getSimulasi() {
      this.showFormula = true
      await axios({
        url: URLServices.formula.index,
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
          this.formula = result.data.data
          this.showFormula = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFormula = false
          CustomNotification.notif('warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
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
          this.fileUpdate[0] = e.target.result
        }

        reader.readAsDataURL(file)
      }

      if (this.selectedTempo === 'D') {
        this.tempo = `${this.dueDatePeriod}D`
      } else if (this.selectedTempo === 'M') {
        this.tempo = `${this.dueDatePeriod}M`
      }

      data.application_id = this.selectedApp
      data.ministerial_decree_id = this.selectedKm
      data.formula_id = this.formulaId
      data.invoice_type = this.selectedSPP
      data.billing_begin_date = this.billingStartDate
      data.billing_end_date = this.billingEndDate
      data.due_date_period = this.tempo
      data.annual_amount = InputFormat.convNumString(this.annualAmount)
      data.fine_amount = InputFormat.convNumString(this.fineAmount)
      data.total_amount = InputFormat.convNumString(this.totalAmount)
      data.total_amount_in_words = this.totalAmountInWord
      data.description = this.desc
      data.supporting_document_base64 = this.fileUpdate.join()

      return data
    },
    async save() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.manual_invoice.store,
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
            if (result.data.response_code === '00') {
              const successMassage = 'Berhasil menambahkan invoice manual baru'
              CustomNotification.notif('success', successMassage)
              this.$router.push({ name: 'manual-invoice' })
            } else {
              const responseMessage = result.data.response_message
              CustomNotification.notif('warning', responseMessage)
            }
          })
          .catch(error => {
            const notifError = 'Error !'
            CustomNotification.notif('error', notifError)
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    countTotal() {
      const annual = InputFormat.convNumString(this.annualAmount) * 1
      const fine = InputFormat.convNumString(this.fineAmount) * 1
      this.totalAmount = annual + fine
    },
    onFiltered() {
      this.currentPage = 1
    },
  },
}
</script>

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
