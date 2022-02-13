<template>
  <div>
    <h4 class="mb-5 mt-3 text-primary">
      Tabel H2H - IPFR
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
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #cell(tagihan)="data">
              {{ convertNumber(data.item.tagihan) }}
            </template>
            <template #cell(terbayar)="data">
              {{ convertNumber(data.item.terbayar) }}
            </template>
            <template #cell(tanggal_backup)="data">
              {{ convertDate(data.item.tanggal_backup) }}
            </template>
            <template #cell(bi_begin)="data">
              {{ convertDate(data.item.bi_begin) }}
            </template>
            <template #cell(bi_end)="data">
              {{ convertDate(data.item.bi_end) }}
            </template>
            <template #cell(bi_money_received)="data">
              {{ convertDate(data.item.bi_money_received) }}
            </template>
            <template #cell(bi_create_date)="data">
              {{ convertDate(data.item.bi_create_date) }}
            </template>
            <template #cell(tanggal_backup)="data">
              {{ convertDate(data.item.tanggal_backup) }}
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
  name: 'H2hIpfr',
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
        { key: 'no', label: 'No. SPP' },
        { key: 'bi_id_reminder_orig', label: 'BI ID Reminder Orig' },
        { key: 'no_client', label: 'No. Klien' },
        { key: 'no_aplikasi', label: 'No. Aplikasi' },
        { key: 'no_rr', label: 'No. RR' },
        { key: 'status', label: 'Status' },
        { key: 'nama_perusahaan', label: 'Nama Perusahaan' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'tagihan', label: 'Tagihan' },
        { key: 'terbayar', label: 'Terbayar' },
        { key: 'trans_h2h', label: 'Trans H2h' },
        { key: 'trans_h2h', label: 'Trans H2h' },
        { key: 'bi_begin', label: 'Bi Begin' },
        { key: 'bi_end', label: 'Bi End' },
        { key: 'bi_money_received', label: 'Bi Money Received' },
        { key: 'status', label: 'Status' },
        { key: 'kategori_spp', label: 'Kategori Spp' },
        { key: 'status_izin', label: 'Status Izin' },
        { key: 'service_name', label: 'Service Name' },
        { key: 'subservice_name', label: 'Subservice Name' },
        { key: 'payment_description', label: 'Payment Description' },
        { key: 'bi_create_date', label: 'Bi Create Date' },
        { key: 'bi_cancel', label: 'Bi Cancel' },
        { key: 'archieved_date', label: 'Archived Date' },
        { key: 'bi_tipe', label: 'Bi Type' },
        { key: 'status_remainder', label: 'Status Remainder' },
        { key: 'bi_manual', label: 'Bi Manual' },
        { key: 'bi_comment', label: 'Bi Comment' },
        { key: 'city', label: 'City' },
        { key: 'district', label: 'District' },
        { key: 'province', label: 'Province' },
        { key: 'upt', label: 'Upt' },
        { key: 'tanggal_backup', label: 'Tanggal Backup' },
      ],

      items: [
        {
          no: '1490339',
          bi_id_reminder_orig: '',
          no_client: 8071,
          no_aplikasi: '00233092013',
          no_rr: '0126760',
          status: 'Granted',
          nama_perusahaan: 'TELEKOMUNIKASI SELULAR, PT.',
          alamat: 'GEDUNG TELKOM LANDMARK TOWER MENARA 1 LT.1 ? 20 JL. JENDERAL GATOT SUBROTO KAV. 52, KUNINGAN BARAT',
          tagihan: 739841449652,
          terbayar: 739841449652,
          trans_h2h: 'Yes',
          bi_begin: '2020-09-15',
          bi_end: '2020-12-14',
          bi_money_received: '2020-09-08',
          status_pembayaran: 'paid',
          kategori_spp: 'Pokok',
          status_izin: 'Perpanjangan',
          service_name: 'Land Mobile (public)',
          subservice_name: 'GSM/DCS Band',
          payment_description: 'EBS-SIGMA',
          bi_create_date: '2020-07-15',
          bi_cancel: '',
          archieved_date: '',
          bi_tipe: 8,
          status_remainder: '',
          bi_manual: '',
          bi_comment: '',
          city: 'MAMPANG PRAPATAN',
          district: 'KOTA JAKARTA SELATAN',
          province: 'DKI JAKARTA',
          upt: 'BALMON KELAS I DKI JAKARTA',
          tanggal_backup: '2020-12-31',
        },
      ],
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

      return params
    },

    async getDataTable() {
      this.showTable = true
      this.isBusy = true

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
