<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="light" :to="{ name: 'add-manual-invoice' } " v-if="$can('store', 'isr_manual_invoice')" class="mr-1 text-primary">
          <feather-icon icon="PlusIcon" /> Tambah SPP Manual
        </b-button>
        <b-button variant="light" @click="seen = !seen" v-if="showTable" class="mr-1 text-primary">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </b-col>
    </b-row>
    <!-- v-if="showTable" -->
    <b-row>
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
            <template #cell(total_amount)="data">
              {{ Number(data.item.total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
            <template #cell(action)="data">
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{
                  name: 'detail-manual-invoice',
                  params: { invoiceId: data.item.id },
                }"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
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
    <!-- <b-row v-else>
      <b-col>
        <b-card>
          <h5 class="text-center">
            Data tidak ditemukan
          </h5>
        </b-card>
      </b-col>
    </b-row> -->
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
  VBTooltip,
  // BModal,
  // BCardText,
  // BFormTextarea,
  // BAlert,
  // BFormRadio,
} from 'bootstrap-vue'

import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'

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
    // BModal,
    // FeatherIcon,
    // BCardText,
    // BFormTextarea,
    // BAlert,
    // BFormRadio,
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
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'invoice_id', label: 'Id Invoice', sortable: true },
        { key: 'invoice_number', label: 'No. Invoice', sortable: true },
        { key: 'application_name', label: 'Aplikasi', sortable: true },
        { key: 'client_name', label: 'Client', sortable: true },
        { key: 'total_amount', label: 'Total Invoice', sortable: true },
        { key: 'submission_status', label: 'Status' },
        { key: 'action', label: 'Aksi' },
      ],
      items: [],
      itemss: [
        { application_name: 'Test Aplikasi', ministerial_decree_number: 'Test Client', total_amount: 'Rp. 12.000.000.000', submission_status: 'PAID' },
      ],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,

      // Tabel Detail Posisi per User
      detailUser: {},
      showDetailContent: false,
      fieldsDetail: [
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'official_name', label: 'Nama Resmi', sortable: true },
        { key: 'appointment_letter_number', label: 'No. SK', sortable: true },
        { key: 'start_date', label: 'Tgl. Mulai', sortable: true },
        { key: 'end_date', label: 'Tgl. Selesai', sortable: true },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: false,
      guidv4: uuid.v4(),
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
    async showDelete(idUser, NamaUser) {
      this.selectedIDUser = idUser
      this.title = {
        delete: `Apakah anda ingin menghapus user ${NamaUser}?`,
      }
      this.$bvModal.show('modalDelete')
    },
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    convSexCode(code) {
      if (code === ('M' || 'm')) {
        return 'laki-laki'
      }
      return 'perempuan'
    },
    async detail() {
      // this.getDetailUserSuccessed = false
      // this.showDetailUser = true
      this.$bvModal.show('modalDetail')
      // API REQUEST
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(currentPage, perPage) {
      const params = {}

      if (this.filter) {
        params.search = this.filter
      }

      if (currentPage) {
        params.page = currentPage
      }

      if (perPage) {
        params.length = perPage
      }

      params.request_id = this.guidv4
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')

      return params
    },

    // async getDataTable() {
    //   this.showTable = true
    //   this.isBusy = true

    //   const param = this.getRequestParams(
    //     this.currentPage,
    //     this.perPage,
    //   )

    //   await axios({
    //     url: URLServices.manual_invoice.index,
    //     method: 'get',
    //     params: param,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then(result => {
    //       if (result.data.data) {
    //         this.items = result.data.data
    //         this.totalRows = this.items.recordsTotal
    //         this.showTable = result.data.recordsTotal > 0
    //       } else {
    //         this.items = []
    //         this.totalRows = 0
    //         this.showTable = false
    //       }
    //       this.isBusy = false
    //     })
    //     .catch(error => {
    //       this.showTable = false
    //       this.isBusy = false
    //       const errorMessage = `Gagal memuat data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
    //       CustomNotification.notif('error', errorMessage)
    //       if (error.response.status && error.response.status === 401) {
    //         localStorage.removeItem('accessToken')
    //         localStorage.removeItem('userData')
    //         this.$router.go({ name: 'session-time-out' })
    //       }
    //     })
    //   // const param = this.getRequestParams(
    //   //   this.filter,
    //   //   this.currentPage,
    //   //   this.perPage,
    //   // )
    //   // API REQUEST
    //   // Init
    //   // this.items = [
    //   //   {
    //   //     field1: '1',
    //   //     field2: 'APP01',
    //   //     field3: 'KM01',
    //   //     field4: 'Rp. 100.000.000',
    //   //     field5: 'Menunggu Persetujuan',
    //   //     action: '1',
    //   //   },
    //   //   {
    //   //     field1: '2',
    //   //     field2: 'APP02',
    //   //     field3: 'KM02',
    //   //     field4: 'Rp. 200.000.000',
    //   //     field5: 'Setuju',
    //   //     action: '1',
    //   //   },
    //   //   {
    //   //     field1: '3',
    //   //     field2: 'APP03',
    //   //     field3: 'KM04',
    //   //     field4: 'Rp. 300.000.000',
    //   //     field5: 'Setuju',
    //   //     action: '1',
    //   //   },
    //   // ]
    //   this.isBusy = false
    // },

    getDataTable() {
      this.showTable = true
      this.isBusy = true

      if (this.filter !== this.activeFilter) {
        this.currentPage = 1
        this.activeFilter = this.filter
      }

      const param = this.getRequestParams(
        this.currentPage,
        this.perPage,
      )

      axios({
        url: URLServices.manual_invoice.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, totalRecords } = response.data
          this.items = data
          this.totalRows = totalRecords
          this.isBusy = false
        })
        .catch(error => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = 'Gagal memperbaharui data. Mohon coba kembali'
          CustomNotification.notif('warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
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
