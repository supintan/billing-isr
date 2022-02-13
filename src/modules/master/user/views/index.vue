<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{name: 'create-user'}"
          v-if="!$can('create', 'employee')"
          class="mr-1 text-primary"
        >
          <feather-icon icon="PlusIcon" /> Tambah
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
                v-debounce:500ms="getDataTable"
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''; getDataTable();"
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
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
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
            <template #cell(group)="data">
              <b-badge
                v-for="(val, id) in data.item.role_list"
                :key="id"
                variant="primary"
                class="mr-1 p-1"
                pill
              >
                {{ val.role_name }}
              </b-badge>
            </template>
            <template #cell(id)="data">
              <!-- <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="detail(data.item.id)"
                v-if="$can('show', 'employee')"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button> -->
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Ubah'"
                variant="light"
                :to="{ name: 'edit-user', params: { selectedUserID: data.item.user_id } }"
                btn-sm
                class="btn-sm text-primary"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Hapus'"
                variant="warning"
                btn-sm
                class="btn-sm"
                v-b-modal.modalDelete
                @click="showDelete(data.item.user_id,data.item.full_name)"
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
            Data tidak ditemukan <feather-icon icon="FrownIcon"></feather-icon>
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
                class="position-relative card bg-white"
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
  VBTooltip,
} from 'bootstrap-vue'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import moment from 'moment'
import { URLServices, getToken } from '@/services/UrlConfig'
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
    BCardText,
    BFormTextarea,
    BAlert,
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
      filterOn: [],
      no: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'user_name', label: 'Username', sortable: true },
        { key: 'full_name', label: 'Nama Lengkap', sortable: true },
        { key: 'group', label: 'Group', tdClass: 'Td-Role' },
        { key: 'id', label: 'Aksi', tdClass: 'Td-Action-3 text-right' },
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
    repeateAgain() {
      this.SelectedMenuList.push({
        index: (this.nextTodoId += this.nextTodoId),
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.div[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.SelectedMenuList.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },

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
    async detail(idUser) {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      this.$bvModal.show('modalDetail')
      await axios({
        url: URLServices.employee.getUserDetail,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          employee_id: idUser,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailUser] = result.data.data.employee_list
          this.getDetailUserSuccessed = true
          this.showDetailUser = false
          this.title = {
            detail: `Detail User '${this.detailUser.full_name}'`,
          }
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan role', errorMessage)

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
      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage,
      )

      axios({
        url: URLServices.user.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data.user_list
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
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
      // this.$root.$emit('bv::refresh::table', 'tableData')
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
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
    resetModalDetail() {
      this.userData = {}
      this.getDetailUserSuccessed = false
      this.title = {
        detail: 'Detail user ...',
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    deleteUser() {
      // bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      axios({
        url: URLServices.user.destroy,
        data: {
          request_id: uuid.v4(),
          user_id: this.selectedIDUser,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          reason_for_deletion: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menghapus data user', 'Tabel akan direload')
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            CustomNotification.notif('warning', 'Gagal', 'Mohon coba kembali')
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('danger', 'Gagal menghapus', 'Mohon coba kembali')
        })

      // Hide the modal manually
      // this.$nextTick()=> {
      //   this.$bvModal.hide('modalDelete')
      // })
    },
  },
}
</script>
