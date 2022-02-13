<template>
  <b-overlay rounded="sm" :show="StatusLoadingSave">
    <b-card>
      <validation-observer ref="saveValidation" #default="{invalid}">
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-form-group
              class="mb-4"
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
                :readonly="!StatusSimpanBaru"
              />
              <!-- 
              <cleave
                v-model="TestNumber"
                :modelValue="112"
                :options="options"
                :raw="true"
                class="form-control"
                name="card"
              />
              -->
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="8" md="8" v-if="StatusSimpanBaru">
            <b-form-group
              class="mb-4"
              label="Jenis Template*"
              label-for="id-template"
              label-cols="4"
            >
              <b-overlay :show="statusLoadTemplate" rounded="sm">
                <v-select
                  v-model="selectedTemplate"
                  :options="Template"
                  label="name"
                  :reduce="Template => Template.id"
                  index="id"
                  :disabled="!StatusSimpanBaru"
                />
              </b-overlay>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="8" md="8">
            <b-form-group
              class="mb-4"
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
                  :state="errors.length > 0 ? false : null"
                  :readonly="!StatusSimpanBaru"
                  autocomplete="off"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="8" md="8">
            <b-form-group
              class="mb-4"
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
                :max="endDate"
                @input="dateDiff"
                :readonly="!StatusSimpanBaru"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="8" md="8">
            <b-form-group
              class="mb-4"
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
                :min="startDate"
                @input="dateDiff"
                :readonly="!StatusSimpanBaru"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="8" md="8">
            <b-form-group
              class="mb-4"
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
          <b-col sm="12" lg="8" md="8" v-if="StatusSimpanBaru">
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
                :readonly="!StatusSimpanBaru"
              />
              <small class="text-danger" v-if="fileUpdate[0] === null">*Silakan pilih file peraturan yang akan diunggah !</small>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="StatusSimpanBaru">
          <b-col sm="12" lg="8" class="text-center" md="8">
            <p class="text-center">
              <feather-icon icon="InfoIcon" /> Pastikan data sudah benar. Data
              yang telah disimpan tidak dapat diubah.
            </p>
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
              <b-spinner small v-if="isLoading" />
              Simpan dan Lanjutkan
            </b-button>
          </b-col>
        </b-row>
        <div v-if="showService">
          <hr />
          <b-row>
            <b-col md="12">
              <div class="font-weight-bold text-primary mb-4">
                LAYANAN
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" lg="8" md="8">
              <b-form-group
                class="mb-4"
                label="Layanan"
                label-for="service"
                label-cols="4"
              >
                <b-overlay :show="isBusyService" rounded="sm">
                  <v-select
                    id="service"
                    v-model="serviceId"
                    box
                    label="name"
                    placeholder="-- Pilih Layanan -- "
                    :options="allServices"
                    :reduce="allServices => allServices.id"
                    index="id"
                  />
                </b-overlay>
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="8" md="8">
              <b-form-group
                class="mb-3"
                label="Sub Layanan"
                label-for="sub_service"
                label-cols="4"
              >
                <b-overlay :show="isBusySubService" rounded="sm">
                  <v-select
                    id="sub_service"
                    v-model="subServiceId"
                    label="name"
                    box
                    placeholder="-- Pilih Sub Layanan -- "
                    :options="allSubServices"
                    :reduce="allSubServices => allSubServices.id"
                    index="id"
                  />
                </b-overlay>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group class="mb-4">
                <b-col sm="12" lg="8" class="text-right" md="8">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="success"
                    :disabled="!serviceId || !subServiceId"
                    @click="getDataTable()"
                  >
                    Tampilkan Daftar SPP
                  </b-button>
                </b-col>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <div v-if="showTable">
          <hr />
          <div class="font-weight-bold text-primary mb-4">
            DAFTAR SPP
          </div>
          <b-overlay :show="isLoadingTable" rounded="sm">
            <div v-if="showDataTable">
              <b-row class="mb-1">
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
                      :sticky-header="true"
                      @filtered="onFiltered"
                      style="height: 300px"
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
                            :date-format-options="{
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            }"
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
                <b-col cols="12" class="collapse">
                  <b-card-body
                    class="d-flex justify-content-between flex-wrap pt-0"
                  >
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
                <b-col>
                  <b-form-group>
                    <b-col class="text-right">
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
            </div>
            <div v-else>
              <h5 class="text-muted text-center">SPP tidak ditemukan</h5>
            </div>
          </b-overlay>
        </div>
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
import DateConvertion from '@/helpers/date-convertion'
import InputFormat from '@/helpers/input-format'
// import Cleave from 'vue-cleave-component'

