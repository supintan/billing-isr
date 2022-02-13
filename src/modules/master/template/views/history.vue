<template>
  <div>
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button variant="light" @click="seen = !seen" v-if="showTable">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
        <b-button
          variant="light"
          :to="{ name: 'detail-template', params: { detailTemplateId: detailTemplateId }}"
        >
          <feather-icon icon="CornerUpLeftIcon" /> Kembali
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
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
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
          </b-card>
        </div>
      </b-col>

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
            <template #cell(last_update)="data">
              {{ data.item.last_updated_date_time }}
            </template>
            <template #cell(action)="data">
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="downloadHistoryTemplate(data.item.id)"
              >
                <feather-icon icon="DownloadIcon" size="16" />
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
  BButton,
  BCard,
  BCardBody,
  BCol,
  BRow,
  BTable,
  BPagination,
  BSpinner,
  BFormSelect,
  BFormGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  components: {
    BButton,
    BCard,
    BCardBody,
    BCol,
    BRow,
    BTable,
    BPagination,
    BSpinner,
    BFormSelect,
    BFormGroup,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      // Tabel attribut
      seen: false,
      perPage: 10,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      items: [],
      showTable: false,
      isBusy: false,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      activeFilter: null,
      filterOn: [],

      // Data Table
      fields: [
        { key: 'no', label: 'No.', tdClass: 'Td-Action-2' },
        { key: 'name', label: 'Nama' },
        { key: 'last_update', label: 'Update Terakhir' },
        { key: 'action', label: 'Aksi', tdClass: 'Td-Action-2' },
      ],

      // ID
      detailTemplateId: this.$route.params.detailTemplateId,
    }
  },
  created() {
    this.getDataTable()
  },
  methods: {
    downloadHistoryTemplate(selectedTemplateID) {
      CustomNotification.notif('wait', 'File PDF sedang diproses ...')
      this.getBase64PDF(selectedTemplateID)
    },
    downloadPDF() {
      const linkSource = `data:application/pdf;base64,${this.pdfFile}`
      const downloadLink = document.createElement('a')

      downloadLink.href = linkSource
      downloadLink.download = this.pdfFileName
      downloadLink.click()
      CustomNotification.notif('success', 'File PDF berhasil dibuat')
    },
    async getBase64PDF(selectedTemplateID) {
      this.pdfFile = null
      await axios({
        url: URLServices.template.history_download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: '2021-10-18 13:49:00',
          id: selectedTemplateID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
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
          const errorMessage = `Gagal membuat file PDF. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
          if (error.response.status && error.response.status === 4011) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    getRequestParams(filter, currentPage, perPage) {
      const params = {}

      if (filter) {
        params.search = filter
      } else {
        if (currentPage) {
          params.page = currentPage
        }
        if (perPage) {
          params.length = perPage
        }
      }

      params.request_id = uuid.v4()
      params.template_id = this.detailTemplateId
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
        url: URLServices.template.history,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.totalRows = recordsTotal
          this.showTable = this.totalRows > 0
          this.isBusy = false
        })
        .catch(() => {
          // console.log(error)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'login' })
          // }
          this.showTable = false
          CustomNotification.notif('danger', 'Gagal memperbaharui data. Mohon coba kembali')
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
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },

    onFiltered() {
      this.currentPage = 1
    },
  },
}
</script>

// <style lang="scss">
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
