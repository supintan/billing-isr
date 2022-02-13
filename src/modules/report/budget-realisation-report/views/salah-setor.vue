<template>
  <div>
    <h4 class="my-3 text-primary">
      Tabel Salah Setor
    </h4>
    <hr>
    <h5 class="my-5 text-danger">
      #1 Koreksi Dari SDPPI ke PPI
      <div class="float-right">
        <b-button
          v-if="showTable[0]"
          variant="light"
          class="mr-1 text-primary"
          @click="seen[0] = !seen[0]"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh(0)" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </div>
    </h5>
    <b-row>
      <b-col>
        <div v-if="seen[0]" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                id="filterInput"
                v-model="filter[0]"
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter[0]"
                  class="btn btn-danger"
                  @click="filter[0] = ''"
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
            class="position-relative mb-0"
            :busy="isBusy[0]"
            :per-page="perPage[0]"
            :items="itemsTable1"
            :fields="fields"
            :sort-by.sync="sortBy[0]"
            :sort-desc.sync="sortDesc[0]"
            :sort-direction="sortDirection[0]"
            :filter="filter[0]"
            :filter-included-fields="filterOn[0]"
            @filtered="onFiltered(e, 0)"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #thead-top>
              <b-tr>
                <b-th colspan="6"><span class="sr-only">Name and ID</span></b-th>
                <b-th colspan="3" class="text-center">Hasil Penelusuran</b-th>
              </b-tr>
            </template>
            <template #cell(jumlah)="data">
              {{ convertNumber(data.item.jumlah) }}
            </template>
            <template #cell(tanggal)="data">
              {{ convertDate(data.item.tanggal) }}
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
              v-model="perPage[0]"
              size="sm"
              inline
              :options="pageOptions"
              @change="handlePageSizeChange(0, $event)"
              class="ml-2"
            />
          </b-form-group>
          <!-- pagination -->
          <div>
            <b-pagination
              v-model="currentPage[0]"
              :total-rows="totalRows[0]"
              :per-page="perPage[0]"
              :current-page="currentPage[0]"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
              class="mb-0"
              @change="handlePageChange(0)"
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
    <h5>Total : <span class="text-primary">Rp. {{ convertNumber(total[0]) }}</span></h5>
    <hr style="border: 1px dashed grey;">

    <h5 class="my-5 text-danger">
      #2 Koreksi dari Rekening BHP Frekuensi Radio Ke Rekening Sertifikasi
      <div class="float-right">
        <b-button
          v-if="showTable[1]"
          variant="light"
          class="mr-1 text-primary"
          @click="seen[1] = !seen[1]"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh(1)" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </div>
    </h5>
    <b-row>
      <b-col>
        <div v-if="seen[1]" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                id="filterInput"
                v-model="filter[1]"
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter[1]"
                  class="btn btn-danger"
                  @click="filter[1] = ''"
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
            class="position-relative mb-0"
            :busy="isBusy[1]"
            :per-page="perPage[1]"
            :items="itemsTable2"
            :fields="fields"
            :sort-by.sync="sortBy[1]"
            :sort-desc.sync="sortDesc[1]"
            :sort-direction="sortDirection[1]"
            :filter="filter[1]"
            :filter-included-fields="filterOn[1]"
            @filtered="onFiltered(e, 1)"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #thead-top>
              <b-tr>
                <b-th colspan="6"><span class="sr-only">Name and ID</span></b-th>
                <b-th colspan="3" class="text-center">Hasil Penelusuran</b-th>
              </b-tr>
            </template>
            <template #cell(jumlah)="data">
              {{ convertNumber(data.item.jumlah) }}
            </template>
            <template #cell(tanggal)="data">
              {{ convertDate(data.item.tanggal) }}
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
              v-model="perPage[1]"
              size="sm"
              inline
              :options="pageOptions"
              @change="handlePageSizeChange(1, $event)"
              class="ml-2"
            />
          </b-form-group>
          <!-- pagination -->
          <div>
            <b-pagination
              v-model="currentPage[1]"
              :total-rows="totalRows[1]"
              :per-page="perPage[1]"
              :current-page="currentPage[1]"
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
    <h5>Total : <span class="text-primary">Rp. {{ convertNumber(total[1]) }}</span></h5>
    <hr style="border: 1px dashed grey;">

    <h5 class="my-5 text-danger">
      #3 Koreksi dari PPI Ke SDPPI
      <div class="float-right">
        <b-button
          v-if="showTable[2]"
          variant="light"
          class="mr-1 text-primary"
          @click="seen[2] = !seen[2]"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh(2)" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </div>
    </h5>
    <b-row>
      <b-col>
        <div v-if="seen[2]" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                id="filterInput"
                v-model="filter[2]"
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter[2]"
                  class="btn btn-danger"
                  @click="filter[2] = ''"
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
            class="position-relative mb-0"
            :busy="isBusy[2]"
            :per-page="perPage[2]"
            :items="itemsTable3"
            :fields="fields"
            :sort-by.sync="sortBy[2]"
            :sort-desc.sync="sortDesc[2]"
            :sort-direction="sortDirection[2]"
            :filter="filter[2]"
            :filter-included-fields="filterOn[2]"
            @filtered="onFiltered(e, 2)"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #thead-top>
              <b-tr>
                <b-th colspan="6"><span class="sr-only">Name and ID</span></b-th>
                <b-th colspan="3" class="text-center">Hasil Penelusuran</b-th>
              </b-tr>
            </template>
            <template #cell(jumlah)="data">
              {{ convertNumber(data.item.jumlah) }}
            </template>
            <template #cell(tanggal)="data">
              {{ convertDate(data.item.tanggal) }}
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
              v-model="perPage[2]"
              size="sm"
              inline
              :options="pageOptions"
              @change="handlePageSizeChange(2, $event)"
              class="ml-2"
            />
          </b-form-group>
          <!-- pagination -->
          <div>
            <b-pagination
              v-model="currentPage[2]"
              :total-rows="totalRows[2]"
              :per-page="perPage[2]"
              :current-page="currentPage[2]"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
              class="mb-0"
              @change="handlePageChange(2)"
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
    <h5>Total : <span class="text-primary">Rp. {{ convertNumber(total[2]) }}</span></h5>

    <hr style="border: 1px dashed grey;">

    <h5 class="my-5 text-danger">
      #4 Koreksi dari Rekening Sertifikasi ke Rekening BHP Frekuensi Radio
      <div class="float-right">
        <b-button
          v-if="showTable[3]"
          variant="light"
          class="mr-1 text-primary"
          @click="seen[3] = !seen[3]"
        >
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <b-button variant="light" @click="tableRefresh(3)" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </div>
    </h5>
    <b-row>
      <b-col>
        <div v-if="seen[3]" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
              <b-form-input
                id="filterInput"
                v-model="filter[3]"
                type="search"
                placeholder="Ketik kata yang anda cari ..."
                autocomplete="off"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter[3]"
                  class="btn btn-danger"
                  @click="filter[3] = ''"
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
            class="position-relative mb-0"
            :busy="isBusy[3]"
            :per-page="perPage[3]"
            :items="itemsTable4"
            :fields="fields"
            :sort-by.sync="sortBy[3]"
            :sort-desc.sync="sortDesc[3]"
            :sort-direction="sortDirection[3]"
            :filter="filter[3]"
            :filter-included-fields="filterOn[3]"
            @filtered="onFiltered(e, 3)"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong> Mohon tunggu ...</strong>
              </div>
            </template>
            <template #thead-top>
              <b-tr>
                <b-th colspan="6"><span class="sr-only">Name and ID</span></b-th>
                <b-th colspan="3" class="text-center">Hasil Penelusuran</b-th>
              </b-tr>
            </template>
            <template #cell(jumlah)="data">
              {{ convertNumber(data.item.jumlah) }}
            </template>
            <template #cell(tanggal)="data">
              {{ convertDate(data.item.tanggal) }}
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
              v-model="perPage[3]"
              size="sm"
              inline
              :options="pageOptions"
              @change="handlePageSizeChange(3, $event)"
              class="ml-2"
            />
          </b-form-group>
          <!-- pagination -->
          <div>
            <b-pagination
              v-model="currentPage[3]"
              :total-rows="totalRows[3]"
              :per-page="perPage[3]"
              :current-page="currentPage[3]"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
              class="mb-0"
              @change="handlePageChange(3)"
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
    <h5>Total : <span class="text-primary">Rp. {{ convertNumber(total[3]) }}</span></h5>
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
} from 'bootstrap-vue'
import axios from 'axios'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import DateConvertion from '@/helpers/date-convertion'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { uuid } from 'vue-uuid'

