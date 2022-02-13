<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="light" @click="seen = !seen" v-if="showTable" class="text-primary mr-1">
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
          <b-card class="card bg-white m-0 p-1 col-12 my-3">
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
            <template #cell(invoice_amount)="data">
              {{ convNumber(data.item.invoice_amount) }}
            </template>
            <template #cell(invoice_due_date)="data">
              {{ convDate(data.item.invoice_due_date) }}
            </template>
            <template #cell(last_download)="data">
              <div v-if="data.item.last_downloaded_at">
                <feather-icon icon="UserIcon" size="12" /> {{ data.item.last_downloaded_by }}<br/>
                <feather-icon icon="ClockIcon" size="12" /> {{ convDateTime(data.item.last_downloaded_at) }}
              </div>
            </template>
            <template #cell(id)="data">
              <b-button
                v-b-modal.modalDetail
                variant="light"
                btn-sm
                class="btn-sm text-primary mr-1"
                @click="detail(data.item.invoice_id)"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <!-- @click="download(data.item.invoice_id)" -->
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="PreviewPDF(data.item.invoice_id)"
              >
                <feather-icon icon="PrinterIcon" size="16" />
              </b-button>
              <!--
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.action)"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              <b-button
                variant="warning"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.action)"
              >
                <feather-icon icon="TrashIcon" size="16" />
              </b-button>
              -->
            </template>
          </b-table>
          <b-modal
            id="modalPreview"
            size="xl"
            ref="modal"
            title="Preview"
            modal-class="modal-primary"
            ok-title="Tutup"
            ok-only
          >
            <!-- v-if="pdfFile" -->
            <div v-if="ShowLoadingFilePDF">
              <b-overlay :show="ShowLoadingFilePDF" />
            </div>
            <div v-else>
              <div v-if="FilePDF">
                <div class="mb-2 text-right">
                  <b-button variant="light" @click="download(true)" class="text-primary">
                    <feather-icon icon="DownloadIcon" /> Download
                  </b-button>
                </div>
                <b-overlay :show="LoadingPreview">
                  <b-embed
                    :data="'data:application/pdf;base64,' + FilePDF"
                    file
                    type="object"
                    width="100%"
                    height="450px;"
                  />
                </b-overlay>
              </div>
              <div v-else class="text-center py-3">
                Data tidak ditemukan
              </div>
            </div>
          </b-modal>
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
              class="ml-2"
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

    <!-- Modal -->
    <b-modal
      id="modalDetail"
      ref="modal"
      size="lg"
      title="Detail Pencetakan SPP"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <b-form-group label="Aplikasi">
        <label class="form-control">{{ detailInvoice.application }}</label>
      </b-form-group>
      <b-form-group label="Client">
        <label class="form-control">{{ detailInvoice.client }}</label>
      </b-form-group>
      <b-form-group label="SPP">
        <label class="form-control">{{ detailInvoice.spp }}</label>
      </b-form-group>
      <b-form-group label="Jatuh Tempo">
        <label class="form-control">{{ convDate(detailInvoice.jatuh_tempo) }}</label>
      </b-form-group>
      <b-form-group label="Total">
        <label class="form-control">{{ convNumber(detailInvoice.total) }}</label>
      </b-form-group>
    </b-modal>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="this.title.delete"
      modal-class="modal-primary"
      ok-title="Hapus User"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteUser"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus user ini"
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
          ></b-form-textarea>
        </b-form-group>
        <b-alert variant="warning" show class="p-1">
          <small>
            <feather-icon icon="InfoIcon"></feather-icon> User yang telah dihapus tidak dapat dikembalikan. Klik tombol Hapus User untuk melanjutkan
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
} from 'bootstrap-vue'

