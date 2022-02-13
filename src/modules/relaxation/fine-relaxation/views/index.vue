<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{ name: 'relaxation-fine-add' }"
          class="text-primary mr-1"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button
          v-if="showTable"
          variant="light"
          @click="
            seen = !seen
            filter = ''
            getDataTable()
          "
          class="text-primary mr-1"
        >
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
            <template #cell(regulation_publish_date)="data">
              {{ convDate(data.item.regulation_publish_date) }}
            </template>
            <template #cell(start_date)="data">
              {{ convDate(data.item.start_date) }}
            </template>
            <template #cell(end_date)="data">
              {{ convDate(data.item.end_date) }}
            </template>
            <template #cell(number_of_invoices_affected)="data">
              {{ convCurrency(data.item.number_of_invoices_affected) }}
            </template>
            <template #cell(id)="data">
              <div style="width: 150px">
                <b-button
                  v-b-tooltip.hover.top="'Detail'"
                  v-b-modal.modalDetail
                  variant="light"
                  btn-sm
                  class="btn-sm text-primary mr-1"
                  @click="detail(data.item.id)"
                >
                  <feather-icon icon="ZoomInIcon" size="16" />
                </b-button>
                <b-button
                  v-b-tooltip.hover.top="'Unduh'"
                  variant="light"
                  btn-sm
                  class="btn-sm text-primary"
                  @click="download(data.item.id)"
                >
                  <feather-icon icon="DownloadIcon" size="16" />
                </b-button>
              </div>
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
              class="ml-1"
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
      size="md"
      :title="title.detail"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <b-form-group label="No. Peraturan">
        <label class="form-control">{{ dataDetail.regulationName }}</label>
      </b-form-group>
      <b-form-group label="Tanggal Terbit">
        <label class="form-control">{{ convDate(dataDetail.pubDate) }}</label>
      </b-form-group>
      <b-form-group label="Tanggal Awal">
        <label class="form-control">{{ convDate(dataDetail.startDate) }}</label>
      </b-form-group>
      <b-form-group label="Tanggal Akhir">
        <label class="form-control">{{ convDate(dataDetail.endDate) }}</label>
      </b-form-group>
      <b-form-group label="Jumlah Periode(Hari)">
        <label class="form-control">{{ dataDetail.periodInDay }}</label>
      </b-form-group>
      <b-form-group label="Jumlah SPP">
        <label class="form-control">{{ dataDetail.numberSpp }}</label>
      </b-form-group>
    </b-modal>

    <!-- Modal -->
    <b-modal
      id="modalExtract"
      ref="modal"
      :title="this.title.delete"
      modal-class="modal-primary"
      ok-title="Ekstrak"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState"> </b-form-group>
      </form>
    </b-modal>

    <!-- Modal -->
    <b-modal
      id="modalUpload"
      ref="modal"
      :title="title.upload"
      modal-class="modal-primary"
      ok-title="Upload"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="uploadFileBTS"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="File BTS"
          class="mb-2"
          label-for="h-file-bts"
          label-cols="4"
        >
          <b-form-file
            v-model="fileUpdate"
            accept="data:application/vnd.ms-excel"
            placeholder="Pilih file yang akan diupload..."
            drop-placeholder="Drop file here..."
            @change="createBase64File"
          />
        </b-form-group>
      </form>
    </b-modal>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="title.delete"
      modal-class="modal-primary"
      ok-title="Hapus Data"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteFineReg"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus data ini"
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
            <feather-icon icon="InfoIcon"></feather-icon> Data yang telah
            dihapus tidak dapat dikembalikan. Klik tombol Hapus Data untuk
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
  BFormFile,
  VBTooltip,
} from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'
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
    BFormTextarea,
    BAlert,
    BFormFile,
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
      filter: '',
      filterOn: [],
      no: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'regulation_number', label: 'No. Peraturan', sortable: true },
        {
          key: 'regulation_publish_date',
          label: 'Tanggal Terbit',
          sortable: true,
        },
        { key: 'start_date', label: 'Tanggal Awal', sortable: true },
        { key: 'end_date', label: 'Tanggal Akhir', sortable: true },
        { key: 'number_of_invoices_affected', label: 'Jumlah Invoice' },
        { key: 'id', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      selectedIDBts: null,
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: true, // ubah saat pakai WS
      guid_v4: uuid.v4(),

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
      showDetailUser: true,
      fileUpdate: null,
      dataDetail: [],
      regulationName: '',
      pubDate: null,
      startDate: null,
      endDate: null,
      periodInDay: null,
      numberSpp: null,
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
    convDate(val) {
      if (val) {
        return DateConvertion.setValue(val).getFullDate()
      }
      return '-'
    },
    convCurrency(val) {
      if (val) {
        return InputFormat.NumberFormat(val)
      }
      return '-'
    },
    async showDelete(fineId) {
      this.selectedFineId = fineId
      this.title = {
        delete: 'Apakah anda ingin menghapus data ini?',
      }
      this.$bvModal.show('modalDelete')
    },
    async extract(idUser) {
      this.selectedIDUser = idUser
      this.title = {
        delete: 'Apakah anda ingin ekstrak data ini?',
      }
      this.$bvModal.show('modalExtract')
    },
    async upload(btsId) {
      this.selectedIDBts = btsId
      this.title = {
        upload: `Apakah anda ingin upload file BTS dengan id: '${this.selectedIDBts}'`,
      }
      this.$bvModal.show('modalUpload')
    },
    createBase64File(e) {
      const file = e.target.files[0]
      console.log(e.target.files[0], 'ini files')
      console.log(file, 'ini file')
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const data = {}
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileUpdate = e.target.result
          console.log(this.fileUpdate)
        }

        reader.readAsDataURL(file)
      }

      data.id = this.selectedIDBts
      data.bts_file = this.fileUpdate
      data.request_id = this.guid_v4
      data.request_date_time = today

      return data
    },
    async uploadFileBTS() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.bts_registration.upload,
          method: 'post',
          data: Param,
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif(
                'success',
                'Berhasil upload file BTS',
                'Halaman akan diarahkan ke index'
              )
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal upload file BTS',
                result.data.response_message
              )
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Gagal upload file BTS',
              'Mohon coba beberapa saat kembali'
            )
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    async download(fineId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.fine_relaxation.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: fineId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mengunduh data regulasi',
            errorMessage
          )
        })
    },
    async detail(fineId) {
      this.$bvModal.show('modalDetail')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.fine_relaxation.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: fineId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const dataDenda = result.data.data[0]
          this.dataDetail.regulationName = dataDenda.regulation_number
          this.dataDetail.pubDate = dataDenda.regulation_publish_date
          this.dataDetail.startDate = dataDenda.start_date
          this.dataDetail.endDate = dataDenda.end_date
          this.dataDetail.periodInDay = dataDenda.relaxation_period_in_days
          this.dataDetail.numberSpp = dataDenda.number_of_invoices_affected
          this.title = {
            detail: `Detail Penghentian Denda Sementara '${dataDenda.regulation_number}'`,
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan data',
            errorMessage
          )
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(filter, currentPage, perPage) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
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
      params.request_date_time = today

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
        url: URLServices.fine_relaxation.index,
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
          CustomNotification.notif(
            'danger',
            'Gagal menampilkan data',
            'Mohon coba kembali'
          )
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
    onReset() {
      this.filter = ''
      this.getDataTable()
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
      this.dataDetail.regulationName = ''
      this.dataDetail.pubDate = null
      this.dataDetail.startDate = null
      this.dataDetail.endDate = null
      this.dataDetail.numberSpp = null
      this.title = {
        detail: 'Detail Penundaan Denda Sementara ...',
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteFineReg(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      axios({
        url: URLServices.fine_relaxation.destroy,
        data: {
          request_id: 'guid_v4',
          employee_id: this.selectedIDUser,
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          notes: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif(
              'success',
              'Berhasil menghapus data',
              'Tabel akan direfresh'
            )
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            CustomNotification.notif(
              'warning',
              'Gagal menghapus data',
              response.data.response_message
            )
          }
        })
        .catch(error => {
          CustomNotification.notif(
            'danger',
            'Gagal menghapus',
            'Mohon coba kembali'
          )
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
        })
    },
  },
}
</script>
