<template>
  <div>
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button variant="light">
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen" v-if="showTable">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()">
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
            <template #cell(action)="data">
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.action)"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
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
          <h5 class="text-primary mt-2">BIODATA USER</h5>
        </b-card-text>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="NIK" label-for="nik">
              <b-form-input
                id="nik"
                plaintext
                :value="detailUser.nik"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nama Lengkap"
              label-for="full_name"
            >
              <b-form-input
                id="full_name"
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
              label="Tgl. Lahir"
              label-for="date_of_birth"
            >
              <b-form-input
                id="date_of_birth"
                plaintext
                :value="convDate(detailUser.date_of_birth)"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Jenis Kelamin"
              label-for="gender"
            >
              <b-form-input
                id="gender"
                plaintext
                :value="convSexCode(detailUser.gender)"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Email" label-for="email">
              <b-form-input
                id="email"
                plaintext
                :value="detailUser.email"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="No. Telepon"
              label-for="phone_number"
            >
              <b-form-input
                id="phone_number"
                plaintext
                :value="detailUser.phone_number"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Alamat" label-for="address">
              <b-form-input
                id="address"
                plaintext
                :value="detailUser.address"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <h5 class="text-primary mt-2">LOGIN</h5>
        <div v-for="(val, id) in detailUser.login" :key="id">
          <b-row>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Username"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  plaintext
                  :value="val.username"
                  class="font-weight-bold"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Email"
                label-for="email-login"
              >
                <b-form-input
                  id="email-login"
                  plaintext
                  :value="val.email"
                  class="font-weight-bold"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <hr />
        <h5 class="text-primary mt-2">POSISI</h5>
        <div v-if="items">
          <b-card-text>
            Menampilkan daftar posisi user
          </b-card-text>
          <b-row>
            <b-col>
              <b-table
                id="tablePosisi"
                striped
                hover
                responsive
                :items="detailUser.positions"
                :fields="fieldsDetail"
                class="position-relative shadow mb-0"
              >
                <template #cell(start_date)="data">
                  {{ convDate(data.item.start_date) }}
                </template>
                <template #cell(end_date)="data">
                  {{ convDate(data.item.end_date) }}
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>
        <div v-else class="my-2 text-center">
          Tidak ditemukan
        </div>
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
} from 'bootstrap-vue'

import moment from 'moment'

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
        { key: 'field1', label: 'No.' },
        { key: 'field2', label: 'Aplikasi' },
        { key: 'field3', label: 'No. SPP' },
        { key: 'field4', label: 'Nilai' },
        { key: 'field5', label: 'Periode Cicilan' },
        { key: 'action', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,

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
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      this.$bvModal.show('modalDetail')
      // API REQUEST
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

      params.request_id = 'guid_v4'
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')

      return params
    },

    getDataTable() {
      this.showTable = true
      this.isBusy = true
      // const param = this.getRequestParams(
      //   this.filter,
      //   this.currentPage,
      //   this.perPage,
      // )
      // API REQUEST
      // Init
      this.items = [
        {
          field1: '1',
          field2: '1019202',
          field3: '1920192',
          field4: 'Rp. 100.000.000',
          field5: 'Juni - Oktober 2021',
          action: '1',
        },
        {
          field1: '2',
          field2: '1029111',
          field3: '1290121',
          field4: 'Rp. 200.000.000',
          field5: 'Januari - Mei 2021',
          action: '1',
        },
        {
          field1: '3',
          field2: '1019202',
          field3: '1290121',
          field4: 'Rp. 300.000.000',
          field5: 'Mei - Agustus 2021',
          action: '1',
        },
      ]
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
