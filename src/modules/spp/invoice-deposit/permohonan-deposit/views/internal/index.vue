<template>
  <div>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="light" :to="{ name: 'add-permohonan-deposit' }" class="mr-1 text-primary">
          <feather-icon icon="PlusIcon" /> Tambah
        </b-button>
        <b-button variant="light" @click="seen = !seen; filter = ''; getDataTable" v-if="showTable" class="mr-1 text-primary">
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
            <template #cell(id)="data">
              <b-button
                v-if="data.item.review_status === 'DITOLAK'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{
                  name: 'detail-permohonan-deposit',
                  params: { detailDepositId: data.item.id,idClientDeposit: data.item.client_id, SubmissionDepositId: data.item.desposit_usage_submission_id },
                }"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <b-button
                v-if="data.item.review_status === 'DISETUJUI'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{
                  name: 'detail-permohonan-deposit',
                  params: { detailDepositId: data.item.id,idClientDeposit: data.item.client_id,SubmissionDepositId: data.item.desposit_usage_submission_id },
                }"
              >
                <feather-icon icon="ZoomInIcon" size="16" />
              </b-button>
              <b-button
                v-if="data.item.review_status === 'MENUNGGU PERSETUJUAN'"
                variant="light"
                btn-sm
                class="btn-sm text-primary"
                :to="{
                  name: 'approve-permohonan-deposit',
                  params: {detailDepositApproveId: data.item.id,idClientDeposit: data.item.client_id },
                }"
              >
                <feather-icon icon="CheckCircleIcon" size="16" />
              </b-button>
            </template>
            <template #cell(appeal_letter_publish_date)="data">
              {{ convDate(data.item.appeal_letter_publish_date) }}
            </template>
            <template #cell(invoice_total_amount)="data">
              {{ Number(data.item.invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
            </template>
            <template #cell(deposit_usage_amount)="data">
              {{ Number(data.item.deposit_usage_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
            </template>
            <template #cell(invoice_remaining_amount)="data">
              {{ Number(data.item.invoice_remaining_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
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
      title="Detail Deposit"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >
      <div class="p-1 text-center" v-show="getDetailUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>
      <div v-show="!getDetailUserSuccessed">
        <b-card-text>
          <h5 class="text-primary mt-2">DETAIL</h5>
        </b-card-text>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Nomor Surat Permohonan" label-for="nik">
              <b-form-input
                id=""
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tanggal Surat"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="1-Agustus-2021"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Client" label-for="nik">
              <b-form-input
                id=""
                plaintext
                value="Telkomsel"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nilai Deposit"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="Rp. 30.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="No. SPP" label-for="spp">
              <b-form-input
                id="spp"
                plaintext
                value="SPP-04-02-02"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nilai SPP"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="Rp. 250.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <!-- <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Bank"
              label-for=""
            >
              <b-form-input
                id=""
                value="Mandiri"
                class="font-weight-bold"
                plaintext
              />
            </b-form-group>
          </b-col> -->
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Kurang Bayar"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="Rp. 220.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <hr class="my-1"/>
        <b-card-text>
          <h5 class="text-primary">REVIEW PERMOHONAN PENGUNAAN DEPOSIT</h5>
            Untuk menyetujui penggunaan deposit ini, pilih 'Setuju' dan klik tombol 'simpan'
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
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="Nomor Surat Keputusan"
              label-for=""
            >
              <b-form-input />
            </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
          <b-form-group
            label="Tgl Surat Permohonan"
            label-cols="3"
          >
            <b-form-datepicker
                  id="tgl_Surat_Permohonan"
                  v-model="tgl_Surat_Permohonan"
                  locale="id"
                />
          </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="Catatan Keputusan"
              label-for=""
            >
              <b-form-input />
            </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="File Surat Keputusan"
              label-for=""
            >
              <b-form-file />
            </b-form-group>
          </b-col>
          </b-row>
        </b-card-text>
      </div>
    </b-modal>

        <!-- Modal Approve dan Detail -->
    <b-modal
      id="modalApprove"
      ref="modal"
      size="lg"
      title="Permohonan Detail Pengguna Deposit"
      modal-class="modal-primary"
      ok-title="Simpan"
      cancel-title="Batal"
      @ok="resetModalApprove"
      @hidden="resetModalApprove"
    >
      <div class="p-1 text-center" v-show="getApproveUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>
      <div v-show="!getApproveUserSuccessed">
        <b-card-text>
          <h5 class="text-primary mt-2">DETAIL</h5>
        </b-card-text>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Nomor Surat Permohonan" label-for="nik">
              <b-form-input
                id=""
                plaintext
                value="REQ-PENGGUNA-DEP-001"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tanggal Surat"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="1-Agustus-2021"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Client" label-for="nik">
              <b-form-input
                id=""
                plaintext
                value="Telkomsel"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nilai Deposit"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="Rp. 30.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="No. SPP" label-for="spp">
              <b-form-input
                id="spp"
                plaintext
                value="SPP-04-02-02"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nilai SPP"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="Rp. 250.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <!-- <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Bank"
              label-for=""
            >
              <b-form-input
                id=""
                value="Mandiri"
                class="font-weight-bold"
                plaintext
              />
            </b-form-group>
          </b-col> -->
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Kurang Bayar"
              label-for=""
            >
              <b-form-input
                id=""
                plaintext
                value="Rp. 220.000.000"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <hr class="my-1"/>
        <b-card-text>
          <b-row>
            <b-col>
              <b-table
                id="tableData"
                striped
                hover
                class="position-relative bg-white"
                :items="dataField"
                :fields="fieldApprove"
              >
                <template #cell(field6)="dataField">
                  <b-form-input
                    :id="'Amountid' + dataField.index"
                    class="font-weight-bold"
                  />
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" lg="8" md="8">
              <b-form-group
                class="mb-2"
                label="Kurang Bayar"
                label-cols="4"
              >
                <b-input-group prepend="Rp.">
                  <b-form-input class="text-right" value=" "/>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-text>
        <b-card-text>
          <h5 class="text-primary">REVIEW PERMOHONAN PENGUNAAN DEPOSIT</h5>
            Untuk menyetujui penggunaan deposit ini, pilih 'Setuju' dan klik tombol 'simpan'
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
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="Nomor Surat Keputusan"
              label-for=""
            >
              <b-form-input />
            </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
          <b-form-group
            label="Tgl Surat Permohonan"
            label-cols="3"
          >
            <b-form-datepicker
                  id="tgl_Surat_Permohonan"
                  v-model="tgl_Surat_Permohonan"
                  locale="id"
                />
          </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="Catatan Keputusan"
              label-for=""
            >
              <b-form-input />
            </b-form-group>
          </b-col>
          <b-col lg="12" sm="12">
            <b-form-group
              label-cols="3"
              label="File Surat Keputusan"
              label-for=""
            >
              <b-form-file />
            </b-form-group>
          </b-col>
          </b-row>
        </b-card-text>
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
            <feather-icon icon="InfoIcon"></feather-icon> User yang telah
            dihapus tidak dapat dikembalikan. Klik tombol Hapus User untuk
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
  BFormRadio,
  BFormFile,
  BFormDatepicker,
} from 'bootstrap-vue'

import moment from 'moment'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

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
    BFormRadio,
    BFormFile,
    BFormDatepicker,
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
        { key: 'appeal_letter_publish_date', label: 'Tanggal Surat' },
        { key: 'client_id', label: 'Id Pelanggan' },
        { key: 'client_name', label: 'Pelanggan' },
        // { key: 'bank', label: 'Bank' },
        { key: 'invoice_id', label: 'Id Invoice' },
        { key: 'invoice_number', label: 'Nomor Invoice' },
        { key: 'invoice_total_amount', label: 'Nilai Invoice' },
        { key: 'deposit_usage_amount', label: 'Nilai Deposit' },
        { key: 'invoice_remaining_amount', label: 'Kurang Bayar' },
        { key: 'review_status', label: 'Status' },
        { key: 'id', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      // ID
      // ID
      detailDepositId: this.$route.params.detailDepositId,

      // Tabel Detail Posisi per User
      detailUser: {},
      showDetailContent: false,
      fieldsDetail: [
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: true,

      // Tabel Approve Posisi per User
      approveUser: {},
      showApproveContent: false,
      fieldsApprove: [
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
        { key: '', label: '', sortable: true },
      ],
      itemsApprove: [],
      getApproveUserSuccessed: false,
      showApproveUser: true,
      // DATA TABEL APPROVE
      fieldApprove: [
        { key: 'field1', label: 'No' },
        { key: 'field2', label: 'Nomor Surat Keputusan' },
        { key: 'field3', label: 'Tgl. Surat' },
        { key: 'field4', label: 'Client' },
        // { key: 'field5', label: 'Bank' },
        { key: 'field6', label: 'Nilai Deposit' },
      ],
      dataField: [
        {
          field1: '1',
          field2: 'SK-REV-001',
          field3: '31 Januari 2021',
          field4: 'Telkomsel',
          field5: 'Mandiri',
          field6: '20.000.000',
        },
        {
          field1: '2',
          field2: 'SK-REV-002',
          field3: '31 Februari 2021',
          field4: 'Telkomsel',
          field5: 'BRI',
          field6: '30.000.000',
        },
        {
          field1: '',
          field2: 'Total Penggunaan Deposit',
          field3: '',
          field4: '',
          field5: '',
          field6: '40.000.000',
        },
      ],
      tgl_Surat_Permohonan: null,
      Selected: null,
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
    async approve() {
      this.getApproveUserSuccessed = false
      this.showApproveUser = true
      this.$bvModal.show('modalApprove')
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
        url: URLServices.depositRequest.index,
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
          this.showTable = true
          // this.showTable = false
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
    onReset() {
      this.filter = ''
      this.getDataTable()
    },
    onFiltered() {
      // this.totalRows = filteredItems.length
      // this.currentPage = 1
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
    resetModalApprove() {
      this.userData = {}
      this.getApproveUserSuccessed = false
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
