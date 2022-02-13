<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="light" @click="seen = !seen" v-if="showTable" class="mr-1 text-primary">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="showTable">
      <b-col>
        <div class="d-flex justify-content-between flex-wrap" v-if="seen">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                id="filterInput"
                v-model="filter"
                v-debounce:500ms="getDataTable"
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="resetSearch"
                  class="btn btn-danger"
                >
                  Reset
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-card>
        </div>
      </b-col>
      <b-col cols="12">
        <b-card no-body class="p-0 mb-4">
          <b-table
            id="tableData"
            striped
            hover
            responsive
            class="position-relative shadow mb-0"
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
            <template #cell(billing_end_date)="data">
              {{ convDate(data.item.billing_end_date) }}
            </template>
            <template #cell(review_date_time)="data">
              {{ convDate1(data.item.review_date_time ? data.item.review_date_time : '-') }}
            </template>
            <template #cell(reviewer_employee_full_name)="data">
              {{ data.item.reviewer_employee_full_name ? data.item.reviewer_employee_full_name : '-' }}
            </template>
            <template #cell(invoice_amount)="data">
              <div style="width:250px">
                {{ `Rp. ${convertNumber(data.item.invoice_amount)}` }}
              </div>
            </template>
            <template #cell(action)="data">
              <b-button-group>
                <b-button
                  v-b-tooltip.hover.top="'Unduh'"
                  variant="light"
                  btn-sm
                  class="btn-sm text-primary"
                  @click="onClick(data.item.invoice_id)"
                >
                  <feather-icon icon="DownloadIcon" size="16" />
                </b-button>
                <b-button
                  v-b-tooltip.hover.top="'Detail'"
                  variant="light"
                  btn-sm
                  class="btn-sm text-primary"
                  :to="{
                    name: 'detail-review-manual-invoice',
                    params: {
                      IdInvoice: data.item.id,
                      IdInvoiceReal: data.item.invoice_id,
                      ViewMode: 'review',
                    },
                  }"
                >
                  <feather-icon icon="ZoomInIcon" size="16" />
                </b-button>
              </b-button-group>
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
    <b-row v-else>
      <b-col>
        <b-card>
          <h5 class="text-center">
            Data tidak ditemukan
          </h5>
        </b-card>
      </b-col>
    </b-row>
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
  BButtonGroup,
  VBTooltip,
} from 'bootstrap-vue'

import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'
import NumberFormat from '@/helpers/input-format'

export default {
  components: {
    BCard,
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
    BSpinner,
    BButtonGroup,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
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
      fields: [
        { key: 'no', label: 'No' },
        { key: 'appliation_name', label: 'Aplikasi' },
        { key: 'invoice_id', label: 'Id Invoice' },
        { key: 'invoice_number', label: 'No. Invoice' },
        { key: 'billing_end_date', label: 'Tgl. Jatuh Tempo' },
        { key: 'invoice_amount', label: 'Nilai Invoice', tdClass: 'text-right' },
        { key: 'review_date_time', label: 'Tgl. Review' },
        { key: 'reviewer_employee_full_name', label: 'Petugas Review' },
        { key: 'review_status', label: 'Status Review' },
        { key: 'action', label: 'Aksi' },
      ],
      items: [],
      showTable: false,
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  created() {
    this.getDataTable()
  },
  methods: {
    convertNumber(number) {
      return NumberFormat.NumberFormat(number)
    },
    convertFullDate(val) {
      return DateConvertion.setFormat(val).getFullDate()
    },
    convertFullDateTime(val) {
      return DateConvertion.setFormat(val).getFullDateTime()
    },
    convertDate(start, end) {
      if (start === null && end === null) return '-'
      const StartText = DateConvertion.setValue(start).convert()
      const EndText = DateConvertion.setValue(end).convert()
      return `${StartText} s/d ${EndText}`
    },
    convDate(dateconv) {
      // console.log(dateconv)
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY')
    },
    convDate1(dateconv) {
      // console.log(dateconv)
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY hh:mm:ss')
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

      params.request_id = uuid.v4()
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')

      return params
    },

    async getDataTable() {
      this.showTable = true
      this.isBusy = true

      if (this.filter !== this.activeFilter) {
        this.currentPage = 1
        this.activeFilter = this.filter
      }

      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage,
      )

      await axios({
        url: URLServices.isr_invoice_submission.index,
        method: 'get',
        params: param,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          this.items = result.data.data
          // console.log(this.items, 'this.items review invoice')
          if (this.items) {
            this.showTable = result.data.recordsTotal > 0 || this.filter
            this.totalRows = result.data.recordsTotal
          }
          this.isBusy = false
        })
        .catch(error => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },

    async onClick(itsId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.invoiceManagement.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: itsId,
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
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mengunduh data regulasi', errorMessage)
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
      this.getDataTable()
    },

    resetSearch() {
      this.filter = ''
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
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },

    downloadPDF() {
      const linkSource = `data:application/pdf;base64,${this.pdfFile}`
      const downloadLink = document.createElement('a')

      downloadLink.href = linkSource
      downloadLink.download = this.pdfFileName
      downloadLink.click()
      CustomNotification.notif('success', 'File PDF berhasil dibuat')
    },
    async getBase64PDF(IdInvoice) {
      this.pdfFile = null
      await axios({
        url: URLServices.ApplicationInvoice.download,
        method: 'post',
        data: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          id: IdInvoice,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.pdfFileName = result.data.file_name
            this.downloadPDF()
          }
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan file Invoice. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
  },
}
</script>
