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
        <!-- v-if="showTable" -->
        <b-button variant="primary" @click="download()" class="mr-1">
          <feather-icon icon="DownloadIcon" /> Download
        </b-button>
        <!-- v-if="showTable" -->
        <b-button variant="light" @click="seen = !seen" class="mr-1 text-primary">
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
        <div v-if="seen" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-4">
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
            <template #cell(upfront_fee_amount)="data">
              {{ convertNumber(data.item.upfront_fee_amount) }}
            </template>
            <!-- <template #cell(action)>
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{
                  name: 'operational-report-detail',
                }"
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
        { key: 'NO_SPP', label: 'No. SPP' },
        { key: 'NO_KLIEN', label: 'No. Klien' },
        { key: 'NO_APLIKASI', label: 'No. Aplikasi' },
        { key: 'NO_RR', label: 'No. RR' },
        { key: 'STATUS_SIMF', label: 'Status Simf' },
        { key: 'NAMA_PERUSAHAAN', label: 'Nama Perusahaan' },
        { key: 'ALAMAT', label: 'Alamat' },
        { key: 'TAGIHAN', label: 'Tagihan' },
        { key: 'TERBAYAR', label: 'Terbayar' },
        { key: 'TRANS_H2H', label: 'Trans H2H' },
        { key: 'BI_BEGIN', label: 'BI Begin' },
        { key: 'BI_END', label: 'BI End' },
        { key: 'BI_MONEY_RECEIVED', label: 'BI Money' },
        { key: 'POKOK', label: 'Kategori SPP' },
        { key: 'STATUS', label: 'Status' },
        { key: 'STATUS_IZIN', label: 'Status Izin' },
        { key: 'SERVICE_NAME', label: 'Service' },
        { key: 'SUBSERVICE_NAME', label: 'Sub Service' },
        { key: 'PAYMENT_DESCRIPTION', label: 'Payment Description' },
        { key: 'BI_CREATE_DATE', label: 'BI Create Date' },
        { key: 'BI_CANCEL', label: 'BI Cancel' },
        { key: 'ARCHIVED_DATE', label: 'Archived Date' },
        { key: 'BI_TYPE', label: 'BI Type' },
        { key: 'BI_ID_REMINDER_ORIG', label: 'BI Id Reminder Orig' },
        { key: 'STATUS_REMAINDER', label: 'Status Remainder' },
        { key: 'BI_MANUAL', label: 'BI Manual' },
        { key: 'BI_COMMENT', label: 'BI Comment' },
        { key: 'CITY', label: 'City' },
        { key: 'DISTRICT', label: 'District' },
        { key: 'PROVINCE', label: 'Province' },
        { key: 'UPT', label: 'UPT' },
        { key: 'TANGGAL_BACKUP', label: 'Tanggal Backup' },
        { key: 'TYPE', label: 'Type' },
        { key: 'BI_BEGIN_YEAR', label: 'BI Begin Year' },
        { key: 'TELAT_BAYAR', label: 'Telat Bayar' },
        { key: 'TOTAL_DURASI', label: 'Total Durasi' },
        { key: 'CUTOFF_AWAL', label: 'Cut Off Awal' },
        { key: 'CUTOFF_AKHIR', label: 'Cut Off Akhir' },
        { key: 'DURASI_SISA', label: 'Durasi Sisa' },
        { key: 'DURASI_PENGGUNAAN', label: 'Durasi Penggunaan' },
        { key: 'STATUS_SISA_DURASI', label: 'Status Sisa Durasi' },
        { key: 'CHECK_CREATE_DATE', label: 'Check Create Date' },
        { key: 'MONTH_OVERDUE', label: 'Telat Bulan' },
        { key: 'DENDA', label: 'Denda' },
        { key: 'PENDAPATAN_LO', label: 'Pendapatan LO' },
        // { key: 'action', label: 'Aksi' },
      ],
      itemss: [
        { no: 1, 
          no_spp: '0019SPP',
          no_klien: '0122KLIEN',
          no_aplikasi: '0121APP',
          no_rr: '0129RR',
          status_simf: 'Granted',
          nama_perusahaan: 'TELEKOMUNIKASI INDONESIA, PT TBK.',
          alamat: 'GRAHA MERAH PUTIH, JL. GATOT SUBROTO, KAV. 52',
          tagihan: '4415239',
          terbayar: '4415239',
          status: 'Paid',
          status_izin: 'Perpanjangan',
          service: 'Fixed Service',
          sub_service: 'PP',
          pendapatan_lo: '0',
          ppdm: '4,415,239',
        }
      ],
      items: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      guidv4: uuid.v4(),

      // Delete Modal
      titleDelete: null,
      paramYear: localStorage.getItem('yearMoneyReceived')
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
      params.year = this.paramYear

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
        url: URLServices.isr_operational_report.show,
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
    download() {
      axios({
        url: URLServices.isr_operational_report.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          year: this.paramYear,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          console.log(fileURL, 'logurl')
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
          const errorMessage = 'File berhasil didownload '
          CustomNotification.notif('success', 'Sukses !', errorMessage)
        })
        .catch(error => {
          const errorMessage = `File gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error !', errorMessage)
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
