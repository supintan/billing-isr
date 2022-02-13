<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
        <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Tambah Tanda Tangan Digital</h5>
        </b-card-text>
          <b-overlay :show="showPosisi" rounded="sm">
            <div v-for="(item, index) in positions" :key="index" ref="div">
              <b-row class="mb-1">
                <b-col lg="10" sm="12">
                  <b-form-group
                    label-cols="2"
                    label="Nama"
                    label-for="item-posisi"
                  >
                    <v-select
                      id="item-posisi"
                      v-model="selectedClient"
                      :options="employee"
                      label="employee_name"
                      :reduce="(employee) => employee.id"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col lg="10" sm="12">
                <b-form-group
                  label-cols="2"
                  label="Jabatan*"
                  label-for="employee_status"
                  hidden
                >
                <b-form-input
                  hidden
                  autocomplete="off"
                  id="employee_status"
                  v-model="positions[index].id"
                  :options="employee"
                  label="official_name"
                  required
                  readonly
                />
              </b-form-group>
              </b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col lg="10" sm="12">
                  <b-form-group
                    label-cols="2"
                    label="File Sertifikat*"
                    label-for="file"
                  >
                  <b-form-file
                    v-model="fileLoc"
                    accept=".p12"
                    required
                    drop-placeholder="Drop file here..."
                    @change="createBase64File"
                    src=""
                  />
                  </b-form-group>
                </b-col>
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
            </div>
            <div class="text-right mt-0">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-success"
                @click="repeateAgain"
                hidden
              >
                <feather-icon icon="PlusIcon" class="mr-25" />
                <span>Tambah</span>
              </b-button>
            </div>
          </b-overlay>
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'digital-signature' }"
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
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import CustomNotification from '@/helpers/custom-notification'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import moment from 'moment'
// import { heightTransition } from '@core/mixins/ui/transition'
// import UserManagement from '@/services/UserManagement'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'

export default {
  // mixins: [heightTransition],
  data() {
    return {
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
      client: [],
      statusShowClient: true,

      nextTodoId: 2,
      // Biodata
      nik: '',
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
      // Avatar
      fileLoc: null,
      fileBase64: '',
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],
      employee: [],
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
  },
  directives: {
    Ripple,
  },
  created() {
    this.getEmployee()
    // window.addEventListener('resize', this.initTrHeight)
  },
  // mounted() {
  //   this.initTrHeight()
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.initTrHeight)
  // },
  methods: {
    async getEmployee() {
      this.showPosisi = true
      await axios({
        url: URLServices.digital_signature.index,
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
          this.employee = result.data.data
          // console.log('test')
          // console.log(result)
          // console.log(this.employee)
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
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
    // initTrHeight() {
    //   this.trSetHeight(null)
    //   this.$nextTick(() => {
    //     this.trSetHeight(this.$refs.form.scrollHeight)
    //   })
    // },
    createBase64File(e) {
      // console.log('apa ini leeeee', e)
      const file = e.target.files[0]
      // console.log(e.target.files, 'ini files')
      // console.log(file, 'ini file')
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          // console.log(this.fileLoc)
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }
      data.employee_id = this.selectedClient
      data.certificate_file_location = this.fileLoc
      // data.employee_id = this.positions.id
      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()
      // const empolyee_data_id = this.getEmployee()
      // console.log(Param)
      if (Param !== false) {
        await axios({
          url: URLServices.digital_signature.store,
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
              const success = 'Berhasil menambahkan data baru'
              CustomNotification.notif('success', success)
              this.$router.push({ name: 'digital-signature' })
            } else {
              const notif = result.data.response_message
              CustomNotification.notif('warning', notif)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = 'Tidak dapat menambahkan data baru'
            CustomNotification.notif('warning', notifError)
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

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
