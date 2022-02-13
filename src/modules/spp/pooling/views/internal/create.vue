<template>
  <b-overlay :show="showCreteSimulasiForm" rounded="sm">
    <b-card>
      <b-row>
        <b-col>
          <b-card-text>
              <h5 class="text-primary my-2">Permohonan Pooling</h5>
            </b-card-text>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Pelanggan*"
            label-cols="4"
          >
            <v-select
              v-model="selectedApplication"
              label="spectra_ad_company"
              box
              placeholder="-- Pilih Pelanggan --"
              :options="dataPelanggan"
              @input="selectedClientInput"
            >
              <template v-slot:option="dataPelanggan">
                <span>{{ dataPelanggan.spectra_ad_company }}</span>
              </template>
          </v-select>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tanggal Surat*"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
          <b-form-datepicker
            class="font-weight-bold"
            id="isr_ipfr_tgl_mulai"
            locale="id"
            placeholder="YYYY-MM-DD"
            v-model="appealLetterpublishdate"
          />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nomor Surat Permohonan*"
            label-cols="4"
          >
            <b-input-group>
              <b-form-input
                v-model="appealLetterNumber"
                id="readOnlyInput"
                class="text-left"
              />
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Tanggal Jatuh Tempo Baru*"
            label-for="tgl_new_due_date"
            label-cols="4"
          >
          <b-form-datepicker
            class="font-weight-bold"
            id="tgl_new_due_date"
            locale="id"
            placeholder="YYYY-MM-DD"
            v-model="appealDueDate"
          />
          (*Tanggal jatuh tempo selanjutnya akan mengikuti tanggal ini)
          </b-form-group>
          <b-form-group
            label-cols="4"
            label="File Surat Permohonan*"
            label-for="file"
          >
            <b-form-file
              v-model="fileLoc"
              accept=".pdf"
              placeholder="Pilih surat permohonan (.pdf)..."
              drop-placeholder="Drop file here..."
              @change="createBase64File"
              src=""
            />
            <small class="text-danger" v-if="fileLoc === null">*Silakan unggah file surat permohonan !</small>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Catatan Permohonan"
            label-cols="4"
          >
          <b-form-textarea
            v-model="appealNotes"
            id="textarea-rows"
            placeholder=""
            rows="6"
          />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="button"
            variant="info"
            @click="take_data_table(start_date,end_date,clientid)"
          >
            Ambil Daftar SPP
          </b-button>
        </b-col>
      </b-row> -->
      <b-row>
        <b-col>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-card-text >
              <h2>SPP Periode : {{this.conv_start_date}} sampai {{this.conv_end_date}}</h2>
              <!-- {{idApplication}} -->
            </b-card-text>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-table
            id="tableData"
            striped
            hover
            class="position-relative bg-white"
            :items="items"
            :fields="fields"
            readonly
          >
          <template #cell(no)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(billing_parameter_due_date)="data">
                {{ convDate(data.item.billing_parameter_due_date) }}
              </template>
            <template #cell(action2)="data">
              <b-form-checkbox
                v-model="checkApplication"
                v-bind:value="{application_id: data.item.application_id, billing_parameter_id: data.item.billing_parameter_id}"
                plain
              >
              </b-form-checkbox>
              <!-- <b-form-checkbox
                v-model="checkApplication"
                v-bind:value="{application_id: idApplication[data.index], billing_parameter_id: idBillingParameter[data.index]}"
                plain
              >
              </b-form-checkbox> -->
              <!-- {{checkApplication}} -->
            </template>
          </b-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'pooling' }"
            variant="outline-secondary"
          >
            Batal
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            :disabled="!statusSave"
            @click="save()"
          >
            Simpan
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BButton,
  BCard,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BFormDatepicker,
  BFormFile,
  BTable,
  BFormCheckbox,
  BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import UserManagement from '@/services/UserManagement'
