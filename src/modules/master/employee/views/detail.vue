<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-card-text>
        <h5 class="text-primary mt-2">BIODATA USER</h5>
      </b-card-text>
      <b-row>
        <b-col lg="6" sm="12">
          <b-form-group label-cols="4" label="NIK" label-for="nik">
            <b-form-input
              id="nik"
              plaintext
              :value="userData.nik"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6" sm="12">
          <b-form-group
            label-cols="4"
            label="Nama Lengkap"
            label-for="full_name"
          >
            <b-form-input
              id="full_name"
              plaintext
              :value="userData.full_name"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" sm="12">
          <b-form-group
            label-cols="4"
            label="Tgl. Lahir"
            label-for="date_of_birth"
          >
            <b-form-input
              id="date_of_birth"
              plaintext
              :value="convDate(userData.date_of_birth)"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6" sm="12">
          <b-form-group label-cols="4" label="Jenis Kelamin" label-for="gender">
            <b-form-input
              id="gender"
              plaintext
              :value="convSexCode(userData.gender)"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" sm="12">
          <b-form-group label-cols="4" label="Email" label-for="email">
            <b-form-input
              id="email"
              plaintext
              :value="userData.email"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6" sm="12">
          <b-form-group
            label-cols="4"
            label="No. Telepon"
            label-for="phone_number"
          >
            <b-form-input
              id="phone_number"
              plaintext
              :value="userData.phone_number"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" sm="12">
          <b-form-group label-cols="2" label="Alamat" label-for="address">
            <b-form-input
              id="address"
              plaintext
              :value="userData.address"
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <h5 class="text-primary mt-2">LOGIN</h5>
      <div v-for="(val, id) in userData.login" :key="id">
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Username" label-for="username">
              <b-form-input
                id="username"
                plaintext
                :value="val.username"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Email" label-for="email">
              <b-form-input
                id="email"
                plaintext
                :value="val.email"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <hr />
      <h5 class="text-primary mt-2">POSISI</h5>
      <div v-if="items">
        <b-card-text>
          Menampilkan daftar posisi user
        </b-card-text>
        <b-row>
          <b-col>
            <b-table
              id="tablePosisi"
              striped
              hover
              responsive
              :items="userData.positions"
              :fields="fields"
              class="position-relative shadow mb-0"
            >
              <template #cell(no)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(start_date)="data">
                {{ convDate(data.item.start_date) }}
              </template>
              <template #cell(end_date)="data">
                {{ convDate(data.item.end_date) }}
              </template>
            </b-table>
          </b-col>
        </b-row>
      </div>
      <div v-else class="my-2 text-center">
        Tidak ditemukan
      </div>
      <b-row>
        <b-col>&nbsp; </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BTable,
  BCard,
  BCardText,
  BCol,
  BRow,
  BFormGroup,
  BOverlay,
  BFormInput,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import moment from 'moment'
import { URLServices, token } from '@/services/UrlConfig'

export default {
  data() {
    return {
      nik: '',
      fullName: '',
      email: '',
      roleSelected: [],
      roles: [],
      userRole: null,
      password: '',
      password2: '',
      id_user: null,
      showRoleList: false,
      showCreteUserForm: false,
      userData: {},
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'official_name', label: 'Nama Resmi', sortable: true },
        { key: 'appointment_letter_number', label: 'No. SK', sortable: true },
        { key: 'start_date', label: 'Tgl. Mulai', sortable: true },
        { key: 'end_date', label: 'Tgl. Selesai', sortable: true },
      ],
      items: [],
    }
  },
  components: {
    BTable,
    BCard,
    BCardText,
    BCol,
    BRow,
    BFormGroup,
    BOverlay,
    BFormInput,
  },
  directives: {
    Ripple,
  },
  created() {
    this.id_user = this.$route.params.selectedUserID
    this.getDetailUser()
    this.getRole()
  },
  methods: {
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
    async getDetailUser() {
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
          [this.userData] = result.data.data.employee_list
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
    async getRole() {
      this.showRoleList = true
      await axios({
        url: URLServices.userManagement.getRole,
        method: 'get',
        params: {
          request_id: 'guid_v4',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(result => {
          this.roles = result.data.data.role_list
          this.showRoleList = false
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
          this.showRoleList = false
        })
    },
    createRequestVariable() {
      const data = {}
      data.nik = this.nik
      data.full_name = this.fullName
      data.password = this.password2
      data.email = this.email
      data.role = {
        role_id: this.roleSelected,
      }
      return data
    },
    async save() {
      this.showCreteUserForm = true
      await axios({
        url: URLServices.userManagement.update,
        method: 'post',
        data: {
          request_id: 'guid_v4',
          user_id: this.id_user,
          data: this.createRequestVariable(),
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
                title: 'Berhasil memperbaharui user',
                icon: 'CheckIcon',
                variant: 'success',
              },
            })
            this.showCreteUserForm = false
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
            this.showCreteUserForm = false
          }
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
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>
