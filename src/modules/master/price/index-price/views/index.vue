<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{name: 'index-price-create'}"
          class="mr-1 text-primary"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen" v-if="showTable" class="mr-1 text-primary">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="mr-1 text-primary">
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
            <template #cell(is_active)="data">
              {{(data.is_active) ? 'Tidak Aktif': 'Aktif' }}
            </template>
            <template #cell(publish_date)="data">
              {{ convDate(data.item.publish_date) }}
            </template>
            <template #cell(role)="data">
              <b-badge
                v-for="(val, id) in data.value"
                :key="id"
                variant="primary"
                class="mr-1"
                pill
              >
                {{ val.role_name }}
              </b-badge>
            </template>
            <template #cell(id_reg)="data">
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                :to="'/index_price/detail/index/' + data.item.id"
                btn-sm
                class="btn-sm text-primary mr-1"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <b-button
                v-b-tooltip.hover.top="'Unduh'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="onClick(data.item.id)"
              >
                <feather-icon icon="DownloadIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Ubah'"
                variant="light"
                btn-sm
                :to="'/index_price/edit/' + data.item.id"
                class="btn-sm text-primary"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Hapus'"
                variant="warning"
                btn-sm
                class="btn-sm btn-warning"
                v-b-modal.modalDelete
                @click="showDeleteUser(data.item.id, data.item.regulation_name)"
              >
                <feather-icon icon="Trash2Icon" size="16" />
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
    <b-row v-else>
      <b-col>
        <b-card>
          <h5 class="text-center">
            Data tidak ditemukan
          </h5>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="title.delete"
      modal-class="modal-danger"
      ok-title="Hapus Data"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteUser"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus data ini"
          label-for="name-input"
          invalid-feedback="Mohon isikan alasan anda"
          :state="nameState"
        >
          <b-form-input
            id="deleteReason"
            v-model="deleteReason"
            :state="nameState"
            required
            maxlength="100"
            minlength="5"
            placeholder="Maksimal 100 karakter"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!-- Modal -->
    <b-modal
      id="modalAddTariff"
      ref="modal"
      :title="this.title.detail"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalAddTariff"
      @hidden="resetModalAddTariff"
    >
    <label for="title">
      <h1>Tariff IPFR</h1>
    </label>
    &nbsp;
      <b-form-group label="ID">
        <label class="form-control"> </label>
      </b-form-group>
      <b-form-group label="Nama BHP">
        <label class="form-control"></label>
      </b-form-group>
      <b-form-group label="Tanggal Publish">
        <label class="form-control">  </label>
      </b-form-group>
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
  VBTooltip,
} from 'bootstrap-vue'
import { uuid } from 'vue-uuid'
import axios from 'axios'
import moment from 'moment'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import CustomNotification from '@/helpers/custom-notification'

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
    // FeatherIcon,
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
      ipfr_frequency_base_price_id: '',
      no: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'regulation_name', label: 'Nama Peraturan', sortable: true },
        { key: 'publish_date', label: 'Tanggal Terbit', tdClass: 'Td-User-Role' },
        { key: 'is_active', label: 'Status' },
        { key: 'id_reg', label: 'Aksi', tdClass: 'Td-Action-4' },
      ],
      items: [],
      guid_v4: uuid.v4(),
      selectedUser: [],
      selectedIDUser: null,
      title: {},
      detailUser: {},
      deleteReason: '',
      nameState: null,
      showTable: true,
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
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    async showDeleteUser(idReg, reg) {
      this.selectedIDUser = idReg
      this.title = {
        delete: `Apakah anda ingin menghapus data peraturan '${reg}'?`,
      }
      this.$bvModal.show('modalDelete')
    },
    async detail(userID) {
      this.$bvModal.show('ModalAddTariff')
      await axios({
        url: URLServices.base_price.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: userID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const userData = result.data.data.user_list[0]
          this.detailUser.nik = userData.nik
          this.detailUser.fullName = userData.user_name
          this.detailUser.email = userData.email
          this.detailUser.userRole = userData.role
          this.title = {
            detail: `Detail data peraturan '${userData.user_name}'`,
          }
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
    },
    onClick(idReg) {
      axios({
        url: URLServices.index_price.download,
        method: 'POST',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: idReg,
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
          fileLink.setAttribute('download', result.data.filename)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus peraturan '${this.selectedUser.user_name}'`,
        detail: `Detail peraturan '${this.selectedUser.user_name}'`,
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
        url: URLServices.index_price.index,
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
          this.showTable = false
          const errorMessage = 'Gagal memperbaharui data. Mohon coba kembali'
          CustomNotification.notif('error', 'Error', errorMessage)
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
    resetModal() {
      this.name = ''
      this.nameState = null
      this.deleteReason = ''
    },
    resetModalAddTariff() {
      this.detailUser.id = '...'
      this.detailUser.bhp_name = '...'
      this.detailUser.publish_date = '...'
      this.detailUser.regulation_file = '...'
      this.title = {
        detail: 'Tambah Tariff IPFR',
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteUser(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (!this.checkFormValidity()) {
        return
      }

      axios({
        url: URLServices.index_price.destroy,
        data: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.selectedIDUser,
          reason_for_deletion: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            const successMessage = 'Berhasil menghapus data peraturan'
            CustomNotification.notif('success', 'Berhasil', successMessage)
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            const elseMessage = response.data.response_message
            CustomNotification.notif('error', 'Error !', elseMessage)
          }
        })
        .catch(() => {
          const errorMessage = 'Gagal menghapus. Mohon coba kembali'
          CustomNotification.notif('error', 'Error !', errorMessage)
        })

      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide('modalDelete')
      // })
    },
  },
}
</script>
