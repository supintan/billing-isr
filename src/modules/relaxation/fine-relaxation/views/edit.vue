<template>
  <b-overlay rounded="sm">
    <b-card>
      <validation-observer ref="saveValidation" #default="{invalid}">
        <b-row>
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-2"
              label="Tanggal Terbit*"
              label-for="pubDate"
              label-cols="4"
            >
              <b-form-datepicker
                class="font-weight-bold"
                id="pubDate"
                locale="id"
                v-model="publishDate"
                placeholder="DD-MM-YYYY"
                @input="deleteFile"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-2"
              label="Nomor Peraturan*"
              label-for="reg_number"
              label-cols="4"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Regulation Number"
                  rules="required"
                >
                  <b-form-input
                  type="text"
                  id="reg_number"
                  v-model="regNumber"
                  :state="errors.length > 0 ? false:null"
                  />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-2"
              label="Tanggal Awal*"
              label-for="start_date"
              label-cols="4"
            >
              <b-form-datepicker
                class="font-weight-bold"
                id="start_date"
                locale="id"
                v-model="startDate"
                placeholder="DD-MM-YYYY"
                @input="dateDiff"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-2"
              label="Tanggal Akhir*"
              label-for="end_date"
              label-cols="4"
            >
              <b-form-datepicker
                class="font-weight-bold"
                id="end_date"
                locale="id"
                v-model="endDate"
                placeholder="DD-MM-YYYY"
                @input="dateDiff"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-2"
              label="Periode (hari)*"
              label-for="tempo"
              label-cols="4"
            >
              <b-input-group append="Hari">
                <b-form-input
                  type="number"
                  id="tempo"
                  placeholder=""
                  v-model="periode"
                  readonly
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="7" md="7">
            <b-form-group
              class="mb-3"
              label="File Peraturan*"
              label-for="fileReg"
              label-cols="4"
            >
              <b-form-file
                v-model="fileUpdate[0]"
                accept=".pdf"
                placeholder="Pilih file disini..."
                drop-placeholder="Masukkan file disini..."
                @change="createBase64File"
              />
              <small class="text-info">Isilah dengan format file (.pdf)</small>
            </b-form-group>
          </b-col>
        </b-row>
        <b-col sm="12" lg="7">
          <p class="text-center">
          <feather-icon icon="InfoIcon" /> Pastikan data sudah benar. Data yang
            telah disimpan tidak dapat diubah.
          </p>
        </b-col>
        <b-row>
          <b-col sm="12" lg="7" class="text-center">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'relaxation-fine' }"
              variant="outline-secondary"
            >
              Batal
            </b-button>
            <b-button
              class="ml-2"
              v-ripple.400="'rgba(255, 255, 256, 0.15)'"
              type="submit"
              variant="success"
              :disabled="invalid"
              @click="save()"
            >
              Simpan
            </b-button>
          </b-col>
        </b-row>
        <div class="divider my-2" v-if="showService">
          <div class="divider-text font-weight-bold">
            LAYANAN
          </div>
        </div>
        <!-- <hr class="mb-4" /> -->
        <b-row v-if="showService">
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-2"
              label="Layanan"
              label-for="service"
              label-cols="4"
            >
              <v-select
                id="service"
                v-model="aService"
                label="name"
                box
                placeholder="-- Pilih Layanan -- "
                :options="allServices"
                @input="selectedServices"
              >
                <!-- <template v-slot:option="allServices">
                  <span> {{ allServices.service_name }}</span>
                </template> -->
              </v-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="7">
            <b-form-group
              class="mb-3"
              label="Sub Layanan"
              label-for="sub_service"
              label-cols="4"
            >
              <v-select
                id="sub_service"
                v-model="aSubService"
                label="name"
                box
                placeholder="-- Pilih Sub Layanan -- "
                :options="allSubServices"
                @input="selectedSubServices"
              >
                <!-- <template v-slot:option="allServices">
                  <span> {{ allServices.subservice_name }}</span>
                </template> -->
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="showService">
          <b-col>
            <b-form-group class="mb-4">
              <b-col sm="12" lg="7" class="text-center">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="success"
                  @click="getDataTable()"
                >
                  Tampilkan SPP
                </b-button>
              </b-col>
            </b-form-group>
            <!-- <hr class="mb-2"/> -->
          </b-col>
        </b-row>
        <div class="divider my-2" v-if="showTable">
          <div class="divider-text font-weight-bold">
            TABEL LAYANAN
          </div>
        </div>
        <b-row v-if="showTable" class="mb-1">
          <b-col cols="12">
            <b-card no-body class="p-0">
              <b-table
                id="tableData"
                striped
                hover
                responsive
                class="position-relative shadow mb-0"
                :busy="isBusy"
                :per-page="perPage"
                :items="sppTable"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template #table-busy>
                  <div class="text-center text-primary my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong> Mohon tunggu ...</strong>
                  </div>
                </template>
                <template #cell(no)="data">
                  {{ perPage * (currentPage - 1) + data.index + 1 }}
                </template>
                <template #cell(total_amount)="data">
                  {{ convertNumber(data.item.total_amount) }}
                </template>
                <template #cell(updated_due_date)="data">
                  <b-col style="width: 200px">
                    <b-form-datepicker
                      class="font-weight-bold"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      locale="id"
                      v-model="dueDate[data.index]"
                    />
                  </b-col>
                </template>
                <template #cell(invoice_id)="data">
                  <b-form-group>
                    <b-form-checkbox
                      :id="'selected' + data.item.invoice_id"
                      :value="data.item.invoice_id"
                      v-model="selected"
                      class="custom-control-success"
                    ></b-form-checkbox>
                  </b-form-group>
                </template>
              </b-table>
            </b-card>
          </b-col>
          <b-col cols="12">
            <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
              <!-- page length -->
              <b-form-group
                label="Per hal"
                label-align="left"
                label-for="sortBySelect"
                class="text-nowrap mb-md-0 mr-0 form-inline"
              >
                <b-form-select
                  id="perPageSelect"
                  v-model="perPage"
                  size="sm"
                  inline
                  :options="pageOptions"
                  @change="handlePageSizeChange($event)"
                />
              </b-form-group>
              <!-- pagination -->
              <div>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  :current-page="currentPage"
                  first-number
                  last-number
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mb-0"
                  @change="handlePageChange"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </b-card-body>
          </b-col>
        </b-row>
        <hr v-if="showTable"/>
        <b-row v-if="showButton">
          <hr class="mb-3"/>
          <b-col>
            <b-form-group>
              <b-col offset-md="3">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="success"
                  @click="saveUpdatedSPP()"
                >
                  Simpan Perubahan Jatuh Tempo SPP
                </b-button>
              </b-col>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
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
  BFormSelect,
  BTable,
  BFormFile,
  BSpinner,
  BCardBody,
  BPagination,
  BInputGroup,
  BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import axios from 'axios'
