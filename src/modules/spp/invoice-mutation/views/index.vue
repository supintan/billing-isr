<template>
  <div>
    <b-card class="shadow mb-4">
      <b-row>
        <b-form ref="form">
          <b-overlay :show="showPosisi" rounded="sm">
            <b-row class="mb-4">
              <b-col lg="10" sm="12">
                <b-form-group
                  label="Tanggal Awal"
                  label-cols="4"
                  label-for="tanggal"
                >
                  <b-form-datepicker
                    id="start_date"
                    v-model="startDate"
                    locale="id"
                    required
                  />
                </b-form-group>
              </b-col>
              &nbsp;
              <b-col lg="10" sm="12">
                <b-form-group label="Tanggal Akhir" label-cols="4">
                  <b-form-datepicker
                    id="end_date"
                    v-model="endDate"
                    locale="id"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col lg="10" sm="12">
                <b-form-group
                  label-cols="4"
                  label="Pelanggan"
                  label-for="item-pelanggan"
                >
                  <v-select
                    id="item-pelanggan"
                    v-model="selectedClient"
                    label="spectra_ad_company"
                    :options="client"
                    @input="selectedAppInput"
                  >
                  </v-select>
                </b-form-group>
              </b-col>
              &nbsp;
              <b-col lg="10" sm="12">
                <div class="text-right">
                  <b-button
                    variant="primary"
                    @click="getDataTable()"
                    :disabled="!statusTampilkan"
                  >
                    <feather-icon icon="Icon" /> Tampilkan Mutasi
                  </b-button>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="12">
                <div class="text-right">
                  <b-button
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    variant="outline-danger"
                    class="mt-0 mt-md-2"
                    @click="removeItem(index)"
                    v-if="positions.length !== 1"
                  >
                    <feather-icon icon="TrashIcon" class="mr-25" />
                    <span>Hapus</span>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-overlay>
        </b-form>
      </b-row>
    </b-card>
    <b-row class="my-2" v-if="showTable">
      <b-col class="text-right">
        <b-button
          variant="primary"
          btn-sm
          class="btn-sm"
          @click="onClick()"
        >
          <feather-icon icon="DownloadIcon" /> Download Excel
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="showTable">
      <b-col>
        <div class="d-flex justify-content-between flex-wrap" v-if="seen">
          <!-- filter -->
          <b-card class="card shadow bg-white m-0 p-1 col-12 mb-2">
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
                  @click="
                    filter = ''
                    getDataTable()
                  "
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
            <template #cell(transaction_date)="data">
              {{ convDate(data.item.transaction_date) }}
            </template>
            <!-- <template #cell(total_amount)="data">
              {{ CurrencyFormat(data.item.total_amount) }}
            </template> -->
            <!-- <template #cell(payment_amount)="data">
              {{ CurrencyFormat(data.item.payment_amount) }}
            </template> -->
            <template #cell(total_amount)="data">
              {{ Number(data.item.total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
            <template #cell(payment_amount)="data">
              {{ Number(data.item.payment_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
            <template #cell(positions)="data">
              <b-badge
                v-for="(val, id) in data.item.positions"
                :key="id"
                variant="primary"
                class="mr-1"
                pill
              >
                {{ val.name }}
              </b-badge>
            </template>
            <template #cell(id)="data">
              <b-button
                variant="info"
                btn-sm
                class="btn-sm text-primary"
                @click="onClick(data.item.id)"
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
  BForm,
  BRow,
  BCol,
  BTable,
  BBadge,
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
  BOverlay,
} from 'bootstrap-vue'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import vSelect from 'vue-select'

export default {
  components: {
    BForm,
    BCard,
    BRow,
    BCol,
    BTable,
    BBadge,
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
    BOverlay,
    vSelect,
  },
  data() {
    return {
      positions: [
        {
          id: null,
          spectra_ad_company: '',
          start_date: null,
          end_date: null,
        },
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
      idGenerateXLS: '',
      total_amount: null,
      payment_amount: null,
      no: 1,
      showPosisi: false,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'transaction_date', label: 'Tanggal Transaksi', sortable: true },
        { key: 'description', label: 'Deskripsi' },
        { key: 'method', label: 'Metode Pembayaran' },
        { key: 'status', label: 'Status Invoice' },
        { key: 'total_amount', label: 'Nilai Invoice' },
        { key: 'payment_amount', label: 'Nilai Pembayaran' },
      ],
      items: [],
      selectedUser: [],
      selectedIDUser: null,
      selectedClient: null,
      selectedApp: null,
      client: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: true,
      // startDate: new Date(),
      // endDate: new Date(),
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    statusTampilkan() {
      return this.startDate && this.endDate
    },
  },
  created() {
    this.getClient()
    this.getDataTable()
    // this.getDataTableAwal()
  },
  methods: {
    CurrencyFormat(number) {
      return Number(number).toLocaleString('in-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 5,
      })
    },
    async showDelete(idUser, NamaUser) {
      this.selectedIDUser = idUser
      this.title = {
        delete: `Apakah anda ingin menghapus aturan denda ${NamaUser}?`,
      }
      this.$bvModal.show('modalDelete')
    },
    selectedAppInput(value) {
      this.selectedApp = value.id
      this.selectedClient = value.spectra_ad_company

      // this.getDataTable(this.selectedApp)
      return true
    },
    async getClient() {
      this.showPosisi = true
      this.showTable = false
      this.isBusy = false
      await axios({
        url: URLServices.client.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.client = result.data.data
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    repeateAgain() {
      this.positions.push({
        index: (this.nextTodoId += this.nextTodoId),
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.div[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.positions.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    onClick() {
      axios({
        url: URLServices.mutation.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.idGenerateXLS,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/vnd.ms-excel;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.filename)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus aturan denda '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParamsGenerate(filter, currentPage, perPage) {
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

      params.request_id = uuid.v4()
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      params.client_id = this.selectedClient
      params.start_date = this.startDate
      params.end_date = this.endDate

      return params
    },
    getRequestParams(filter, currentPage, perPage) {
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

      params.request_id = uuid.v4()
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      params.client_id = this.selectedApp
      params.start_date = this.startDate
      params.end_date = this.endDate
      return params
    },
    getDataTable() {
      this.showTable = true
      this.isBusy = true

      if (this.filter !== this.activeFilter) {
        this.currentPage = 1
        this.activeFilter = this.filter
      }

      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage
      )

      axios({
        url: URLServices.mutation.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.idGenerateXLS = data[0].generate_excel_id
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          this.showTable = false
          CustomNotification.notif(
            'warning',
            'Data tidak dapat ditemukan. Mohon coba kembali'
          )
        })
    },
    getDataTableAwal() {
      this.showTable = true
      this.isBusy = true
      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage
      )

      axios({
        url: URLServices.mutation.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.idGenerateXLS = data[0].generate_excel_id
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          // this.showTable = true
          // this.showTable = false
          // CustomNotification.notif('warning', 'Data tidak dapat ditemukan. Mohon coba kembali')
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
      // this.$root.$emit('bv::refresh::table', 'tableData')
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
      this.deleteReason = ''
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    // convDate(val) {
    //   return DateConvertion.setValue(val).getFullDate()
    // },
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
  },
}
</script>
<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
