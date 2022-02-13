<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
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
            <template #cell(action)="data">
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.application_id, data.item.id)"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <!-- <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="extract(data.item.action)"
              >
                <feather-icon icon="ArchiveIcon" size="16" />
              </b-button> -->
              <!-- <b-button
                v-b-modal.modalUpload
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="upload(data.item.id)"
              >
                <feather-icon icon="UploadIcon" size="16" />
              </b-button> -->
              <!-- <b-button
                variant="warning"
                btn-sm
                class="btn-sm text-primary"
                @click="showDelete(data.item.application_id)"
              >
                <feather-icon icon="TrashIcon" size="16" />
              </b-button> -->
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
      :title="this.title.detail"
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
            <b-form-group
              label-cols="4"
              label="Aplikasi"
              label-for="aplikasi"
            >
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
            <b-form-group
              label-cols="4"
              label="Jumlah Stasiun"
              label-for="jumlah"
            >
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
        <b-form-group
          :state="nameState"
        >
        </b-form-group>
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
            <feather-icon icon="InfoIcon"></feather-icon> Data yang telah dihapus tidak dapat dikembalikan. Klik tombol Hapus Data untuk melanjutkan
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
    BCardText,
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
        { key: 'id', label: 'Id Stasiun' },
        { key: 'application_id', label: 'Id Aplikasi', sortable: true },
        { key: 'client_name', label: 'Klien', sortable: true },
        { key: 'service_name', label: 'Layanan', sortable: true },
        { key: 'subservice_name', label: 'Sub Layanan', sortable: true },
        { key: 'application_name', label: 'Nama Aplikasi', sortable: true },
        { key: 'number_of_stations', label: 'Jumlah Stasiun' },
        { key: 'action', label: 'Aksi' },
      ],
      items: [],
      itemss: [
        {
          no: 1,
          application_id: '0001',
          client_name: 'Telkomsel',
          service_name: 'Land Mobile',
          subservice_name: '4G',
          application_name: 'Test Aplikasi',
          number_of_stasiun: '10'
        },
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
        { key: 'official_name', label: 'Nama Resmi', sortable: true },
        { key: 'appointment_letter_number', label: 'No. SK', sortable: true },
        { key: 'start_date', label: 'Tgl. Mulai', sortable: true },
        { key: 'end_date', label: 'Tgl. Selesai', sortable: true },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: true,
      fileUpdate: null,
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
    async upload(stasiunId) {
      this.selectedIDStasiun = stasiunId
      this.title = {
        upload: `Apakah anda ingin upload file Stasiun dengan id: '${this.selectedIDStasiun}'`,
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

      data.id = this.selectedIDStasiun
      data.stasiun_file = this.fileUpdate
      data.request_id = this.guid_v4
      data.request_date_time = today

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
              CustomNotification.notif('success', notification)
            } else {
              CustomNotification.notif('warning', result.data.response_message)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = 'Permintaan gagal'
            CustomNotification.notif('warning', notifError)
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
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
    async detail(appId, thisId) {
      this.$router.push({ name: 'station-registration' })
      localStorage.setItem('applicationId', appId)
      localStorage.setItem('thisId', thisId)

      // Service.setItem('client', regId)
      // API REQUEST
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(currentPage, perPage) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
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
        this.currentPage,
        this.perPage,
      )

      axios({
        url: URLServices.isr_station_registrations.index,
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
          const notification = 'Gagal memperbaharui data. Mohon coba kembali'
          CustomNotification.notif('warning', notification)
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
