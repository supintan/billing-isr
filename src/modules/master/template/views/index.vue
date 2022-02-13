<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          :to="{
            name: 'add-template',
            params: {
              detailTemplateId: '0',
            },
          }"
          variant="light"
          class="text-primary mr-1"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button
          v-if="showTable"
          variant="light"
          @click="seen = !seen"
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
        <div v-if="seen" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-4">
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
                  class="btn btn-danger"
                  @click="
                    filter = '';
                    getDataTable()
                  "
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
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #cell(no)="data">
              {{ perPage * (currentPage - 1) + data.index + 1 }}
            </template>
            <template #cell(last_update)="data">
              {{
                data.item.last_update_name +
                  ', ' +
                  convDate(data.item.last_update_date_time)
              }}
            </template>
            <template #cell(action)="data">
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary mr-1"
                :to="{
                  name: 'detail-template',
                  params: { detailTemplateId: data.item.id },
                }"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <b-button
                v-b-tooltip.hover.top="'Ubah'"
                :to="{
                  name: 'edit-template',
                  params: { detailTemplateId: data.item.id },
                }"
                variant="light"
                btn-sm
                class="btn-sm text-primary mr-1"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              <b-button
                v-b-tooltip.hover.top="'Unduh'"
                variant="light"
                @click="createPDF(data.item.id)"
                btn-sm
                class="btn-sm text-primary mr-1"
              >
                <feather-icon icon="DownloadIcon" size="16" />
              </b-button>
              <b-button
                v-b-tooltip.hover.top="'Hapus'"
                variant="warning"
                btn-sm
                class="btn-sm"
                @click="showDelete(data.item.id, data.item.name)"
              >
                <feather-icon icon="TrashIcon" size="16" />
              </b-button>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
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
      :title="titleDelete"
      modal-class="modal-danger"
      ok-title="Hapus"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteTemplate"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus template ini"
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
          />
        </b-form-group>
        <b-alert variant="warning" show class="p-1 collapse">
          <small>
            <feather-icon icon="InfoIcon" /> Template yang telah dihapus tidak
            dapat dikembalikan. Klik tombol hapus untuk melanjutkan
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
  BFormTextarea,
  BAlert,
  VBTooltip,
} from 'bootstrap-vue'

import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
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
      totalRows: 0,
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
        { key: 'template_type_name', label: 'Jenis Dokumen' },
        { key: 'name', label: 'Nama Template' },
        { key: 'last_update', label: 'Terakhir Diperbaharui' },
        { key: 'action', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,

      // Delete Modal
      titleDelete: null,

      // PDF
      pdfFile: null,
      pdfFileName: '',
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
        return moment(date).format('D MMMM YYYY hh:mm:ss')
      }
      return '-'
    },
    createPDF(selectedTemplateID) {
      CustomNotification.notif('wait', 'File PDF sedang diproses ...')
      this.getBase64PDF(selectedTemplateID)
    },
    downloadPDF() {
      const linkSource = `data:application/pdf;base64,${this.pdfFile}`
      const downloadLink = document.createElement('a')

      downloadLink.href = linkSource
      downloadLink.download = this.pdfFileName
      downloadLink.click()
      CustomNotification.notif('success', 'File PDF berhasil dibuat')
    },
    async getBase64PDF(selectedTemplateID) {
      this.pdfFile = null
      await axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: selectedTemplateID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.pdfFileName = result.data.file_name
            this.downloadPDF()
          }
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async showDelete(templateId, namaTemplate) {
      this.selectedTemplateId = templateId
      this.titleDelete = `Apakah anda ingin template ${namaTemplate}?`
      this.$bvModal.show('modalDelete')
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

      (params.request_id = uuid.v4()),
        (params.request_date_time = moment(new Date()).format(
          'YYYY-MM-DD H:mm:s'
        ))
      params.template_id = ''

      return params
    },

    async getDataTable() {
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

      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: param,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.totalRows = result.data.recordsTotal
            this.items = result.data.data
            this.showTable = this.totalRows > 0 || this.filter
          } else {
            this.items = []
            this.totalRows = 0
            this.showTable = false
          }
          this.isBusy = false
        })
        .catch(error => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = `Gagal memuat data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
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
      console.log('onfilter')
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
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteTemplate(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      // API REQUEST
      axios({
        url: URLServices.template.destroy,
        data: {
          request_id: 'guid_v4',
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.selectedTemplateId,
          notes: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menghapus template')
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            CustomNotification.notif('warning', response.data.response_message)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          CustomNotification.notif(
            'warning',
            'Gagal menghapus. Mohon coba kembali'
          )
        })
    },
  },
}
</script>
