<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button
          variant="primary"
          @click="showTambahModal()"
          class="mr-1"
        >
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button
          variant="light"
          @click="
            seen = !seen
            filter = ''
            getAllService
          "
          v-if="showTable"
          class="mr-1 text-primary"
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
        <div class="d-flex justify-content-between flex-wrap" v-if="seen">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                id="filterInput"
                v-model="filter"
                v-debounce:500ms="getAllService"
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
            <template #cell(role_name)="data">
              <!-- <div> -->
              <b-list-group>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  {{ data.item.role_name }}
                  <div>
                    <b-button
                      btn-sm
                      class="btn-sm text-primary"
                      variant="light"
                      v-b-tooltip.hover.top="'Edit Group'"
                      @click="showUpdateServiceModal(data.item.role_id, data.item.role_name)"
                    >
                      <feather-icon icon="EditIcon" />
                    </b-button>
                    <b-button
                      btn-sm
                      class="btn-sm text-primary ml-1"
                      variant="warning"
                      v-b-tooltip.hover.top="'Hapus Service'"
                      @click="showDelete(data.item.role_id, data.item.role_name)"
                    >
                      <feather-icon icon="TrashIcon" />
                    </b-button>
                  </div>
                </b-list-group-item>
              </b-list-group>
              <!-- </div> -->
            </template>
            <template #cell(menu_list)="data">
              <div
                v-if="data.item.menu_list.length === 0"
                class="text-muted text-center"
              >
                Kosong
              </div>
              <div v-else>
                <b-list-group style="max-height: 200px; overflow-y: auto;">
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                    v-for="(value, indexMenuListParent) in data.item.menu_list"
                    :key="indexMenuListParent"
                  >
                    {{ value.menu_name }}
                    <!--
                      <div>
                        <b-button
                          btn-sm
                          class="btn-sm text-secondary"
                          variant="warning"
                          v-b-tooltip.hover.top="'Hapus Subservice'"
                          @click="showDeleteSub(data.item.data_subservice[index].subservice_id)"
                        >
                          <feather-icon icon="TrashIcon" />
                        </b-button>
                      </div>
                    -->
                  </b-list-group-item>
                </b-list-group>
              </div>

              <div class="text-center">
                <b-button
                  btn-sm
                  class="btn-sm mt-1"
                  variant="primary"
                  @click="showTambahModalSubService(data.item.role_id, data.item.menu_list, data.item.role_name)"
                >
                  <feather-icon
                    :icon="
                      data.item.menu_list && data.item.menu_list.length === 0 ? 'PlusIcon' : 'EditIcon'
                    "
                  />
                  Hak Akses
                </b-button>
              </div>
            </template>
            <template #cell(user_list)="data">
              <div
                v-if="data.item.user_list.length === 0"
                class="text-muted text-center"
              >
                Kosong
              </div>
              <div v-else>
                <b-list-group style="max-height: 200px; overflow-y: auto;">
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                    v-for="(value, index) in data.item.user_list"
                    :key="index"
                  >
                    {{ value.full_name }}
                    <!--
                      <div>
                        <b-button
                          btn-sm
                          class="btn-sm text-secondary"
                          variant="warning"
                          v-b-tooltip.hover.top="'Hapus Subservice'"
                          @click="showDeleteSub(data.item.data_subservice[index].subservice_id)"
                        >
                          <feather-icon icon="TrashIcon" />
                        </b-button>
                      </div>
                    -->
                  </b-list-group-item>
                </b-list-group>
              </div>
              <div class="text-center">
                <b-button
                  btn-sm
                  class="btn-sm mt-1"
                  variant="primary"
                  @click="showUbahUser(data.item.role_id, data.item.user_list, data.item.role_name)"
                >
                  <feather-icon
                    :icon="
                      data.item.user_list.length === 0 ? 'PlusIcon' : 'EditIcon'
                    "
                  />
                  User
                </b-button>
              </div>
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
            Data tidak ditemukan <feather-icon icon="FrownIcon" />
          </h5>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal Tambah -->
    <b-modal
      id="modalTambah"
      ref="modal"
      title="Tambah Group"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="save"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div>
          <b-form-group
            label-cols="4"
            label="Nama Group*"
            label-for="group_name"
            invalid-feedback="'Id Service Spektra' is required"
          >
            <b-form-input
              id="group_name"
              v-model="GroupName"
              autocomplete="off"
            />
          </b-form-group>
        </div>
      </form>
    </b-modal>

    <!-- Modal Edit -->
    <b-modal
      id="modalEdit"
      ref="modal"
      title="Edit Group"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="update('group')"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="p-1 text-center" v-show="saveStatus">
          <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
        </div>

        <div v-show="!saveStatus">
          <div>
            <b-form-group
              label-cols="4"
              label="Nama Group"
              label-for="nama_group_edit"
            >
              <b-form-input
                id="nama_group_edit"
                v-model="selectedGroupName"
                autocomplete="off"
              />
            </b-form-group>
          </div>
        </div>
      </form>
    </b-modal>

    <!-- Modal Ubah Akses -->
    <b-modal
      id="modalUbahAkses"
      ref="modal"
      title="Tambah Hak Akses"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="update('menu')"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div>
          <b-form-group
            label-cols="4"
            label="Nama Group"
            label-for="nama_group"
          >
            <b-form-input id="nama_group" v-model="SelectedGroupName" readonly />
          </b-form-group>
          <h5 class="text-primary">Hak Akses</h5>
          <div class="scroll-max-300">
            <b-form-group
              label-cols="1"
              v-for="(val, indexMenuList) in SelectedMenuList"
              :label="'#' + (indexMenuList + 1)"
              :key="indexMenuList"
              :label-for="'hak_akses' + indexMenuList"
            >
              <b-row>
                <b-col md="10" sm="10" lg="10">
                  <v-select
                    :id="'hak_akses' + indexMenuList"
                    :options="HakAkses"
                    label="menu_name"
                    :reduce="HakAkses => HakAkses.menu_id"
                    v-model="SelectedMenuList[indexMenuList].menu_id"
                  />
                </b-col>
                <b-col>
                  <b-button
                    size="sm"
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    variant="danger"
                    @click="removeItem('menu', indexMenuList)"
                    v-if="SelectedMenuList.length !== 1"
                    class="mr-1"
                  >
                    <feather-icon icon="TrashIcon"/>
                  </b-button>
                </b-col>
              </b-row>
            </b-form-group>
          </div>
          <b-button
            size="sm"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-success"
            @click="repeateAgain('menu')"
            class="float-right m-1"
          >
            <feather-icon icon="PlusIcon"/>
          </b-button>
        </div>
      </form>
    </b-modal>

    <b-modal
      id="modalUbahUser"
      ref="modal"
      title="Ubah User"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="update('user')"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div>
          <b-form-group
            label-cols="4"
            label="Nama Group"
            label-for="nama_group"
          >
            <b-form-input id="nama_group" v-model="SelectedGroupName" readonly />
          </b-form-group>
          <h5 class="text-primary">User List</h5>
          <div class="scroll-max-300">
            <b-form-group
              label-cols="1"
              v-for="(val, indexUserList) in SelectedUserList"
              :label="'#' + (indexUserList + 1)"
              :key="indexUserList"
              :label-for="'hak_akses' + indexUserList"
            >
              <b-row>
                <b-col md="9" sm="9" lg="9">
                  <v-select
                    :id="'hak_akses' + indexUserList"
                    :options="UserList"
                    label="full_name"
                    :reduce="UserList => UserList.user_id"
                    v-model="SelectedUserList[indexUserList].user_id"
                  />
                </b-col>
                <b-col>
                  <b-button
                    size="sm"
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    variant="danger"
                    @click="removeItem('user', indexUserList)"
                    v-if="UserList.length !== 1"
                    class="mr-1"
                  >
                    <feather-icon icon="TrashIcon"/>
                  </b-button>
                </b-col>
              </b-row>
            </b-form-group>
          </div>
          <b-button
            size="sm"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-success"
            @click="repeateAgain('user')"
            class="float-right m-1"
          >
            <feather-icon icon="PlusIcon"/>
          </b-button>
        </div>
      </form>
    </b-modal>

    <!-- Modal -->
    <b-modal
      id="modalDetail"
      ref="modal"
      title="Detail Sub Service"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <div class="p-1 text-center" v-show="!getDetailSubServiceSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>

      <div v-show="getDetailSubServiceSuccessed">
        <b-form-group label-cols="4" label="Service" label-for="service">
          <b-form-input
            id="service"
            plaintext
            :value="detailSubService.service_name"
            />
        </b-form-group>
        <b-form-group
          label-cols="4"
          label="Service Spektra"
          label-for="service_spektra"
        >
          <b-form-input
            id="service_spektra"
            plaintext
            :value="detailSubService.spectra_service_name"
            />
        </b-form-group>
        <b-form-group
          label-cols="4"
          label="Sub Service"
          label-for="sub_service"
        >
          <b-form-input
            id="sub_service"
            plaintext
            :value="detailSubService.subservice_name"
            />
        </b-form-group>
        <b-form-group
          label-cols="4"
          label="Sub Service Spektra"
          label-for="spectra_subservice"
        >
          <b-form-input
            id="spectra_subservice"
            plaintext
            :value="detailSubService.spectra_subservice_name"
            />
        </b-form-group>
      </div>
    </b-modal>

    <!-- Modal Edit Subservice -->
    <b-modal
      id="modalEditSubservice"
      ref="modal"
      title="Edit Group"
      modal-class="modal-primary"
      ok-title="Ubah"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="updateSubservice"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="p-1 text-center" v-show="!getDetailSubServiceSuccessed">
          <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
        </div>

        <div v-show="getDetailSubServiceSuccessed">
          <div>
            <b-form-group
              label-cols="4"
              label="Id Subservice Spektra"
              label-for="id-spek-sub-service"
            >
              <b-form-input
                id="id-spek-sub-service"
                v-model="detailSubService.spectraSubServiceId"
                autocomplete="off"
                readonly
              />
            </b-form-group>
            <b-form-group
              label-cols="4"
              label="Subservice Spektra"
              label-for="sub-service-spektra"
            >
              <b-form-input
                id="sub-service-spektra"
                v-model="detailSubService.spectraSubServiceName"
                autocomplete="off"
              />
            </b-form-group>
            <b-form-group
              label-cols="4"
              label="Sub Service"
              label-for="sub-service"
            >
              <b-form-input
                id="sub-service"
                v-model="detailSubService.subServiceName"
                autocomplete="off"
              />
            </b-form-group>
          </div>
        </div>
      </form>
    </b-modal>

    <!-- Modal hapus -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="title.delete"
      modal-class="modal-primary"
      ok-title="Hapus"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteData"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus data ini"
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
            <feather-icon icon="InfoIcon" /> Data yang telah
            dihapus tidak dapat dikembalikan. Klik tombol "Hapus" untuk
            melanjutkan
          </small>
        </b-alert>
      </form>
    </b-modal>
    <b-modal
      id="modalDeleteSub"
      ref="modal"
      :title="title.delete"
      modal-class="modal-primary"
      ok-title="Hapus"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteDataSub"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus data ini"
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
            <feather-icon icon="InfoIcon" /> Data yang telah
            dihapus tidak dapat dikembalikan. Klik tombol "Hapus" untuk
            melanjutkan
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
  VBTooltip,
  BListGroup,
  BListGroupItem,
  BFormTextarea,
  BAlert,
} from 'bootstrap-vue'

