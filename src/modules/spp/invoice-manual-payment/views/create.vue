<template>
  <b-overlay :show="ShowLoadingSubmitForm" rounded="sm">
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button
          variant="light"
          :to="{ name: 'invoice-manual-payment' }"
          class="mr-1 text-primary"
        >
          <feather-icon icon="CornerUpLeftIcon" /> kembali
        </b-button>
      </b-col>
    </b-row>
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary">Tambah Pembayaran Manual</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="Pelanggan*"
              label-for="item-pelanggan"
              class="mb-4"
            >
              <v-select
                id="item-pelanggan"
                v-model="selectedClient"
                label="spectra_ad_company"
                :options="client"
                :reduce="client => client.id"
                @input="getListInvoice"
                placeholder="-- Pilih Pelanggan --"
              >
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="No. SPP*"
              label-for="InvoiceId"
              class="mb-4"
            >
              <b-overlay :show="ShowLoadingInvoiceList">
                <v-select
                  v-model="InvoiceId"
                  label="invoice_number"
                  :options="InvoiceList"
                  :reduce="InvoiceList => InvoiceList.invoice_id"
                  :disabled="!selectedClient"
                  @input="getDetailInvoice"
                  placeholder="-- Pilih SPP --"
                />
              </b-overlay>
              <b-form-input
                autocomplete="off"
                id="idSPP"
                v-model="idSPP"
                hidden
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-overlay :show="ShowLoadingGetDetailInvoice">
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group
                label-cols="4"
                label="No. Aplikasi"
                label-for="item-posisi"
                class="mb-4"
              >
                <b-form-input
                  v-model="selectedIdApplicationName"
                  readonly
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group
                label-cols="4"
                label="Tgl. Jatuh Tempo"
                label-for="due_date"
                class="mb-4"
              >
                <b-form-datepicker
                  id="due_date"
                  v-model="due_date"
                  locale="id"
                  readonly
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group
                label-cols="4"
                label="Nilai Pokok"
                label-for="h-total_amount"
                class="mb-4"
              >
                <b-input-group prepend="Rp.">
                  <b-form-input
                    autocomplete="off"
                    class="text-right"
                    id="total_amount"
                    v-model="total_amount"
                    readonly
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group
                label-cols="4"
                label="Nilai Pokok yang Dibayarkan"
                label-for="pokok-dibayar"
                class="mb-4"
              >
                <b-input-group prepend="Rp.">
                  <cleave
                    id="pokok-dibayar"
                    v-model="TotalAmountPaid"
                    class="form-control text-right"
                    :raw="false"
                    :options="options.number"
                    placeholder="0,00000"
                    maxlength="50"
                    minlength="1"
                    required
                    autocomplete="off"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group
                label-cols="4"
                label="Denda"
                label-for="total_amount"
                disabled
                class="mb-4"
              >
                <b-input-group prepend="Rp.">
                  <b-form-input
                    autocomplete="off"
                    class="text-right"
                    id="total_amount"
                    v-model="FineAmount"
                    readonly
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group
                label-cols="4"
                label="Nilai Denda yang Dibayarkan"
                label-for="denda-dibayar"
                class="mb-4"
              >
                <b-input-group prepend="Rp.">
                  <cleave
                    id="denda-dibayar"
                    v-model="FineAmountPaid"
                    class="form-control text-right"
                    :raw="false"
                    :options="options.number"
                    placeholder="0,00000"
                    maxlength="50"
                    minlength="1"
                    required
                    autocomplete="off"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-overlay>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="Tgl. Bayar*"
              label-for="publish_date"
              class="mb-4"
            >
              <b-form-datepicker
                id="publish_date"
                v-model="publish_date"
                :max="MaxDate"
                locale="id"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="BANK*"
              label-for="BANK"
              for="example-locales"
              class="mb-4"
            >
              <v-select id="BANK" v-model="BANK" :options="OpsiBank" placeholder="-- Pilih BANK --">
              </v-select>
            </b-form-group>
              <b-form-group
                label-cols="4"
                label="Bukti Resi Bayar*"
                label-for="file"
                class="mb-4"
              >
                  <b-form-file
                    id="txt-file"
                    v-model="fileLoc"
                    accept=".pdf"
                    placeholder="Pilih upload bukti resi bayar..."
                    drop-placeholder="Drop file here..."
                    @change="createBase64File"
                    src=""
                  />
                  <small class="text-danger" v-if="fileLoc === null">*Silakan unggah bukti resi pembayaran !</small>
              </b-form-group>
            <b-form-group
              label-cols="4"
              label="Deskripsi*"
              label-for="description"
              class="mb-4"
            >
              <b-form-textarea
                id="description"
                v-model="description"
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
            type="submit"
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
        <b-col sm="8" lg="8" md="8">
          <p class="text-center">
            <feather-icon icon="InfoIcon" /> Pastikan data sudah benar. Data
            yang telah disimpan tidak dapat diubah.
          </p>
        </b-col>
        <b-col sm="8" lg="8" md="8" class="text-center">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'invoice-manual-payment' }"
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
  BFormDatepicker,
} from 'bootstrap-vue'
import axios from 'axios'
import vSelect from 'vue-select'
import Cleave from 'vue-cleave-component'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import Ripple from 'vue-ripple-directive'
// import { ValidationProvider } from 'vee-validate'
import { heightTransition } from '@/helpers/transition'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'

