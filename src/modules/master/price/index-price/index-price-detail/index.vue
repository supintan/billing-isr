<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="'/index_price_detail/add/' + this.index_price_regulation_id"
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
            <template #cell(name)="data">
              <div style="width:200px">{{ data.item.name }}</div>
            </template>
            <template #cell(price)="data">
              {{ Number(data.item.price).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
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
            <template #cell(id_action)="data">
              <b-button
                v-b-tooltip.hover.top="'Ubah'"
                variant="light"
                btn-sm
                :to="'/index_price_detail/edit/' + data.item.id"
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
                @click="showDelete(data.item.id, data.item.name)"
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
      :title="this.title.delete"
      modal-class="modal-danger"
      ok-title="Hapus Data"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteRegDetail"
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
      <!-- <b-form-group label-cols="4" label="Upload File*" label-for="foto">
        <b-form-file
          id="regulation_file"
          :model="dataPost.avatar_base64"
          accept="image/*"
        />
      </b-form-group> -->
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
import axios from 'axios'
import { uuid } from 'vue-uuid'
import moment from 'moment'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
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
      index_price_regulation_id: this.$route.params.selectedIdIndexPrice,
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
        { key: 'name', label: 'Nama Detail Index Price', sortable: true },
        { key: 'service_name', label: 'Nama Service', sortable: true },
        { key: 'subservice_name', label: 'Nama Subservice', sortable: true },
        { key: 'power_index_price', label: 'Power Index Price', sortable: true },
        { key: 'bandwidth_index_price', label: 'Bandwith Index Price', sortable: true },
        { key: 'station_cost_category_name', label: 'Kategori Biaya Stasiun', sortable: true },
        { key: 'equipment_type_name', label: 'Tipe Peralatan', sortable: true },
        { key: 'id_action', label: 'Aksi', tdClass: 'Td-Action-4' },
      ],
      /* eslint-disable global-require */
      items: [],
      guid_v4: uuid.v4(),
      selectedUser: [],
      selectedIDUser: null,
      selectedIdIndexPrice: '',
      title: {},
      detailUser: {},
      deleteReason: '',
      nameState: null,
      showTable: true,
      serviceId: '',
      subserviceId: '',
      // avatar_base64: "",
      selectedIdRegDetail: null,
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
    async showDelete(idRegDetail, regDetail) {
      this.selectedIdRegDetail = idRegDetail
      this.title = {
        delete: `Apakah anda ingin menghapus detail data peraturan '${regDetail}'?`,
      }
      this.$bvModal.show('modalDelete')
    },
    async detail() {
      this.$bvModal.show('ModalAddTariff')
      await axios({
        url: URLServices.base_price_detail.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          response_id: this.guid_v4,
          id: this.ipfr_frequency_base_price_id,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const userData = result.data.data[0]
          this.detailUser.name = userData.name
          this.detailUser.start_range = userData.start_range
          this.detailUser.end_range = userData.end_range
          this.detailUser.unit = userData.unit
          this.detailUser.price = userData.price
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail frekuensi. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus data '${this.selectedUser.user_name}'`,
        detail: `Detail data '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(filter, currentPage, perPage, selectedIdIndexPrice) {
      localStorage.setItem('regulationIdIndexPrice', selectedIdIndexPrice)
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
      params.index_price_regulation_id = selectedIdIndexPrice
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
        this.index_price_regulation_id,
      )

      axios({
        url: URLServices.index_price_detail.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.serviceId = this.items[0].service_id
          this.subserviceId = this.items[0].subservice_id
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          this.showTable = false
          const catchMessage = 'Gagal memperbaharui data. Mohon coba kembali'
          CustomNotification.notif('error', 'Error !', catchMessage)
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
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    deleteRegDetail(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name)

      axios({
        url: URLServices.index_price_detail.destroy,
        data: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.selectedIdRegDetail,
          reason_for_deletion: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            const successMessage = 'Berhasil menghapus data'
            CustomNotification.notif('success', 'Berhasil !', successMessage)
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            const elseMessage = response.data.response_message
            CustomNotification.notif('error', 'Gagal !', elseMessage)
          }
        })
        .catch(() => {
          const catchMessage = 'Gagal menghapus. Mohon coba kembali'
          CustomNotification.notif('error', 'Error !', catchMessage)
        })

      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide('modalDelete')
      // })
    },
  },
}
</script>
