<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="light" :to="{ name: 'add-invoice-deposit' }" class="mr-1 text-primary">
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen; filter = ''; getDataTable" v-if="showTable" class="mr-1 text-primary">
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
                <b-spinner class="align-middle"></b-spinner>
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #cell(no)="data">
              {{ perPage * (currentPage - 1) + data.index + 1 }}
            </template>
            <template #cell(id)="data">
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.id)"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
            </template>
            <template #cell(decision_letter_publish_date)="data">
              {{ convDate(data.item.decision_letter_publish_date) }}
            </template>
            <template #cell(original_invoice_total_amount)="data">
              {{ Number(data.item.original_invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
            </template>
            <template #cell(revised_invoice_total_amount)="data">
              {{ Number(data.item.revised_invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
            </template>
            <template #cell(deposit_amount)="data">
              {{ Number(data.item.deposit_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
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

    <!-- Modal -->
    <b-modal
      id="modalDetail"
      ref="modal"
      size="lg"
      :title="'Detail deposit aplikasi: ' + title.detail"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <div class="p-1 text-center" v-show="!getDetailUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>
      <div v-show="getDetailUserSuccessed">
        <!-- <b-card-text>
          <h5 class="text-primary mt-2">Detail</h5>
        </b-card-text> -->
        <b-form-group label="Aplikasi">
          <label class="form-control" readonly>{{ detailUser.application_name }}</label>
        </b-form-group>
        <b-form-group label="File Surat Permohonan" >
          <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-info" style="position: relative;" @click="onClick()"> Download File </button>
        </b-form-group>
        <b-form-group label="Nomor SPP">
          <label class="form-control" readonly>{{ detailUser.invoice_number }}</label>
        </b-form-group>
        <b-form-group label="Nilai SPP">
          <label class="form-control" readonly>{{ Number(detailUser.original_invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}</label>
        </b-form-group>
        <b-form-group label="Tanggal Bayar">
          <label class="form-control" readonly>{{ convDate(detailUser.payment_date) }}</label>
        </b-form-group>
        <b-form-group label="BANK">
          <label class="form-control" readonly>{{ detailUser.payment_bank }}</label>
        </b-form-group>
        <b-form-group label="Tanggal Surat Keputusan">
          <label class="form-control" readonly>{{ convDate(detailUser.decision_letter_publish_date) }}</label>
        </b-form-group>
        <b-form-group label="Nomor Surat Keputusan">
          <label class="form-control" readonly>{{ detailUser.decision_letter_number }}</label>
        </b-form-group>
        <b-form-group label="Nilai Revisi SPP">
          <label class="form-control" readonly>{{ Number(detailUser.revised_invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}</label>
        </b-form-group>
        <b-form-group label="Lebih Bayar">
          <label class="form-control" readonly>{{ Number(detailUser.deposit_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}</label>
        </b-form-group>
        <b-form-group label="Catatan Keputusan" label-size="auto">
        <textarea class="mb-2 mb-lg-0 form-control" v-model="detailUser.decision_notes" readonly></textarea>
        </b-form-group>
      </div>
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
            <feather-icon icon="InfoIcon"></feather-icon> User yang telah
            dihapus tidak dapat dikembalikan. Klik tombol Hapus User untuk
            melanjutkan
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
  // BBadge,
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
  // BCardText,
  BFormTextarea,
  BAlert,
} from 'bootstrap-vue'

import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    // BBadge,
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
    // BCardText,
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
      idDepositDownload: '',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'decision_letter_number', label: 'Nomor Surat Keputusan' },
        { key: 'decision_letter_publish_date', label: 'Tanggal Surat' },
        { key: 'client_id', label: 'Id Pelanggan' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'bank', label: 'Bank' },
        { key: 'invoice_number', label: 'Nomor Invoice' },
        { key: 'original_invoice_total_amount', label: 'Nilai Awal Invoice' },
        { key: 'revised_invoice_total_amount', label: 'Nilai Revisi Invoice' },
        { key: 'deposit_amount', label: 'Nilai Deposit' },
        { key: 'id', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      // showTable: true,
      showTable: false,

      // Tabel Detail Posisi per User
      detailUser: {},
      showDetailContent: false,
      fieldsDetail: [
        { key: 'application_name', label: 'Aplikasi' },
        { key: 'ministerial_decree_number', label: 'Keputusan Menteri' },
        { key: 'invoice_number', label: 'Nomor SPP' },
        { key: 'original_invoice_total_amount', label: 'Nilai SPP' },
        { key: 'payment_date', label: 'Tanggal Bayar' },
        { key: 'payment_bank', label: 'Bank' },
        { key: 'decision_letter_publish_date', label: 'Tanggal Surat Keputusan' },
        { key: 'decision_letter_number', label: 'Nomor Surat Keputusan' },
        { key: 'revised_invoice_total_amount', label: 'Nilai Revisi SPP' },
        { key: 'deposit_amount', label: 'Lebih Bayar / Deposit' },
        { key: 'decision_notes', label: 'Catatan Keputusan' },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: true,
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
    onClick() {
      axios({
        url: URLServices.invoiceDeposit.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.idDepositDownload,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.data.file_base64
          console.log('Cintaku', fileURL)
          console.log('Bre tampan', result)
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    async detail(idUser) {
      this.getDetailUserSuccessed = false
      this.showDetailUser = false
      this.$bvModal.show('modalDetail')
      await axios({
        url: URLServices.invoiceDeposit.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: idUser,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.detailUser = result.data.data
          this.idDepositDownload = this.detailUser.id
          this.getDetailUserSuccessed = true
          this.showDetailUser = true
          this.title = {
            detail: `${this.detailUser.application_name}`,
          }
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
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

      params.request_id = uuid.v4()
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')

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
        url: URLServices.invoiceDeposit.index,
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
          this.isBusy = false
        })
        .catch(() => {
          this.showTable = true
          // this.showTable = false
					const responseMessage = `Gagal memperbaharui data. Mohon coba kembali`
					CustomNotification.notif('danger', 'Warning', responseMessage)
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
    resetModalDetail() {
      this.userData = {}
      this.getDetailUserSuccessed = false
      this.title = {
        detail: 'Detail data deposit ...',
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