export default {
  mixins: [heightTransition],
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
    BFormDatepicker,
    Cleave,
    // ValidationObserver,
    // ValidationProvider,
  },
  data() {
    return {
      options: {
        number: InputFormat.options('number'),
      },
      OpsiBank: ['BRI', 'MANDIRI', 'BNI', 'BSI'],
      sexCode: [
        { code: 'M', name: 'Laki-Laki' },
        { code: 'F', name: 'Perempuan' },
      ],
      positions: [
        {
          id: null,
          appointment_letter_number: '',
          start_date: null,
          end_date: null,
        },
      ],
      selectedCategory: [
        {
          id: null,
          nik: null,
          full_name: null,
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
      statusShowClient: true,
      selectedKmNumber: '',
      number: null,
      total_amount: null,
      due_date: '',
      idSPP: '',
      BANK: '',

      nextTodoId: 2,
      // Biodata
      nik: '',
      description: '',
      full_name: '',
      gender: '',
      phone_number: '',
      date_of_birth: '',
      address: '',
      email: '',
      username: '',
      email_login: '',
      password: '',
      password2: '',
      official_name: '',
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
      FineAmount: null,
      InvoiceId: null,
      InvoiceList: [],
      ShowLoadingInvoiceList: false,
      ShowLoadingGetDetailInvoice: false,
      ShowLoadingSubmitForm: false,
      selectedIdApplicationName: null,
      MaxDate: moment(new Date()).format('YYYY-MM-DD'),
      TotalAmountPaid: 0,
      FineAmountPaid: 0,
    }
  },
  directives: {
    Ripple,
  },
  created() {
    this.getClient()
  },
  computed: {
    statusSave() {
      return (this.selectedClient && this.InvoiceId && this.due_date && this.BANK && this.fileLoc && this.description)
    },
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    async getListInvoice() {
      this.ShowLoadingInvoiceList = true
      await axios({
        url: URLServices.PaymentManualSPPListById.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          client_id: this.selectedClient,
          page: 1,
          length: 10000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.InvoiceList = result.data.data
          this.ShowLoadingInvoiceList = false
        })
        .catch(error => {
          this.ShowLoadingInvoiceList = false
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan role',
            errorMessage
          )

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    selectedAppInput(value) {
      this.selectedApp = value.id
      this.selectedClient = value.id
      this.selectedClient = value.spectra_ad_company

      this.getDetailInvoice()
      return true
    },
    selectedKmInput(value) {
      this.selectedKm = value.id
      this.selectedKmNumber = value.number
      this.selectedKmAppId = value.application_id
      this.getDetailInvoice(this.selectedKm)
    },
    selectedInputApplication() {
      // this.selectedIdApplication = value.application_id
      // this.selectedNameApplication = value.application_official_name
      this.getSPPData()
    },
    async getClient() {
      this.showPosisi = true
      await axios({
        url: URLServices.ClientManualInvoicePayment.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
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
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan role',
            errorMessage
          )

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    async getDetailInvoice() {
      this.ShowLoadingGetDetailInvoice = true
      await axios({
        url: URLServices.PaymentManualSPP.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 100,
          id: this.InvoiceId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const [InvoiceData] = result.data.data
          if (InvoiceData) {
            this.selectedIdApplicationName = InvoiceData.application_name
            this.total_amount = InputFormat.NumberFormat(InvoiceData.total_amount)
            this.due_date = InvoiceData.due_date
            this.idSPP = InvoiceData.id
            this.FineAmount = InputFormat.NumberFormat(InvoiceData.fine_amount)
          } else {
            this.number = 0
            this.total_amount = 0
            this.due_date = 0
            this.idSPP = 0
            this.FineAmount = 0
          }
          this.ShowLoadingGetDetailInvoice = false
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan role',
            errorMessage
          )

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    // async getKmData(appId) {
    //   const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

    //   await axios({
    //     url: URLServices.MinisterialDecreeByClient.index,
    //     method: 'get',
    //     params: {
    //       request_id: uuid.v4(),
    //       request_date_time: today,
    //       // application_id: appId,
    //       client_id: appId,
    //     },
    //     headers: {
    //       Authorization: `${TokenType} ${getToken()}`,
    //     },
    //   })
    //     .then(result => {
    //       this.allkm = result.data.data
    //       this.dataKm.selectedKmNumber = this.allkm.number
    //     })
    //     .catch(error => {
    //       const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
    //       CustomNotification.notif(
    //         'danger',
    //         'Gagal mendapatkan role',
    //         errorMessage
    //       )
    //     })
    // },
    async getSPPData() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

      await axios({
        url: URLServices.PaymentManualSPP.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          application_id: this.selectedIdApplication,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.number = dataResult.number
          this.total_amount = InputFormat.NumberFormat(dataResult.total_amount)
          this.due_date = dataResult.due_date
          this.idSPP = dataResult.id
          this.FineAmount = InputFormat.NumberFormat(dataResult.fine_amount)
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan role',
            errorMessage
          )
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
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }

      if (!file && !this.fileLoc) {
        CustomNotification.notif(
          'warning',
          'Anda wajib melampirkan file',
          'Mohon periksa kembali'
        )
        return false
      }

      data.payment_date = this.publish_date
      data.invoice_id = this.InvoiceId
      data.submission_notes = this.description
      data.description = this.description
      data.file_base64 = this.fileLoc
      data.bank = this.BANK
      data.annual_payment_amount = InputFormat.convNumString(this.TotalAmountPaid)
      data.fine_payment_amount = InputFormat.convNumString(this.FineAmountPaid)
      return data
    },
    async save() {
      const Param = this.createRequestVariable(false)

      if (parseInt(Param.annual_payment_amount,10) > parseInt(InputFormat.convNumString(this.total_amount),10)) {
        CustomNotification.notif(
          'warning',
          'Pokok yang dibayarkan melebihi total awal',
          'Mohon periksa kembali',
        )
        return false
      }

      if (parseInt(Param.fine_payment_amount,10) > parseInt(InputFormat.convNumString(this.FineAmount),10)) {
        CustomNotification.notif(
          'warning',
          'Denda yang dibayarkan melebihi denda awal',
          'Mohon periksa kembali',
        )
        return false
      }

      if ((!Param.annual_payment_amount && !Param.fine_payment_amount) || (Param.annual_payment_amount < 1 && Param.fine_payment_amount < 1)) {
        CustomNotification.notif(
          'warning',
          'Nilai pokok dan denda yang dibayarkan tidak boleh 0',
          'Mohon periksa kembali',
        )
        return false
      }

      this.ShowLoadingSubmitForm = true
      if (Param !== false) {
        await axios({
          url: URLServices.manual_payment_submission.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            // employee_id: this.positions[index].id,
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif(
                'success',
                'Berhasil menambahkan data baru',
                'Halaman akan diarahkan ke index'
              )
              this.$router.push({ name: 'invoice-manual-payment' })
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal menambahkan data',
                result.data.response_message
              )
            }
            this.ShowLoadingSubmitForm = false
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Kesalahan sistem',
              'Mohon coba kembali'
            )

            this.ShowLoadingSubmitForm = false
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
