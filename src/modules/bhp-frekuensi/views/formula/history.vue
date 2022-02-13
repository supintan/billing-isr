<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          class="mr-1 text-primary"
          :to="{name: 'bhp-frekuensi-formula'}"
        >
          <feather-icon icon="CornerUpLeftIcon" /> kembali
        </b-button>
        <b-button
          variant="light"
          @click="seen = !seen"
          v-if="showTable"
          class="mr-1 text-primary"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button
          variant="light"
          @click="tableRefresh()"
          class="text-primary"
        >
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
            <template #cell(tgl_mulai)="data">
              {{ convDate(data.tgl_mulai) }}
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card-body class="d-flex justify-content-between flex-wrap mt-2">
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
} from 'bootstrap-vue'
// import axios from 'axios'
import { uuid } from 'vue-uuid'
// import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
// import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'

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
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'nama_formula', label: 'Nama Formula' },
        { key: 'tgl_mulai', label: 'Tgl. Mulai' },
        { key: 'Formula', label: 'Formula' },
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
    getRequestParams(filter, currentPage, perPage) {
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

      params.request_id = uuid.v4()
      params.request_date_time = DateConvertion.getTimeNow()

      return params
    },

    getDataTable() {
      this.showTable = true
      this.isBusy = false
      // const param = this.getRequestParams(
      //   this.filter,
      //   this.currentPage,
      //   this.perPage,
      // )

      this.items = [
        {
          no: 1,
          nama_formula: 'BHP v1',
          tgl_mulai: '2021-11-09',
          Formula: '(A x b x C) / 2',
        },
        {
          no: 2,
          nama_formula: 'BHP v2',
          tgl_mulai: '2021-11-23',
          Formula: '(A x b x C)',
        },
      ]

      // axios({
      //   url: URLServices.fine.index,
      //   params: param,
      //   method: 'get',
      //   headers: {
      //     Authorization: `${TokenType} ${getToken()}`,
      //   },
      // })
      //   .then(response => {
      //     const { data, recordsTotal } = response.data
      //     this.items = data
      //     this.totalRows = recordsTotal
      //     this.isBusy = false
      //   })
      //   .catch(() => {
      //     this.showTable = false
      //     CustomNotification.notif('error', 'Gagal memperbaharui data', 'Mohon coba kembali')
      //   })
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
    convDate(date) {
      if (date !== null) {
        return DateConvertion.setValue(date).getFullDate()
      }
      return '-'
    },
  },
}
</script>