import moment from 'moment'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { required } from '@/helpers/validations'
import NumberFormat from '@/helpers/input-format'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    minDate.setDate(today - 2)
    return {
      required,
      min: minDate,
      publishDate: '',
      regNumber: '',
      startDate: '',
      endDate: '',
      fileUpdate: [],
      aService: null,
      aSubService: null,
      showTable: false,
      showButton: false,
      showService: false,
      pageOptions: [10, 20, 50],
      regDescription: '',
      periode: '',
      allServices: [],
      allSubServices: [],
      subServiceId: 0,
      serviceId: 0,
      sppTable: [],
      dataFreq: [],
      totalRows: 1,
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'application_name', label: 'Aplikasi' },
        { key: 'ministerial_decree_number', label: 'KM' },
        { key: 'invoice_number', label: 'SPP' },
        { key: 'total_amount', label: 'Jumlah Tagihan' },
        { key: 'original_due_date', label: 'Tgl. Jatuh Tempo Awal' },
        { key: 'updated_due_date', label: 'Tgl. Jatuh Tempo Awal', tdClass: 'responsive' },
        { key: 'invoice_id', label: 'Aksi' },
      ],
      fieldsFdd: [
        { key: 'no', label: 'No.' },
        { key: 'mode', label: 'Moda Frekuensi' },
        { key: '[0]', label: 'UpLink' },
        { key: '[1]', label: 'DownLink' },
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
      dataKm: [],
      kmStartPeriod: '',
      kmEndPeriod: '',
      showFrequency: false,
      dueDate: [],
      dueDatePeriod: '',
      billingStartDate: null,
      billingEndDate: null,
      annualAmount: null,
      fineAmount: null,
      totalAmount: null,
      totalAmountInWord: null,
      desc: null,
      tempo: '',
      perPage: 10,
      items: [],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      activeFilter: null,
      filterOn: [],
      currentPage: 1,
      uplink: [],
      downlink: [],
      moda: [],
      allUp: [],
      fineRelaxationId: '',
      invoiceId: [],
      originalDate: [],
      selected: [],
      showActionButton: true,
      fineId: this.$route.params.fineRxId,
    }
  },
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BFormDatepicker,
    vSelect,
    BTable,
    BFormFile,
    BFormSelect,
    BSpinner,
    ValidationObserver,
    BCardBody,
    BPagination,
    BInputGroup,
    BFormCheckbox,
    ValidationProvider,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getDetail()
    // this.getAppData()
    this.showService = false
    this.showTable = false
    // this.showNope = false
    // this.showEmpty = false
  },
  // async mounted() {
  // },
  methods: {
    deleteFile() {
      this.fileUpdate = []
    },
    convertNumber(number) {
      return NumberFormat.NumberFormat(number)
    },
    dateDiff() {
      const a = moment(this.startDate)
      const b = moment(this.endDate)
      this.periode = b.diff(a, 'days') + 1
    },
    selectedServices(value) {
      if (value.id === '' || value.id === null) {
        this.serviceId = 0
      } else {
        this.serviceId = value.id
      }
      this.aService = value.name
    },
    selectedSubServices(value) {
      if (value.id === '' || value.id === null) {
        this.subServiceId = 0
      } else {
        this.subServiceId = value.id
      }
      this.aSubService = value.name
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

      data.start_date = this.startDate
      data.end_date = this.endDate
      data.regulation_number = this.regNumber
      data.regulation_publish_date = this.publishDate
      data.relaxation_period_in_days = this.periode
      data.description = this.regDescription
      data.file_base64 = this.fileUpdate.join()

      return data
    },
    async getDetail() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.fine_relaxation.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.fineId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.publishDate = result.data.data[0].regulation_publish_date
            this.regNumber = result.data.data[0].regulation_number
            this.startDate = result.data.data[0].start_date
            this.endDate = result.data.data[0].end_date
            this.periode = result.data.data[0].relaxation_period_in_days
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan data', errorMessage)
        })
    },
    async save() {
      this.serviceId = 0
      this.subServiceId = 0
      this.showActionButton = false
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.fine_relaxation.store,
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
            this.showActionButton = true
            if (result.data.response_code === '00') {
              CustomNotification.notif('success', 'Berhasil', 'Berhasil menambahkan peraturan penundaan denda baru')
              this.fineRelaxationId = result.data.id
              this.showService = true
              this.fileUpdate = []
              this.getServices()
              this.getSubServices()
            } else {
              CustomNotification.notif('warning', 'Gagal', result.data.response_message)
            }
          })
          .catch(error => {
            this.showActionButton = true
            CustomNotification.notif('danger', 'Gagal', 'Mohon coba kembali')
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    createRequestVarRelaxInvoice() {
      const data = {}

      Object.keys(this.selected).forEach(key => {
        data[key] = {
          fine_relaxation_id: this.fineRelaxationId,
          invoice_id: this.invoiceId[key],
          original_due_date: this.originalDate[key],
          updated_due_date: this.dueDate[key],
        }
      })

      return data
    },
    async saveUpdatedSPP() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const Param = this.createRequestVarRelaxInvoice()
      if (Param !== false) {
        await axios({
          url: URLServices.fine_relaxation_invoice.store,
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
              CustomNotification.notif('success', 'Berhasil', 'Berhasil menambahkan peraturan penundaan denda baru')

              this.showService = true
              this.fileUpdate = []
              this.$router.push({ name: 'fine-relaxation' })
            } else {
              CustomNotification.notif('warning', 'Gagal', result.data.response_message)
            }
          })
          .catch(error => {
            CustomNotification.notif('danger', 'Gagal', 'Mohon coba kembali')

            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
        this.serviceId = 0
        this.subServiceId = 0
      }
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
    async getServices() {
      this.isBusy = true
      const param = this.getRequestParams(
        this.currentPage,
        this.perPage,
      )

      await axios({
        url: URLServices.service.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.allServices = data
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          this.isBusy = false
          CustomNotification.notif('danger', 'Gagal mendapatkan data', 'Mohon coba kembali')
        })
    },
    async getSubServices() {
      this.isBusy = true
      const param = this.getRequestParams(
        this.currentPage,
        this.perPage,
      )

      await axios({
        url: URLServices.subservice.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.allSubServices = data
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          this.isBusy = false
          CustomNotification.notif('danger', 'Gagal mendapatkan data', 'Mohon coba kembali')
        })
    },
    async getDataTable() {
      this.showButton = false
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.fine_relaxation_invoice.get_open_invoice,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          start_date: this.startDate,
          end_date: this.endDate,
          service_id: this.serviceId,
          subservice_id: this.subServiceId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const { data, totalRecords } = result.data
          this.sppTable = data

          Object.keys(this.sppTable).forEach(key => {
            this.dueDate[key] = this.sppTable[key].updated_due_date
            this.invoiceId[key] = this.sppTable[key].invoice_id
            this.originalDate[key] = this.sppTable[key].original_due_date
          })
          this.totalRows = totalRecords
          this.showTable = true
          if (this.sppTable.length !== 0) {
            this.showButton = true
            console.log('ini true')
          } else {
            this.showButton = false
            console.log('ini false')
          }
          this.serviceId = 0
          this.subServiceId = 0
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan data', errorMessage)
        })
    },
    onFiltered() {
      this.currentPage = 1
    },
    handlePageChange(value) {
      this.currentPage = value
      this.getDataTable()
    },
    handlePageSizeChange(value) {
      this.perPage = value
      this.currentPage = 1
      this.getDataTable()
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss'
</style>
