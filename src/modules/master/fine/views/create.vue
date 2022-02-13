<template>
  <b-overlay rounded="sm">
    <b-form @submit="onSubmit" v-if="show">
      <b-card>
      <b-card-text class="text-primary my-2">Semua form dibawah ini wajib diisi</b-card-text>
      <validation-observer ref="saveValidation" #default="{invalid}">
        <b-row>
          <b-col sm="12" md="8" lg="8">
            <b-form-group
              class="mb-2"
              label="Nama Peraturan*"
              label-for="regulation_name_input"
              label-cols="4"
              rules="required"
            >
              <!-- <validation-provider
                  #default="{ errors }"
                  name="Regulation name"
                  rules="required"
                > -->
                  <b-form-input
                    id="regulation_name_input1"
                    class="font-weight"
                    label-cols="2"
                    required
                    v-model="regulation_name_input"
                    autocomplete="off"
                  />
                <!-- <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider> -->
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nomor Peraturan*"
              label-for="regulation_number_input"
              label-cols="4"
            >
              <b-form-input
                id="regulation_number_input"
                class="font-weight"
                label-cols="2"
                required
                :rules="[(v) => !!v || 'Nomor Peraturan wajib diisi']"
                v-model="regulation_number_input"
                autocomplete="off"
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Deskripsi Peraturan*"
              label-for="regulation_description_input"
              label-cols="4"
            >
              <b-form-textarea
                id="regulation_description_input"
                class="font-weight"
                label-cols="2"
                :rules="[(v) => !!v || 'Deskripsi wajib diisi']"
                v-model="regulation_description_input"
                autocomplete="off"
                required
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Judul Resmi Peraturan*"
              label-for="regulation_official_name_input"
              label-cols="4"
            >
              <b-form-input
                id="regulation_official_name_input"
                type="text"
                class="font-weight"
                label-cols="2"
                :rules="[(v) => !!v || 'Judul Resmi wajib diisi']"
                v-model="regulation_official_name_input"
                required
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Persentase Denda (%)*"
              label-for="fine_percentage_input"
              label-cols="4"
            >
              <b-input-group append="%">
                <b-form-input 
                  id="fine_percentage_input"
                  v-model="fine_percentage_input"
                  class="form-control text-right"
                  :raw="false"
                  placeholder="0,00"
                  required
                  autocomplete="off"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="4"
                />
                <!-- <cleave
                  id="fine_percentage_input"
                  v-model="fine_percentage_input"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  required
                  autocomplete="off"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="4"
                /> -->
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Maksimal Denda*"
              label-for="maximum_amount_input"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="maximum_amount_input"
                  :v-model="maximum_amount_input"
                  type="number"
                  class="form-control font-weight text-right"
                  :raw="false"
                  maxlength="200"
                  minlength="10"
                  required
                  autocomplete="off"
                />
                <!-- <cleave
                  id="maximum_amount_input"
                  v-model="maximum_amount_input"
                  class="form-control font-weight text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="10.000.000"
                  maxlength="200"
                  minlength="10"
                  required
                  autocomplete="off"
                /> -->
              </b-input-group>
            </b-form-group>
            <b-form-group
                class="mb-2"
                label="Maksimal Bulan Denda*"
                label-for="maximum_periods_overdueId"
                label-cols="4"
              >
              <b-input-group append="Bulan">
                <b-form-input
                  id="maximum_periods_overdueId"
                  type="number"
                  class="font-weight"
                  label-cols="2"
                  :rules="[(v) => !!v || 'Maksimum denda bulan wajib diisi']"
                  v-model="maximum_periods_overdue"
                  @input="itNumber"
                />
              </b-input-group>
              </b-form-group>
            <!-- Batas -->
            <b-form-group
              class="mb-2"
              label="Tanggal Terbit*"
              label-for="publish_date_input"
              label-cols="4"
            >
              <b-form-datepicker
                id="publish_date_input"
                v-model="publish_date_input"
                locale="id"
              />
            </b-form-group>
            <b-form-group label-cols="4" label="File Peraturan*" label-for="file">
              <b-form-file
                v-model="fileLoc"
                accept=".pdf"
                required
                placeholder="Pilih upload dokumen..."
                drop-placeholder="Drop file here..."
                @change="createBase64File"
                src=""
              />
              <small class="text-info">Isilah dengan format file (.pdf)</small>
            </b-form-group>
          </b-col>
        </b-row>
        <b-card-text class="text-primary my-2">Berisi tamplate-template denda</b-card-text>
          <b-row>
            <b-col sm="12" lg="8">
              <b-form-group
                class="mb-2"
                label="Maksimal Bulan Denda*"
                label-for="maximum_periods_overdueId"
                label-cols="4"
              >
              <b-input-group append="Bulan">
                <b-form-input
                  id="maximum_periods_overdueId"
                  type="number"
                  class="font-weight"
                  label-cols="2"
                  :rules="[(v) => !!v || 'Maksimum denda bulan wajib diisi']"
                  v-model="maximum_periods_overdue"
                  @input="itNumber"
                />
              </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- <div class="divider my-1">
            <div class="divider-text font-weight-bold">
              Jumlah template
            </div>
          </div> -->
          <!-- <b-row v-for="item in numberTemplate" :key="item">
            <b-col sm="12" lg="8">
              <b-form-group
                class="mb-2"
                :label="'Template Telat ' + item + ' Periode *'"
                label-for="template"
                label-cols="4"
              >
                <v-select
                  id="service"
                  v-model="template[item]"
                  label="name"
                  box
                  placeholder="-- Pilih Template -- "
                  :options="allTemplate"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-button
                variant="info"
              >
              <feather-icon icon="ZoomInIcon" />
                Preview
              </b-button>
            </b-col>
          </b-row> -->
          <b-row>
            <b-col offset-md="4">
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                :to="{ name: 'Denda' }"
                variant="outline-secondary"
              >
                Batal
              </b-button>
              &nbsp;
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="success"
                :disabled="invalid"
                class="btn btn-primary ml-1"
                @click.prevent="save"
              >
                Simpan
              </b-button>
            </b-col>
          </b-row>
          </validation-observer>
      </b-card>
    </b-form>
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
  BFormDatepicker,
  BFormFile,
  BFormTextarea,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
