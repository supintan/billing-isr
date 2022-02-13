<template>
  <div>
    <b-card class="shadow p-0 mb-4">
      <b-row>
        <b-col md="6" sm="12" lg="6">
          <b-form-group label="Bank" label-cols="4" label-for="bank">
            <v-select
              id="bank"
              v-model="Bank"
              :options="BankOption"
              :reduce="BankOption => BankOption.label"
              placeholder="-- Pilih Bank --"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12" lg="6">
          <b-form-group label="Tgl. Awal" label-cols="4" label-for="tanggal">
            <b-form-datepicker
              id="start_date"
              v-model="startDate"
              locale="id"
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: undefined,
              }"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="6" class="collapse">
          <b-form-group label="Tgl. Akhir" label-cols="4">
            <b-form-datepicker
              id="end_date"
              v-model="endDate"
              locale="id"
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: undefined,
              }"
              :min="startDate"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <div class="float-right">
        <b-button variant="primary" @click="GenerateReport()">
          <feather-icon icon="Icon" /> Tampilkan
        </b-button>
      </div>
    </b-card>
    <div v-if="StatusGenerateReport">
      <b-row class="mt-5">
        <b-col class="d-flex justify-content-between flex-wrap pt-0">
          <h4 class="text-muted">
            <feather-icon icon="SearchIcon" size="24" /> Hasil Pencarian
          </h4>
        </b-col>
      </b-row>
      <b-overlay :show="ShowProcess" rounded="sm">
        <b-card class="card bg-white shadow m-0 p-0 col-12">
          <div v-if="showTable">
            <b-row class="mb-3">
              <b-col>
                <div class="text-right">
                  <b-button
                    variant="light"
                    @click="seen = !seen"
                    v-if="showTable"
                    class="text-primary mr-1"
                  >
                    <feather-icon icon="SearchIcon" /> Cari
                  </b-button>
                  <b-button
                    variant="light"
                    @click="tableRefresh()"
                    class="text-primary mr-1"
                  >
                    <feather-icon icon="RefreshCcwIcon" /> Refresh
                  </b-button>
                  <b-button
                    variant="primary"
                    @click="download()"
                  >
                    <feather-icon icon="DownloadIcon" /> Download .Pdf
                  </b-button>
                </div>
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="12" class="mb-2">
                <div class="d-flex justify-content-between flex-wrap" v-if="seen">
                  <!-- filter -->
                  <b-input-group>
                    <b-form-input
                      id="filterInput"
                      v-model="filter"
                      type="search"
                      placeholder="Ketik kata yang anda cari ..."
                      autocomplete="off"
                      v-debounce:500ms="getDataTable"
                    />
                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''; getDataTable()"
                        class="btn btn-danger"
                      >
                        Reset
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </b-col>
              <b-col cols="12" class="mt-2 mb-4">
                <b-row class="mb-2 font-weight-bold">
                  <b-col cols="3">Total Settled</b-col>
                  <b-col cols="3">: <span class="text-primary">{{ TotalSettled }}</span></b-col>
                  <b-col cols="3">Total Nilai Invoice Settled</b-col>
                  <b-col cols="3">: <span class="text-primary">{{ TotalSettledAmount }}</span></b-col>
                </b-row>
                <b-row class="mb-2 font-weight-bold">
                  <b-col cols="3">Total Unsettled</b-col>
                  <b-col cols="3">: <span class="text-danger">{{ TotalUnsettled }}</span></b-col>
                </b-row>
                <b-row class="mb-2 font-weight-bold">
                  <b-col cols="3">Total Need Confirmation</b-col>
                  <b-col cols="3">: <span class="text-danger">{{ TotalNeedConfirmation }}</span></b-col>
                </b-row>
                <b-row class="mb-2 font-weight-bold">
                  <b-col cols="3">Total Invoice</b-col>
                  <b-col cols="3">: <span class="text-primary">{{ TotalInvoice }}</span></b-col>
                </b-row>
                <b-table
                  id="tableData"
                  striped
                  hover
                  responsive
                  class="position-relative mb-0"
                  :busy="isBusy"
                  :per-page="perPage"
                  :items="items"
                  :fields="fields"
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
                  <template #cell(jumlah_tagihan)="data">
                    {{ convNumber(data.item.jumlah_tagihan) }}
                  </template>
                  <template #cell(tgl_jatuh_tempo)="data">
                    {{ convDate(data.item.tgl_jatuh_tempo) }}
                  </template>
                  <template #cell(waktu_transaksi_h2h)="data">
                    {{ convDate(data.item.waktu_transaksi_h2h) }}
                  </template>
                  <template #cell(field14)="data">
                    {{ convDate(data.item.field14) }}
                  </template>
                  <template #cell(bank_branch)>
                    -
                  </template>
                  <template #cell(action)="data">
                    <b-button
                      variant="light"
                      btn-sm
                      class="btn-sm text-primary"
                      @click="detail(data.item.action)"
                    >
                      <feather-icon icon="ZoomInIcon" size="16" />
                    </b-button>
                  </template>
                </b-table>
              </b-col>
              <b-col cols="12">
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
                      class="ml-1"
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
          </div>
          <div v-else>
            <b-col>
              <h5 class="text-center p-0 m-0">
                Data tidak ditemukan
              </h5>
            </b-col>
          </div>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BTable,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardBody,
  BCard,
  BSpinner,
  BFormDatepicker,
} from 'bootstrap-vue'
import VSelect from 'vue-select'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import DateConvertion from '@/helpers/date-convertion'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    VSelect,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
    BSpinner,
    BFormDatepicker,
  },
  data() {
    return {
      TotalSettled: 0,
      TotalSettledAmount: 0,
      TotalUnsettled: 0,
      TotalNeedConfirmation: 0,
      TotalInvoice: 0,
      StatusGenerateReport: false,
      Bank: null,
      BankOption: [
        { id: 1, label: 'Mandiri' },
        { id: 2, label: 'BSI' },
        { id: 3, label: 'BNI' },
        { id: 4, label: 'BRI' },
      ],
      searchTitle: '',
      isBusy: true,
      seen: false,
      perPage: 10,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      activeFilter: null,
      filterOn: [],
      no: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No' },
        { key: 'invoice_no', label: 'No. Invoice' },
        { key: 'jumlah_tagihan', label: 'No. Jumlah Tagihan', tdClass: 'text-right' },
        { key: 'client_id', label: 'Client Id' },
        { key: 'customer_name', label: 'Client Name' },
        { key: 'payment_chanel', label: 'Payment Channel' },
        { key: 'response_billier', label: 'Respon Biller' },
        { key: 'response_channel', label: 'Respon Channel' },
        { key: 'mt940_status', label: 'Status MT940' },
        { key: 'status_SIMS', label: 'Status SIMS' },
        { key: 'waktu_transaksi_h2h', label: 'Waktu Transaksi (H2H)' },
        { key: 'field13', label: 'Tgl. Bayar (SIMS)' },
        { key: 'tgl_jatuh_tempo', label: 'Tgl. Jatuh Tempo' },
        { key: 'field15', label: 'Status Rekonsiliasi' },
        { key: 'bank_name', label: 'Bank Name' },
        { key: 'bank_branch', label: 'Bank Branch' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,

      startDate: new Date(),
      endDate: new Date(),
      ShowProcess: false,
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  methods: {
    async showDelete(idUser, NamaUser) {
      this.selectedIDUser = idUser
      this.title = {
        delete: `Apakah anda ingin menghapus user ${NamaUser}?`,
      }
      this.$bvModal.show('modalDelete')
    },
    convDate(date) {
      if (!date) return '-'
      return DateConvertion.getFullDateTime(date)
    },
    convNumber(number) {
      if (!number) return '-'
      return InputFormat.NumberFormat(number)
    },
    convSexCode(code) {
      if (code === ('M' || 'm')) {
        return 'laki-laki'
      }
      return 'perempuan'
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      this.$bvModal.show('modalDetail')
      // API REQUEST
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
    },
    GenerateReport() {
      this.StatusGenerateReport = true
      this.showTable = false
      this.getDataTable()
    },
    getRequestParams(filter, currentPage, perPage) {
      const params = {}

      if (filter) {
        params.search = filter
      }

      if (currentPage) {
        params.page = currentPage
      }

      if (perPage) {
        params.length = perPage
      }
      
      params.waktu_transaksi_h2h = DateConvertion.setValue(this.startDate).getYearMonthDate()
      params.end_waktu_transaksi_h2h = DateConvertion.setValue(this.startDate).getYearMonthDate()
      params.reconciliation_date = DateConvertion.setValue(this.startDate).getYearMonthDate()
      params.bank_name = this.Bank
      params.request_id = uuid.v4()
      params.request_date_time = DateConvertion.getTimeNow()

      return params
    },

    getDataTable() {
      this.isBusy = true
      this.ShowProcess = true
      
      if (this.filter !== this.activeFilter) {
        this.currentPage = 1
        this.activeFilter = this.filter
      }

      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage,
      )
      
      // API REQUEST
      axios({
        url: URLServices.revenue_reconciliation.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            const { data, totalRecords, totalSettled, totalInvoiceSettled, totalUnsettled, totalInvoice } = response.data

            this.TotalSettled = totalSettled
            this.TotalSettledAmount = InputFormat.NumberFormat(totalInvoiceSettled)
            this.TotalUnsettled = totalUnsettled
            this.TotalNeedConfirmation = totalUnsettled
            this.TotalInvoice = totalInvoice

            this.items = data
            this.totalRows = totalRecords ? totalRecords : this.items.length
            this.showTable = this.totalRows > 0 || this.filter
          } else {
            this.items = []
            this.TotalSettled = 0
            this.TotalSettledAmount = 0
            this.TotalUnsettled = 0
            this.TotalNeedConfirmation = 0
            this.TotalInvoice = 0
            this.showTable = false
            CustomNotification.notif('warning', 'Gagal memperbaharui data', response.data.response_message)
          }
          this.isBusy = false
          this.ShowProcess = false
        })
        .catch(error => {
          this.ShowProcess = false
          this.showTable = false
          this.isBusy = false
          CustomNotification.notif('danger', 'Gagal memuat data', 'Mohon coba beberapa saat kembali')
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
        })
    },
    
    download() {
      this.ShowLoadingDownload = true

      // API REQUEST
      axios({
        url: URLServices.revenue_reconciliation.download,
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          reconciliation_date: DateConvertion.setValue(this.startDate).getYearMonthDate(),
          bank_name: this.Bank,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            const fileURL = response.data.file_base64
            const fileLink = document.createElement('a')
            const convert = 'data:application/pdf;base64, '
            fileLink.href = `${convert}${fileURL}`
            fileLink.setAttribute('download', response.data.file_name)
            document.body.appendChild(fileLink)
            fileLink.click()
          } else {
            CustomNotification.notif('warning', 'Gagal mendownload file', 'Mohon coba kembali')
          }
          this.ShowLoadingDownload = false
        })
        .catch(error => {
          this.ShowLoadingDownload = false
          
          CustomNotification.notif('danger', 'Gagal mendownload file', 'Mohon coba beberapa saat kembali')
          
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
        })
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

    tableRefresh() {
      this.showTable = true
      this.getDataTable()
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered() {
      this.currentPage = 1
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },

    // Reset Modal
    resetModal() {
      this.name = ''
      this.nameState = null
      this.deleteReason = ''
    },
    resetModalDetail() {
      this.userData = {}
      this.getDetailUserSuccessed = false
      this.title = {
        detail: 'Detail user ...',
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteUser(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }

      // API REQUEST
    },
  },
}
</script>
