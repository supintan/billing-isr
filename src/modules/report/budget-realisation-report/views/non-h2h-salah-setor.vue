<template>
  <div>
    <h4 class="my-3 text-primary">
      Tabel Non H2H (Salah Setor)
    </h4>
    <hr>
    <h5 class="my-5 text-danger">
      #1 Koreksi Dari PPI ke SDPPI
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
            <template #cell(tagihan)="data">
              {{ convertNumber(data.item.tagihan) }}
            </template>
            <template #cell(terbayar)="data">
              {{ convertNumber(data.item.terbayar) }}
            </template>
            <template #cell(tanggal_backup)="data">
              {{ convertDate(data.item.tanggal_backup) }}
            </template>
            <template #cell(archieved_date)="data">
              {{ convertDate(data.item.archieved_date) }}
            </template>
            <template #cell(bi_begin)="data">
              {{ convertDate(data.item.bi_begin) }}
            </template>
            <template #cell(bi_end)="data">
              {{ convertDate(data.item.bi_end) }}
            </template>
            <template #cell(bi_money_received)="data">
              {{ convertDate(data.item.bi_money_received) }}
            </template>
            <template #cell(bi_create_date)="data">
              {{ convertDate(data.item.bi_create_date) }}
            </template>
            <template #cell(tanggal_backup)="data">
              {{ convertDate(data.item.tanggal_backup) }}
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
    <h5>Total Tagihan : <span class="text-primary">Rp. {{ convertNumber(tagihan[0]) }}</span></h5>
    <h5>Total Terbayar : <span class="text-primary">Rp. {{ convertNumber(terbayar[0]) }}</span></h5>
    <hr style="border: 1px dashed grey;">

    <h5 class="my-5 text-danger">
      #2 Koreksi Dari Rek. Sertifikasi ke Rek. BHP Frekuensi
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
            <template #cell(tagihan)="data">
              {{ convertNumber(data.item.tagihan) }}
            </template>
            <template #cell(terbayar)="data">
              {{ convertNumber(data.item.terbayar) }}
            </template>
            <template #cell(tanggal_backup)="data">
              {{ convertDate(data.item.tanggal_backup) }}
            </template>
            <template #cell(bi_begin)="data">
              {{ convertDate(data.item.bi_begin) }}
            </template>
            <template #cell(archieved_date)="data">
              {{ convertDate(data.item.archieved_date) }}
            </template>
            <template #cell(bi_end)="data">
              {{ convertDate(data.item.bi_end) }}
            </template>
            <template #cell(bi_money_received)="data">
              {{ convertDate(data.item.bi_money_received) }}
            </template>
            <template #cell(bi_create_date)="data">
              {{ convertDate(data.item.bi_create_date) }}
            </template>
            <template #cell(tanggal_backup)="data">
              {{ convertDate(data.item.tanggal_backup) }}
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
              @change="handlePageChange[1]"
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
    <h5>Total Tagihan : <span class="text-primary">Rp. {{ convertNumber(tagihan[1]) }}</span></h5>
    <h5>Total Terbayar : <span class="text-primary">Rp. {{ convertNumber(terbayar[1]) }}</span></h5>
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
  name: 'NonH2hSalahSetor',
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
      showTable: [false, false],
      searchTitle: ['', ''],
      isBusy: [false, false],
      seen: [false, false],
      perPage: [10, 10],
      pageOptions: [10, 20, 50],
      totalRows: [1, 1],
      currentPage: [1, 1],
      sortBy: ['', ''],
      sortDesc: [false, false],
      sortDirection: ['asc', 'asc'],
      filter: [null, null],
      filterOn: [null, null],
      no: [1, 1],

      fields: [
        { key: 'no', label: 'No. SPP' },
        { key: 'bi_id_reminder_orig', label: 'BI ID Reminder Orig' },
        { key: 'no_client', label: 'No. Klien' },
        { key: 'no_aplikasi', label: 'No. Aplikasi' },
        { key: 'no_rr', label: 'No. RR' },
        { key: 'status_simf', label: 'Status' },
        { key: 'nama_perusahaan', label: 'Nama Perusahaan' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'tagihan', label: 'Tagihan' },
        { key: 'terbayar', label: 'Terbayar' },
        { key: 'trans_h2h', label: 'Trans H2h' },
        { key: 'trans_h2h', label: 'Trans H2h' },
        { key: 'bi_begin', label: 'Bi Begin' },
        { key: 'bi_end', label: 'Bi End' },
        { key: 'bi_money_received', label: 'Bi Money Received' },
        { key: 'status', label: 'Status' },
        { key: 'kategori_spp', label: 'Kategori Spp' },
        { key: 'status_izin', label: 'Status Izin' },
        { key: 'service_name', label: 'Service Name' },
        { key: 'subservice_name', label: 'Subservice Name' },
        { key: 'payment_description', label: 'Payment Description' },
        { key: 'bi_create_date', label: 'Bi Create Date' },
        { key: 'bi_cancel', label: 'Bi Cancel' },
        { key: 'archieved_date', label: 'Archived Date' },
        { key: 'bi_tipe', label: 'Bi Type' },
        { key: 'status_remainder', label: 'Status Remainder' },
        { key: 'bi_manual', label: 'Bi Manual' },
        { key: 'bi_comment', label: 'Bi Comment' },
        { key: 'city', label: 'City' },
        { key: 'district', label: 'District' },
        { key: 'province', label: 'Province' },
        { key: 'upt', label: 'Upt' },
        { key: 'tanggal_backup', label: 'Tanggal Backup' },
      ],

      itemsTable1: [
        {
          no: '0899391',
          bi_id_reminder_orig: '821380',
          no_client: '00102553',
          no_aplikasi: '00109062011',
          no_rr: '0065271',
          status_simf: 'Revoked',
          nama_perusahaan: 'RADIO SWARA LEMBAH BALIEM, PT.',
          alamat: 'JL. BHAYANGKARA NO. 61, KEL. WAMENA KOTA',
          tagihan: 550905,
          terbayar: 550905,
          trans_h2h: 'No',
          bi_begin: '2018-06-27',
          bi_end: '2019-06-26',
          bi_money_received: '2020-12-02',
          status: 'paid',
          kategori_spp: 'Bill (Bad Debt Paid)',
          status_izin: 'Perpanjangan',
          service_name: 'Broadcast',
          subservice_name: 'AM',
          payment_description: 'BC - AM (Radio Siaran AM)',
          bi_create_date: '2018-10-27',
          bi_cancel: '',
          archieved_date: '2018-10-27',
          bi_tipe: '49',
          status_remainder: '',
          bi_manual: '',
          bi_comment: '12-02-2020(550,905)//24-03-2020//',
          city: 'WAMENA',
          district: 'JAYAWIJAYA',
          province: 'PAPUA',
          upt: 'BALMON KELAS II JAYAPURA',
          tanggal_backup: '2020-12-31',
        },
        {
          no: '1404468',
          bi_id_reminder_orig: '1357510',
          no_client: '00108577',
          no_aplikasi: '036457012016',
          no_rr: '0355158',
          status_simf: 'Granted',
          nama_perusahaan: 'INDONESIA INTERNATIONAL EXPO, PT.',
          alamat: 'BSD BOULEVARD BARAT KAV OFFICE PARK NO 1',
          tagihan: 6489620,
          terbayar: 6489620,
          trans_h2h: 'No',
          bi_begin: '2020-02-04',
          bi_end: '2021-02-03',
          bi_money_received: '2020-04-06',
          status: 'paid',
          kategori_spp: 'Second reminder (paid)',
          status_izin: 'Perpanjangan',
          service_name: 'Land Mobile (private)',
          subservice_name: 'Standard',
          payment_description: 'LM (private) - Standard (<1GHz)',
          bi_create_date: '2020-03-04',
          bi_cancel: '',
          archieved_date: '',
          bi_tipe: '10',
          status_remainder: 'reminder ke - 2',
          bi_manual: '',
          bi_comment: '06-04-2020(6,489,620)//05-05-2020//[05 Mei 2020] DILAKUKAN PAID MANUAL INVOICE ATAS NODIN 48/DJSDPPI.3/SP.02.08/04/2020',
          city: 'TANGERANG',
          district: 'KOTA TANGERANG',
          province: 'BANTEN',
          upt: 'BALMON KELAS I TANGERANG',
          tanggal_backup: '2020-12-31',
        },
      ],
      itemsTable2: [
        {
          no: '0974251',
          bi_id_reminder_orig: '893320',
          no_client: '00110001',
          no_aplikasi: '031911102016',
          no_rr: '0397850',
          status_simf: 'Revoked',
          nama_perusahaan: 'UPHUS KHAMANG INDONESIA',
          alamat: 'jalan taman sari metropolitan cluster siladen c2 no 7-8',
          tagihan: 200625,
          terbayar: 200625,
          trans_h2h: 'No',
          bi_begin: '2018-11-15',
          bi_end: '2019-11-14',
          bi_money_received: '2020-10-01',
          status: 'paid',
          kategori_spp: 'Bill (Bad Debt Paid)',
          status_izin: 'Perpanjangan',
          service_name: 'Land Mobile (private)',
          subservice_name: 'Standard',
          payment_description: 'LM (private) - Standard (<1GHz)',
          bi_create_date: '2019-02-15',
          bi_cancel: '',
          archieved_date: '2019-03-14',
          bi_tipe: '49',
          status_remainder: '',
          bi_manual: '',
          bi_comment: '10-01-2020(2,965,031)//06-02-2020//',
          city: 'MAPANGET',
          district: 'KOTA MANADO',
          province: 'SULAWESI UTARA',
          upt: 'BALMON KELAS II MANADO',
          tanggal_backup: '2020-12-31',
        },
        {
          no: '0974252',
          bi_id_reminder_orig: '893318',
          no_client: '00110001',
          no_aplikasi: '031910102016',
          no_rr: '0397849',
          status_simf: 'Revoked',
          nama_perusahaan: 'UPHUS KHAMANG INDONESIA',
          alamat: 'jalan taman sari metropolitan cluster siladen c2 no 7-8',
          tagihan: 200625,
          terbayar: 200625,
          trans_h2h: 'No',
          bi_begin: '2018-11-15',
          bi_end: '2019-11-14',
          bi_money_received: '2020-10-01',
          status: 'paid',
          kategori_spp: 'Bill (Bad Debt Paid)',
          status_izin: 'Perpanjangan',
          service_name: 'Land Mobile (private)',
          subservice_name: 'Standard',
          payment_description: 'LM (private) - Standard (<1GHz)',
          bi_create_date: '2019-02-15',
          bi_cancel: '',
          archieved_date: '2019-03-14',
          bi_tipe: '49',
          status_remainder: '',
          bi_manual: '',
          bi_comment: '10-01-2020(2,965,031)//06-02-2020//',
          city: 'MAPANGET',
          district: 'KOTA MANADO',
          province: 'SULAWESI UTARA',
          upt: 'BALMON KELAS II MANADO',
          tanggal_backup: '2020-12-31',
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
    tagihan() {
      let Tagihan = []
      let tempTagihan = 0
      Object.keys(this.itemsTable1).forEach(key => {
        tempTagihan = tempTagihan + this.itemsTable1[key].tagihan
      })
      Tagihan[0] = tempTagihan

      tempTagihan = 0
      Object.keys(this.itemsTable2).forEach(key => {
        tempTagihan = tempTagihan + this.itemsTable2[key].tagihan
      })
      Tagihan[1] = tempTagihan

      return Tagihan
    },
    terbayar() {
      let Terbayar = []
      let tempTerbayar = 0
      Object.keys(this.itemsTable1).forEach(key => {
        tempTerbayar = tempTerbayar + this.itemsTable1[key].terbayar
      })
      Terbayar[0] = tempTerbayar

      tempTerbayar = 0
      Object.keys(this.itemsTable2).forEach(key => {
        tempTerbayar = tempTerbayar + this.itemsTable2[key].terbayar
      })
      Terbayar[1] = tempTerbayar

      return Terbayar
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