import { uuid } from 'vue-uuid'
import moment from 'moment'
import axios from 'axios'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import DateConvertion from '@/helpers/date-convertion'
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
    BModal,
  },
  data() {
    return {
      detailInvoice: [],
      application: '',
      km: '',
      client: '',
      spp: '',
      jatuh_tempo: '',
      total: '',
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
        { key: 'application_name', label: 'Aplikasi' },
        { key: 'invoice_id', label: 'Id Invoice' },
        { key: 'invoice_number', label: 'No. Invoice' },
        { key: 'invoice_amount', label: 'Total Invoice', tdClass: 'text-right' },
        { key: 'invoice_due_date', label: 'Tgl. Jatuh Tempo' },
        // { key: 'request_type', label: 'Tipe Invoice' },
        // { key: 'invoice_status', label: 'Status' },
        { key: 'last_download', label: 'Terakhir Download' },
        { key: 'id', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      guid_v4: uuid.v4(),
      nameState: null,
      showTable: false,
      FilePDF: null,
      ShowLoadingFilePDF: true,
      selectedIDInvoice: null,
      LoadingPreview: true,
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
    PreviewPDF(id) {
      this.$bvModal.show('modalPreview')
      this.ShowLoadingFilePDF = true
      this.selectedIDInvoice = id
      this.download(false)
    },
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
    convDateTime(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMM YYYY H:m:s')
      }
      return '-'
    },
    convNumber(number) {
      if (number) {
        return InputFormat.NumberFormat(number)
      }
      return '-'
    },
    async detail(invoiceId) {
      this.$bvModal.show('modalDetail')
      const today = DateConvertion.getTimeNow()
      await axios({
        url: URLServices.print_invoice.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          invoice_id: invoiceId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const invoiceData = result.data.data[0]
          if (invoiceData) {
            this.detailInvoice.invoice_id = invoiceData.invoice_id
            this.detailInvoice.application = invoiceData.application_name
            this.detailInvoice.km = invoiceData.ministerial_decree_number
            this.detailInvoice.client = invoiceData.client_name
            this.detailInvoice.spp = invoiceData.invoice_number
            this.detailInvoice.jatuh_tempo = invoiceData.invoice_due_date
            this.detailInvoice.total = invoiceData.invoice_amount
            this.title = {
              detail: `Detail SPP '${invoiceData.invoice_number}'`,
            }
          } else {
            this.detailInvoice.invoice_id = null
            this.detailInvoice.application = null
            this.detailInvoice.km = null
            this.detailInvoice.client = null
            this.detailInvoice.spp = null
            this.detailInvoice.jatuh_tempo = null
            this.detailInvoice.total = null
            this.title = ''
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan data Invoice', errorMessage)
        })
    },
    async download(OutputFile) {
      const today = DateConvertion.getTimeNow()
      
      if (OutputFile) this.LoadingPreview = true

      await axios({
        url: URLServices.print_invoice.download,
        method: 'post',
        data: {
          request_id: this.guid_v4,
          request_date_time: today,
          invoice_id: this.selectedIDInvoice,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (OutputFile) {
            const fileURL = result.data.file_base64
            const fileLink = document.createElement('a')
            const convert = 'data:application/pdf;base64, '
            fileLink.href = `${convert}${fileURL}`
            fileLink.setAttribute('download', result.data.file_name)
            document.body.appendChild(fileLink)
            fileLink.click()
          } else {
            this.FilePDF = result.data.file_base64
          }
          this.ShowLoadingFilePDF = false
          this.LoadingPreview = false
        })
        .catch(error => {
          this.ShowLoadingFilePDF = false
          this.LoadingPreview = false
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mengunduh SPP', errorMessage)
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
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

      params.request_id = this.guid_v4
      params.request_date_time = DateConvertion.getTimeNow()

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
        this.perPage,
      )

      axios({
        url: URLServices.print_invoice.index,
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
        .catch(() => {
          this.showTable = false
          CustomNotification.notif('danger', 'Gagal Memperbaharui tabel', 'Mohon coba kembali')
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
