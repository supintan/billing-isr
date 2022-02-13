<template>
  <b-overlay :show="!showCreteTemplateForm" rounded="sm">
    <b-card>
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-card-text>
            <h5 class="text-primary">
              Informasi Template
            </h5>
          </b-card-text>
          <b-form-group
            class="mb-2"
            label="Jenis Dokumen"
            label-for="template_id"
            label-cols="4"
          >
            <b-overlay
              :show="!showTemplateType"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
            >
              <div v-if="template_type.length > 0">
                <v-select
                  id="template_id"
                  v-model="template_type_id"
                  :options="template_type"
                  :reduce="(template_type) => template_type.id"
                  placeholder="-- Pilih Jenis Surat --"
                  label="name"
                  @input="changeType($event)"
                />
              </div>
              <div v-else class="p-1">
                Jenis dokumen kosong,
                <b-link active @click="getTemplateType()">
                  <feather-icon icon="RefreshCwIcon" /> Muat Ulang
                </b-link>
              </div>
            </b-overlay>
          </b-form-group>
          <b-form-group
            class="mb-4"
            label="Nama Template"
            label-for="nama_template"
            label-cols="4"
          >
            <b-form-input
              id="nama_template"
              placeholder="ABCD1234..."
              required
              autocomplete="off"
              v-model="template_name"
            />
          </b-form-group>
                <b-form-group
                  class="mb-3"
                  label="Unggah Header"
                  label-for="template_id"
                  label-cols="4"
                  v-if="statusCreateNew"
                  hidden
                >
                <b-form-file
                  v-if="statusCreateNew"
                  hidden
                  v-model="fileLoc"
                  accept=".jpeg, .jpg"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  @change="createBase64File"
                  src=""
                />
                </b-form-group>
        </b-col>
        </b-row>
        <div v-if="!statusCreateNew">
        <hr class="m-0 mb-2">
        <b-row>
          <b-col sm="12" lg="8" md="8">
              <b-card-text>
                <h5 class="text-primary mt-4">
                  Header Template
                </h5>
              </b-card-text>
              <b-form-group
                class="mb-3"
                label="Unggah Header"
                label-for="template_id"
                label-cols="4"
                v-if="!statusCreateNew"
              >
                <b-form-file
                  v-if="!statusCreateNew"
                  v-model="fileLoc"
                  accept=".jpeg, .jpg"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  @change="createBase64File"
                  src=""
                />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="12" md="12">
              <img v-bind:src="'data:image/jpg;base64,'+ imageAsBase64" v-if="!this.is_header_empty" width="100%"/>
            <br>
            </b-col>
            <b-col sm="12" lg="12" md="12">
            <hr class="m-0 my-4">
            <b-card-text>
              <h5 class="text-primary">
                Isi Template
                <span class="float-right">
                  <b-overlay :show="!showButtonPreview">
                    <b-button
                      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                      variant="outline-primary"
                      @click="createPDF"
                    >
                      Preview
                    </b-button>
                  </b-overlay>
                </span>
              </h5>
            </b-card-text>
            <b-modal
              id="modalPreview"
              size="xl"
              ref="modal"
              title="Preview"
              modal-class="modal-primary"
              ok-title="Tutup"
              ok-only
            >
              <!-- v-if="pdfFile" -->
              <div v-if="!showFilePDF">
                <b-overlay :show="!showFilePDF" />
              </div>
              <div v-else>
                <div v-if="pdfFile">
                  <b-embed
                    :data="'data:application/pdf;base64,' + pdfFile"
                    file
                    type="object"
                    width="100%"
                    height="450px;"
                  />
                </div>
                <div v-else class="text-center py-3">
                  Data tidak ditemukan
                </div>
              </div>
            </b-modal>
            <b-overlay :show="!showTemplateParameter">
              <div v-if="variabelTemplate.length > 0">
                <b-card-text>
                  Parameter pada dokumen ini adalah:
                  <clipboards
                    :variabelTemplate="variabelTemplate"
                    :buttonCopy="true"
                    class="mt-1"
                  />
                </b-card-text>
                <div class="mt-1">
                  <p>
                    Untuk menyisipkan parameter:
                    <ul>
                      <li>Klik tombol <b-button size="sm" variant="light" class="px-1"><feather-icon icon="CopyIcon" /> </b-button>
                        untuk menyalin, kemudian paste sesuai letak yang diinginkan.</li>
                      <li>Pastikan parameter berupa <u>huruf kapital</u>, <u>tanpa spasi</u>, dan <u>diapit tanda &#60;&#60; dan &#62;&#62;</u> seperti contoh berikut: <code>&#60;&#60;CLIENT_NAME&#62;&#62;</code>, <code>&#60;&#60;CLIENT_ID&#62;&#62;</code>.</li>
                    </ul>
                  </p>
                </div>
              </div>
              <div v-else>
                <b-card-text class="text-center p-1">
                  Parameter dokumen kosong,
                  <b-link active @click="getTemplateParameter">
                    <feather-icon icon="RefreshCwIcon" /> Muat Ulang
                  </b-link>
                </b-card-text>
              </div>
            </b-overlay>
          <!--
          <quill-editor
            v-model="content"
            :options="editorOption"
            class="mt-1"
          />
          -->
          <br>
          <hr class="m-0 mb-2">
          <br>
          <ckeditor v-model="content" :config="editorConfig"></ckeditor>
        </b-col>
        </b-row>
      </div>
      <hr>
      <b-row class="mt-2">
        <b-col>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'template' }"
            variant="outline-secondary"
          >
            Batal
          </b-button>
        </b-col>
        <b-col class="text-right">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            :disabled="!showButtonSave"
            @click="save()"
          >
            {{ statusCreateNew ? 'Simpan' : 'Simpan dan Lanjutkan' }}
          </b-button>
        </b-col>
      </b-row>
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
  BLink,
  BFormFile,
  BModal,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import clipboards from '@/helpers/clipboard.vue'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CKEditor from 'ckeditor4-vue'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    vSelect,
    BCardText,
    clipboards,
    BLink,
    BFormFile,
    BModal,
    ckeditor: CKEditor.component,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      // Konten
      content: '<h3>Judul ABCD1234</h3><p><b>Text</b> ABCD1234.....</p><br/><br/><br/><br/><br/><br/>',
      editorConfig: {
        extraPlugins: ['justify'],
      },
      showCreteTemplateForm: false,

      // Nama Template
      template_name: null,

      // Variable
      variabelTemplate: [],

      // Template Type
      showTemplateType: true,
      showTemplateParameter: true,
      template_type_id: null,
      template_type: [],

      // Button Save
      TemplateID: this.$route.params.detailTemplateId,
      pdfFileName: '',
      showButtonPreview: true,

      // Header Content SHN
      fileBase64: '',
      fileLoc: null,
      imageAsBase64: null,
      is_header_empty: true,

      // Preview
      pdfFile: null,
      showFilePDF: false,
    }
  },
  computed: {
    showButtonSave() {
      return this.template_type_id && this.template_name 
      // && this.fileLoc
    },
    statusCreateNew() {
      return this.$route.params.detailTemplateId === 0 || this.$route.params.detailTemplateId === '0'
    },
  },
  created() {
    this.getTemplateType()
    this.getTemplateDetail()
  },
  methods: {
    changeType() {
      if (!this.statusCreateNew) this.getTemplateParameter()
    },
    async getTemplateDetail() {
      if (this.TemplateID !== '0' && this.TemplateID !== 0) {
        this.showCreteTemplateForm = false
        await axios({
          url: URLServices.template.get,
          method: 'get',
          params: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            id: this.TemplateID,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.data) {
              this.template_type_id = result.data.data[0].template_type_id
              this.template_name = result.data.data[0].name
              this.imageAsBase64 = result.data.data[0].header_file_base64
              this.content = atob(result.data.data[0].content)
              if (this.imageAsBase64 !== null) {
                this.is_header_empty = false
              }
              this.getTemplateParameter()
            }
            this.showCreteTemplateForm = true
          })
          .catch(error => {
            const errorMessage = `Gagal mendapatkan jenis dokumen. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
            this.showCreteTemplateForm = true
            CustomNotification.notif('warning', errorMessage)
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      } else {
        this.showCreteTemplateForm = true
      }
    },
    async getTemplateType() {
      this.showTemplateType = false
      await axios({
        url: URLServices.template.type,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 100,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) this.template_type = result.data.data
          this.showTemplateType = true
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan jenis dokumen. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showTemplateType = true
          CustomNotification.notif('warning', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getTemplateParameter() {
      this.showTemplateParameter = false
      await axios({
        url: URLServices.template.parameter,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          template_type_id: this.template_type_id,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) this.variabelTemplate = result.data.data
          this.showTemplateParameter = true
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data Parameter. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
          this.showTemplateParameter = true
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    createRequestVariable(file) {
      const params = {}
      const reader = new FileReader()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          // console.log(this.fileLoc)
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }
      if (!this.statusCreateNew) 
      params.id = this.TemplateID
      params.template_type_id = this.template_type_id
      params.name = this.template_name
      params.header = this.fileLoc

      // Konten
      params.content = btoa(this.content)
      params.file_base64 = btoa(this.content)
      params.header = this.fileLoc

      return params
    },
    createPDF() {
      CustomNotification.notif('info', 'File PDF sedang diproses ...')
      this.save('preview')
      this.getBase64PDF()
    },
    downloadPDF() {
      const linkSource = `data:application/pdf;base64,${this.pdfFile}`
      const downloadLink = document.createElement('a')

      downloadLink.href = linkSource
      downloadLink.download = this.pdfFileName
      downloadLink.click()
      CustomNotification.notif('success', 'File PDF berhasil dibuat')
    },
    async getBase64PDF() {
      this.showButtonPreview = false
      this.pdfFile = null
      this.$bvModal.show('modalPreview')
      this.showFilePDF = false
      await axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.TemplateID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.pdfFileName = result.data.file_name
            // this.downloadPDF()
            this.showButtonPreview = true
            this.showFilePDF = true
          }
        })
        .catch(error => {
          this.showFilePDF = true
          const errorMessage = `Gagal mendapatkan detail template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showButtonPreview = true
          CustomNotification.notif('warning', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async save(init = 'save') {
      this.showCreteTemplateForm = false
      const Param = this.createRequestVariable()
      const URLService = this.statusCreateNew ? URLServices.template.store : URLServices.template.update
      const message = this.statusCreateNew ? 'Berhasil menambahkan template' : 'Berhasil memperbaharui template'

      if (Param !== false) {
        await axios({
          url: URLService,
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
              CustomNotification.notif('success', message)
              if (init === 'save') {
                if (this.statusCreateNew) {
                  this.TemplateID = result.data.template_id
                  this.getTemplateParameter()
                  this.getTemplateDetail()
                  this.$router.push({ name: 'add-template-next', params: { detailTemplateId: this.TemplateID } })
                } else {
                  this.$router.push({ name: 'template' })
                }
              }
            } else {
              CustomNotification.notif('warning', result.data.response_message)
            }
            this.showCreteTemplateForm = true
          })
          .catch(error => {
            CustomNotification.notif('warning', 'Gagal menyimpan, mohon coba kembali')
            this.showCreteTemplateForm = true
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
      }
    },
    // Header Paramater SHN
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
  },
}
</script>