import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import Ripple from 'vue-ripple-directive'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { URLServices, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import VSelect from 'vue-select'

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
    BListGroup,
    BListGroupItem,
    BFormTextarea,
    BAlert,
    VSelect,
  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      User: ['Bagus Saja', 'Test1', 'Test2'],
      HakAkses: [],
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
        { key: 'role_name', label: 'Nama Group' },
        { key: 'menu_list', label: 'Hak Akses' },
        { key: 'user_list', label: 'User Terdaftar' },
      ],
      fieldsSubservice: [
        { key: 'subservice_name', label: 'Sub Service Name' },
        { key: 'action', label: 'Aksi', class: 'text-center' },
      ],
      items: [],
      itemsSub: [],
      selectedidSubService: null,
      selectedidService: null,
      selectedGroupName: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: true,

      // Data Detail
      detailSubService: {},
      detailService: {},
      showDetailContent: false,
      getDetailSubServiceSuccessed: false,
      showDetailSubService: true,

      serviceSubserviceData: [],
      subserviceNameData: [],

      spectraServiceId: '',
      GroupName: '',
      serviceName: '',
      subServiceId: '',
      subServiceName: '',
      aServiceId: '',
      spectraSubServiceId: '',
      spectraSubServiceName: '',
      stateIdSpectra: null,
      nameOfService: null,
      stateIdSubservice: null,
      stateSubserviceName: null,
      selectedServiceId: null,
      selectedSubserviceId: null,
      saveStatus: false,
      SelectedMenuList: [],
      UserList: [],
      SelectedUserList: [],
      SelectedGroupName: null,
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
    this.getAllService()
    this.getHakAkses()
    this.getUserList()
  },
  methods: {
    resetSearch() {
      this.filter = ''
      this.perPage = 10
      this.currentPage = 1
      this.getAllService()
    },
    showTambahModal() {
      this.$bvModal.show('modalTambah')
    },
    showUpdateServiceModal(idService, sSName) {
      this.selectedidService = idService
      this.selectedGroupName = sSName
      this.$bvModal.show('modalEdit')
    },
    showTambahModalSubService(idServ, menuList, Name) {
      if (menuList && menuList.length === 0) {
        const NewmenuList = []
        NewmenuList.push({ menu_id: null })
        this.SelectedMenuList = NewmenuList
      } else {
        this.SelectedMenuList = menuList
      }
      this.selectedidService = idServ
      this.SelectedGroupName = Name
      this.$bvModal.show('modalUbahAkses')
    },
    showUbahUser(idServ, UserList, Name) {
      if (UserList && UserList.length === 0) {
        const NewUserList = []
        NewUserList.push({ user_id: null })
        this.SelectedUserList = NewUserList
      } else {
        this.SelectedUserList = UserList
      }
      this.selectedidService = idServ
      this.SelectedGroupName = Name
      this.$bvModal.show('modalUbahUser')
    },
    showDetailModal(idSubService) {
      this.detail(idSubService)
      this.$bvModal.show('modalDetail')
    },
    showUpdateSubServiceModal(idSubService, idServ) {
      this.selectedidService = idServ
      this.selectedidSubService = idSubService
      this.getDetailSubservices(this.selectedidSubService)
      this.$bvModal.show('modalEditSubservice')
    },
    async detail(idService) {
      this.getDetailSubServiceSuccessed = false
      this.showDetailSubService = true
      await axios({
        url: URLServices.service.getData,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: idService,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          [this.detailService] = result.data.data
          this.detailService.aServiceId = result.data.data[0].id
          this.detailService.serviceName = result.data.data[0].name
          this.detailService.spectraServiceId = result.data.data[0].spectra_service_id
          this.detailService.GroupName = result.data.data[0].spectra_Service_name
          this.getDetailSubServiceSuccessed = true
          this.showDetailSubService = false
        })
        .catch(error => {
          console.log(error)
          console.log('x')
          // const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
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
    async getDetailSubservices(idSubService) {
      this.getDetailSubServiceSuccessed = false
      this.showDetailSubService = true
      await axios({
        url: URLServices.subservice.getData,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: idSubService,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          const detailSubServ = result.data.data
          this.detailSubService.subServiceId = detailSubServ.id
          this.detailSubService.subServiceName = detailSubServ.name
          this.detailSubService.spectraSubServiceId = detailSubServ.spectra_subservice_id
          this.detailSubService.spectraSubServiceName = detailSubServ.spectra_subservice_name
          console.log('this', this.detailSubService.subServiceName)
          this.getDetailSubServiceSuccessed = true
          this.showDetailSubService = false
        })
        .catch(error => {
          console.log(error)
          console.log('x')
          // const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
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
    getRequestParams(filter, currentPage, perPage) {
      const params = {}

      if (filter) {
        params.search = filter
      }

      if (currentPage) {
        params.page = currentPage
      }

      if (perPage) {
        // if (filter) this.perPage = 50
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
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
        })
    },

    getAllService() {
      this.showTable = true
      this.isBusy = true
      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage,
      )
      axios({
        url: URLServices.role.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          this.items = response.data.data.role_list
          this.totalRows = response.data.recordsTotal
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
          CustomNotification.notif('error', 'Gagal memuat data. Mohon coba kembali')
        })
    },

    async getHakAkses() {
      await axios({
        url: URLServices.role.menu_list,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          this.HakAkses = result.data.data.menu_list
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

    async getUserList() {
      await axios({
        url: URLServices.role.user_list,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          this.UserList = result.data.data.user_list
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Gagal memperbaharui data', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },

    async getSubservice(serviceId) {
      // this.showTable = true
      // this.isBusy = true
      await axios({
        url: URLServices.subservice.index,
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

          // const subServName = {}
          // // console.log(serviceName)
          // Object.keys(this.itemsSubservice).forEach(key => {
          //   subServName[key] = this.itemsSubservice[key].name
          //   this.serviceSubserviceData = subServName[key]
          // })

          // this.subserviceNameData.push(
          //   {
          //     name: serviceName,
          //     subservice_name: subServName,
          //   },
          // )
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
    removeItem(type, index) {
      if (type === 'menu') {
        this.SelectedMenuList.splice(index, 1)
      } else {
        this.SelectedUserList.splice(index, 1)
      }
      // this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },
    repeateAgain(type) {
      if (type === 'menu') {
        this.SelectedMenuList.push({
          index: (this.nextTodoId += this.nextTodoId),
        })
      } else {
        this.SelectedUserList.push({
          index: (this.nextTodoId += this.nextTodoId),
        })
      }

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.div[0].offsetHeight)
      })
    },
    async showDelete(paramId, RoleName) {
      if (paramId) {
        this.selectedServiceId = paramId
        this.title = {
          delete: `Apakah anda ingin menghapus group '${RoleName}'?`,
        }
      }
      this.$bvModal.show('modalDelete')
    },
    async showDeleteSub(paramId) {
      if (paramId) {
        this.selectedSubserviceId = paramId
        this.title = {
          delete: `Apakah anda ingin menghapus data subservice ${paramId}?`,
        }
      }
      this.$bvModal.show('modalDeleteSub')
    },

    handlePageChange(value) {
      this.currentPage = value
      this.getAllService()
      // this.getService()
    },

    handlePageSizeChange(value) {
      this.perPage = value
      this.currentPage = 1
      this.getAllService()
      // this.getService()
    },

    tableRefresh() {
      this.getAllService()
      // this.$root.$emit('bv::refresh::table', 'tableData')
    },
    onReset() {
      this.filter = ''
      this.getAllService()
      // this.getService()
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
      //   // Trigger pagination to update the number of buttons/pages due to filtering
      //   this.totalRows = filteredItems.length
      //   this.currentPage = 1
    },
    // checkFormValidity() {
    //   const valid = this.$refs.form.checkValidity()
    //   this.nameState = valid
    //   return valid
    // },
    resetModal() {
      this.name = ''
      this.stateIdSpectra = null
      this.spectraServiceId = ''
      this.nameOfService = null
      this.serviceName = ''
      this.deleteReason = ''
    },
    resetModalDetail() {
      this.userData = {}
      this.getDetailSubServiceSuccessed = false
      this.title = {
        detail: 'Detail user ...',
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.stateIdSpectra = valid
      this.nameOfService = valid
      this.stateIdSubservice = valid
      this.stateSubserviceName = valid
      return valid
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modalTambah')
        this.$bvModal.hide('modalUbahAkses')
      })
    },
    async save(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()

      await axios({
        url: URLServices.role.store,
        data: {
          request_id: uuid.v4(),
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          data: {
            role_name: this.GroupName,
          },
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menambah data Group', 'Tabel akan direload')
            this.$bvModal.hide('modalTambah')
            this.getAllService()
          } else {
            CustomNotification.notif('warning', response.data.response_message, 'Mohon coba kembali')
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('error', 'Gagal menyimpan data', 'Mohon coba kembali')
        })
    },
    saveSubService() {},
    resetForm() {
      this.spectraSubServiceId = ''
      this.subServiceName = ''
    },
    // spectra_service_id: ,
    // spectra_service_name: ,
    async update(type) {
      const DynamicData = {}

      switch (type) {
        case 'group':
          DynamicData.role_name = this.selectedGroupName
          break
        case 'menu':
          DynamicData.menu_list = []
          Object.keys(this.SelectedMenuList).forEach(key => {
            DynamicData.menu_list.push({
              menu_id: this.SelectedMenuList[key].menu_id,
            })
          })
          break
        case 'user':
          DynamicData.user_list = []
          Object.keys(this.SelectedUserList).forEach(key => {
            DynamicData.user_list.push({
              user_id: this.SelectedUserList[key].user_id,
            })
          })
          break
        default:
          break
      }

      await axios({
        url: URLServices.role.update,
        data: {
          request_id: uuid.v4(),
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          role_id: this.selectedidService,
          data: DynamicData,
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil memperbaharui data', 'Tabel akan direload')
            this.$bvModal.hide('modalEdit')
            this.getAllService()
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
          CustomNotification.notif('error', 'Gagal memperbaharui data', 'Mohon coba kembali')
        })
    },
    updateSubservice() {
      axios({
        url: URLServices.subservice.update,
        data: {
          request_id: uuid.v4(),
          subservice_id: this.detailSubService.subServiceId,
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          data: {
            spectra_subservice_id: this.detailSubService.spectraSubServiceId,
            spectra_subservice_name: this.detailSubService
              .spectraSubServiceName,
            subservice_name: this.detailSubService.subServiceName,
          },
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil memperbaharui data', 'Tabel akan direload')
            this.$bvModal.hide('modalEditSubservice')
            this.getAllService()
            // this.getService()
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
          CustomNotification.notif('error', 'Gagal memperbaharui data', 'Mohon coba kembali')
        })
    },
    requestParamsService() {
      const param = {}
      param.request_id = uuid.v4()
      param.role_id = this.selectedServiceId
      param.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      param.reason_for_deletion = this.deleteReason
      return param
    },
    requestParamsSubservice() {
      const param = {}
      param.request_id = uuid.v4()
      param.subservice_id = this.selectedSubserviceId
      param.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      param.reason_for_deletion = this.deleteReason

      return param
    },

    async deleteData() {
      // bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // console.log(0)

      let chooseParams = {}
      if (this.selectedServiceId) {
        chooseParams = this.requestParamsService()
      }

      await axios({
        url: URLServices.role.destroy,
        data: chooseParams,
        method: 'post',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('error', 'Berhasil menghapus data', 'Tabel akan direload')
            this.$bvModal.hide('modalDelete')
            this.getAllService()
          } else {
            CustomNotification.notif('error', 'Gagal', response.data.response_message)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('error', 'Gagal menghapus data', 'Mohon coba kembali')
        })
    },
    deleteDataSub(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      let chooseParams = {}
      if (this.selectedSubserviceId) {
        chooseParams = this.requestParamsSubservice()
      }

      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      axios({
        url: URLServices.subservice.delete,
        data: chooseParams,
        method: 'post',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil menghapus data!', 'Halaman akan direload')
            this.$bvModal.hide('modalDeleteSub')
            this.getAllService()
          } else {
            CustomNotification.notif('success', 'Gagal', response.data.response_message)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          CustomNotification.notif('success', 'Gagal menghapus data', 'Mohon coba kembali')
        })
    },
  },
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
.scroll-max-300 {
  overflow-y: auto;
  overflow-x: none;
  max-height: 300px;
  min-height: 150px;
  padding-bottom: 200px;
}
</style>
