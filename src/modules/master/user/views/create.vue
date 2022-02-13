<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-form ref="form">
        <h5 class="text-primary my-2 text-uppercase">Data User</h5>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Username*"
              label-for="username"
            >
              <b-form-input
                autocomplete="off"
                id="username"
                v-model="username"
                placeholder="Abcd123..."
                :readonly="status === 'edit'"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
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
                placeholder="Abcd..."
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Email*" label-for="email">
              <b-form-input
                autocomplete="off"
                id="email"
                v-model="emailUser"
                placeholder="abcd@xyz.com"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <div v-if="status === 'edit'" class="text-primary text-center mb-2">Isikan password hanya jika anda ingin mengubahnya</div>
            <b-form-group
              label-cols="4"
              label="Password*"
              label-for="password"
            >
              <b-form-input
                type="password"
                autocomplete="off"
                id="password"
                v-model="password"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Ulangi Password*"
              label-for="repeatPassword"
            >
              <b-form-input
                type="password"
                autocomplete="off"
                id="repeatPassword"
                v-model="password2"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <h5 class="text-primary my-2">GROUP</h5>
        <b-overlay :show="showPosisi" rounded="sm">
          <div v-for="(item, index) in Group" :key="index" ref="div">
            <b-row>
              <b-col lg="6" sm="12">
                <b-form-group
                  label-cols="4"
                  :label="'Group ' + (index + 1)"
                  label-for="item-posisi"
                >
                  <v-select
                    id="item-posisi"
                    v-model="Group[index].id"
                    :options="posisi"
                    label="role_name"
                    :reduce="posisi => posisi.role_id"
                    placeholder="--- Pilih Group ---"
                  />
                </b-form-group>
              </b-col>

              <b-col lg="6" sm="12">
                <b-button
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="outline-danger"
                  @click="removeItem(index)"
                  v-if="Group.length !== 1"
                  class="mr-1"
                >
                  <feather-icon icon="TrashIcon"/>
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="outline-success"
                  @click="repeateAgain"
                  v-if="Group.length === (index + 1)"
                >
                  <feather-icon icon="PlusIcon"/>
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-overlay>
        <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'user' }"
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
            :disabled="!statusSave"
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
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BOverlay,
  BForm,
  // BFormFile,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'
import { uuid } from 'vue-uuid'
// import { heightTransition } from '@core/mixins/ui/transition'
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import UserManagement from '@/services/UserManagement'
import { URLServices, getToken } from '@/services/UrlConfig'
// import { required, email } from '@validations'
import CustomNotification from '@/helpers/custom-notification'

export default {
  // mixins: [heightTransition],
  props: ['data', 'status'],
  data() {
    return {
      Group: [
        {
          id: null,
        },
      ],
      nextTodoId: 2,
      // Biodata
      full_name: '',
      emailUser: '',
      username: null,
      password: '',
      password2: '',
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],
      URL: URLServices.user.store,
      UserId: null,
    }
  },
  components: {
    BButton,
    BCard,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BRow,
    BOverlay,
    vSelect,
    // ValidationProvider,
    // ValidationObserver,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getPosisi()
    if (this.status === 'edit') {
      this.full_name = this.data.full_name
      this.emailUser = this.data.email
      this.username = this.data.user_name
      this.URL = URLServices.user.update
      this.UserId = this.$route.params.selectedUserID

      this.Group = []
      Object.keys(this.data.role_list).forEach(key => {
        this.Group.push({
          id: this.data.role_list[key].role_id,
        })
      })
    }
    window.addEventListener('resize', this.initTrHeight)
  },
  // mounted() {
  //   this.initTrHeight()
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.initTrHeight)
  // },
  computed: {
    statusSave() {
      return (
        this.full_name && this.emailUser && this.username && this.Group
      )
    },
  },
  methods: {
    async getPosisi() {
      this.showPosisi = true
      await axios({
        url: URLServices.role.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          this.posisi = result.data.data.role_list
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Gagal mendapatkan role', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    repeateAgain() {
      this.Group.push({
        index: (this.nextTodoId += this.nextTodoId),
      })

      // this.$nextTick(() => {
      //   this.trAddHeight(this.$refs.div[0].offsetHeight)
      // })
    },
    removeItem(index) {
      this.Group.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },
    // initTrHeight() {
    //   this.trSetHeight(null)
    //   this.$nextTick(() => {
    //     this.trSetHeight(this.$refs.form.scrollHeight)
    //   })
    // },
    validation() {
      if (!this.username) {
        CustomNotification.notif('warning', 'Anda belum mengisi username', 'Mohon periksa kembali')
        return false
      }

      if (!this.full_name) {
        CustomNotification.notif('warning', 'Anda belum mengisi nama lengkap', 'Mohon periksa kembali')
        return false
      }

      if (!this.emailUser) {
        CustomNotification.notif('warning', 'Anda belum mengisi email', 'Mohon periksa kembali')
        return false
      }

      if ((this.status !== 'edit' && (!this.password || !this.password2 || this.password !== this.password2)) || ((this.password.length > 0 || this.password2.length > 0) && this.password !== this.password2)) {
        CustomNotification.notif('warning', 'Pengisian password salah', 'Mohon periksa kembali')
        return false
      }

      return true
    },
    async save() {
      if (!this.validation()) return false

      const roleData = []
      let continueSave = true

      Object.keys(this.Group).forEach(key => {
        if (!this.Group[key].id) {
          continueSave = false
          CustomNotification.notif('warning', 'Anda belum memilih role', 'Mohon periksa kembali')
        }

        roleData.push({
          role_id: this.Group[key].id,
        })
      })

      if (continueSave) {
        this.showCreteUserForm = true
        const dataTemp = {}
        dataTemp.request_id = 'guid_v4'
        dataTemp.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')

        if (this.status === 'edit') {
          dataTemp.user_id = this.UserId
        }

        dataTemp.data = {
          name: this.username,
          full_name: this.full_name,
          email: this.emailUser,
          password: this.password,
          role_list: roleData,
        }

        if (this.status !== 'edit' || (this.status === 'edit' && this.password.length > 0)) {
          dataTemp.data.password = this.password
        }

        await axios({
          url: this.URL,
          method: 'post',
          data: dataTemp,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif('success', 'Berhasil', (this.status === 'edit' ? 'Berhasil memperbaharui data' : 'Berhasil menambahkan data'))
              this.$router.push({ name: 'user' })
            } else {
              CustomNotification.notif('warning', 'Gagal', result.data.response_message)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif('warning', 'Gagal', 'Mohon coba kembali')
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
      return true
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