export default {
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    minDate.setDate(today - 2)
    return {
      selectedTemplate: null,
      Template: [],
      required,
      min: minDate,
      publishDate: '',
      regNumber: '',
      startDate: new Date(),
      endDate: '',
      fileUpdate: [],
      aService: '',
      aSubService: '',
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
        { key: 'total_amount', label: 'Jumlah Tagihan', tdClass: 'text-right' },
        { key: 'original_due_date', label: 'Tgl. Jatuh Tempo Awal' },
        { key: 'updated_due_date', label: 'Tgl. Jatuh Tempo Baru' },
        { key: 'invoice_id', label: 'Pilih' },
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

      // New Variable
      StatusLoadingSave: false,
      StatusSimpanBaru: true,
      IdRelaxation: null,
      isLoading: false,
      isBusyService: false,
      isBusySubService: false,
      isBusy: true,
      showDataTable: false,
      isLoadingTable: false,
      TestNumber: null,
      options: {
        number: InputFormat.options('number'),
      },
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
    // Cleave,
  },
  directives: {
    Ripple,
  },
  created() {
    this.showService = false
    this.showTable = false

    if (this.$route.params.IdRelaxation) {
      this.IdRelaxation = this.$route.params.IdRelaxation
      this.StatusSimpanBaru = false
      this.showService = true

      // Service
      this.getServices()
      this.getSubServices()
      this.getDetail()
    } else {
      this.getTemplate()
    }
  },
  methods: {
    async getTemplate() {
      this.statusLoadTemplate = true
      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: DateConvertion.getTimeNow(),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.statusLoadTemplate = false
          if (result.data.data) {
            this.Template = result.data.data
          } else {
            this.Template = []
          }
        })
        .catch(error => {
          this.statusLoadTemplate = false
          CustomNotification.notif(
            'danger',
            'Gagal menambahkan',
            'Mohon coba kembali beberapa saat kembali'
          )

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
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
      data.template_id = this.selectedTemplate
      data.regulation_number = this.regNumber
      data.regulation_publish_date = this.publishDate
      data.relaxation_period_in_days = this.periode
      data.description = this.regDescription
      data.file_base64 = this.fileUpdate.join()

      return data
    },
    async save() {
      this.StatusLoadingSave = true
      this.serviceId = 0
      this.subServiceId = 0
      this.showActionButton = false
      this.isLoading = true

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
            this.isLoading = false

            if (result.data.response_code === '00') {
              // console.log(result.data)
              CustomNotification.notif(
                'success',
                'Berhasil',
                'Peraturan penundaan denda baru'
              )

              this.fineRelaxationId = result.data.id
              this.IdRelaxation = this.fineRelaxationId
              this.showService = true
              this.fileUpdate = []

              this.StatusSimpanBaru = false
              this.showService = true

              // Service
              this.getServices()
              this.getSubServices()
              this.getDetail()

              this.$router.push({
                name: 'relaxation-fine-add-step2',
                params: {
                  IdRelaxation: this.fineRelaxationId,
                },
              })
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal menambahkan',
                result.data.response_message
              )
            }
            this.StatusLoadingSave = false
          })
          .catch(error => {
            this.showActionButton = true
            this.StatusLoadingSave = false
            this.isLoading = false
            CustomNotification.notif(
              'danger',
              'Gagal menambahkan',
              'Mohon coba kembali beberapa saat kembali'
            )

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
          fine_relaxation_id: this.IdRelaxation,
          id: this.IdRelaxation,
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
            id: this.IdRelaxation,
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif(
                'success',
                'Berhasil ditambahkan',
                'Halaman akan diarahkan ke index'
              )
              this.showService = true
              this.fileUpdate = []
              this.$router.push({ name: 'relaxation-fine' })
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal',
                result.data.response_message
              )
            }
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Gagal',
              'Mohon coba kembali beberapa saat kembali'
            )

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
      this.isBusyService = true
      const param = this.getRequestParams(1, 10000)

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
          this.isBusyService = false
        })
        .catch(() => {
          this.isBusyService = false
          CustomNotification.notif(
            'danger',
            'Gagal',
            'Mohon coba kembali beberapa saat kembali'
          )
        })
    },
    async getSubServices() {
      this.isBusySubService = true
      const param = this.getRequestParams(1, 10000)

      await axios({
        url: URLServices.service_subservice.index,
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
          this.isBusySubService = false
        })
        .catch(() => {
          this.isBusySubService = false
          CustomNotification.notif(
            'danger',
            'Gagal',
            'Mohon coba kembali beberapa saat kembali'
          )
        })
    },
    async getDetail() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.fine_relaxation.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.IdRelaxation,
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
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan data',
            errorMessage
          )
        })
    },
    async getDataTable() {
      this.showButton = false
      this.showTable = true
      this.isBusy = true
      this.isLoadingTable = true
      this.showDataTable = false
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
          this.totalRows = totalRecords
          this.showDataTable = this.totalRows > 0
          this.sppTable = data
          this.isLoadingTable = false

          Object.keys(this.sppTable).forEach(key => {
            this.dueDate[key] = this.sppTable[key].updated_due_date
            this.invoiceId[key] = this.sppTable[key].invoice_id
            this.originalDate[key] = this.sppTable[key].original_due_date
          })

          this.isBusy = false
        })
        .catch(error => {
          this.isBusy = false
          this.isLoadingTable = false
          this.showDataTable = false
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan data',
            errorMessage
          )
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
@import 'vue-select/src/scss/vue-select.scss';
</style>
