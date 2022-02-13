<template>
  <b-card>
    <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">TAMBAH ATURAN BARU</h5>
      </b-card-text>
      <div v-for="(item, index) in items" :key="index" ref="div">
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Zona*" label-for="zona">
              <v-select
                id="zona"
                v-model="items[0].zona"
                :options="ZoneOptions"
                required
                placeholder="-- Pilih Zona --"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Frekuensi Awal*"
              label-for="start_range"
            >
              <b-form-input
                type="text"
                id="start_range"
                v-model="items[0].start_range"
                autocomplete="off"
              />
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
                v-model="items[0].end_range"
                autocomplete="off"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Unit*" label-for="unit">
              <v-select
                id="unit"
                v-model="items[0].unit"
                :options="UnitOptions"
                required
                placeholder="-- Pilih Unit --"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Harga*" label-for="price">
              <cleave
                id="price"
                v-model="items[0].price"
                class="form-control text-right"
                :raw="false"
                :options="options.number"
                placeholder="0,00000"
                maxlength="200"
                minlength="10"
                :min="0"
                required
                autocomplete="off"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tipe Base*"
              label-for="base_tipe"
            >
              <v-select
                id="base_tipe"
                v-model="items[0].BaseType"
                :options="BaseTypeOptions"
                required
                placeholder="-- Pilih Type --"
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
                v-if="items.length !== 1"
              >
                <feather-icon icon="TrashIcon" class="mr-25" />
                <span>Hapus</span>
              </b-button>
              <hr />
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="text-right mt-0 collapse">
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
          :to="{
            name: 'base-price-detail',
            params: {
              IDBase: IDBase,
            },
          }"
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
  BForm,
} from 'bootstrap-vue'
import VSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import axios from 'axios'
import moment from 'moment'
import InputFormat from '@/helpers/input-format'
import Cleave from 'vue-cleave-component'
import { URLServices, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
      UnitOptions: ['KHz', 'MHz'],
      BaseTypeOptions: ['HDLP', 'HDDP'],
      ZoneOptions: [1, 2, 3, 4, 5],
      BaseType: null,
      zona: null,
      price: null,
      sexCode: [
        { code: 'M', name: 'Laki-Laki' },
        { code: 'F', name: 'Perempuan' },
      ],
      showTariffDetail: false,
      IDBase: this.$route.params.IDBase,
      items: [
        {
          id: null,
          ipfr_frequency_base_price_id: this.$route.params.IDBase,
          ipfr_frequency_base_price_name: '',
          bhp_name: '',
          start_range: '',
          end_range: '',
          BaseType: '',
          unit: '',
          price: '',
          zona: '',
        },
      ],
      nextTodoId: 2,
      dataPost: {},
      showPosisi: false,
      showCreteUserForm: false,
      posisi: [],
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
    VSelect,
    Cleave,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getPosisi()
  },
  methods: {
    async getPosisi() {
      this.showPosisi = true
      await axios({
        url: URLServices.base_price_detail.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          response_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10000,
          search: '',
          base_price_regulation_id: this.IDBase,
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
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif(
            'danger',
            'Gagal mendapatkan data',
            errorMessage
          )

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    repeateAgain() {
      this.saveTambah()
      this.items.push({
        index: (this.nextTodoId += this.nextTodoId),
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.div[0].offsetHeight)
    },
    createRequestVariable() {
      const data = {}
      Object.keys(this.items).forEach(key => {
        data.base_price_regulation_id = this.IDBase
        data.start_range = this.items[key].start_range
        data.end_range = this.items[key].end_range
        data.unit = this.items[key].unit
        data.base_price = InputFormat.convNumString(this.items[key].price)
        data.zone_id = this.items[key].zona
        data.base_type = this.items[key].BaseType
        data.name = `${this.items[key].start_range} - ${this.items[key].end_range} ${this.items[key].unit}`
      })
      return data
    },
    async saveTambah() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.base_price_detail.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            response_id: uuid.v4(),
            data: Param,
          },
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              CustomNotification.notif(
                'danger',
                'Berhasil menambahkan data',
                'Berhasil menambahkan data'
              )
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal menambahkan data',
                result.data.response_message
              )
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Gagal menambahkan data',
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
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.base_price_detail.store,
          method: 'post',
          data: {
            request_id: uuid.v4(),
            response_id: uuid.v4(),
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
                'Berhasil menambahkan data',
                'Halaman akan diarahkan ke index'
              )
              this.$router.push(
                {
                  name: 'base-price-detail',
                  params: {
                    IDBase: this.IDBase,
                  },
                }
              )
            } else {
              CustomNotification.notif(
                'warning',
                'Gagal menambahkan data',
                result.data.response_message
              )
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            CustomNotification.notif(
              'danger',
              'Gagal menambahkan data',
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
