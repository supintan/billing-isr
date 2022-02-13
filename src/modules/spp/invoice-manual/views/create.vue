<template>
  <b-overlay rounded="sm">
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col sm="12" lg="9">
              <b-form-group
                class="mb-2"
                label="Pelanggan"
                label-for="client"
                label-cols="4"
              >
                <v-select
                  v-model="selectedClientName"
                  label="spectra_ad_company"
                  box
                  placeholder="-- Pilih Client -- "
                  :options="allClient"
                  @input="selectedClientInput"
                >
                  <template v-slot:option="allClient">
                    <span> {{ allClient.spectra_ad_company }}</span>
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="9">
              <b-form-group
                class="mb-2"
                label="Aplikasi"
                label-for="app"
                label-cols="4"
              >
                <b-overlay
                  :show="!statusShow"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                >
                  <div v-if="applications">
                    <v-select
                      id="app"
                      v-model="selectedAppName"
                      box
                      label="name"
                      placeholder="-- Pilih Aplikasi -- "
                      :options="applications"
                      @input="selectedAppInput"
                    >
                  <template v-slot:option="applications">
                    <span> {{ applications.name }}</span>
                  </template>

                    </v-select>
                  </div>
                </b-overlay>
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="9">
              <b-form-group
                class="mb-2"
                label="No. SPP"
                label-for="spp"
                label-cols="4"
              >
                <b-overlay
                  :show="!statusShow"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                >
                  <div v-if="invoices">
                    <v-select
                      id="spp"
                      v-model="selectedInvoiceName"
                      box
                      label="invoice_number"
                      placeholder="-- Pilih Nomor SPP -- "
                      :options="invoices"
                    >
                  <template v-slot:option="invoices">
                    <span> {{ invoices.invoice_number }}</span>
                  </template>

                    </v-select>
                  </div>
                  <small>*Kosongkan jika ingin menyimpan data SPP baru</small>
                </b-overlay>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
        <b-row>
            <!-- <b-col sm="12" lg="7">
              <b-form-group
                class="mb-2"
                label="Periode KM"
                label-for="kmPeriod"
                label-cols="5"
              >
              <b-form-datepicker
                class="font-weight-bold"
                id="kmPeriod"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                v-model="kmStartPeriod"
                placeholder="DD-MM-YYYY"
              />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                class="mb-2"
                label="-"
                label-for="kmPeriod"
                label-cols="1"
              >
                <b-form-datepicker
                  class="font-weight-bold"
                  id="kmPeriod"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  locale="id"
                  v-model="kmEndPeriod"
                  placeholder="DD-MM-YYYY"
                />
              </b-form-group>
            </b-col> -->
          <b-col lg="12" md="7" v-if="showTdd">
            <b-form-group
              class="mb-2"
              label="Blok Frekuensi"
              label-for="bloc_freq"
              label-cols="3"
            >
              <b-table
                id="tableData"
                striped
                hover
                responsive
                class="position-relative shadow mb-0"
                :busy="isBusy"
                :per-page="perPage"
                :items="dataFreq"
                :fields="fieldsTdd"
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
              </b-table>
              <!-- <b-table
                id="tableData"
                striped
                hover
                responsive
                class="position-relative shadow mb-0"
                :busy="isBusy"
                :per-page="perPage"
                :items="items"
                :fields="fieldsFdd"
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
              </b-table> -->
            </b-form-group>
          </b-col>
          <b-col lg="12" md="7" v-if="showFdd">
            <b-form-group
              class="mb-2"
              label="Blok Frekuensi"
              label-for="bloc_freq"
              label-cols="3"
            >
              <!-- <b-table
                id="tableData"
                striped
                hover
                responsive
                class="position-relative shadow mb-0"
                :busy="isBusy"
                :per-page="perPage"
                :items="items"
                :fields="fieldsTdd"
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
              </b-table> -->
              <b-table
                id="tableData"
                striped
                hover
                responsive
                class="position-relative shadow mb-0"
                :busy="isBusy"
                :per-page="perPage"
                :items="dataFreq"
                :fields="fieldsFdd"
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
              </b-table>
            </b-form-group>
          </b-col>
          <!-- <b-col sm="12" lg="7" md="7">
            <b-form-group
              v-if="selectedModaFreq === 'FDD'"
              class="mb-2"
              label="Rentang Frekuensi"
              label-for="rent_freq_fdd"
              label-cols="5"
            >
              <v-select
                v-model="selectedFreqDesc"
                label="rent_freq_fdd"
                box
                placeholder="-- Pilih Rentang Frekuensi -- "
                :options="frequencies"
                @input="selectedFddInput"
              >
                <template v-slot:option="frequencies">
                  <span> {{ frequencies.description }}</span>
                </template>
              </v-select>
            </b-form-group>
          </b-col> -->
          <!-- <b-col sm="12" lg="9" md="7">
            <b-form-group
              v-if="selectedModaFreq === 'TDD'"
              class="mb-2"
              label="Rentang Frekuensi"
              label-for="rent_freq_tdd"
              label-cols="4"
            >
              <b-form-input
                v-model="tddFreqUp"
                id="rent_freq_tdd"
                placeholder="..."
              />
            </b-form-group>
          </b-col> -->
          <!-- <b-col>
            <b-form-group
              v-if="selectedModaFreq === 'TDD'"
              label="Uplink"
              label-for="uplink"
              label-cols="4"
            ></b-form-group>
          </b-col> -->
          <!-- <b-col sm="12" lg="9" md="7">
            <b-form-group
              v-if="selectedModaFreq === 'TDD'"
              class="mb-4"
              label=""
              label-for="rent_freq_tdd"
              label-cols="4"
            >
              <b-form-input
                v-model="tddFreqDown"
                id="rent_freq_tdd"
                placeholder="..."
              />
            </b-form-group>
          </b-col> -->
          <!-- <b-col>
            <b-form-group
              v-if="selectedModaFreq === 'TDD'"
              label="Downlink"
              label-for="downlink"
              label-cols="4"
            ></b-form-group>
          </b-col> -->
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Pilih Jenis SPP"
              label-for="sppType"
              label-cols="4"
            >
              <b-form-select
                v-model="selectedSPP"
                :options="SPPs"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7" v-if="selectedSPP === 'Pokok'">
            <b-form-group
              class="mb-2"
              label="Tipe Kasus"
              label-for="caseType"
              label-cols="4"
            >
              <b-form-select
                v-model="selectedCaseType"
                :options="caseTypes"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7" v-if="selectedSPP === 'Pokok + Denda'">
            <b-form-group
              class="mb-2"
              label="Tipe Kasus"
              label-for="caseType"
              label-cols="4"
            >
              <b-form-select
                v-model="selectedCaseType"
                :options="caseTypess"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Pilih Template"
              label-for="template"
              label-cols="4"
            >
              <v-select
                id="template"
                v-model="template"
                label="name"
                box
                placeholder="-- Pilih Template -- "
                :options="allTemplate"
                @input="selectedTemplateInput"
              >
                <template v-slot:option="allTemplate">
                  <span> {{ allTemplate.name }}</span>
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" md="3">
            <b-form-group>
              <b-button variant="info" size="sm" active v-b-modal.modalPreview @click="preview">Preview</b-button>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Masa Laku Awal"
              label-for="masaLakuAwal"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="billingStartDate"
                class="font-weight-bold text-left"
                id="masaLakuAwal"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                placeholder="DD-MM-YYYY"
                :min="min"
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
                class="font-weight-bold text-left"
                id="masaLakuAkhir"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                locale="id"
                placeholder="DD-MM-YYYY"
                :max="max"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Periode Jatuh Tempo"
              label-for="tempoPeriod"
              label-cols="4"
            >
              <b-form-input
                id="tempoPeriod"
                class="font-weight"
                type="number"
                placeholder=""
                v-model="dueDatePeriod"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" md="3">
            <b-form-group
              class="mb-2"
              label=""
              label-for="typePeriod"
              label-cols="1"
            >
              <b-form-select
                v-model="selectedTempo"
                :options="tempos"
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
                  placeholder=""
                  required
                  autocomplete="off"
                  :disabled="selectedSPP === 'Denda'"
                  @input="countTotal"
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
                  @input="countTotal"
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
                  placeholder=""
                  required
                  autocomplete="off"
                  :disabled="selectedSPP === 'Pokok'"
                  @input="countTotal"
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
                  @input="countTotal"
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
                <cleave
                  id="total"
                  v-model="totalAmount"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  autocomplete="off"
                  @input="getTerbilang"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-2"
              label="Nominal TOTAL (terbilang)"
              label-for="totalAmountIW"
              label-cols="4"
            >
              <b-form-textarea
                id="totalAmountIW"
                v-model="totalAmountInWord"
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
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="9" md="7">
            <b-form-group
              class="mb-4"
              label="Dokumen Dasar SPP Manual"
              label-for="docFile"
              label-cols="4"
            >
              <b-form-file
                  v-model="fileUpdate[0]"
                  accept=".pdf"
                  placeholder="Pilih file disini..."
                  drop-placeholder="Masukkan file disini..."
                  @change="createBase64File"
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
        <hr />
        <b-row>
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
  BInputGroup,
  BFormDatepicker,
  BFormSelect,
  // BFormCheckbox,
  BTable,
  BFormTextarea,
  BFormFile,
  BSpinner,
  BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import axios from 'axios'
