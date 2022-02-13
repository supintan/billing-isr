<template>
  <b-overlay :show="showTariffDetail" rounded="sm">
    <b-card>
      <b-form ref="form">
      <b-card-text>Semua form dibawah ini wajib diisi</b-card-text>
      <b-card-text>
        <h5 class="text-primary my-2">Tarif Perhitungan IPFR Detail</h5>
      </b-card-text>
      <div
          v-for="(item, index) in positions"
          :key="index"
          ref="div"
        >
          <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Rentang Frekuensi*" label-for="name">
                <b-form-input
                  id="name"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Unit *" label-for="unit">
                <b-form-input
                  autocomplete="off"
                  id="unit"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Frekuensi Awal*" label-for="start_range">
                <b-form-input type="text" id="start_range"/>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Frekuensi Akhir*"
                label-for="end_range"
              >
                <b-form-input
                  type="text"
                  id="end_range"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Harga*"
                label-for="price"
              >
                <b-form-input
                  type="text"
                  id="price"
                />
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
                <hr />
              </div>
            </b-col>
          </b-row>
        </div>
      <div class="text-right mt-0">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="outline-success"
          @click="repeateAgain"
        >
          <feather-icon icon="PlusIcon" class="mr-25" />
          <span>Tambah</span>
        </b-button>
      </div>
      <b-col offset-md="4">
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          :to="{ name: 'TableDetailFrequencyPrice' }"
          variant="outline-secondary"
        >
          Batal
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
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
      showTariffDetail: false,
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
  },
  directives: {
    Ripple,
  },
  created() {
    this.getPosisi()
    window.addEventListener('resize', this.initTrHeight)
  },
  mounted() {
    this.initTrHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    async getPosisi() {
      this.showPosisi = true
      await axios({
        url: URLServices.base_price_detail.index,
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
          CustomNotification.notif('danger', 'Gagal meload data', errorMessage)

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
    },
    removeItem(index) {
      this.positions.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
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

      // Mapping Selected roles
      const lengthRole = this.roleSelected.length
      if (lengthRole === 0) {
        CustomNotification.notif('danger', 'Form kurang isi', 'Mohon pilih role')
        this.showCreteUserForm = false
        return false
      }

      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.userManagement.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            data: Param,
          },
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif('success', 'Berhasil menambahkan', 'Halaman akan diarahkan ke index')
            } else {
              CustomNotification.notif('warning', 'Gagal menambahkan', 'Mohon coba kembali')
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif('danger', 'Gagal menambahkan', 'Mohon coba kembali')
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
