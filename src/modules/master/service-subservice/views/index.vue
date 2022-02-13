<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
          <!-- v-if="showTable" -->
        <b-button variant="light" @click="showTambahModal()" class="text-primary mr-1">
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen" class="text-primary mr-1">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh()" class="text-primary mr-1">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </b-col>
    </b-row>
    <!-- v-if="showTable" -->
    <b-row>
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
                v-debounce:400ms="getDataTable"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="resetSearch"
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
            <!-- :busy="isBusy" -->
          <b-table
            id="tableData"
            striped
            hover
            responsive
            class="position-relative shadow mb-0"
            :per-page="perPage"
            :items="items"
            :fields="fields"
          >
            <!-- <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong> Mohon tunggu ...</strong>
              </div>
            </template> -->
            <template #cell(no)="data">
              {{ perPage * (currentPage - 1) + data.index + 1 }}
            </template>
            <template #cell(subservice_name)>
              <b-list-group>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                  v-for="(value, index) in itemsSub" :key="index"
                >
                  {{ value.name }}
                </b-list-group-item>
              </b-list-group>
            </template>
            <template #cell(action)="data">
              <b-button
                v-b-tooltip.hover.top="'Detail'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="showDetailModal(data.item.subservice_id)"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              &nbsp;
              <b-button
                v-b-tooltip.hover.top="'Ubah'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                @click="showUpdateModal(data.item.subservice_id)"
              >
                <feather-icon icon="EditIcon" size="16" />
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
    <!-- <b-row v-else>
      <b-col>
        <b-card>
          <h5 class="text-center">
            Data tidak ditemukan
          </h5>
        </b-card>
      </b-col>
    </b-row> -->

    <!-- Modal Tambah -->
    <b-modal
      id="modalTambah"
      ref="modal"
      title="Tambah Service Subservice"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="save"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- <div class="p-1 text-center" v-show="!getDetailSubServiceSuccessed">
          <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
        </div> -->

        <!-- v-show="getDetailSubServiceSuccessed" -->
        <div>
          <b-form-group label-cols="4" label="Service" label-for="service">
            <b-form-input></b-form-input>
            <!-- <b-form-input
              id="service"
              v-model="detailSubService.service_name"
              class="font-weight-bold"
              autocomplete="off"
            /> -->
          </b-form-group>
          <!-- <b-form-group
            label-cols="4"
            label="Service Spektra"
            label-for="service_spektra"
          >
            <b-form-input
              id="service_spektra"
              :value="detailSubService.spectra_service_name"
              readonly
              class="font-weight-bold"
            />
          </b-form-group> -->
          <b-form-group
            label-cols="4"
            label="Sub Service"
            label-for="sub_service"
          >
            <b-form-input></b-form-input>
            <!-- <b-form-input
              id="sub_service"
              v-model="detailSubService.subservice_name"
              class="font-weight-bold"
              autocomplete="off"
            /> -->
          </b-form-group>
          <!-- <b-form-group
            label-cols="4"
            label="Sub Service Spektra"
            label-for="spectra_subservice"
          >
            <b-form-input
              id="spectra_subservice"
              :value="detailSubService.spectra_subservice_name"
              class="font-weight-bold"
              readonly
            />
          </b-form-group> -->
        </div>
      </form>
    </b-modal>

    <!-- Modal -->
    <b-modal
      id="modalDetail"
      ref="modal"
      title="Detail Service Subservice"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <!-- <div class="p-1 text-center" v-show="!getDetailSubServiceSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div> -->

      <!-- v-show="getDetailSubServiceSuccessed" -->
      <div>
        <b-form-group label-cols="4" label="Service" label-for="service">
          <b-form-input
            readonly
          >    
          </b-form-input>
          <!-- <b-form-input
            id="service"
            plaintext
            :value="detailSubService.service_name"
            class="font-weight-bold"
          /> -->
        </b-form-group>
        <!-- <b-form-group
          label-cols="4"
          label="Service Spektra"
          label-for="service_spektra"
        >
          <b-form-input
            id="service_spektra"
            plaintext
            :value="detailSubService.spectra_service_name"
            class="font-weight-bold"
          />
        </b-form-group> -->
        <b-form-group
          label-cols="4"
          label="Sub Service"
          label-for="sub_service"
        >
          <b-form-input
            readonly
          >    
          </b-form-input>
          <!-- <b-form-input
            id="sub_service"
            plaintext
            :value="detailSubService.subservice_name"
            class="font-weight-bold"
          /> -->
        </b-form-group>
        <!-- <b-form-group
          label-cols="4"
          label="Sub Service Spektra"
          label-for="spectra_subservice"
        >
          <b-form-input
            id="spectra_subservice"
            plaintext
            :value="detailSubService.spectra_subservice_name"
            class="font-weight-bold"
          />
        </b-form-group> -->
      </div>
    </b-modal>

    <!-- Modal Edit -->
    <b-modal
      id="modalEdit"
      ref="modal"
      title="Edit Service Subservice"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="update"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- <div class="p-1 text-center" v-show="!getDetailSubServiceSuccessed">
          <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
        </div> -->

        <!-- v-show="getDetailSubServiceSuccessed" -->
        <div>
          <b-form-group label-cols="4" label="Service" label-for="service">
            <b-form-input></b-form-input>
            <!-- <b-form-input
              id="service"
              v-model="detailSubService.service_name"
              class="font-weight-bold"
              autocomplete="off"
            /> -->
          </b-form-group>
          <!-- <b-form-group
            label-cols="4"
            label="Service Spektra"
            label-for="service_spektra"
          >
            <b-form-input
              id="service_spektra"
              :value="detailSubService.spectra_service_name"
              readonly
              class="font-weight-bold"
            />
          </b-form-group> -->
          <b-form-group
            label-cols="4"
            label="Sub Service"
            label-for="sub_service"
          >
            <b-form-input></b-form-input>
            <!-- <b-form-input
              id="sub_service"
              v-model="detailSubService.subservice_name"
              class="font-weight-bold"
              autocomplete="off"
            /> -->
          </b-form-group>
          <!-- <b-form-group
            label-cols="4"
            label="Sub Service Spektra"
            label-for="spectra_subservice"
          >
            <b-form-input
              id="spectra_subservice"
              :value="detailSubService.spectra_subservice_name"
              class="font-weight-bold"
              readonly
            />
          </b-form-group> -->
        </div>
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
//   BSpinner,
  BModal,
  BListGroup,
  BListGroupItem,
  VBTooltip,
} from 'bootstrap-vue'

