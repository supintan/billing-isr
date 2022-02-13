<template>
  <div>
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button
            v-if="showTable"
            variant="light"
            @click="seen = !seen"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button
            variant="light"
            @click="tableRefresh()"
        >
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="showTable">
      <b-col>
        <div
            v-if="seen"
            class="d-flex justify-content-between flex-wrap"
        >
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                  id="filterInput"
                  v-model="filter"
                  type="search"
                  placeholder="Ketik kata yang anda cari ..."
                  autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                    :disabled="!filter"
                    class="btn btn-danger"
                    @click="filter = ''; getDataTable()"
                >
                  Reset
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-card>
        </div>
      </b-col>

      <b-col cols="12">
        <b-card
            no-body
            class="p-0"
        >
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
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #cell(no)="data">
              {{ perPage * (currentPage - 1) + data.index + 1 }}
            </template>
            <template #cell(upload_date_time)="data">
              {{ convDate(data.item.upload_date_time) }}
            </template>
            <template #cell(invoice_total_amount)="data">
              {{ convertNumber(data.item.invoice_total_amount) }}
            </template>
            <template #cell(verification_date_time)="data">
              {{ convDate(data.item.verification_date_time) }}
            </template>
            <template #cell(review_date_time)="data">
              {{ convDate(data.item.review_date_time) }}
            </template>
            <template #cell(appeal_due_date)="data">
              {{ convDate(data.item.appeal_due_date) }}
            </template>
            <template #cell(original_due_date)="data">
              {{ convDate(data.item.original_due_date) }}
            </template>
            <template #cell(id)="data">
              <b-button
                  variant="info"
                  :to="{
                  name: 'detail-review-invoice-postponement',
                  params: {
                    postponementId : data.item.postponement_id,
                    appealId: data.item.postponement_appeal_submissions_id,
                    submissionId: data.item.id,
                  },}"
                  btn-sm
              >
                Detail
              </b-button>
              <b-button
                  variant="info"
                  @click="onClick()"
                  btn-sm
              >
                Download
              </b-button>
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
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
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
            Data tidak ditemukan <feather-icon icon="FrownIcon" />
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
} from 'bootstrap-vue'

import moment from 'moment'
import axios from 'axios'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { URLServices, token } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'

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
    // FeatherIcon,
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
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'appeal_letter_number', label: 'Nomor Surat Permohonan' },
        { key: 'upload_date_time', label: 'Tanggal Upload' },
        { key: 'verification_date_time', label: 'Tanggal Verifikasi' },
        { key: 'verification_employee_name', label: 'Petugas Verifikasi' },
        { key: 'review_date_time', label: 'Tanggal Review' },
        { key: 'review_employee_name', label: 'Petugas Review' },
        { key: 'review_status', label: 'Status Review' },
        { key: 'invoice_number', label: 'Nomor SPP' },
        { key: 'invoice_total_amount', label: 'Nilai SPP' },
        { key: 'appeal_due_date', label: 'Tanggal Jatuh Tempo' },
        { key: 'original_due_date', label: 'Tanggal Jatuh Tempo baru' },
        { key: 'id', label: 'Aksi' },
      ],
      items: [],
      showTable: false,
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
  created() {
    this.getDataTable()
  },
  methods: {
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    convertNumber(number) {
      return `Rp. ${InputFormat.NumberFormat(number)}`
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

      params.request_id = 'guid_v4'
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')

      return params
    },
    getDataTable() {
      this.showTable = true
      this.isBusy = true
      const param = this.getRequestParams(
          this.filter,
          this.currentPage,
          this.perPage,
      )
      axios({
        url: URLServices.postponement_submission.index,
        // url: URLServices.postponement_appeal.index,
        params: param,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        const { data, recordsTotal } = response.data
        this.items = data
        // console.log('items', this.items)
        this.totalRows = recordsTotal
        this.isBusy = false
      }).catch(() => {
        // console.log(error)
        // if (error.response.status && error.response.status === 401) {
        //   localStorage.removeItem('accessToken')
        //   localStorage.removeItem('userData')
        //   this.$router.go({ name: 'login' })
        // }
        this.showTable = false
        const notifError = 'Gagal memperbaharui data. Mohon coba kembali'
        CustomNotification.notif('warning', notifError)
      })
      this.isBusy = false
    },
    onClick() {
      axios({
        url: URLServices.postponement.download,
        method: 'POST',
        params: {
          request_id: 'guid_v4',
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.items.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(result => {
        // console.log(result.data)
        const fileURL = result.data.file_base64
        const fileLink = document.createElement('a')
        const convert = 'data:application/pdf;base64, '
        // console.log(fileURL)
        fileLink.href = `${convert}${fileURL}`
        // console.log(fileLink.href)
        fileLink.setAttribute('download', result.data.file_name)
        document.body.appendChild(fileLink)
        fileLink.click()
      }).catch(error => {
        const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('error', errorMessage)
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
    onFiltered() {
      this.currentPage = 1
    },
  },
}
</script>
