<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-form ref="form">
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
            :to="{ name: 'employee' }"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'
import { heightTransition } from '@core/mixins/ui/transition'
import UserManagement from '@/services/UserManagement'
import { URLServices, token } from '@/services/UrlConfig'

export default {
  mixins: [heightTransition],
  data() {
    return {
      sexCode: [
        { code: 'M', name: 'Laki-Laki' },
        { code: 'F', name: 'Perempuan' },
      ],
      nextTodoId: 2,
      // Biodata
      nik: '...',
      full_name: '...',
      gender: '...',
      phone_number: '...',
      date_of_birth: '...',
      address: '...',
      email: '...',
      username: '...',
      email_login: '...',
      password: '',
      password2: '',
      // Avatar
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      positions: [],
      posisi: [],
      id_user: this.$route.params.selectedUserID,
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
    BRow,
    BOverlay,
    vSelect,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getPosisi()
    this.detail()
    window.addEventListener('resize', this.initTrHeight)
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
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

      // console.log(Param)
      // this.params = false
      if (1 !== 2) {
        await axios({
          url: URLServices.employee.update,
          method: 'post',
          data: {
            request_id: 'guid_v4',
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            employee_id: this.id_user,
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
                  title: 'Berhasil memperbaharui data',
                  icon: 'CheckIcon',
                  variant: 'success',
                },
              })
              this.$router.push({ name: 'employee' })
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
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.employee.getUserDetail,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          employee_id: this.id_user,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data.employee_list[0]
          this.nik = dataResult.nik
          this.full_name = dataResult.full_name
          this.gender = dataResult.gender
          this.phone_number = dataResult.phone_number
          this.date_of_birth = dataResult.date_of_birth
          this.address = dataResult.address
          this.email = dataResult.email
          this.username = dataResult.login[0].username
          this.email_login = dataResult.login[0].email
          this.positions = dataResult.positions
          this.getDetailUserSuccessed = true
          this.showDetailUser = false
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
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