import axios from 'axios'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import moment from 'moment'
import vSelect from 'vue-select'
import { uuid } from 'vue-uuid'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BFormDatepicker,
    vSelect,
    BFormFile,
    BTable,
    BFormCheckbox,
    BFormTextarea,
  },
  data() {
    return {
      // selected: ['A', 'C'],
      selectedApplication: null,
      guid_v4: uuid.v4(),
      dataPelanggan: [],
      checkApplication: [],
      checkBillingparameter: [],
      fileLoc: null,
      fileBase64: '',
      clientid: '',
      start_date: '',
      end_date: '',
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'application_official_name', label: 'Aplikasi' },
        // { key: 'ministerial_decree_number', label: 'Nomor KM Induk' },
        { key: 'billing_parameter_cycle_number', label: 'Tahun Ke-' },
        { key: 'billing_parameter_total_amount', label: 'Nilai SPP' },
        { key: 'billing_parameter_due_date', label: 'Tanggal Jatuh Tempo' },
        { key: 'action', label: 'Aksi' },
        { key: 'action2', label: 'Aksi2' },
      ],
      items: [],
      idApplication: [],
      idBillingParameter: [],
      appealLetterNumber: '',
      appealLetterpublishdate: '',
      appealDueDate: '',
      appealNotes: '',
      id_app: [],
      TestCek: [],
    }
  },
  directives: {
    Ripple,
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    statusSave() {
      return (this.selectedApplication && this.appealLetterpublishdate && this.appealLetterNumber && this.appealDueDate && this.fileLoc && this.appealNotes)
    },
  },
  created() {
    // this.getDataTable()
    this.calculateDate()
    this.getClient()
  },
  methods: {
    calculateDate() {
      this.start_date = moment(new Date()).format('YYYY-MM-DD')
      this.start_date = moment(moment(this.start_date).add(60, 'days')).format('YYYY-MM-DD')
      this.end_date = moment(moment(this.start_date).add(1, 'year')).format('YYYY-MM-DD')
      this.end_date = moment(moment(this.end_date).add(-1, 'days')).format('YYYY-MM-DD')
      this.conv_start_date = moment(this.start_date).format('DD MMMM YYYY')
      this.conv_end_date = moment(this.end_date).format('DD MMMM YYYY')
      // console.log(this.end_date, 'date')
    },
    selectedClientInput(value) {
      this.seletedClientId = value.id
      // this.selectedKm = value.number

      this.take_data_table()
    },
    convDate(dateconv) {
      // console.log(dateconv)
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY')
    },
    async getClient() {
      this.statusApplication = false
      axios({
        url: URLServices.client.index,
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataPelanggan = response.data.data
          this.statusClient = true
        })
        .catch(error => {
          this.statusApplication = true
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          this.showTable = false
          CustomNotification.notif('error', 'Gagal memperbaharui data. Mohon coba kembali')
        })
    },
    getRequestParams(start, end) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}

      params.request_id = uuid.v4()
      params.request_date_time = today
      params.start_date = start
      params.end_date = end
      params.client_id = this.seletedClientId

      return params
    },
    async take_data_table() {
      this.showTable = true
      this.isBusy = true
      const param = this.getRequestParams(
        this.start_date,
        this.end_date,
        this.clientid,
      )

      await axios({
        url: URLServices.pooling_billing_parameter.get_unpublished_invoices,
        params: param,
        method: 'post',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data, recordsTotal } = response.data
          this.items = data
          this.totalRows = recordsTotal
          this.isBusy = false
          Object.keys(this.items).forEach(key => {
            this.idApplication[key] = this.items[key].application_id
            this.idBillingParameter[key] = this.items[key].billing_parameter_id
          })
          // console.log(this.idApplication, 'list application')
          // console.log(this.idBillingParameter, 'list billing parameter')
        })
        .catch(() => {
          this.showTable = false
          const successMessage = `Gagal memperbaharui data. Mohon coba kembali`
          CustomNotification.notif('danger', 'Warning', successMessage)
        })
    },
    createRequestVariableArray() {
      const data = {}
      // console.log(this.DataDuedate, 'log create variable')
      // console.log(this.checkApplication, 'request variabel array')
      // Object.keys(this.checkApplication).forEach(key => {
      //   console.log(this.checkApplication[key], 'request variabel array satuan')
      //   data[key] = {
      //     applications: this.checkApplication[key],
      //     // billing_parameter_id: this.checkBillingparameter[key],
      //   }
      // })

      return data
    },
    // createRequestVariableArrayBilling() {
    //   const data = {}
    //   // console.log(this.DataDuedate, 'log create variable')
    //   Object.keys(this.checkApplication).forEach(key => {
    //     data[key] = {
    //       billing_parameter_id: this.idBillingParameter[key],
    //     }
    //   })

    //   return data
    // },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariableFile(file)
    },
    createRequestVariableFile(file) {
      // const ParamApplication = this.createRequestVariableArray()
      // console.log(ParamApplication, ' param application id')
      // const ParamBillingParameter = this.createRequestVariableArrayBilling()
      const data = {}
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }

      // console.log(this.fileLoc)

      data.appeal_letter_number = this.appealLetterNumber
      data.appeal_letter_publish_date = this.appealLetterpublishdate
      data.appeal_due_date = this.appealDueDate
      data.appeal_notes = this.appealNotes
      data.submission_notes = this.appealNotes
      data.file_base64 = this.fileLoc
      data.applications = this.checkApplication
      // data.billing_parameters = ParamBillingParameter
      return data
    },
    createRequestVariable() {
      const data = {}
      data.nik = this.nik
      data.full_name = this.fullName
      data.password = this.password2
      data.email = this.email
      data.role = {
        role_id: this.formulaelected,
      }

      // Mapping Selected roles
      const lengthRole = this.formulaelected.length
      if (lengthRole === 0) {
        const successMessage = `Anda harus memilih minimal 1 role`
        CustomNotification.notif('warning', 'Warning', successMessage)
        this.showCreteSimulasiForm = false
        return false
      }

      return data
    },
    async save() {
      // const token = localStorage.getItem('accessToken')
      this.showCreteSimulasiForm = true
      const Param = this.createRequestVariableFile()
      // console.log(Param, 'param save')
      if (Param !== false) {
        await axios({
          url: URLServices.hkppooling.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            console.log(result.data.response_code)
            if (result.data.response_code === '00') {
              const successMessage = 'Berhasil menambahkan pooling baru'
              CustomNotification.notif('success', 'Berhasil', successMessage)
              this.$router.push({ name: 'pooling' })
            } else {
              const successMessage = `[${result.data.response_message}]`
              CustomNotification.notif('warning', 'Warning', successMessage)
            }
            this.showCreteSimulasiForm = false
          })
          .catch(error => {
            // const notifError = UserManagement.Handling(error)
            // const successMessage = `[${notifError.message}]`
            CustomNotification.notif('error', 'Gagal menyimpan', 'Mohon coba kembali')
            this.showCreteSimulasiForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
