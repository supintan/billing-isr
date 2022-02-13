<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Ubah Peraturan Data Index Price</h5>
        </b-card-text>
      <b-row class="mb-1">
        <b-col lg="10" sm="12">
          <b-form-group label-cols="3" label="Nama Peraturan*" label-for="reg-name">
            <b-form-input autocomplete="off" id="reg-name" v-model="regName" required />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="10" sm="12">
          <b-form-group label-cols="3" label="Nomor Peraturan*" label-for="reg-number">
            <b-form-input autocomplete="off" id="reg-number" v-model="regNumber" required />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="10" sm="12">
          <b-form-group label-cols="3" label="Nama Peraturan Asli*" label-for="off-reg-name">
            <b-form-input autocomplete="off" id="off-reg-name" v-model="offRegName" required />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="10" sm="12">
          <b-form-group label-cols="3" label="Deskripsi*" label-for="desc">
            <b-form-textarea autocomplete="off" id="desc" v-model="description" required />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="10" sm="12">
          <b-form-group label-cols="3" label="Tanggal Publish*" label-for="publish_date">
            <b-form-datepicker
              id="publish_date_input"
              v-model="datePub"
              locale="id"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="10" sm="12">
          <b-form-group
                label-cols="3"
                label="Dokumen*"
                label-for="file"
          >
          <b-form-file
            v-model="fileLoc"
            accept=".pdf"
            required
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
        <b-col>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'index-price' }"
            variant="outline-secondary"
          >
            Batal
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-3"
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
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
// import { heightTransition } from '@core/mixins/ui/transition'
import InputFormat from '@/helpers/input-format'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
//   mixins: [heightTransition],
  data() {
    return {
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
      idReg: this.$route.params.selectedIdIndexPrice,
      // DOWNLOAD PDF
      downloadUrl: null,
      downloadfilename: null,
      options: {
        number: InputFormat.options('number'),
      },

      regName: '',
      regNumber: '',
      offRegName: '',
      description: '',
      datePub: new Date(),
      fileLoc: null,
      fileBase64: '',
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
    this.detail()
    // window.addEventListener('resize', this.initTrHeight)
  },
//   mounted() {
//     this.initTrHeight()
//   },
//   destroyed() {
//     window.removeEventListener('resize', this.initTrHeight)
//   },
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

      data.regulation_name = this.regName
      data.regulation_number = this.regNumber
      data.regulation_official_name = this.offRegName
      data.regulation_description = this.description
      data.publish_date = this.datePub
      data.file_base64 = this.fileLoc

      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.index_price.update,
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
              const successMessage = 'Berhasil menambahkan data peraturan baru'
              CustomNotification.notif('success', 'Berhasil', successMessage)
              this.$router.push({ name: 'index-price' })
            } else {
              const elseMessage = result.data.response_message
              CustomNotification.notif('error', 'Gagal', elseMessage)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = 'Silakan coba kembali setelah beberapa saat !'
            CustomNotification.notif('error', 'Error !', notifError)
            this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    onClick() {
      axios({
        url: URLServices.index_price.download,
        method: 'POST',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.idReg,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.filename)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.index_price.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.idReg,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.regName = dataResult.regulation_name
          this.regNumber = dataResult.regulation_number
          this.offRegName = dataResult.regulation_official_name
          this.description = dataResult.regulation_description
          this.publish_date = dataResult.publish_date

          this.getDetailUserSuccessed = true
          this.showDetailUser = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
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
