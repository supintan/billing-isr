<template>
  <b-overlay :show="showTariffDetail" rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Tarif Perhitungan IPFR Detail</h5>
        </b-card-text>
        <div v-for="(item, index) in positions" :key="index" ref="div">
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group label-cols="4" label="Nama Peraturan*" label-for="name">
                <b-form-input
                  autocomplete="off"
                  id="name"
                  v-model="name"
                  required
                />
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
              <b-form-group label-cols="4" label="Nomor Peraturan*" label-for="name">
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
                label="Tanggal Publish*"
                label-for="publish_date"
              >
                <b-form-datepicker
                  type="date"
                  v-model="publish_date"
                  locale="id"
                  autocomplete="off"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="8" sm="8">
              <b-form-group label-cols="4" label="Dokumen*" label-for="file">
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
              </div>
            </b-col>
          </b-row>
        </div>
        <b-card-text>Semua form dibawah ini wajib diisi</b-card-text>
        <hr>
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
            variant="success"
            class="ml-1"
            @click="save()"
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
import { URLServices, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
      publish_date: null,
      RegulationOfficalName: null,
      name: null,
      Deskripsi: null,
      RegulationNumber: null,
      showTariffDetail: null,

      fileLoc: null,
      fileBase64: '',
      positions: [
        {
          id: null,
          ipfr_frequency_base_price_id: '',
          ipfr_frequency_base_price_name: '',
          bhp_name: '',
          start_range: '',
          end_range: '',
          unit: '',
          price: '',
        },
      ],
      nextTodoId: 2,
      dataPost: {},
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],
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
  computed: {
    statusSave() {
      return this.name
    },
  },
  methods: {
    removeItem(index) {
      this.positions.splice(index, 1)
    },
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()

      data.regulation_name = this.name
      data.regulation_number = this.RegulationNumber
      data.regulation_official_name = this.RegulationOfficalName
      data.regulation_description = this.Deskripsi
      data.publish_date = this.publish_date
      data.file_location = this.fileLoc
      data.created_by = '1'
      data.updated_by = '1'

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }

        reader.readAsDataURL(file)
      }
      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.base_price.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            data: Param,
          },
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif(
                'success',
                'Berhasil menambahkan',
                'Halaman akan diarahkan ke halaman index'
              )
              this.$router.push({ name: 'base-price' })
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal menambahkan',
                result.data.response_message
              )
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Gagal Menambahkan',
              'Mohon coba kembali'
            )

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
@import 'vue-select/src/scss/vue-select.scss';
</style>
