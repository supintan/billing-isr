<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{name: 'tambah-denda'}"
          class="mr-1  text-primary"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen; filter = ''; getDataTable" v-if="showTable" class="mr-1 text-primary">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button
          variant="light"
          @click="tableRefresh()"
          class="text-primary"
        >
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
        <b-card no-body class="p-0">
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
            <template #cell(publish_date)="data">
              {{ convDate(data.publish_date) }}
            </template>
            <template #cell(maximum_periods_overdue)="data">
              {{ (data.item.maximum_periods_overdue) + ' bulan'}}
            </template>
            <template #cell(maximum_amount)="data">
              {{ Number(data.item.maximum_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
            </template>
            <template #cell(fine_percentage)="data">
              {{ Number(data.item.fine_percentage).toLocaleString('in-ID', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) + ' %' }}
            </template>
            <template #cell(is_default)="data">
              <div v-if="data.item.is_default">
                <b-badge
                  variant="success"
                  class="p-2"
                >
                  Default
                </b-badge>
              </div>
              <div v-else>
                <b-badge
                  variant="secondary"
                  class="p-2"
                >
                  Tidak
                </b-badge>
              </div>
            </template>
            <template #cell(id)="data">
              <div style="width: 200px">
                <b-button
                v-b-modal.modalDetail
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.id)"
              >
                <feather-icon
                  icon="ZoomInIcon"
                  size="16"
                />
              </b-button>
              &nbsp;
              <b-button
                variant="light"
                :to="{ name: 'updateFine', params: { selectedFineID: data.item.id }}"
                btn-sm
                class="btn-sm text-primary"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="onClick(data.item.id)"
              >
                <feather-icon icon="DownloadIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                variant="warning"
                btn-sm
                class="btn-sm"
                v-b-modal.modalDelete
                @click="showDelete(data.item.id,data.item.regulation_name)"
              >
                <feather-icon icon="TrashIcon" size="16" />
              </b-button>
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card-body class="d-flex justify-content-between flex-wrap mt-2">
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

      <div class="p-1 text-center" v-show="!getDetailUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>

      <div v-show="getDetailUserSuccessed">
        <b-card-text>
        </b-card-text>
        <b-form-group label="Nama Aturan">
          <label class="form-control" readonly>{{ detailUser.regulation_name }}</label>
        </b-form-group>
        <b-form-group label="Nomor Aturan">
          <label class="form-control" readonly>{{ detailUser.regulation_number }}</label>
        </b-form-group>
        <b-form-group label="Keterangan">
          <label class="form-control" readonly>{{ detailUser.regulation_official_name }}</label>
        </b-form-group>
        <b-form-group label="Deskripsi" label-size="auto">
        <textarea class="mb-2 mb-lg-0 form-control" v-model="detailUser.regulation_description" readonly></textarea>
        </b-form-group>
        <b-form-group label="Tanggal Terbit">
          <label class="form-control" readonly>{{ convDate(detailUser.publish_date) }}</label>
        </b-form-group>
        <b-form-group label="Denda Persentase">
          <label class="form-control" readonly>{{ Number(detailUser.fine_percentage).toLocaleString('in-ID', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) + ' %' }}</label>
        </b-form-group>
        <b-form-group label="Maximal Denda">
          <label class="form-control" readonly>{{ Number(detailUser.maximum_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}</label>
        </b-form-group>
        <b-form-group label="Jatuh Tempo">
          <label class="form-control" readonly>{{ detailUser.maximum_periods_overdue + ' Bulan' }}</label>
        </b-form-group>
      </div>
    </b-modal>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="this.title.delete"
      modal-class="modal-primary"
      ok-title="Hapus Denda"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteUser"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus aturan denda ini"
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
            minlength="5"
            placeholder="Maksimal 100 karakter"
          ></b-form-textarea>
        </b-form-group>
        <b-alert variant="warning" show class="p-1">
          <small>
            <feather-icon icon="InfoIcon"></feather-icon> Aturan denda yang telah dihapus tidak dapat dikembalikan. Klik tombol Hapus Denda untuk melanjutkan
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
  BModal,
  BCardText,
  BFormTextarea,
  BAlert,
} from 'bootstrap-vue'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'

export default {
  components: {
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
    BModal,
    BCardText,
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
        { key: 'regulation_name', label: 'Nama Peraturan', sortable: true, tdClass: 'size' },
        { key: 'regulation_official_name', label: 'Judul Resmi' },
        { key: 'publish_date', label: 'Tanggal Terbit' },
        { key: 'fine_percentage', label: 'Persentase Denda' },
        { key: 'is_default', label: 'Default', tdClass: 'text-center' },
        { key: 'maximum_amount', label: 'Maksimum Denda', tdClass: 'size' },
        { key: 'maximum_periods_overdue', label: 'Jatuh Tempo' },
        { key: 'id', label: 'Aksi', tdClass: 'Td-Action-3' },
      ],
      items: [],
      selectedUser: [],
      selectedIDUser: null,
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: true,

      // Tabel Detail Posisi per User
      detailUser: {},
      showDetailContent: false,
      fieldsDetail: [
        { key: 'regulation_official_name', label: 'Nama Kantor' },
        { key: 'regulation_description', label: 'Keterangan' },
        { key: 'publish_date', label: 'Tanggal Terbit' },
        { key: 'fine_percentage', label: 'Persentase Denda' },
        { key: 'maximum_amount', label: 'Jumlah Bayar' },
        { key: 'maximum_periods_overdue', label: 'Jatuh Tempo' },
        { key: 'regulation_file', label: 'Path File' },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: true,
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
    async showDelete(idUser, NamaUser) {
      this.selectedIDUser = idUser
      this.title = {
        delete: `Apakah anda ingin menghapus aturan denda ${NamaUser}?`,
      }
      this.$bvModal.show('modalDelete')
    },
    async detail(idUser) {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      this.$bvModal.show('modalDetail')
      await axios({
        url: URLServices.fine.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: idUser,
          request_date_time: DateConvertion.getTimeNow(),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailUser] = result.data.data
          this.getDetailUserSuccessed = true
          this.showDetailUser = false
          this.title = {
            detail: `${this.detailUser.regulation_official_name}`,
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Gagal mendapatkan role', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    onClick(idUser) {
      axios({
        url: URLServices.fine.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          id: idUser,
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
          CustomNotification.notif('error', 'Dokumen gagal didownload', errorMessage)
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus aturan denda '${this.selectedUser.user_name}'`,
      }
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
        url: URLServices.fine.index,
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
          CustomNotification.notif('error', 'Gagal memperbaharui data', 'Mohon coba kembali')
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
    resetModal() {
      this.name = ''
      this.nameState = null
      this.deleteReason = ''
    },
    resetModalDetail() {
      this.userData = {}
      this.getDetailUserSuccessed = false
      this.title = {
        detail: 'Detail denda ...',
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    convDate(date) {
      if (date !== null) {
        return DateConvertion.setValue(date).getFullDate()
      }
      return '-'
    },
    deleteUser(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (!this.checkFormValidity()) {
        return
      }
      axios({
        url: URLServices.fine.destroy,
        data: {
          request_id: uuid.v4(),
          id: this.selectedIDUser,
          request_date_time: DateConvertion.getTimeNow(),
          reason_for_deletion: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menghapus data aturan denda')
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            CustomNotification.notif('success', response.data.response_message)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('error', 'Gagal menghapus. Mohon coba kembali')
        })
    },
  },
}
</script>

<style>
  .Td-Action-3 {
    text-align: center;
  }
  .size {
    width: 200px;
  }
</style>
