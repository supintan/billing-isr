<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
      <b-card-text>Semua form dibawah ini wajib diisi</b-card-text>
      <b-card-text>
        <h5 class="text-primary my-2">Tambah Data Index Price</h5>
      </b-card-text>
      <div
          v-for="(item, index) in positions"
          :key="index"
          ref="div"
        >
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Nama*" label-for="name">
            <b-form-input autocomplete="off" id="name" v-model="name" required />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Index Biaya Pemancaran Daya (Ib)*" label-for="power-index-price">
            <b-input-group prepend="Rp.">
              <b-form-input class="form-control font-weight text-right" type="number" autocomplete="off" id="power-index-price" v-model="powerIndexPrice" required />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Index Biaya Pendudukan Frekuensi (Ip)*" label-for="bandwith-index-price">
            <b-input-group prepend="Rp.">
              <b-form-input class="form-control font-weight text-right" type="number" autocomplete="off" id="bandwith-index-price" v-model="bandwithIndexPrice" required />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Service*" label-for="service">
            <v-select
              v-model="selectedService"
              label=""
              box
              placeholder="-- Pilih Service -- "
              :options="allServices"
              @input="selectedServiceInput"
            >
              <template v-slot:option="allServices">
                <span> {{ allServices.name }}</span>
              </template>
            </v-select>
            <!-- <b-form-input autocomplete="off" id="service" v-model="service" required /> -->
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Sub Service*" label-for="subService">
            <v-select
              v-model="selectedSubService"
              label=""
              box
              placeholder="-- Pilih Sub Service -- "
              :options="allSubServices"
              @input="selectedServiceInput"
            >
              <template v-slot:option="allSubServices">
                <span> {{ allSubServices.name }}</span>
              </template>
            </v-select>
            <!-- <b-form-input autocomplete="off" id="service" v-model="service" required /> -->
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Kategori Biaya Stasiun*" label-for="stationCostCategory">
            <v-select
              v-model="selectedCostCategory"
              label=""
              box
              placeholder="-- Pilih Kategori Biaya Stasiun -- "
              :options="allCostCategory"
              @input="selectedCostCategory"
            >
              <template v-slot:option="allCostCategory">
                <span> {{ allCostCategory.name }}</span>
              </template>
            </v-select>
            <!-- <b-form-input autocomplete="off" id="service" v-model="service" required /> -->
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col lg="8" sm="12">
          <b-form-group label-cols="4" label="Tipe Peralatan*" label-for="equipment">
            <v-select
              v-model="selectedTypeEquipment"
              label=""
              box
              placeholder="-- Pilih Tipe Peralatan -- "
              :options="allTypeEquipment"
              @input="selectedTypeEquipmentInput"
            >
              <template v-slot:option="allTypeEquipment">
                <span> {{ allTypeEquipment.name }}</span>
              </template>
            </v-select>
            <!-- <b-form-input autocomplete="off" id="service" v-model="service" required /> -->
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
          variant="success"
          class="ml-3"
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
//   BFormFile,
//   BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { uuid } from 'vue-uuid'
import vSelect from 'vue-select'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
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

      idIndexPrice: this.$route.params.selectedIdIndexPrice,
      idIndexPriceDetail: this.$route.params.selectedIdIndexPriceDetail,

      name: '',
      powerIndexPrice: '',
      bandwithIndexPrice: '',
      serviceId: this.$route.params.selectedServiceId,
      subserviceId: this.$route.params.selectedSubServiceId,
      selectedService: null,
      selectedSubService: null,
      selectedCostCategory: null,
      selectedTypeEquipment: null,
      allServices: [],
      allSubServices: [],
      allCostCategory: [],
      allTypeEquipment: [],

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
    vSelect,
    // BFormFile,
    // BFormTextarea,
  },
  directives: {
    Ripple,
  },
  computed: {
    statusSave() {
      return (this.name)
    },
  },
  created() {
    this.getDetail()
    const idPrice = localStorage.getItem('regulationIdIndexPrice')
    console.log(idPrice, 'ini dia')
    // window.addEventListener('resize', this.initTrHeight)
  },
//   mounted() {
//     this.initTrHeight()
//   },
//   destroyed() {
//     window.removeEventListener('resize', this.initTrHeight)
//   },
  methods: {
    selectedServiceInput() {
    },
    selectedSubServiceInput() {
    },
    selectedCostCategoryInput() {
    },
    selectedTypeEquipmentInput() {
    },
    async getDetail() {
      await axios({
        url: URLServices.index_price_detail.show,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.idIndexPriceDetail,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const dataResult = result.data.data[0]
          this.name = dataResult.name
          this.powerIndexPrice = dataResult.power_index_price
          this.bandwithIndexPrice = dataResult.bandwidth_index_price
          this.selectedService = dataResult.service_name
          this.selectedSubService = dataResult.subservice_name
          this.selectedCostCategory = dataResult.station_cost_category_name
          this.selectedTypeEquipment = dataResult.equipment_type_name
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
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
    createRequestVariable() {
      const data = {}

      data.index_price_regulation_id = this.idIndexPrice
      data.name = this.name
      data.service_id = this.serviceId
      data.subservice_id = this.subserviceId
      data.power_index_price = this.powerIndexPrice
      data.bandwidth_index_price = this.bandwithIndexPrice

      return data
    },
    async save() {
      this.showCreteUserForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: URLServices.index_price_detail.store,
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
              this.$router.push({ name: 'index-price-detail' })
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
  },
}
</script>

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
