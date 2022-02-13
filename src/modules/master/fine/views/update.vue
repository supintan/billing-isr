<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Ubah Informasi Peraturan</h5>
        </b-card-text>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Nama Peraturan*" label-for="regulation_name">
              <b-form-input
                id="regulation_name"
                v-model="regulation_name"
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
            <b-form-group label-cols="2" label="Nomor Peraturan*" label-for="regulation_number">
              <b-form-input
                id="regulation_number"
                v-model="regulation_number"
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
            <b-form-group label-cols="2" label="Keterangan*" label-for="regulation_official_name">
              <b-form-input
                id="regulation_official_name"
                v-model="regulation_official_name"
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
            <b-form-group label-cols="2" label="Deskripsi*" label-for="regulation_description">
              <b-form-textarea
                id="regulation_description"
                v-model="regulation_description"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Tanggal Terbit*" label-for="publish_date">
              <b-form-input
                id="publish_date"
                v-model="publish_date"
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
            <b-form-group label-cols="2" label="Denda Persentase*" label-for="fine_percentage">
              <b-input-group append="%">
                <b-form-input
                  id="fine_percentage"
                  v-model="fine_percentage"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  required
                  autocomplete="off"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength = "4"
                />
                <!-- <cleave
                  id="fine_percentage"
                  v-model="fine_percentage"
                  class="form-control text-right"
                  :raw="false"
                  :options="options.number"
                  placeholder="0,00"
                  required
                  autocomplete="off"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength = "4"
                /> -->
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Maximal Denda*" label-for="maximum_amount">
              <b-input-group prepend="Rp.">
                <b-form-input
                  id="maximum_amount"
                  v-model="maximum_amount"
                  class="form-control font-weight text-right"
                  :raw="false"
                  maxlength="200"
                  minlength="10"
                  required
                  autocomplete="off"
                />
              <!-- <cleave
                id="maximum_amount"
                v-model="maximum_amount"
                class="form-control font-weight text-right"
                :raw="false"
                :options="options.number"
                maxlength="200"
                minlength="10"
                required
                autocomplete="off"
              /> -->
            </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group
              class="mb-2"
              label="Jumlah Hari Per Periode Denda*"
              label-for="day_fine_periode"
              label-cols="2"
            >
              <b-input-group append="Hari">
                <b-form-input
                  id="day_or_month_fine_periode"
                  class="font-weight"
                  type="number"
                  placeholder="0"
                  v-model="day_fine_periode"
                  autocomplete="off"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="4"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row> -->
        <!-- <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2"  label="Jatuh Tempo*" label-for="maximum_periods_overdue">
              <b-form-input
                id="maximum_periods_overdue"
                v-model="maximum_periods_overdue"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row> -->
        <b-form-group label-cols="2"  label="Maksimal Bulan Denda*" label-for="maximum_periods_overdue">
          <b-input-group append="Bulan">
            <b-form-input
                id="maximum_periods_overdue"
                v-model="maximum_periods_overdue"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
                @input="itNumber"
              ></b-form-input>  
          </b-input-group> 
        </b-form-group>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group
                label-cols="2"
                label="File Peraturan"
                label-for="file"
          >
          <b-form-file
            v-model="fileLoc"
            accept=".pdf"
            placeholder="--- Upload Dokumen ---"
            drop-placeholder="Drop file here..."
            @change="createBase64File"
            src=""
          />
          </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Atur menjadi Default?" label-for="statusDefault">
              <v-select
                index="val"
                label="name"
                v-model="selectedDefault"
                :options="DefaultStatusList"
                :reduce="DefaultStatusList => DefaultStatusList.val"
                placeholder="-- Pilih Status --"
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
              class="btn btn-primary ml-1"
              @click.prevent="save"
            >
              Simpan
            </b-button>
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
      </b-form>
    </b-card>
    <!-- <b-card>
      <b-card-text class="text-primary my-2">Berisi tamplate-template denda</b-card-text>
        <b-row>
          <b-col sm="12" lg="12">
            <b-form-group label-cols="2"  label="Jatuh Tempo*" label-for="maximum_periods_overdue">
              <b-form-input
                id="maximum_periods_overdue"
                v-model="maximum_periods_overdue"
                required
                maxlength="200"
                minlength="10"
                placeholder="Maksimal 200 karakter"
                @input="itNumber"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-for="item in numberTemplate" :key="item">
          <b-col sm="12" lg="8">
            <b-form-group
              class="mb-2"
              :label="'Template Telat ' + item + ' Periode *'"
              label-for="template"
              label-cols="3"
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
        </b-row>
        <b-row>
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              to="fine"
              variant="outline-secondary"
            >
              Batal
            </b-button>
            &nbsp;
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="success"
              class="btn btn-primary ml-1"
              @click.prevent="save"
            >
              Simpan
            </b-button>
          </b-col>
        </b-row>
    </b-card> -->
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
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
// import { heightTransition } from '@core/mixins/ui/transition'
// import Cleave from 'vue-cleave-component'
// import UserManagement from '@/services/UserManagement'
import InputFormat from '@/helpers/input-format'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

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
      maximum_periods_overdue: 0,
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
      id_user: this.$route.params.selectedFineID,
      // DOWNLOAD PDF
      fileLoc: null,
      fileBase64: '',
      downloadUrl: null,
      downloadfilename: null,
      options: {
        number: InputFormat.options('number'),
      },
      day_fine_periode: '',
      allTemplate: [],
      template: '',
      numberTemplate: 0,
      selectedDefault: null,
      DefaultStatusList: [
        {
          val: true,
          name: 'Ya, Default',
        },
        {
          val: false,
          name: 'Tidak',
        },
      ],
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
    BFormTextarea,
    // Cleave,
    BInputGroup,
    vSelect,
  },
  directives: {
    Ripple,
  },
  created() {
    this.detail()
    // window.addEventListener('resize', this.initTrHeight)
  },
  // mounted() {
  //   this.initTrHeight()
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.initTrHeight)
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

      if (this.selectedDefault === null) {
        CustomNotification.notif('warning', 'Pilihan Default belum dipilih', 'Mohon periksa dan coba kembali')
        return false
      }

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
              fine_percentage: InputFormat.convNumString(this.fine_percentage),
              maximum_amount: InputFormat.convNumString(this.maximum_amount),
              maximum_periods_overdue: this.maximum_periods_overdue,
              publish_date: this.publish_date,
              file_base64: this.fileLoc,
              is_default: this.selectedDefault,
            },
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif('success', 'Berhasil !', 'Berhasil memperbaharui data')
              this.$router.push({ name: 'fine' })
            } else {
              CustomNotification.notif('warning', result.data.response_message)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = 'Error !'
            CustomNotification.notif('error', 'Error !', notifError)
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
          Authorization: `${TokenType} ${getToken()}`,
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
          CustomNotification.notif('error', errorMessage)
        })
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.fine.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          id: this.id_user,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.regulation_name = dataResult.regulation_name
          this.regulation_number = dataResult.regulation_number
          this.regulation_official_name = dataResult.regulation_official_name
          this.regulation_description = dataResult.regulation_description
          this.publish_date = dataResult.publish_date
          this.fine_percentage = dataResult.fine_percentage.replaceAll('.00000', '')
          this.maximum_amount = dataResult.maximum_amount.replaceAll('.00000', '')
          this.maximum_periods_overdue = dataResult.maximum_periods_overdue
          // this.regulation_file = dataResult.regulation_file
          this.selectedDefault = dataResult.is_default
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