import moment from 'moment'
import Cleave from 'vue-cleave-component'
import { ValidationObserver } from 'vee-validate'
// import UserManagement from '@/services/UserManagement'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
// import ServiceConfig from '@/services/ServiceConfig'
import InputFormat from '@/helpers/input-format'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import angkaTerbilang from '@develoka/angka-terbilang-js'

export default {
  data() {
    return {
      statusShow: true,
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
      selectedApp: '',
      selectedAppName: '',
      applications: [],
      applicationss: [
        { value: 'test_app', text: 1 },
      ],
      selectedKm: null,
      selectedKmAppId: null,
      allkm: [],
      allClient: [],
      selectedSPP: null,
      selectedCaseType: null,
      caseTypess: [
        { value: null, text: '-- Pilih Jenis Kasus --' },
        { value: 'NORMAL', text: 'Normal' },
        { value: 'CICILAN', text: 'Cicilan' },
        { value: 'POOLING', text: 'Pooling' },
        { value: 'PENGURANGAN', text: 'Pengurangan' },
        { value: 'PENUNDAAN', text: 'Penundaan' },
        { value: 'REMINDER', text: 'Reminder' },
        { value: 'BAD_DEBT', text: 'Bad Debt' },
      ],
      caseTypes: [
        { value: null, text: '-- Pilih Jenis Kasus --' },
        { value: 'NORMAL', text: 'Normal' },
        { value: 'CICILAN', text: 'Cicilan' },
        { value: 'POOLING', text: 'Pooling' },
        { value: 'PENGURANGAN', text: 'Pengurangan' },
        { value: 'PENUNDAAN', text: 'Penundaan' },
        { value: 'BAD_DEBT', text: 'Bad Debt' },
      ],
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
      selectedClient: '',
      selectedClientName: '',
      dataKm: [],
      dataClient : {},
      kmStartPeriod: '',
      kmEndPeriod: '',
      showFrequency: false,
      dueDatePeriod: '',
      billingStartDate: null,
      billingEndDate: null,
      annualAmount: 0,
      fineAmount: 0,
      totalAmount: null,
      totalAmountInWord: null,
      desc: '',
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
      allTemplate: [],
      template: '',
      pdfFile: null,
      selectedTemplateId: '',
      invoices: [],
      selectedInvoiceName: null,
      number: '',
      total_amount: 0,
      due_date: null,
      idSPP: '',
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
    BInputGroup,
    BFormDatepicker,
    // BFormCheckbox,
    // vSelect,
    BTable,
    // FeatherIcon,
    BFormTextarea,
    BFormFile,
    BFormSelect,
    vSelect,
    BSpinner,
    ValidationObserver,
    BForm,
    Cleave,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getClientData()
    this.getDataTemplate()
    this.showFdd = false
    this.showTdd = false
  },
  methods: {
    getTerbilang(a) {
      if (a) {
        a = InputFormat.convNumString(a)
        this.totalAmountInWord = `${angkaTerbilang(a).toUpperCase()} RUPIAH`
      } else {
        this.totalAmountInWord = ''
      }
      return ''
    },
    selectedTemplateInput(value) {
      this.selectedTemplateId = value.id
      this.template = value.name
    },
    async getDataTemplate() {
      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: {
          page: 1,
          length: 1000,
          search: '',
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.allTemplate = result.data.data
          } else {
            this.allTemplate = []
          }
        })
        .catch(error => {
          const errorMessage = `Gagal memuat data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    preview() {
      this.pdfFile = null
      this.$bvModal.show('modalPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.selectedTemplateId,
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
          const errorMessage = `Gagal mengunduh data template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
    },
    selectedClientInput(value) {
      this.selectedClient = value.id
      this.selectedClientName = value.spectra_ad_company
      this.getAppData(this.selectedClient)
    },
    selectedAppInput(value) {
      this.selectedApp = value.id
      this.selectedAppName = value.name
      this.getInvoices(this.selectedClient, this.selectedApp)
      // this.getKmData(this.selectedApp)
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      this.formulaId = value.formula_id
      this.min = value.start_date
      this.max = value.end_date

      this.dataFreq = []
      this.getKmPeriod(this.selectedKm)
      this.getKmModa(this.selectedKmAppId)
      this.getAppData(this.selectedKm)
    },
    selectedModaInput(value) {
      this.selectedModa = value.id
      this.selectedModaFreq = value.frequency_mode
    },
    selectedFddInput(value) {
      this.selectedFdd = value.id
      this.selectedFreqDesc = value.description
    },
    async getInvoices(clientId, appId) {
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
        this.invoices = result.data.data
        this.selectedInvoiceName = dataResult.invoice_number
        this.total_amount = dataResult.invoice_total_amount
        this.due_date = dataResult.invoice_due_date
        this.idSPP = dataResult.id
      }).catch(error => {
        const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('warning', errorMessage)
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
    async getAppData(clientId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.manual_invoice_isr_application.index_by_client_id,
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          client_id: clientId,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          // const { data, recordsTotal } = response.data
          this.applications = response.data.data
          console.log(this.applications)
          this.statusShow = true
        })
        .catch(() => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = 'Gagal Mendapatkan data. Mohon coba kembali'
          CustomNotification.notif('warning', errorMessage)
        })
    },
    // getReqParam(appId) {
    //   this.selectedApp.push(
    //     search: application_id = appId
    //   )
    // },
    async getClientData() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.client_invoice_manual.index,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          page: 1,
          length: 1000,
          search: '',
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.allClient = result.data.data
          this.dataClient.selectedClient = this.allClient.spectra_ad_company
          console.log('this.', this.dataClient.selectedClient)
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
        })
    },
    async getKmData() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.ministerial_decree.index,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          page: 1,
          length: 1000,
          application_id: '',
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
          CustomNotification.notif('warning', errorMessage)
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
          const kmData = result.data.data
          this.kmStartPeriod = kmData.start_date
          this.kmEndPeriod = kmData.end_date
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
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
          CustomNotification.notif('warning', errorMessage)
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
          CustomNotification.notif('warning', errorMessage)
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
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    countTotal() {
      const annual = InputFormat.convNumString(this.annualAmount) * 1
      const fine = InputFormat.convNumString(this.fineAmount) * 1
      this.totalAmount = annual + fine
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

      data.client_id = this.selectedClient
      data.application_id = this.selectedApp
      data.invoice_type = this.selectedSPP
      data.invoice_id = this.selectedInvoiceName
      data.case_type = this.selectedCaseType
      data.billing_begin_date = this.billingStartDate
      data.billing_end_date = this.billingEndDate
      data.due_date_period = this.tempo
      data.annual_amount = InputFormat.convNumString(this.annualAmount)
      data.fine_amount = InputFormat.convNumString(this.fineAmount)
      data.total_amount = this.totalAmount
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
              CustomNotification.notif('success', 'Berhasil !',successMassage)
              this.$router.push({ name: 'manual-invoice' })
            } else {
              const responseMessage = result.data.response_message
              CustomNotification.notif('warning', 'Gagal !',responseMessage)
            }
          })
          .catch(error => {
            const notifError = '500: Internal Server Error '
            CustomNotification.notif('error', 'Error !', notifError)
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
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