// import vSelect from 'vue-select'
import { uuid } from 'vue-uuid'
import { ValidationObserver } from 'vee-validate'
// import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
// import { ref } from '@vue/composition-api'
import moment from 'moment'
// import Cleave from 'vue-cleave-component'
// import UserManagement from '@/services/UserManagement'
import InputFormat from '@/helpers/input-format'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
      template: [],
      allTemplate: [],
      showCreteFineForm: false,
      publish_date: '',
      // FOTO
      blogFile: null,
      fileLoc: null,
      fileBase64: '',
      regulation_name_input: '',
      regulation_number_input: '',
      regulation_description_input: '',
      regulation_official_name_input: '',
      fine_percentage_input: 0,
      maximum_amount_input: 0,
      maximum_periods_overdue: 0,
      publish_date_input: new Date(),
      options: {
        number: InputFormat.options('number'),
      },
      day_fine_periode: 0,
      tempos: [
        { value: null, text: '-- Pilih Periode --' },
        { value: 'D', text: 'Hari' },
        { value: 'M', text: 'Bulan' },
        // { value: { C: '3PO' }, text: 'This is an option with object value' },
        // { value: 'app03', text: 'This one is disabled', disabled: true },
      ],
      numberTemplate: 0,
      show: true,
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BFormDatepicker,
    BFormFile,
    BFormTextarea,
    // Cleave,
    BInputGroup,
    // vSelect,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  computed: {
    // formatPrice(value) {
    //   let val = (value/1).toFixed(2).replace('.', ',')
    //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    // },
    statusCalculate() {
      const tempStatus = this.regulation_name_input && this.regulation_number_input && this.regulation_description_input
                        && this.regulation_official_name_input && this.fine_percentage_input && this.maximum_amount_input
      return tempStatus
    },
    statusSave() {
      return this.statusCalculate
    },
  },
  // created() {
  //   this.formatPrice()
  // },
  methods: {
    async getDataTemplate() {
      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: {
          page: 1,
          length: 1000,
          search: '',
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.allTemplate = result.data.data
          } else {
            this.allTemplate = []
          }
        })
        .catch(error => {
          const errorMessage = `Gagal memuat data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    onSubmit(event) {
      event.preventDefault()
      // alert(JSON.stringify(this.regulation_name_input))
    },
    itNumber() {
      this.numberTemplate = parseInt(this.maximum_periods_overdue, 10)
      if (Number.isNaN(this.numberTemplate)) {
        this.numberTemplate = 0
      }
      Object.keys(this.numberTemplate).forEach(key => {
        console.log(this.numberTemplate[key])
      })

      this.getDataTemplate()
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
      data.regulation_name = this.regulation_name_input
      data.regulation_number = this.regulation_number_input
      data.regulation_description = this.regulation_description_input
      data.regulation_official_name = this.regulation_official_name_input
      data.fine_percentage = InputFormat.convNumString(this.fine_percentage_input)
      data.maximum_amount = InputFormat.convNumString(this.maximum_amount_input)
      data.maximum_periods_overdue = this.maximum_periods_overdue
      data.publish_date = this.publish_date_input
      data.file_base64 = this.fileLoc

      return data
    },
    validationForm() {
      this.$refs.observer.validate().then(success => {
        if (success) {
          this.save()
        }
      })
    },
    async save() {
      this.showCreteFineForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.fine.store,
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
              CustomNotification.notif('success', 'Sukses !','Berhasil menambahkan denda baru')
              this.$router.push({ name: 'fine' })
            } else {
              CustomNotification.notif('warning', 'Warning !', result.data.response_message)
            }
            this.showCreteFineForm = false
          })
          .catch(error => {
            const notifError = 'Gagal Menyimpan data !'
            CustomNotification.notif('error', 'Error !', notifError)
            this.showCreteFineForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
  },
  // setup() {
  //   const refInputEl = ref(null)
  //   const refPreviewEl = ref(null)

  //   const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { refPreviewEl.value.src = base64 })

  //   return {
  //     refInputEl,
  //     refPreviewEl,
  //     inputImageRenderer,
  //   }
  // },
}
</script>

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
