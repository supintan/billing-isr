<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Nama Peraturan*"
            label-for="nama-peraturan"
          >
            <b-form-input
              autocomplete="off"
              id="nama-peraturan"
              v-model="NamaRegulasi"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Nomor Peraturan*"
            label-for="nomor-peraturan"
          >
            <b-form-input
              autocomplete="off"
              id="nomor-peraturan"
              v-model="NomorPeraturan"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Nama Resmi Peraturan*"
            label-for="nama-resmi-peraturan"
          >
            <b-form-input
              autocomplete="off"
              id="nama-resmi-peraturan"
              v-model="NamaResmiPeraturan"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Deskripsi Peraturan*"
            label-for="deskripsi-peraturan"
          >
            <b-form-textarea
              id="deskripsi-peraturan"
              autocomplete="off"
              v-model="DeskripsiPeraturan"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Tgl. Terbit*"
            label-for="tgl-terbit"
          >
            <b-form-datepicker
              id="tgl-terbit"
              v-model="StartDate"
              locale="id"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Tgl. Akhir*"
            label-for="tgl-akhir"
          >
            <b-form-datepicker id="tgl-akhir" v-model="EndDate" locale="id" />
          </b-form-group>
        </b-col>
      </b-row>
      -->
      <b-row class="mb-1">
        <b-col lg="7" md="7" sm="12">
          <b-form-group
            label-cols="4"
            label="Lampirkan Regulasi*"
            label-for="file_regulation"
          >
            <b-form-file
              id="file_regulation"
              accept=".pdf"
              required
              v-model="file"
              placeholder="Pilih file / tarik dan taruh file disini..."
              drop-placeholder="Tarik dan taruh file disini..."
              @change="createBase64File"
              src=""
            ></b-form-file>
            <p v-if="statusEdit">
              <small>Lampirkan jika ingin diubah</small>
            </p>
          </b-form-group>
        </b-col>
      </b-row>
      <b-card-text>
        <p class="text-danger">
          *) Wajib diisi
        </p>
      </b-card-text>
      <b-row class="mt-4">
        <b-col class="text-right">
          <b-button
            :to="{ name: 'bhp-frekuensi-formula' }"
            variant="outline-secondary"
          >
            Batal
          </b-button>
        </b-col>
        <b-col>
          <b-button
            type="submit"
            variant="success"
            class="ml-1"
            @click.prevent="save()"
          >
            Simpan
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
  BCol,
  BRow,
  BFormGroup,
  BFormInput,
  BFormFile,
  BOverlay,
  BFormTextarea,
  BFormDatepicker,
  BCardText,
} from 'bootstrap-vue'
import axios from 'axios'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import { URLServices, getToken, TokenType } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'

export default {
  name: 'CreateBhpFrekuensi',
  props: ['statusEdit', 'DataCreate'],
  directives: {
    Ripple,
  },
  data() {
    return {
      showCreteUserForm: false,
      showPosisi: false,
      FinalResult: '',
      StartDate: null,
      file: null,
      fileLoc: null,
      NamaRegulasi: null,
      NomorPeraturan: null,
      NamaResmiPeraturan: null,
      DeskripsiPeraturan: null,
      // EndDate: null,
      UrlService: null,
    }
  },
  components: {
    BButton,
    BCard,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormFile,
    BFormDatepicker,
    BCardText,
    BRow,
    BOverlay,
  },
  created() {
    if (this.statusEdit) {
      this.UrlService = URLServices.BHPFrekuensi.update
      this.NamaRegulasi = this.DataCreate.NamaRegulasi
      this.NomorPeraturan = this.DataCreate.NomorPeraturan
      this.NamaResmiPeraturan = this.DataCreate.NamaResmiPeraturan
      this.DeskripsiPeraturan = this.DataCreate.DeskripsiPeraturan
      // this.EndDate = this.DataCreate.EndDate
      this.StartDate = this.DataCreate.StartDate
    } else {
      this.UrlService = URLServices.BHPFrekuensi.store
    }
  },
  methods: {
    createBase64File(e) {
      const file = e.target.files[0]
      this.CreateParams(file)
    },
    CreateParams(file) {
      const data = {}

      const reader = new FileReader()

      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }

      data.regulation_name = this.NamaRegulasi
      data.regulation_number = this.NomorPeraturan
      data.regulation_official_name = this.NamaResmiPeraturan
      data.regulation_description = this.DeskripsiPeraturan
      data.publish_date = this.StartDate

      // ubah sesuai backend
      // data.end_date = this.EndDate

      data.file_base64 = this.fileLoc
      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Params = this.CreateParams()
      let RequestParam = {
        request_id: uuid.v4(),
        request_date_time: DateConvertion.getTimeNow(),
        data: Params,
      }

      if (this.statusEdit) {
        RequestParam = {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          data: Params,
          id: this.$route.params.selectedIdFormula,
        }
      }

      await axios({
        url: this.UrlService,
        method: 'post',
        data: RequestParam,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            CustomNotification.notif(
              'success',
              'Berhasil menyimpan',
              'Halaman akan diarahkan ke index'
            )
            this.$router.push({ name: 'bhp-frekuensi-formula' })
          } else {
            CustomNotification.notif(
              'warning',
              'Gagal menyimpan data',
              result.data.response_message
            )
          }
          this.showCreteUserForm = false
        })
        .catch(error => {
          CustomNotification.notif(
            'danger',
            'Gagal menyimpan data',
            'Mohon coba beberapa saat kembali'
          )

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
