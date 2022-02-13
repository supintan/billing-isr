<template>
  <b-overlay :show="!showDetailTemplate" rounded="sm">
    <b-row>
      <b-col>
        <div class="d-block float-right mb-1">
          <b-button
            variant="light"
            :to="{
              name: 'history-template',
              params: { detailTemplateId: TemplateID },
            }"
          >
            <feather-icon icon="ClockIcon" /> Riwayat Perubahan
          </b-button>
          <b-button variant="light" :to="{ name: 'template' }">
            <feather-icon icon="CornerUpLeftIcon" /> Kembali
          </b-button>
        </div>
      </b-col>
    </b-row>
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
            <b-form-input
              id="template_id"
              v-model="template_type_name"
              plaintext
              class="font-weight-bold"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nama Template"
            label-for="nama_template"
            label-cols="4"
          >
            <b-form-input
              id="nama_template"
              v-model="template_name"
              plaintext
              class="font-weight-bold"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Terakhir diubah"
            label-for="terakhir_ubah"
            label-cols="4"
          >
            <b-form-input
              id="terakhir_ubah"
              v-model="template_last_update"
              plaintext
              class="font-weight-bold"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="12" md="12">
          <hr class="m-0 mb-2">
                <b-card-text>
                  <br>
                  <h5 class="text-primary">
                    Header Template
                  </h5>
                </b-card-text>
              <div class="mt-3" center>
                <img v-bind:src="'data:image/jpg;base64,'+ imageAsBase64" width="100%"/>
              </div>
              <br>
          <hr class="m-0 mb-2">
          <b-card-text>
            <h5 class="text-primary">
              Isi Template
            </h5>
          </b-card-text>
          <div class="mt-3">
            <b-overlay :show="!showTemplateParameter">
              <div v-if="variabelTemplate">
                <b-card-text>
                  Parameter pada dokumen ini adalah:
                  <clipboards
                    :variabelTemplate="variabelTemplate"
                    :buttonCopy="false"
                    class="mt-1"
                  />
                </b-card-text>
              </div>
              <div v-else>
                Variabel kosong,
                <b-link active @click="getTemplateType()">
                  <feather-icon icon="RefreshCwIcon" /> Muat Ulang
                </b-link>
              </div>
            </b-overlay>
          <br>
            <div v-if="pdfFile">
            <hr class="m-0 mb-2">
              <b-overlay :show="showFilePDF">
                <b-card-text>
                  Berikut ini adalah template dalam bentuk PDF
                </b-card-text>
                <b-embed
                  :data="'data:application/pdf;base64,' + pdfFile"
                  file
                  type="object"
                  width="100%"
                  height="700px;"
                />
              </b-overlay>
            </div>
            <div v-else>
              <b-card-text>
                Mohon maaf, file tidak dapat ditemukan
              </b-card-text>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BButton,
  BFormGroup,
  BCard,
  BCardText,
  BCol,
  BRow,
  BFormInput,
  BOverlay,
  BEmbed,
  BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import clipboards from '@/helpers/clipboard.vue'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormInput,
    BOverlay,
    BCardText,
    BFormGroup,
    BEmbed,
    clipboards,
    BLink,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      template_name: null,
      template_type_name: null,

      // Parameter template
      variabelTemplate: null,
      showTemplateParameter: true,

      // Detail template
      showDetailTemplate: true,
      pdfFile: null,
      TemplateID: this.$route.params.detailTemplateId,
      template_last_update: null,

      // PDF
      showFilePDF: true,
    }
  },
  created() {
    this.getTemplateDetail()
  },
  methods: {
    async getTemplateDetail() {
      this.showDetailTemplate = false
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
            this.template_type_name = result.data.data[0].template_type_name
            this.imageAsBase64 = result.data.data[0].header_file_base64
            this.showDetailTemplate = true
            const newUpdateDate = moment(result.data.data[0].last_update_date_time).format('DD MMMM YYYY H:mm:s')
            this.template_last_update = `${result.data.data[0].last_update_name}, ${newUpdateDate}`
            this.getTemplateParameter()
            this.getBase64PDF()
          }
          this.showDetailTemplate = true
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          this.showDetailTemplate = true

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
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
          this.showTemplateParameter = true
          CustomNotification.notif('error', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getBase64PDF() {
      this.showFilePDF = false
      this.pdfFile = null
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
            this.showFilePDF = true
          }
          this.showFilePDF = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
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

