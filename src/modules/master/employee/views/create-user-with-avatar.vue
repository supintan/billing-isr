<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>Semua form dibawah ini wajib diisi</b-card-text>
        <b-card-text>
          <h5 class="text-primary my-2">BIODATA USER SDPPI</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="NIK*" label-for="nik">
              <b-form-input autocomplete="off" id="nik" v-model="nik" />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nama Lengkap*"
              label-for="full_name"
            >
              <b-form-input
                autocomplete="off"
                id="full_name"
                v-model="full_name"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tgl. Lahir*"
              label-for="date_of_birth"
            >
              <b-form-datepicker
                id="date_of_birth"
                v-model="date_of_birth"
                locale="id"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Jenis Kelamin*"
              label-for="gender"
            >
              <v-select
                v-model="gender"
                :options="sexCode"
                label="name"
                :reduce="(sexCode) => sexCode.code"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Email*" label-for="email">
              <b-form-input autocomplete="off" id="email" v-model="email" />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="No. Telepon*"
              label-for="phone_number"
            >
              <b-form-input
                autocomplete="off"
                id="phone_number"
                v-model="phone_number"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Alamat*" label-for="address">
              <b-form-textarea
                id="address"
                v-model="address"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>

        <h5 class="text-primary my-2">LOGIN</h5>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Username*" label-for="username">
              <b-form-input
                autocomplete="off"
                id="username"
                v-model="username"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Email*" label-for="email-login">
              <b-form-input
                autocomplete="off"
                id="email-login"
                v-model="email_login"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Password*" label-for="password">
              <b-form-input type="password" id="password" v-model="password" />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Ulangi Password*"
              label-for="ulangi-password"
            >
              <b-form-input
                type="password"
                id="ulangi-password"
                v-model="password2"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <h5 class="text-primary my-2">FOTO</h5>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Foto Profil*" label-for="foto">
              <!-- <b-form-file id="foto" v-model="avatar_base64" accept="image/*" /> -->
              <a class="btn" @click="toggleShow">Pilih Foto</a>
              <my-upload
                field="img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                v-if="show"
                lang-type="en"
                :width="300"
                :height="300"
                url="/upload"
                :params="params"
                :headers="headers"
                img-format="png"
              ></my-upload>
              <img :src="imgDataUrl" />
            </b-form-group>
          </b-col>
        </b-row>

        <h5 class="text-primary my-2">POSISI</h5>
        <b-overlay :show="showPosisi" rounded="sm">
          <div v-for="(item, index) in positions" :key="index" ref="div">
            <b-row class="mb-1">
              <b-col lg="6" sm="12">
                <b-form-group
                  label-cols="4"
                  label="Posisi"
                  label-for="item-posisi"
                >
                  <v-select
                    id="item-posisi"
                    v-model="positions[index].id"
                    :options="posisi"
                    label="name"
                    :reduce="(posisi) => posisi.id"
                  />
                </b-form-group>
              </b-col>

              <b-col lg="6" sm="12">
                <b-form-group label-cols="4" label="No. SK" label-for="no_sk">
                  <b-form-input
                    id="no_sk"
                    placeholder="AB/CD/123..."
                    v-model="positions[index].appointment_letter_number"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mb-1">
              <b-col lg="6" sm="12">
                <b-form-group
                  label-cols="4"
                  label="Tgl. Mulai"
                  label-for="tgl_mulai_"
                >
                  <b-form-datepicker
                    id="tgl_mulai"
                    v-model="positions[index].start_date"
                    locale="id"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6" sm="12">
                <b-form-group
                  label-cols="4"
                  label="Tgl. Selesai"
                  label-for="tgl_selesai"
                >
                  <b-form-datepicker
                    id="tgl_selesai"
                    v-model="positions[index].end_date"
                    locale="id"
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
            >
              <feather-icon icon="PlusIcon" class="mr-25" />
              <span>Tambah</span>
            </b-button>
          </div>
        </b-overlay>
        <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'UserSDPPI' }"
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
  BFormTextarea,
  BForm,
  BFormDatepicker,
  // BFormFile,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'
import { heightTransition } from '@core/mixins/ui/transition'
import myUpload from 'vue-image-crop-upload'
import { URLServices, token } from '@/services/UrlConfig'

export default {
  mixins: [heightTransition],
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
      nextTodoId: 2,
      // Biodata
      nik: '12121',
      full_name: 'Aman Test',
      gender: 'M',
      phone_number: '12019210',
      date_of_birth: '2000-01-01',
      address: 'Jl. Thamrin no. 10',
      email: 'aman@tes.com',
      username: 'aman',
      email_login: 'aman@tes.com',
      password: '12345',
      password2: '12345',
      // Avatar
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],

      show: false,
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      imgDataUrl: '', // the datebase64 url of created image
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BFormDatepicker,
    // BFormFile,
    BRow,
    BOverlay,
    vSelect,
    'my-upload': myUpload,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getPosisi()
    window.addEventListener('resize', this.initTrHeight)
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      console.log(field)
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log(`field: ${field}`)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log(`field: ${field}`)
    },

    async getPosisi() {
      this.showPosisi = true
      await axios({
        url: URLServices.position.index,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(result => {
          this.posisi = result.data.data
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.$toast({
            component: ToastificationContent,
            props: {
              title: errorMessage,
              icon: 'WarningIcon',
              variant: 'warning',
            },
          })
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
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    createRequestVariable() {
      // const param = {}
      const param = {
        username: this.username,
        email: this.email,
        password: this.password,
      }
      return param
    },
    async save() {
      this.showCreteUserForm = true
      // const Param = this.createRequestVariable()

      // console.URLServices
      // this.params = false
      if (1 !== 2) {
        await axios({
          url: ServiceConfig.Config.url.userManagement.store,
          method: 'post',
          data: {
            request_id: 'guid_v4',
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            data: {
              nik: this.nik,
              full_name: this.full_name,
              gender: this.gender,
              phone_number: this.phone_number,
              date_of_birth: this.date_of_birth,
              address: this.address,
              email: this.email,
              avatar_base64: 'ax',
              login: {
                username: this.username,
                email: this.email,
                password: this.password,
              },
              positions: this.positions,
            },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Berhasil menambahkan user baru',
                  icon: 'CheckIcon',
                  variant: 'success',
                },
              })
              this.$router.push({ name: 'UserManagement' })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: result.data.response_message,
                  icon: 'InfoIcon',
                  variant: 'warning',
                },
              })
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: notifError.message,
                icon: notifError.icon,
                variant: notifError.status,
              },
            })
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
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
