<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{name: 'TambahTarifIPFR'}"
          v-if="!$can('create', 'employee')"
          class="mr-1 text-primary"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
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
              {{ convertDate(data.item.publish_date) }}
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
            <template #cell(id_user)="data">
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                :to="{
                  name: 'base-price-detail', 
                  params: { IDBase: data.item.id }
                }"
                btn-sm
                class="btn-sm text-primary mr-1"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <b-button
                v-b-tooltip.hover.top="'Unduh'"
                variant="light"
                btn-sm
                class="btn-sm text-primary mr-1"
                @click="onClick(data.item.id)"
              >
                <feather-icon icon="DownloadIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Ubah'"
                variant="light"
                btn-sm
                :to="{
                  name: 'base-price-update',
                  params: { selectedFineID: data.item.id }
                }"
                class="btn-sm text-primary mr-1"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Hapus'"
                variant="warning"
                btn-sm
                class="btn-sm mr-1"
                v-b-modal.modalDelete
                @click="showDelete(data.item.id)"
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

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      title="Apakah anda yakin ingin menghapus data ini?"
      modal-class="modal-danger"
      ok-title="Hapus Data"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteData"
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
import { URLServices, getToken } from '@/services/UrlConfig'
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
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      searchTitle: '',
      isBusy: true,
      seen: false,
      perPage: 5,
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
        { key: 'regulation_official_name', label: 'Nama Peraturan', sortable: true },
        { key: 'publish_date', label: 'Tanggal Terbit', tdClass: 'Td-User-Role' },
        { key: 'is_active', label: 'Status' },
        { key: 'id_user', label: 'Aksi', tdClass: 'Td-Action-4' },
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
    convertDate(date) {
      if (!date) return '-'
      return DateConvertion.setValue(date).getFullDate()
    },
    async showDelete(idUser) {
      this.selectedIDUser = idUser
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
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          const userData = result.data.data.user_list[0]
          this.detailUser.nik = userData.nik
          this.detailUser.fullName = userData.user_name
          this.detailUser.email = userData.email
          this.detailUser.userRole = userData.role
          this.title = {
            detail: `Detail user '${userData.user_name}'`,
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan data', errorMessage)
        })
    },
    onClick(idUser) {
      axios({
        url: URLServices.base_price.download,
        method: 'POST',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: idUser,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
        detail: `Detail user '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(filter, currentPage, perPage, freqc) {
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
      params.request_date_time = '15-06-2021'
      params.ipfr_frequency_base_price_id = freqc

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
        this.freqc,
      )

      axios({
        url: URLServices.base_price.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
          CustomNotification.notif('danger', 'Gagal memperbaharui data', 'Mohon coba kembali')
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
    deleteData(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (!this.checkFormValidity()) {
        return
      }

      axios({
        url: URLServices.base_price.destroy,
        data: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.selectedIDUser,
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menghapus data', 'Tabel akan di-refresh')

            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            CustomNotification.notif('warning', 'Gagal menghapus data', 'Mohon coba kembali')
          }
        })
        .catch(() => {
          CustomNotification.notif('warning', 'Gagal menghapus data', 'Mohon coba kembali')
        })

      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide('modalDelete')
      // })
    },
  },
}
</script>
