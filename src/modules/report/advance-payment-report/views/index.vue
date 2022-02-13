<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <!-- <b-button
          v-if="$can('store', 'template')"
          :to="{
            name: 'add-template',
            params: {
              detailTemplateId: '0',
            },
          }"
          variant="light"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button> -->
        <b-button v-if="showTable" variant="light" @click="seen = !seen" class="mr-1 text-primary">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="mr-1 text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </b-col>
    </b-row>
    <!-- v-if="showTable" -->
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
            class="position-relative shadow mb-0"
            :busy="isBusy"
            :per-page="perPage"
            :items="items"
            :fields="fields"
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
            <template #cell(due_date)="data">
              {{ convertDate(data.item.due_date) }}
            </template>
            <template #cell(total_amount)="data">
              {{ convertNumber(data.item.total_amount) }}
            </template>
            <template #cell(payment)="row">
              <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}}
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
            </template>
            <template #row-details="row">
              <b-card>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>bank:</b></b-col>
                  <b-col>{{ row.item.payment.bank ? row.item.payment.bank : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>created_at:</b></b-col>
                  <b-col>{{ row.item.payment.created_at ? row.item.payment.created_at : '-' }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>description:</b></b-col>
                  <b-col>{{ row.item.payment.description ? row.item.payment.description : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>created_by:</b></b-col>
                  <b-col>{{ row.item.payment.created_by ? row.item.payment.created_by : '-' }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>invoice_id:</b></b-col>
                  <b-col>{{ row.item.payment.invoice_id ? row.item.payment.invoice_id : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>invoice_amount:</b></b-col>
                  <b-col>{{ Number(row.item.payment.invoice_amount ? row.item.payment.invoice_amount : 0).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>method:</b></b-col>
                  <b-col>{{ row.item.payment.method ? row.item.payment.method : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>payment_amount:</b></b-col>
                  <b-col>{{ Number(row.item.payment.payment_amount ? row.item.payment.payment_amount : 0).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>is_active:</b></b-col>
                  <b-col>{{ row.item.payment.is_active ? row.item.payment.is_active : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>payment_date:</b></b-col>
                  <b-col>{{ row.item.payment.payment_date ? row.item.payment.payment_date : '-' }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>is_settled:</b></b-col>
                  <b-col>{{ row.item.payment.is_settled ? row.item.payment.is_settled : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>is_deposit:</b></b-col>
                  <b-col>{{ row.item.payment.is_deposit ? row.item.payment.is_deposit : '-' }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>updated_at:</b></b-col>
                  <b-col>{{ row.item.payment.updated_at ? row.item.payment.updated_at : '-' }}</b-col>
                  <b-col sm="3" class="text-sm-right"><b>updated_by:</b></b-col>
                  <b-col>{{ row.item.payment.updated_by ? row.item.payment.updated_by : '-' }}</b-col>
                </b-row>

                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
              </b-card>
            </template>
            <!-- <template #cell(payment)>
              <div v-for="(item, index) in payments" :key="index">
              </div>
                <b-button
                  v-b-tooltip.hover.top="'Lihat Detail'"
                  variant="light"
                  btn-sm
                  class="btn-sm text-primary"
                  @click="detail(item)"
                >
                  <feather-icon icon="ZoomInIcon" size="16" />
                </b-button>
            </template> -->
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

    <!-- Modal Detail -->
    <b-modal
      id="modalDetail"
      ref="modal"
      size="lg"
      :title="title.detail"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
    >

      <!-- <div class="p-1 text-center" v-show="!getDetailUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div> -->
      <!-- v-show="getDetailUserSuccessed" -->
      <div>
        <b-row>
          <b-col lg="6">
            <b-form-group label="Bank">
              <label for="bank"></label>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Nilai SPP">
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="titleDelete"
      modal-class="modal-danger"
      ok-title="Hapus"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteTemplate"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus template ini"
          label-for="deleteReason"
          invalid-feedback="Mohon isikan alasan anda"
          :state="nameState"
        >
          <b-form-textarea
            id="deleteReason"
            v-model="deleteReason"
            :state="nameState"
            required
            maxlength="100"
            minlength="10"
            placeholder="Maksimal 100 karakter"
          />
        </b-form-group>
        <b-alert variant="warning" show class="p-1 collapse">
          <small>
            <feather-icon icon="InfoIcon" /> Template yang telah dihapus tidak
            dapat dikembalikan. Klik tombol hapus untuk melanjutkan
          </small>
        </b-alert>
      </form>
    </b-modal>
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
  BModal,
  BFormTextarea,
  BAlert,
} from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
// import ToastificationContent from 'vue-toastification'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import DateConvertion from '@/helpers/date-convertion'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { uuid } from 'vue-uuid'

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
    BModal,
    BFormTextarea,
    BAlert,
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
        { key: 'client_id', label: 'Id Pelanggan' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'application_name', label: 'No. Aplikasi' },
        { key: 'invoice_number', label: 'Nomor Invoice' },
        { key: 'due_date', label: 'Tgl. Jatuh Tempo' },
        { key: 'total_amount', label: 'Total', tdClass: 'text-right' },
        { key: 'total_amount_in_words', label: 'Total(Terbilang)' },
        { key: 'payment', label: 'Pembayaran',  },
      ],
      itemss: [
        { no: 1, client_name: 'test laporan', ministerial_decree_number: '007', invoice_number: '20077', upfront_fee_amount: '10000000',  payment_date: '16-11-2021', due_date: '16-11-2021'}
      ],
      items: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      guidv4: uuid.v4(),

      // Delete Modal
      titleDelete: null,
      isPaymentId: '',
      payments: [],
      bank: '',
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
      if (number) return InputFormat.NumberFormat(number)
      return '-'
    },
    convertDate(date) {
      if (date) return DateConvertion.setValue(date).getFullDate()
      return '-'
    },
    detail(paymentId) {
      this.isPaymentId = paymentId
      console.log('a,', this.isPaymentId)
      this.title = {
        detail: 'Detail Data Pembayaran',
      }
      this.$bvModal.show('modalDetail')
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

      params.request_id = this.guidv4
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
        url: URLServices.upfront_fee_payment_report.index,
        method: 'get',
        params: param,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.items = result.data.data
            const paymentValue = {}
            const bank = {}
            Object.keys(this.items).forEach(key => {
              paymentValue[key] = this.items[key].payment
              bank[key] = this.items[key].payment.bank
            })
            this.payments = paymentValue
            // console.log(this.payments)
            // this.payments = result.data.data.payment
            // this.bank = this.payments.bank
            // console.log(this.payments)
            // console.log(this.bank)
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
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.selectedTemplateId,
          notes: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

<style>
  .text-center {
    text-align: center !important;
  }
</style>