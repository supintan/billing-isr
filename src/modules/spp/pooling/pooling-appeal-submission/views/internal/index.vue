<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <!-- <b-button variant="light" :to="{ name: 'add-pooling' }">
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button> -->
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
            <template #cell(upload_date_time)="data">
              {{ convDate(data.item.upload_date_time) }}
            </template>
            <template #cell(verification_date_time)="data">
              {{ convDate(data.item.verification_date_time) }}
            </template>
            <template #cell(review_date_time)="data">
              {{ convDate(data.item.review_date_time) }}
            </template>
            <template #cell(action)="data">
              <b-button
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{ name: 'add-pooling-appeal-submission', params: {idpooling: data.item.id, idappealpooling: data.item.pooling_appeal_submission_id, name: data.item.client_name, status: data.item.status} }"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <b-button
                variant="light"
                btn-sm
                type="button"
                class="btn-sm text-primary"
                @click="download(data.item.id)"
              >
                <feather-icon icon="DownloadIcon" size="16" />
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

    <!-- Modal -->
    <b-modal
      id="modalDetail"
      ref="modal"
      size="lg"
      title="Detail Pooling"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >

      <div class="p-1 text-center" v-show="getDetailUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>

        <b-card-text>
          <h5 class="text-primary mt-2">DETAIL</h5>
        </b-card-text>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Client" label-for="nik">
              <b-form-input
                id="nik"
                plaintext
                value="Telkomsel"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Aplikasi"
              label-for="full_name"
            >
              <b-form-input
                id="full_name"
                plaintext
                value="1019101"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="No. SPP" label-for="nik">
              <b-form-input
                id="nik"
                plaintext
                value="1920192"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nilai"
              label-for="full_name"
            >
              <b-form-input
                id="full_name"
                plaintext
                value="Rp. 100.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tgl. Jatuh Tempo"
              label-for="full_name"
            >
              <b-form-input
                id="full_name"
                plaintext
                value="5 Juli 2021"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tgl. Jatuh Tempo Baru"
              label-for="full_name"
            >
              <b-form-input
                id="full_name"
                plaintext
                value="1 April 2021"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <hr class="my-1"/>
        <b-card-text>
          <h5 class="text-primary">PERSETUJUAN</h5>
            Apakah anda ingin menyetujui pooling ini? Untuk menyetujuinya pilih 'Setuju' dan klik tombol 'simpan'
            <div class="demo-inline-spacing" style="margin-left: 300px;">
                <b-form-radio
                  v-model="Selected"
                  name="some-radios"
                  value="A"
                >
                  Tolak
                </b-form-radio>
                <b-form-radio
                  v-model="Selected"
                  name="some-radios"
                  value="B"
                >
                  Setuju
                </b-form-radio>
            </div>
          <br/>
          <b-row>
          <!-- <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="Alasan"
              label-for="full_name"
            >
              <b-form-input />
            </b-form-group>
          </b-col> -->
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="Unggah Dok. pendukung"
              label-for="full_name"
            >
              <b-form-file />
            </b-form-group>
          </b-col>
          </b-row>
        </b-card-text>
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
  BAlert,
  BFormRadio,
  BFormFile,
} from 'bootstrap-vue'

import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
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
    BFormRadio,
    BAlert,
    BFormFile,
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
        { key: 'appeal_letter_number', label: 'Nomor Surat Permohonan' },
        { key: 'upload_date_time', label: 'Tanggal Upload' },
        { key: 'verification_date_time', label: 'Tanggal Verifikasi' },
        { key: 'verification_employee_name', label: 'Petugas Verifikasi' },
        { key: 'review_date_time', label: 'Tanggal Review' },
        { key: 'reviewer_employee_name', label: 'Petugas Review' },
        { key: 'status', label: 'Status Review' },
        { key: 'number_of_invoice', label: 'Jumlah Invoice' },
        { key: 'action', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      Selected: null,
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      guid_v4: uuid.v4(),
      getDetailUserSuccessed: false,
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
      if (date === null || date === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(date).format('D MMMM YYYY')
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
    async download(value) {
      // console.log(value, 'value')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.hkppooling.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: value,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // console.log(result, 'hasil download')
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data surat review. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
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
        url: URLServices.hkppoolingappealsubmission.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          // console.log(this.items)
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          this.showTable = false
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
    onFiltered() {
      // this.totalRows = this.totalRows
      // this.currentPage = 1
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
