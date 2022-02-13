<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Ubah Informasi Peraturan</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="Nama Peraturan*"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="RegulationName"
                required
                maxlength="200"
                minlength="10"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label="Nama Resmi*" label-for="name">
              <b-form-input
                autocomplete="off"
                id="name"
                v-model="RegulationOfficalName"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="Nomor Peraturan*"
              label-for="name"
            >
              <b-form-input
                autocomplete="off"
                id="name"
                v-model="RegulationNumber"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="Tanggal Terbit*"
              label-for="publish_date"
            >
              <b-form-datepicker
                id="publish_date"
                v-model="publish_date"
                locale="id"
                autocomplete="off"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group
              label-cols="4"
              label="File Peraturan"
              label-for="file"
            >
              <b-form-file
                v-model="fileLoc"
                accept=".pdf"
                placeholder="Pilih upload dokumen..."
                drop-placeholder="Drop file here..."
                @change="createBase64File"
                src=""
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="8" sm="8">
            <b-form-group label-cols="4" label=" ">
              <button
                data-v-aa799a9e=""
                type="button"
                class="btn mr-1 btn-primary"
                style="position: relative;"
                @click="onClick()"
              >
                Download
              </button>
              <label class="d-block invalid-feedback">*Dokumen tersedia</label>
            </b-form-group>
          </b-col>
        </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group label-cols="4" label="Deskripsi*" label-for="deskripsi">
                <b-form-textarea
                  id="textarea"
                  v-model="Deskripsi"
                  placeholder="Deskripsi ..."
                  rows="3"
                  max-rows="6"
                >
                </b-form-textarea>
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
            :to="{ name: 'base-price' }"
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
  BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import InputFormat from '@/helpers/input-format'
import { URLServices, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
      nextTodoId: 2,
      // Biodata
      RegulationName: '...',
      RegulationOfficalName: '...',
      RegulationNumber: '...',
      publish_date: null,
      name: null,
      Deskripsi: null,

      regulation_official_name: '...',
      fine_percentage: '...',
      maximum_amount: '...',
      maximum_months_overdue: '...',
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
      id_user: this.$route.params.selectedFineID,
      // DOWNLOAD PDF
      fileLoc: null,
      fileBase64: '',
      downloadUrl: null,
      downloadfilename: null,
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
    BRow,
    BOverlay,
    BFormFile,
    BFormDatepicker,
  },
  directives: {
    Ripple,
  },
  created() {
    this.detail()
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
    repeateAgain() {
      this.positions.push({
        index: (this.nextTodoId += this.nextTodoId),
      })
    },
    removeItem(index) {
      this.positions.splice(index, 1)
    },
    createBase64File(e) {
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }
    },
    createRequestVariable() {
      const data = {}

      data.regulation_name = this.RegulationName
      data.regulation_number = this.RegulationNumber
      data.regulation_official_name = this.RegulationOfficalName
      data.regulation_description = this.Deskripsi
      data.publish_date = this.publish_date
      data.file_location = this.fileBase64
      
      return data
    },
    async save() {
      this.showCreteUserForm = true
      const data = this.createRequestVariable()
      await axios({
        url: URLServices.base_price.update,
        method: 'post',
        data: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.id_user,
          data
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            CustomNotification.notif(
              'success',
              'Berhasil memperbaharui data',
              'Halaman akan diarahkan ke halaman index'
            )
            this.$router.push({ name: 'base-price' })
          } else {
            CustomNotification.notif('warning', result.data.response_message)
          }
          this.showCreteUserForm = false
        })
        .catch(error => {
          CustomNotification.notif(
            'danger',
            'Gagal memperbaharui data',
            'Mohon coba kembali'
          )
          this.showCreteUserForm = false
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    onClick() {
      axios({
        url: URLServices.base_price.download,
        method: 'POST',
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
        url: URLServices.base_price.get,
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
          this.RegulationName = dataResult.regulation_name
          this.RegulationOfficalName = dataResult.regulation_official_name
          this.RegulationNumber = dataResult.regulation_number
          this.publish_date = dataResult.publish_date
          this.Deskripsi = dataResult.regulation_description
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

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
