<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Ubah Tanda Tangan Digital</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="NIK*" label-for="regulation_name">
              <b-form-input
                id="employee_nik"
                v-model="employee_nik"
                readonly
                maxlength="200"
                minlength="10"
                placeholder="19950925202202100001"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Nama*" label-for="full_name">
              <b-form-input
                id="full_name"
                v-model="full_name"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Jabatan*" label-for="employee_status">
              <b-form-input
                id="regulation_official_name"
                v-model="name"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group
                label-cols="2"
                label="File Peraturan"
                label-for="file"
          >
          <b-form-file
            v-model="fileLoc"
            accept=".pdf, .p12"
            placeholder="Pilih upload dokumen..."
            drop-placeholder="Drop file here..."
            @change="createBase64File"
            src=""
          />
          </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label=" " >
              <button data-v-aa799a9e="" type="button" class="btn mr-1 btn-primary" style="position: relative;" @click="onClick()"> Download </button>
              <label class="d-block invalid-feedback">*Dokumen tersedia</label>
            </b-form-group>
          </b-col>
        </b-row>

        <b-overlay :show="showPosisi" rounded="sm">
          <div v-for="(item, index) in positions" :key="index" ref="div">
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
import moment from 'moment'
import { uuid } from 'vue-uuid'
// import { heightTransition } from '@core/mixins/ui/transition'
// import UserManagement from '@/services/UserManagement'
import { URLServices, getToken } from '@/services/UrlConfig'

export default {
  // mixins: [heightTransition],
  data() {
    return {
      sexCode: [
        { code: 'M', name: 'Laki-Laki' },
        { code: 'F', name: 'Perempuan' },
      ],
      nextTodoId: 2,
      // Biodata
      regulation_name: '...',
      regulation_number: '...',
      regulation_description: '...',
      regulation_official_name: '...',
      fine_percentage: '...',
      maximum_amount: '...',
      maximum_months_overdue: '...',
      publish_date: '...',
      file_location: '...',
      password: '',
      password2: '',
      timestamp: '',
      // Avatar
      avatar_base64: null,
      showPosisi: false,
      showCreteUserForm: false,
      positions: [],
      posisi: [],
      id_user: this.$route.params.selectedDGSID,
      // DOWNLOAD PDF
      fileLoc: null,
      fileBase64: '',
      downloadUrl: null,
      downloadfilename: null,
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
    BRow,
    BOverlay,
    BFormFile,
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
    downLoadImage(imgUrl) {
      const timestamp = new Date().getTime()
      const name = imgUrl.substring(22, 30)
      const name2 = `${name}${timestamp}.pdf`
      this.downloadUrl = imgUrl
      this.downloadfilename = name2
      setTimeout(() => {
        this.$refs.download.click()
      }, 200)
    },
    async getPosisi() {
      this.showPosisi = true
      await axios({
        url: URLServices.employee.index,
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
          this.posisi = result.data.data
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
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    createBase64File(e) {
      // console.log('apa ini leeeee', e)
      const file = e.target.files[0]
      // console.log(e.target.files, 'ini files')
      // console.log(file, 'ini file')
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      // const param = {}
      const param = {
        username: this.username,
        email: this.email,
        password: this.password,
      }
      const reader = new FileReader()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          // console.log(this.fileLoc)
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }
      return param
    },
    async save() {
      this.showCreteUserForm = true
      // const Param = this.createRequestVariable()

      // console.log(Param)
      // this.params = false
      // if (1 !== 2) {
        await axios({
          url: URLServices.fine.update,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            id: this.id_user,
            data: {
              regulation_name: this.regulation_name,
              regulation_number: this.regulation_number,
              regulation_description: this.regulation_description,
              regulation_official_name: this.regulation_official_name,
              fine_percentage: this.fine_percentage,
              maximum_amount: this.maximum_amount,
              maximum_months_overdue: this.maximum_months_overdue,
              avatar_base64: 'ax',
              publish_date: this.publish_date,
              file_base64: this.fileLoc,
            },
          },
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              const success = 'Berhasil memperbaharui data'
              CustomNotification.notif('success', success)
              this.$router.push({ name: 'fine' })
            } else {
              const warning = result.data.response_message
              CustomNotification.notif('warning', warning)
              this.showCreteUserForm = false
            }
          })
          .catch(error => {
            const notifError = 'Internal server error'
            CustomNotification.notif('warning', notifError)
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      // }
    },
    onClick() {
      axios({
        url: URLServices.fine.download,
        method: 'GET',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.id_user,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          // console.log(result.data)
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          // console.log(fileURL)
          fileLink.href = `${convert}${fileURL}`
          // console.log(fileLink.href)
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'session-time-out' })
          // }
        })
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.fine.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.id_user,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.regulation_name = dataResult.regulation_name
          this.regulation_number = dataResult.regulation_number
          this.regulation_official_name = dataResult.regulation_official_name
          this.regulation_description = dataResult.regulation_description
          this.publish_date = dataResult.publish_date
          this.fine_percentage = dataResult.fine_percentage
          this.maximum_amount = dataResult.maximum_amount
          this.maximum_months_overdue = dataResult.maximum_months_overdue
          // this.regulation_file = dataResult.regulation_file
          this.getDetailUserSuccessed = true
          this.showDetailUser = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
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

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
