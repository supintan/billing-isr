<template>
  <div>
    <h4 class="mb-5 mt-3 text-primary">
      Tabel H2H - ISR
      <div class="float-right">
        <b-button
          v-if="showTable"
          variant="light"
          class="mr-1 text-primary"
          @click="seen = !seen"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </div>
    </h4>
    <div v-if="isBusy" class="text-center">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-else>
      <b-row>
        <b-col>
          <div v-if="seen" class="d-flex justify-content-between flex-wrap">
            <!-- filter -->
            <b-card class="card bg-white m-0 p-1 col-12 mb-2">
              <b-input-group size="md">
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
          <b-card no-body class="p-0 mb-4">
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
              <template #cell(TAGIHAN)="data">
                {{ convertNumber(data.item.TAGIHAN) }}
              </template>
              <template #cell(TERBAYAR)="data">
                {{ convertNumber(data.item.TERBAYAR) }}
              </template>
              <template #cell(TANGGAL_BACKUP)="data">
                {{ convertDate(data.item.TANGGAL_BACKUP) }}
              </template>
              <template #cell(BI_BEGIN)="data">
                {{ convertDate(data.item.BI_BEGIN) }}
              </template>
              <template #cell(BI_END)="data">
                {{ convertDate(data.item.BI_END) }}
              </template>
              <template #cell(BI_MONEY_RECEIVED)="data">
                {{ convertDate(data.item.BI_MONEY_RECEIVED) }}
              </template>
              <template #cell(BI_CREATE_DATE)="data">
                {{ convertDate(data.item.BI_CREATE_DATE) }}
              </template>
              <template #cell(TANGGAL_BACKUP)="data">
                {{ convertDate(data.item.TANGGAL_BACKUP) }}
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
                class="ml-2"
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
import axios from 'axios'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import DateConvertion from '@/helpers/date-convertion'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { uuid } from 'vue-uuid'

export default {
  name: 'H2hIsr',
  props: ['Year'],
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
  },
  data() {
    return {
      showTable: false,
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
        { key: 'NO_SPP', label: 'No. SPP' },
        { key: 'BI_ID_REMINDER_ORIG', label: 'BI ID Reminder Orig' },
        { key: 'NO_KLIEN', label: 'No. Klien' },
        { key: 'NO_APLIKASI', label: 'No. Aplikasi' },
        { key: 'NO_RR', label: 'No. RR' },
        { key: 'STATUS_SIMF', label: 'Status' },
        { key: 'NAMA_PERUSAHAAN', label: 'Nama Perusahaan' },
        { key: 'ALAMAT', label: 'Alamat' },
        { key: 'TAGIHAN', label: 'Tagihan' },
        { key: 'TERBAYAR', label: 'Terbayar' },
        { key: 'TRANS_H2H', label: 'Trans H2h' },
        { key: 'BI_BEGIN', label: 'Bi Begin' },
        { key: 'BI_END', label: 'Bi End' },
        { key: 'BI_MONEY_RECEIVED', label: 'Bi Money Received' },
        { key: 'STATUS', label: 'Status' },
        { key: 'KATAGORI_SPP', label: 'Kategori Spp' },
        { key: 'STATUS_IZIN', label: 'Status Izin' },
        { key: 'SERVICE_NAME', label: 'Service Name' },
        { key: 'SUBSERVICE_NAME', label: 'Subservice Name' },
        { key: 'PAYMENT_DESCRIPTION', label: 'Payment Description' },
        { key: 'BI_CREATE_DATE', label: 'Bi Create Date' },
        { key: 'BI_CANCEL', label: 'Bi Cancel' },
        { key: 'ARCHIVED_DATE', label: 'Archived Date' },
        { key: 'BI_TYPE', label: 'Bi Type' },
        { key: 'STATUS_REMAINDER', label: 'Status Remainder' },
        { key: 'BI_MANUAL', label: 'Bi Manual' },
        { key: 'BI_COMMENT', label: 'Bi Comment' },
        { key: 'CITY', label: 'City' },
        { key: 'DISTRICT', label: 'District' },
        { key: 'province', label: 'Province' },
        { key: 'UPT', label: 'Upt' },
        { key: 'TANGGAL_BACKUP', label: 'Tanggal Backup' },
      ],

      items: [],
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
    convertDate(date) {
      return DateConvertion.setValue(date).getFullDate()
    },
    convertNumber(number) {
      return InputFormat.NumberFormat(number)
    },
    async showDelete(templateId, namaTemplate) {
      this.selectedTemplateId = templateId
      this.titleDelete = `Apakah anda ingin template ${namaTemplate}?`
      this.$bvModal.show('modalDelete')
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
      params.request_date_time = DateConvertion.getTimeNow()
      params.year = this.Year

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
        url: URLServices.isr_lra.index_h2h_isr,
        method: 'get',
        params: param,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.items = result.data.data
            this.totalRows = result.data.totalRecords
            this.showTable = result.data.totalRecords > 0 || this.filter
          } else {
            this.items = []
            this.totalRows = 0
            this.showTable = false
          }
          this.isBusy = false
        })
        .catch(error => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = 'Gagal memuat data. Mohon ulangi beberapa saat kembali'
          CustomNotification.notif('danger', 'Error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }

        })
      this.isBusy = false
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
    // Reset Modal
    resetModal() {
      this.name = ''
      this.nameState = null
      this.deleteReason = ''
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteTemplate(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      // API REQUEST
      axios({
        url: URLServices.template.destroy,
        data: {
          request_id: this.guidv4,
          reuqest_date_time: DateConvertion.getTimeNow(),
          id: this.selectedTemplateId,
          notes: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            const notifTitle = 'Berhasil menghapus data'
            CustomNotification.notif('success', notifTitle)
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            const errorTitle = response.data.response_message
            CustomNotification.notif('warning', errorTitle)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          const failNotif = 'Gagal menghapus. Mohon coba kembali'
          CustomNotification.notif('warning', failNotif)
        })
    },
  },
}
</script>