import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

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
    // BSpinner,
    BModal,
    BListGroup,
    BListGroupItem,
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
        { key: 'name', label: 'Service' },
        // { key: 'spectra_service_name', label: 'Service Spektra' },
        { key: 'subservice_name', label: 'Sub Service' },
        // { key: 'spectra_subservice_name', label: 'Sub Service Spektra' },
        // { key: 'action', label: 'Aksi', tdClass: 'Td-Action-2 text-right' },
        { key: 'action', label: 'Aksi', tdClass: 'Td-Action-2' },
      ],
      items: [],
      itemss: [
        { no: 1, service_name: 'Broadcast', subservice_name: 'TV'},
        { no: 2, service_name: 'Broadcast', subservice_name: 'FM'},
      ],
      selectedidSubService: null,
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: true,

      // Data Detail
      detailSubService: {},
      showDetailContent: false,
      getDetailSubServiceSuccessed: false,
      showDetailSubService: true,
      itemsSub: [],
      subserviceNameData: [],
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
    this.getService()
  },
  methods: {
    resetSearch() {
      this.filter = ''
      this.perPage = 10
      this.currentPage = 1
      this.getDataTable()
    },
    showTambahModal() {
    //   this.detail()
      this.$bvModal.show('modalTambah')
    },
    showDetailModal(idSubService) {
      this.detail(idSubService)
      this.$bvModal.show('modalDetail')
    },
    async detail(idSubService) {
      this.getDetailSubServiceSuccessed = false
      this.showDetailSubService = true
      await axios({
        url: URLServices.service_subservice.getData,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          subservice_id: idSubService,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType}, ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailSubService] = result.data.data
          this.getDetailSubServiceSuccessed = true
          this.showDetailSubService = false
        })
        .catch(error => {
          this.showDetailSubService = false
          // const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Gagal memperbaharui data', `Mohon coba kembali [${error.response.status}`)
          // console.log('x')
          // this.$toast({
          //   component: ToastificationContent,
          //   props: {
          //     title: errorMessage,
          //     icon: 'WarningIcon',
          //     variant: 'warning',
          //   },
          // })
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'session-time-out' })
          // }
        })
    },
    showUpdateModal(idSubService) {
      this.selectedidSubService = idSubService
      this.detail(idSubService)
      this.$bvModal.show('modalEdit')
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
        if (filter) this.perPage = 50
        params.length = perPage
      }

      params.request_id = uuid.v4()
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
        url: URLServices.service_subservice.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.totalRows = recordsTotal
          this.isBusy = false
        })
        .catch(() => {
          // console.log(error)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'login' })
          // }
          this.showTable = false
          CustomNotification.notif('error', 'Gagal memperbaharui data', 'Mohon coba kembali')
        })
    },

    async getService() {
      this.showTable = true
      this.isBusy = true
      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage,
      )
      await axios({
        url: URLServices.service.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.totalRows = recordsTotal
          this.isBusy = false
          // console.log(this.items)
          const a = {}
          const b = {}
          Object.keys(this.items).forEach(key => {
          a[key] = this.items[key].id
          b[key] = this.items[key].name
          this.getSubservice(a[key], b[key])
          })
        })
        .catch(() => {
          // console.log(error)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'login' })
          // }
          this.showTable = false
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
        })
    },

    async getSubservice(serviceId, serviceName) {
      // this.showTable = true
      // this.isBusy = true
      await axios({
        url: URLServices.service_subservice.index,
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
          search: '',
          service_id: serviceId,
        },
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.itemsSub = data
          this.totalRows = recordsTotal
          // this.isBusy = false

          const subServName = {}
          // // console.log(serviceName)
          Object.keys(this.itemsSub).forEach(key => {
            subServName[key] = this.itemsSub[key].name
          //   this.serviceSubserviceData = subServName[key]
          })

          this.subserviceNameData.push(
            {
              name: serviceName,
              subservice_name: subServName,
            },
          )
          // console.log(this.subserviceNameData)
          // console.log(serviceName, subServName)
        })
        .catch(() => {
          // console.log(error)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData'
          //   this.$router.go({ name: 'login' })
          // }
          // this.showTable = false
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
        })
    },

    save() {

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
    resetModalDetail() {
      this.userData = {}
      this.getDetailSubServiceSuccessed = false
      this.title = {
        detail: 'Detail user ...',
      }
    },
    update() {
      axios({
        url: URLServices.service_subservice.update,
        data: {
          request_id: 'guid_v4',
          subservice_id: this.selectedidSubService,
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          data: {
            service_name: this.detailSubService.service_name,
            subservice_name: this.detailSubService.subservice_name,
          },
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil memperbaharui data')
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
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
        })
    },
  },
}
</script>
