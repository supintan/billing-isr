<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
        <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Tambah Deposit</h5>
        </b-card-text>
              <!-- <b-row class="mb-1">
                <b-col lg="10" sm="12">
                  <b-form-group
                    label-cols="4"
                    label="Keputusan Menteri"
                    label-for="item-posisi"
                  >
                    <v-select
                      v-model="selectedKmNumber"
                      label="km"
                      :options="allkm"
                      @input="selectedKmInput"
                    >
                    <template v-slot:option="allkm">
                      <span> {{ allkm.number }}</span>
                    </template>
                  </v-select>
                  </b-form-group>
                </b-col>
              </b-row> -->
              <b-row class="mb-1">
                <b-col lg="10" sm="12">
                  <b-form-group
                    label-cols="4"
                    label="Pelanggan*"
                    label-for="item-pelanggan"
                    >
                    <v-select
                      id="item-pelanggan"
                      v-model="selectedClient"
                      box
                      placeholder="-- Pilih Pelanggan --"
                      label="spectra_ad_company"
                      :options="client"
                      @input="selectedAppInput"
                    >
                      <template v-slot:option="client">
                        <span> {{ client.spectra_ad_company }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col lg="10" sm="12">
                  <b-form-group
                    label-cols="4"
                    label="Aplikasi*"
                    label-for="item-posisi"
                  >
                    <v-select
                      placeholder="-- Pilih Aplikasi --"
                      v-model="selectedNameApplication"
                      label="name"
                      :options="application"
                      @input="selectedInputApplication"
                    >
                      <template v-slot:option="application">
                        <span> {{ application.name }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="10" sm="12">
                <b-form-group label-cols="4" label="Nomor SPP*" label-for="number" disabled>
                  <b-form-input autocomplete="off" id="number" v-model="number" placeholder="Nomor SPP ..." readonly />
                  <b-form-input autocomplete="off" id="idSPP" v-model="idSPP"  hidden/>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="10" sm="12">
                <b-form-group
                  class="mb-2"
                  label="Nilai SPP*"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input class="text-right" v-model="totalAmount" readonly/>
                  </b-input-group>
                </b-form-group>
                <!-- <b-form-group label-cols="4" label="Nilai SPP" label-for="totalAmount" disabled>
                  <b-form-input type="number" autocomplete="off" id="totalAmount" v-model="totalAmount" readonly />
                </b-form-group> -->
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="10" sm="12">
              <b-form-group
                label-cols="4"
                label="Tanggal Bayar*"
                label-for="due_date"
              >
              <b-form-datepicker
                  id="due_date"
                  v-model="due_date"
                  locale="id"
              />
              </b-form-group>
                <!-- <b-form-group label-cols="4" label="Tanggal Bayar" label-for="due_date">
                  <b-form-input type="date" autocomplete="off" id="due_date" v-model="due_date" readonly/>
                </b-form-group> -->
              </b-col>
              </b-row>
              <b-row class="mb-1">
              <b-col lg="10" sm="12">
                <b-form-group label-cols="4" label="BANK*" label-for="BANK" for="example-locales" >
                  <b-form-input autocomplete="off" id="BANK" v-model="BANK" placeholder="BANK ..." readonly />
                  <b-form-input autocomplete="off" id="paymentID" v-model="paymentID"  hidden/>
                </b-form-group>
                <b-form-group
                  label-cols="4"
                  label="Tanggal Surat Keputusan*"
                  label-for="publish_date"
                >
                <b-form-datepicker
                  id="publish_date"
                  v-model="publish_date"
                  locale="id"
                />
              </b-form-group>
                <!-- <b-form-group label-cols="4" label="Tanggal Surat Keputusan" label-for="publish_date">
                  <b-form-input type="date" autocomplete="off" id="publish_date" v-model="publish_date" />
                </b-form-group> -->
                <b-form-group
                  class="mb-2"
                  label="Nomor Surat Keputusan*"
                  label-cols="4"
                >
                <b-form-input
                    class="font-weight"
                    v-model="decisionLetterNumber"
                    placeholder="Nomor surat keputusan ..."
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Nilai Revisi SPP*"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <cleave
                      id="price"
                      v-model="revisiAmount"
                      class="form-control text-right"
                      placeholder="0"
                      :raw="false"
                      :options="options.number"
                      :min="0"
                      required
                      autocomplete="off"
                    />
                  </b-input-group>
                  <!-- <b-input-group prepend="Rp.">
                    <b-form-input type="number" class="text-right" v-model="revisiAmount" id="revisiAmount"/>
                  </b-input-group> -->
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Lebih Bayar / Deposit*"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input class="text-right" v-model="CountDeposit" readonly/>
                  </b-input-group>
                </b-form-group>
                <b-form-group label-cols="4" label="Surat Keputusan*" label-for="file">
                  <b-form-file
                    v-model="fileLoc"
                    accept=".pdf"
                    required
                    placeholder="Pilih surat keputusan (.pdf)..."
                    drop-placeholder="Drop file here..."
                    @change="createBase64File"
                    src=""
                  />
                </b-form-group>
                <b-form-group label-cols="4" label="Catatan Keputusan*" label-for="description">
                  <b-form-textarea
                    id="description"
                    v-model="description"
                    placeholder="Catatan keputusan ..."
                    required
                    maxlength="200"
                    minlength="10"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col cols="12">
                  <div class="text-right">
                    <b-button
                      v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                      variant="outline-danger"
                      class="mt-0 mt-md-2"
                      @click="removeItem(index)"
                      v-if="positions.length !== 1"
                    >
                      <feather-icon icon="TrashIcon" class="mr-25" />
                      <span>Hapus</span>
                    </b-button>
                    <hr />
                  </div>
                </b-col>
              </b-row>
            <!-- </div> -->
            <div class="text-right mt-0">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-success"
                @click="repeateAgain"
                hidden
              >
                <feather-icon icon="PlusIcon" class="mr-25" />
                <span>Simpan</span>
              </b-button>
            </div>
          <!-- </b-overlay> -->
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ path: '/invoice-deposit' }"
              variant="outline-secondary"
            >
              Batal
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="success"
              class="ml-1"
              @click.prevent="save()"
            >
              Simpan
            </b-button>
          </b-col>
        </b-form>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BButton,
  BCard,
  BCardText,
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BForm,
  BFormFile,
  BFormTextarea,
  BInputGroup,
  BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import Cleave from 'vue-cleave-component'
import InputFormat from '@/helpers/input-format'
import { heightTransition } from '@/helpers/transition'
import UserManagement from '@/services/UserManagement'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  mixins: [heightTransition],
  data() {
    return {
      positions: [
        {
          id: null,
          appointment_letter_number: '',
          start_date: null,
          end_date: null,
        },
      ],
      // Client
      selectedClient: null,
      selectedApplication: null,
      selectedMinisterialDecree: null,
      selectedApp: null,
      selectedIdApplication: null,
      selectedNameApplication: null,
      client: [],
      dataKm: [],
      application: [],
      ministerial_decree: [],
      selectedKm: null,
      selectedKmAppId: null,
      allkm: [],
      revisiAmount: 0,
      // statusShowClient: true,
      selectedKmNumber: '',
      number: null,
      totalAmount: 0,
      due_date: '',
      idSPP: '',
      paymentID: '',
      BANK: '',
      description: '',
      decisionLetterNumber: '',

      nextTodoId: 2,
      publish_date: null,
      name: '',
      // Avatar
      fileLoc: null,
      fileBase64: '',
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],
      employee: [],
      BInputGroup,
      options: {
        number: InputFormat.options('number'),
      },
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormFile,
    BRow,
    BOverlay,
    vSelect,
    BFormTextarea,
    BInputGroup,
    BFormDatepicker,
    Cleave,
  },
  directives: {
    Ripple,
  },
  computed: {
    CountDeposit() {
      // const a = this.totalAmountreplaceAll('Rp.', '')
      // const nilaiTotalAmount = InputFormat.convNumString(a)
      const nilaiTotalAmount = parseInt(InputFormat.convNumString(this.totalAmount))
      const nilaiRevisiAmount = parseInt(InputFormat.convNumString(this.revisiAmount))
      const hasil = nilaiTotalAmount - nilaiRevisiAmount
      const hasilAkhir = InputFormat.NumberFormat(hasil) 
      return hasilAkhir
    },
  },
  created() {
    // this.getKmData()
    this.getClient()
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    selectedAppInput(value) {
      // this.selectedApp = value.id
      this.selectedApp = value.id
      this.selectedClient = value.spectra_ad_company

      this.getApplication(this.selectedApp)
      // this.getKmData(this.selectedApp)
      return true
    },
    selectedInputApplication(value) {
      // this.selectedApp = value.id
      this.selectedIdApplication = value.id
      this.selectedNameApplication = value.name
      this.getSPPData(this.selectedApp, this.selectedIdApplication)
      // this.selectedNameApplication = value.client_name
      // this.getKmData(this.selectedIdApplication)
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      // this.getApplication(this.selectedKm)
      // this.getSPPData(this.selectedKm, this.selectedKmAppId)
    },
    async getClient() {
      this.showPosisi = true
      await axios({
        url: URLServices.client_deposit.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.posisi = result.data.employee_list
          this.client = result.data.data
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
					CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getApplication(clientId) {
      this.showPosisi = true
      await axios({
        url: URLServices.deposit_isr_application.index_by_client_id,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 1000,
          client_id: clientId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.application = result.data.data
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
					CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getKmData() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.ministerial_decree.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          // application_id: appId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.allkm = result.data.data
          this.dataKm.selectedKmNumber = this.allkm.number
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
					CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    // convertNumber(number) {
    //   return `${InputFormat.NumberFormat(number)}`
    // },
    
    async getSPPData(clientId, appId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.invoiceDeposit.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          client_id: clientId,
          application_id: appId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // this.allkm = result.data
          const dataResult = result.data.data[0]
          this.number = dataResult.invoice_number
          this.totalAmount = InputFormat.NumberFormat(dataResult.invoice_total_amount)
          // Number(dataResult.invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
          this.due_date = dataResult.invoice_due_date
          this.idSPP = dataResult.id
          this.paymentID = dataResult.payment_id
          this.BANK = dataResult.payment_bank
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
					CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    repeateAgain() {
      this.positions.push({
        index: (this.nextTodoId += this.nextTodoId),
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.div[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.positions.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          console.log(this.fileLoc)
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }
      data.payment_id = this.paymentID
      data.decision_letter_number = this.decisionLetterNumber
      data.decision_letter_publish_date = this.publish_date
      data.revised_invoice_total_amount = InputFormat.convNumString(this.revisiAmount)
      data.deposit_amount = InputFormat.convNumString(this.CountDeposit)
      data.invoice_amount = InputFormat.convNumString(this.totalAmount)
      data.file_base64 = this.fileLoc
      data.decision_notes = this.description
      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()
      console.log(Param)
      if (Param !== false) {
        await axios({
          url: URLServices.invoiceDeposit.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              const responseMessage = `Berhasil menambahkan data baru.`
              CustomNotification.notif('success', 'Berhasil', responseMessage)
              this.$router.push({ name: 'invoice-deposit' })
            } else {
              const responseMessage = `[${result.data.response_message}]`
              CustomNotification.notif('warning', 'Warning', responseMessage)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            const responseMessage = `[${notifError.message}]`
            CustomNotification.notif(notifError.status, notifError.status, responseMessage)
            this.showCreteUserForm = false
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