export default {
  name: 'SalahSetor',
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
  },
  data() {
    return {
      showTable: [false, false, false, false],
      searchTitle: ['', '', '', ''],
      isBusy: [false, false, false, false],
      seen: [false, false, false, false],
      perPage: [10, 10, 10, 10],
      pageOptions: [10, 20, 50],
      totalRows: [1, 1, 1, 1],
      currentPage: [1, 1, 1, 1],
      sortBy: ['', '', '', ''],
      sortDesc: [false, false, false, false],
      sortDirection: ['asc', 'asc', 'asc', 'asc'],
      filter: [null, null, null, null],
      filterOn: [null, null, null, null],
      no: [1, 1, 1, 1],

      fields: [
        { key: 'no', label: 'No' },
        { key: 'bank', label: 'Bank' },
        { key: 'tanggal', label: 'Tanggal' },
        { key: 'jumlah', label: 'Jumlah' },
        { key: 'keterangan_transaksi', label: 'Keterangan Transaksi' },
        { key: 'sumber_dana', label: 'Sumber Dana' },
        { key: 'nama_wajib_bayar', label: 'Nama Wajib Bayar' },
        { key: 'no_klien', label: 'No Klien' },
        { key: 'tindaklanjut', label: 'Tindaklanjut' },
      ],

      itemsTable1: [
        {
          no: 1,
          bank: 'MANDIRI',
          tanggal: '2020-02-28',
          jumlah: 8181818,
          keterangan_transaksi: 'RPL 014 KPKNL PALEMB - 002',
          sumber_dana: 'KPKNL PALEMBANG',
          nama_wajib_bayar: 'PT SRIWIJAYA MITRA MEDIA',
          no_klien: '-',
          tindaklanjut: 'KOREKSI PADA BULAN APRIL 2020',
        },
        {
          no: 2,
          bank: 'BNI',
          tanggal: '2020-08-27',
          jumlah: 20313933,
          keterangan_transaksi: 'TRANSFER DARI | PEMINDAHAN DARI 10554967 RPL 019 KPKNL Jakarta V utk | CN 122/III/2020 TGL 23 MARET 2020  DEB PT. Jasa Je',
          sumber_dana: 'KPKNL JAKARTA',
          nama_wajib_bayar: 'JASA JEJARING WASANTARA',
          no_klien: '',
          tindaklanjut: 'KOREKSI PADA BULAN SEPTEMBER 2020',
        },
      ],
      itemsTable2: [
        {
          no: 1,
          bank: 'MANDIRI',
          tanggal: '2020-11-23',
          jumlah: 50000000,
          keterangan_transaksi: 'UBP60215000002FFFFFF6473112020477370 MTS-Trf-Kredit  00021-UBP60215000002FFFFFF64731120204773',
          sumber_dana: '-',
          nama_wajib_bayar: '-',
          no_klien: '-',
          tindaklanjut: 'KOREKSI PADA BULAN NOVEMBER 2020',
        },
      ],
      itemsTable3: [
        {
          no: 1,
          bank: 'BRI PPI',
          tanggal: '2020-12-02',
          jumlah: 550905,
          keterangan_transaksi: '-',
          sumber_dana: '-',
          nama_wajib_bayar: 'RADIO SWARA LEMBAH BALIEM, PT.',
          no_klien: '00102553',
          tindaklanjut: 'SUDAH TERCATAT PADA SIMS',
        },
        {
          no: 2,
          bank: 'BRI PPI',
          tanggal: '2020-04-06',
          jumlah: 6489620,
          keterangan_transaksi: '-',
          sumber_dana: '-',
          nama_wajib_bayar: 'INDONESIA INTERNATIONAL EXPO, PT.',
          no_klien: '00108577',
          tindaklanjut: 'SUDAH TERCATAT PADA SIMS',
        },
      ],
      itemsTable4: [
        {
          no: 1,
          bank: 'MANDIRI SERTIFIKASI',
          tanggal: '2020-03-19',
          jumlah: 6384047,
          keterangan_transaksi: '-',
          sumber_dana: '-',
          nama_wajib_bayar: 'PERTAMINA, PT. (PERSERO)',
          no_klien: '-',
          tindaklanjut: 'SUDAH TERCATAT PADA SIMS',
        },
      ],
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    total() {
      let Total = []
      let tempTotal = 0
      Object.keys(this.itemsTable1).forEach(key => {
        tempTotal = tempTotal + this.itemsTable1[key].jumlah
      })
      Total[0] = tempTotal

      tempTotal = 0
      Object.keys(this.itemsTable2).forEach(key => {
        tempTotal = tempTotal + this.itemsTable2[key].jumlah
      })
      Total[1] = tempTotal

      tempTotal = 0
      Object.keys(this.itemsTable2).forEach(key => {
        tempTotal = tempTotal + this.itemsTable3[key].jumlah
      })
      Total[2] = tempTotal

      tempTotal = 0
      Object.keys(this.itemsTable2).forEach(key => {
        tempTotal = tempTotal + this.itemsTable4[key].jumlah
      })
      Total[3] = tempTotal

      return Total
    },
  },
  created() {
    // this.getDataTable(0)
    // this.getDataTable(1)
  },
  methods: {
    convertDate(date) {
      if (!date) return '-'
      return DateConvertion.setValue(date).getFullDate()
    },
    convertNumber(number) {
      if (!number) return '-'
      return InputFormat.NumberFormat(number)
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

      params.request_id = uuid.v4()
      params.request_date_time = DateConvertion.getTimeNow()

      return params
    },

    async getDataTable(index) {
      this.showTable[index] = true
      this.isBusy[index] = true

      const param = this.getRequestParams(
        this.filter[index],
        this.currentPage[index],
        this.perPage[index],
      )

      await axios({
        url: URLServices.upfront_fee_payment_report.index,
        method: 'get',
        params: param,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            if (index === 0) {
              this.itemsTable1 = result.data.data
            } else {
              this.itemsTable2 = result.data.data
            }
            this.totalRows[index] = result.data.totalRecords
            this.showTable[index] = result.data.totalRecords > 0 || this.filter
          } else {
            if (index === 0) {
              this.itemsTable1 = result.data.data
            } else {
              this.itemsTable2 = result.data.data
            }
            this.totalRows[index] = 0
            this.showTable[index] = false
          }
          this.isBusy[index] = false
        })
        .catch(error => {
          this.showTable[index] = false
          this.isBusy[index] = false
          const errorMessage = 'Gagal memuat data. Mohon ulangi beberapa saat kembali'
          CustomNotification.notif('danger', 'Error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
        })
      this.isBusy[index] = false
    },

    handlePageChange(index, value) {
      this.currentPage[index] = value
      this.getDataTable(index)
    },

    handlePageSizeChange(index, value) {
      this.perPage[index] = value
      this.currentPage[index] = 1
      this.getDataTable(index)
    },

    tableRefresh(index) {
      this.filter[index] = ''
      this.getDataTable(index)
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
    onFiltered(filteredItems, index) {
      this.totalRows[index] = filteredItems.length
      this.currentPage[index] = 1
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
          request_id: this.guidv4,
          reuqest_date_time: DateConvertion.getTimeNow(),
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
            const notifTitle = 'Berhasil menghapus data'
            CustomNotification.notif('success', notifTitle)
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            const errorTitle = response.data.response_message
            CustomNotification.notif('warning', errorTitle)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          const failNotif = 'Gagal menghapus. Mohon coba kembali'
          CustomNotification.notif('warning', failNotif)
        })
    },
  },
}
</script>
