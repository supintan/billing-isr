<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">Ubah Informasi Peraturan</h5>
        </b-card-text>
        <b-row class="mb-2">
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Frekuensi" label-for="name">
              <b-form-input type="text" id="name" v-model="name" readonly
            /></b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Zona*" label-for="zona">
              <v-select
                id="zona"
                v-model="zona"
                :options="ZoneOptions"
                required
                placeholder="-- Pilih Zona --"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Frekuensi Awal*"
              label-for="start_range"
            >
              <b-form-input
                type="number"
                id="start_range"
                v-model="start_range"
                required
            /></b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Frekuensi Akhir*"
              label-for="end_range"
            >
              <b-form-input
                type="number"
                id="end_range"
                v-model="end_range"
                required
            /></b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Unit*" label-for="unit">
              <v-select
                id="unit"
                v-model="unit"
                :options="UnitOptions"
                required
                placeholder="-- Pilih Unit --"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              class="mb-2"
              label="Harga*"
              label-for="price"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <cleave
                  id="price"
                  v-model="price"
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
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Tipe Base*" label-for="base_tipe">
              <v-select
                id="base_tipe"
                v-model="BaseType"
                :options="BaseTypeOptions"
                required
                placeholder="-- Pilih Type --"
              />
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
            :to="{
              name: 'base-price-detail',
              params: {
                IDBase: BasePriceId
              }
            }"
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
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import Cleave from 'vue-cleave-component'
import { uuid } from 'vue-uuid'
import InputFormat from '@/helpers/input-format'
import VSelect from 'vue-select'
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
      nextTodoId: 2,
      name: '',
      start_range: '',
      end_range: '',
      unit: null,
      price: null,
      showPosisi: false,
      showCreteUserForm: false,
      positions: [],
      posisi: [],
      BasePriceId: this.$route.params.BasePriceId,
      IdRule: this.$route.params.IdRule,
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
    Cleave,
    BInputGroup,
    VSelect,
  },
  directives: {
    Ripple,
  },
  created() {
    this.detail()
  },
  computed: {
    showStatus() {
      return this.listing[0]?.status || []
    },
  },
  methods: {
    repeateAgain() {
      this.positions.push({
        index: (this.nextTodoId += this.nextTodoId),
      })
    },
    removeItem(index) {
      this.positions.splice(index, 1)
    },
    async save() {
      this.showCreteUserForm = true
      await axios({
        url: URLServices.base_price_detail.update,
        method: 'post',
        data: {
          request_id: uuid.v4(),
          response_id: uuid.v4(),
          id: this.IdRule,
          data: {
            start_range: InputFormat.convNumString(this.start_range),
            end_range: InputFormat.convNumString(this.end_range),
            unit: this.unit,
            zone_id: this.zona,
            base_type: this.BaseType,
            name: `${this.start_range} - ${this.end_range} ${this.unit}`,
            base_price: InputFormat.convNumString(this.price),
          },
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            CustomNotification.notif('success', 'Berhasil memperbaharui data', 'Halaman akan diarahkan ke depan')
            this.$router.push(
              {
                name: 'base-price-detail',
                params: {
                  IDBase: this.BasePriceId
                }
              }
            )
          } else {
            CustomNotification.notif('warning', result.data.response_message, 'Mohon coba kembali')
          }
          this.showCreteUserForm = false
        })
        .catch(error => {
          CustomNotification.notif('danger', 'Gagal Menyimpan', 'Mohon coba kembali')
          this.showCreteUserForm = false
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      await axios({
        url: URLServices.base_price_detail.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          response_id: uuid.v4(),
          id: this.IdRule,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.name = dataResult.name
          this.start_range = InputFormat.convNumString(InputFormat.NumberFormat(dataResult.start_range))
          this.end_range = InputFormat.convNumString(InputFormat.NumberFormat(dataResult.end_range))
          this.unit = dataResult.unit
          this.zona = dataResult.zone_id
          this.BaseType = dataResult.base_type
          this.price = InputFormat.convNumString(InputFormat.NumberFormat(dataResult.base_price))
          this.getDetailUserSuccessed = true
          this.showDetailUser = false
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Gagal mendapatkan role', errorMessage)
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
