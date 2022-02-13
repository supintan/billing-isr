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
        <b-button variant="light" @click="seen = !seen; filter = ''; getDataTable" v-if="showTable" class="mr-1 text-primary">
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
                  @click="onReset"
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
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #cell(no)="data">
              {{ perPage * (currentPage - 1) + data.index + 1 }}
            </template>
            <template #cell(total_amount)="data">
              {{ Number(data.item.total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
            <template #cell(publish_date)="data">
              {{ convertDate(data.item.publish_date) }}
            </template>
            <template #cell(due_date)="data">
              {{ convertDate(data.item.due_date) }}
            </template>
            <template #cell(action)="data">
              <!-- <div style="width: 200px"> -->
                <b-button
                  v-b-tooltip.hover.top="'Detail'"
                  variant="light"
                  btn-sm
                  class="btn-sm text-primary"
                  :to="{
                    name: 'spp-detail',
                    params: { invoiceId: data.item.id },
                  }"
                >
                  <feather-icon
                    icon="ZoomInIcon"
                    size="16"
                  />
                </b-button>
              <!-- </div> -->
                &nbsp;
                <b-button
                  v-b-tooltip.hover.top="'Tampilkan Preview'"
                  variant="primary"
                  btn-sm
                  class="btn-sm text-light"
                  @click="onClick(data.item.id)"
                >
                  <feather-icon icon="MonitorIcon" size="16" />
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

    <b-modal
        id="modalPreview"
        size="xl"
        ref="modal"
        modal-class="modal-primary"
        ok-title="Tutup"
        ok-only
      >
        <div>
          <b-overlay>
            <b-card-text>
              Berikut ini adalah preview SPP
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
  VBTooltip,
  BCardText,
  BOverlay,
  BEmbed,
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
    BCardText,
    BOverlay,
    BEmbed,
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
        { key: 'client_id', label: 'Id Pelanggan' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'id', label: 'Id Invoice' },
        { key: 'number', label: 'No. Invoice' },
        { key: 'application_name', label: 'No. RR' },
        { key: 'year', label: 'Periode Akhir' },
        { key: 'due_date', label: 'Tgl. Jatuh Tempo' },
        { key: 'publish_date', label: 'Tgl. Terbit' },
        { key: 'total_amount', label: 'Nilai Invoice' },
        { key: 'invoice_type', label: 'Tipe Invoice' },
        { key: 'invoice_status', label: 'Status' },
        { key: 'invoice_status_paid', label: 'Status Pembayaran SPP' },
        { key: 'action', label: 'Aksi', tdClass: 'Td-Action-3' },
      ],
      itemss: [
        { no: 1, client_name: 'TELKOMSEL TEST', application_name: 'APP007', billing_period: '-', due_date: '25-11-2021',  amount_spp: 'Rp. 70.000.000' }
      ],
      items: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      guidv4: uuid.v4(),

      // Delete Modal
      titleDelete: null,
      pdfFile: null,
      showFilePDF: false,
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
      if (date) return DateConvertion.setValue(date).getFullDate()
      return '-'
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
        url: URLServices.invoiceManagement.index,
        method: 'get',
        params: param,
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

    async onClick(idInvoice) {
      this.pdfFile = null
      this.$bvModal.show('modalPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.invoiceManagement.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: idInvoice,
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
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('danger', 'Gagal menampilkan preview', errorMessage)
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
    onReset() {
      this.filter = ''
      this.getDataTable()
    },
    onFiltered() {
      // this.totalRows = filteredItems.length
      // this.currentPage = 1
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
