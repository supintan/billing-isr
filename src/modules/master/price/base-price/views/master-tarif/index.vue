<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{
            name: 'base-price-detail-add',
            params: { IDBase: this.IDBase }
          }"
          class="text-primary mr-1"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen" v-if="showTable" class="text-primary mr-1">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="text-primary mr-1">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
        <b-button
          variant="light"
          :to="{ name: 'base-price' }"
          class="text-primary"
        >
          <feather-icon icon="CornerUpLeftIcon" /> Kembali
        </b-button>
      </b-col>
    </b-row>

    <b-row v-if="showTable">
      <b-col>
        <div class="d-flex justify-content-between flex-wrap" v-if="seen">
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
            <template #cell(base_price)="data">
              {{ convertNumber(data.item.base_price) }}
            </template>
            <template #cell(id)="data">
              <b-button
                variant="light"
                btn-sm
                :to="{
                  name: 'base-price-update-rule',
                  params: {
                    BasePriceId: IDBase,
                    IdRule: data.item.id,
                  }
                }"
                class="btn-sm text-primary"
              >
                <feather-icon icon="EditIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                variant="warning"
                size="sm"
                v-b-modal.modalDelete
                @click="showDelete(data.item.id)"
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
      @ok="deleteRole"
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
} from 'bootstrap-vue'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'

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
  },
  data() {
    return {
      IDBase: this.$route.params.IDBase,
      searchTitle: '',
      isBusy: false,
      seen: false,
      perPage: 5,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      basePriceRegulationId: this.$route.params.IDBase,
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
        { key: 'name', label: 'Rentang Frekuensi', sortable: true },
        { key: 'zone_id', label: 'Zona' },
        { key: 'unit', label: 'Unit', tdClass: 'Td-User-Role' },
        { key: 'base_price', label: 'Harga', sortable: true },
        { key: 'id', label: 'Aksi', tdClass: 'Td-Action-3' },
      ],
      /* eslint-disable global-require */
      items: [],

      guid_v4: uuid.v4(),
      selectedUser: [],
      selectedIDUser: null,
      selectedUserID: '',
      title: {},
      detailUser: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      idRole: null,
      // avatar_base64: "",
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
    async showDelete(idRole) {
      this.idRole = idRole
      this.$bvModal.show('modalDelete')
    },
    convertNumber(number) {
      if (!number) return '-'
      return InputFormat.NumberFormat(number)
    },
    async detail() {
      this.$bvModal.show('ModalAddTariff')
      await axios({
        url: URLServices.base_price_detail.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          response_id: this.guid_v4,
          id: this.basePriceRegulationId,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan detail frekuensi', errorMessage)
        })
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus data '${this.selectedUser.user_name}'`,
        detail: `Detail data '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(filter, currentPage, perPage, BasePriceId) {
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

      params.response_id = this.guid_v4
      params.request_id = this.guid_v4
      params.base_price_regulation_id = BasePriceId
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
        this.basePriceRegulationId,
      )

      axios({
        url: URLServices.base_price_detail.index,
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
          this.showTable = this.totalRows > 0 || this.filter
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
    deleteRole(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name)

      axios({
        url: URLServices.base_price_detail.destroy,
        data: {
          request_id: this.guid_v4,
          response_id: this.guid_v4,
          id: this.idRole,
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menghapus data', 'Tabel akan di refresh')
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            CustomNotification.notif('warning', 'Gagal menghapus data', response.data.response_message)
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
