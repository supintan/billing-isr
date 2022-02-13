<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="light" v-b-modal.modalUpload class="mr-1 text-primary">
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" v-b-modal.modalDownload class="mr-1 text-primary">
          <feather-icon icon="DownloadIcon" /> Extract
        </b-button>
        <b-button variant="light" v-b-modal.modalDelete class="mr-1 text-primary">
          <feather-icon icon="TrashIcon" /> Hapus
        </b-button>
        <b-button variant="light" @click="seen = !seen" v-if="showTable" class="mr-1 text-primary">
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
        <b-card no-body class="p-0 mb-4">
          <!-- :busy="isBusy" -->
          <b-table
            id="tableData"
            striped
            hover
            responsive
            class="position-relative shadow mb-0"
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
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{
                  name: 'station-registration-detail',
                  params: { stasiunDetailId: data.item.id },
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
      :title="title.detail"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <div>
        <b-card-text>
          <h5 class="text-primary mt-2">Data Registrasi Stasiun</h5>
        </b-card-text>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Client" label-for="client">
              <b-form-input
                id="client"
                plaintext
                :value="detailUser.nik"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Aplikasi" label-for="aplikasi">
              <b-form-input
                id="aplikasi"
                plaintext
                :value="detailUser.full_name"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Jumlah Stasiun" label-for="jumlah">
              <b-form-input
                id="jumlah"
                plaintext
                :value="detailUser.date_of_birth"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
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
      @ok="deleteUser"
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
      @ok="uploadFileStasiun"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="File Stasiun"
          class="mb-2"
          label-for="h-file-stasiun"
          label-cols="4"
        >
          <b-form-file
            v-model="fileUpdate[0]"
            accept=".csv"
            placeholder="Pilih file yang akan diupload..."
            drop-placeholder="Drop file here..."
            @change="createBase64File"
          />
        </b-form-group>
      </form>
    </b-modal>

    <!-- Modal -->
    <b-modal
      id="modalDownload"
      ref="modal"
      :title="title.download"
      modal-class="modal-primary"
      ok-title="Download"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="downloadFile"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Format File Stasiun"
          class="mb-2"
          label-for="h-file-stasiun"
          label-cols="4"
        >
          <b-form-radio-group
            v-model="selectedFormat"
            :options="fileOptions"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
            class="demo-inline-spacing"
          />
        </b-form-group>
      </form>
    </b-modal>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="this.title.delete"
      modal-class="modal-primary"
      ok-title="Hapus Data"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteUser"
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
  BCardText,
  BFormTextarea,
  BAlert,
  BFormFile,
  BFormRadioGroup,
  VBTooltip,
} from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'

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
    BCardText,
    BFormTextarea,
    BAlert,
    BFormFile,
    BFormRadioGroup,
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
        { key: 'station_identity', label: 'Identitas Stasiun', sortable: true },
        { key: 'city_id', label: 'Id Kota/Kabupaten', sortable: true },
        { key: 'latitude', label: 'Lintang', sortable: true },
        { key: 'longitude', label: 'Bujur', sortable: true },
        { key: 'full_address', label: 'Alamat Lengkap', sortable: true },
        { key: 'transmitter_identity', label: 'Transmitter', sortable: true },
        { key: 'receiver_identity', label: 'Receiver', sortable: true },
        { key: 'id', label: 'Aksi' },
      ],
      items: [],
      itemss: [
        {
          no: 1,
          station_identity: 'P0001',
          city_id: '7',
          latitude: '-6,00029',
          longitude: '102,000933',
          full_address: 'Jakarta',
          transmitter_identity: 'transmitter',
          receiver_identity: 'receiver'
        }
      ],
      selectedUser: [],
      selectedIDStasiun: null,
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      guid_v4: uuid.v4(),

      // Tabel Detail Posisi per User
      detailUser: {},
      showDetailContent: false,
      fieldsDetail: [
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'station_identity', label: 'Identitas Stasiun', sortable: true },
        { key: 'id', label: 'Aksi' },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: true,
      fileUpdate: [],
      chooseFile: '',
      selectedFormat: 'csv',
      fileOptions: [
        { item: 'csv', name: 'csv' },
        { item: 'xml', name: 'xml' },
      ],
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
    async showDelete(idUser) {
      this.selectedIDUser = idUser
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
    async upload() {
      this.$bvModal.show('modalUpload')
    },
    async showDownload() {
      this.$bvModal.show('modalDownload')
    },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const stasiunId = localStorage.getItem('thisId')
      const data = {}
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileUpdate[0] = e.target.result
        }

        reader.readAsDataURL(file)
      }

      data.request_id = this.guid_v4
      data.request_date_time = today
      data.id = stasiunId
      data.station_file = this.fileUpdate.join()

      return data
    },
    async uploadFileStasiun() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.isr_station_registrations.upload,
          method: 'post',
          data: Param,
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              const notification = 'Berhasil upload file Stasiun'
              CustomNotification.notif('success', 'Berhasil !', notification)
            } else {
              const notificationError = result.data.response_message
              CustomNotification.notif('warning', 'Error !', notificationError)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = 'Gagal memuat data !'
            CustomNotification.notif('warning', 'Error !', notifError)
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
      this.getDataTable()
    },
    async downloadFile() {
      console.log('sampe sini ga', this.selectedFormat)
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const stasiunId = localStorage.getItem('thisId')
      const convertCsv = 'data:application/vnd.ms-excel;base64, '
      const convertXml = 'data:application/xml;base64, '
      await axios({
        url: URLServices.isr_station_registrations.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: stasiunId,
          file_type: this.selectedFormat,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          if (this.selectedFormat === 'csv') {
            fileLink.href = `${convertCsv}${fileURL}`
          } else {
            fileLink.href = `${convertXml}${fileURL}`
          }
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data Stasiun Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
        })
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
    // async detail(btsDetailId) {
    //   this.$router.push({ name: 'detail-bts-registration-detail' })
    //   localStorage.setItem('btsId', btsDetailId)
    // },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(currentPage, perPage) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}
      const idApp = localStorage.getItem('applicationId')

      if (this.filter) {
        params.search = this.filter
      }

      if (currentPage) {
        params.page = currentPage
      }
      
      if (perPage) {
        params.length = perPage
      }

      params.request_id = this.guid_v4
      params.request_date_time = today
      params.application_id = idApp

      return params
    },

    getDataTable() {
      this.showTable = true
      this.isBusy = true

      if (this.filter !== this.activeFilter) {
        this.currentPage = 1
        this.activeFilter = this.filter
      }

      const param = this.getRequestParams(this.currentPage, this.perPage)

      axios({
        url: URLServices.isr_station_registrations_detail.index,
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
          const notifError = 'Gagal memperbaharui data detail Stasiun. Mohon coba kembali'
          CustomNotification.notif('warning', notifError)
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
