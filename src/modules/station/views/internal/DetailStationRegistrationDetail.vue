<template>
  <b-overlay rounded="sm">
    <b-card>
      <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">DETAIL DATA</h5>
      </b-card-text>
        <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Id" label-for="id">
                <label class="form-control">{{ id }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Nama"
                label-for="name"
              >
                <label class="form-control">{{ name }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Lintang"
                label-for="latitude"
              >
                <label class="form-control">{{ lat }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Bujur"
                label-for="longitude"
              >
                <label class="form-control">{{ long }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Identitas Stasiun"
                label-for="station_identity"
              >
                <label class="form-control">{{ stationIdentity }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid h nn"
                label-for="sid_h_nn"
              >
                <label class="form-control">{{ sidHNn }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid long deg"
                label-for="sid_long_deg"
              >
                <label class="form-control">{{ sidLongDeg }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid long e w"
                label-for="sid_long_e_w"
              >
                <label class="form-control">{{ sidLongEW }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid long min"
                label-for="sid_long_min"
              >
                <label class="form-control">{{ sidLongMin }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid long sec"
                label-for="sid_long_sec"
              >
                <label class="form-control">{{ sidLongSec }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid lat deg"
                label-for="sid_lat_deg"
              >
                <label class="form-control">{{ sidLatDeg }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid lat n s"
                label-for="sid_lat_n_s"
              >
                <label class="form-control">{{ sidLatNS }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid lat min"
                label-for="sid_lat_min"
              >
                <label class="form-control">{{ sidLatMin }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Sid lat sec"
                label-for="sid_lat_sec"
              >
                <label class="form-control">{{ sidLatSec }}</label>
              </b-form-group>
            </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">ALAMAT</h5>
      </b-card-text>
        <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Tipe" label-for="type">
                <label class="form-control">{{ adType }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Kecamatan"
                label-for="city"
              >
                <label class="form-control">{{ adCity }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Kota/Kabupaten"
                label-for="district"
              >
                <label class="form-control">{{ adDistrict }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Provinsi"
                label-for="ad_country"
              >
                <label class="form-control">{{ adCounty }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="12" sm="12">
              <b-form-group
                label-cols="2"
                label="Alamat Lengkap"
                label-for="ad_street"
              >
                <b-form-textarea
                  id="ad_street"
                  v-model="adStreet"
                  rows="3"
                  max-rows="6"
                  disabled
                >
                </b-form-textarea>
              </b-form-group>
            </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">TRANSMITTER</h5>
      </b-card-text>
        <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Transmitter ean ident" label-for="transmitter_ean_ident">
                <label class="form-control">{{ transmitterEanIdent }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eqp equip indent"
                label-for="eqp_equip_ident"
              >
                <label class="form-control">{{ eqpEquipIdent }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Etx eq output"
                label-for="etx_eq_output"
              >
                <label class="form-control">{{ etxEqOutput }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac an h"
                label-for="eac_an_h"
              >
                <label class="form-control">{{ eacAnH }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac an pol"
                label-for="eac_an_pol"
              >
                <label class="form-control">{{ eacAnPol }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac feeding loss"
                label-for="eac_feeding_loss"
              >
                <label class="form-control">{{ eacFeedingLoss }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac connector loss"
                label-for="eac_connector_loss"
              >
                <label class="form-control">{{ eacConnectorLoss }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac branch loss"
                label-for="eac_branch_loss"
              >
                <label class="form-control">{{ eacBranchLoss }}</label>
              </b-form-group>
            </b-col>
        </b-row>
        <hr />
        <label for="frekuensi">FREKUENSI TRANSMITTER</label>
        <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Related" label-for="related">
                <label class="form-control">{{ related }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Frekuensi efl"
                label-for="efl_freq"
              >
                <label class="form-control">{{ eflFreq }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Efl rf bwidth"
                label-for="efl_rf_bwidth"
              >
                <label class="form-control">{{ eflRfBwidth }}</label>
              </b-form-group>
            </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">RECIEVER</h5>
      </b-card-text>
        <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Ean ant ident" label-for="ean_ant_ident">
                <label class="form-control">{{ eanAntIdent }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eqp equip indent"
                label-for="eqp_equip_ident"
              >
                <label class="form-control">{{ eqpEquipIdentR }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac an h"
                label-for="eac_an_h"
              >
                <label class="form-control">{{ eacAnHR }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac an pol"
                label-for="eac_an_pol"
              >
                <label class="form-control">{{ eacAnPolR }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Eac feeding loss"
                label-for="eac_feeding_loss"
              >
                <label class="form-control">{{ eacFeedingLossR }}</label>
              </b-form-group>
            </b-col>
        </b-row>
        <hr />
        <label for="frekuensiR">FREKUENSI RECEIVER </label>
        <b-row class="mb-2">
            <b-col lg="6" sm="12">
              <b-form-group label-cols="4" label="Related" label-for="related">
                <label class="form-control">{{ relatedR }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Frekuensi efl"
                label-for="efl_freq"
              >
                <label class="form-control">{{ eflFreqR }}</label>
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Efl rf bwidth"
                label-for="efl_rf_bwidth"
              >
                <label class="form-control">{{ eflRfBwidthR }}</label>
              </b-form-group>
            </b-col>
        </b-row>
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BCard,
  BCardText,
  BCol,
  BRow,
  BFormGroup,
  // BFormInput,
  BOverlay,
  BForm,
  BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import UserManagement from '@/services/UserManagement'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'
import axios from 'axios'
import { URLServices } from '@/services/UrlConfig'
import moment from 'moment'
// import { heightTransition } from '@core/mixins/ui/transition'
import { uuid } from 'vue-uuid'

export default {
  data() {
    return {
      nextTodoId: 2,
      showDetail: false,
      showCreteUserForm: false,
      id: '',
      name: '',
      lat: '',
      long: '',
      stationIdentity: '',
      sidHNn: '',
      sidLongDeg: '',
      sidLongEW: '',
      sidLongMin: '',
      sidLongSec: '',
      sidLatDeg: '',
      sidLatNS: '',
      sidLatMin: '',
      sidLatSec: '',
      adType: '',
      adCity: '',
      adDistrict: '',
      adCounty: '',
      adStreet: '',
      transmitterEanIdent: '',
      eqpEquipIdent: '',
      etxEqOutput: '',
      eacAnH: '',
      eacAnPol: '',
      eacFeedingLoss: '',
      eacConnectorLoss: '',
      eacBranchLoss: '',
      related: '',
      eflFreq: '',
      eflRfBwidth: '',
      relatedR: '',
      eflFreqR: '',
      eflRfBwidthR: '',
      eanAntIdent: '',
      eqpEquipIdentR: '',
      eacAnHR: '',
      eacAnPolR: '',
      eacFeedingLossR: '',
      BTSDetail: [],
      guid_v4: uuid.v4(),
      btsId: this.$route.params.btsDetailId,
    }
  },
  components: {
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    // BFormInput,
    BForm,
    BRow,
    BOverlay,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getDetail()
    // window.addEventListener('resize', this.initTrHeight)
  },
  // mounted() {
  //   this.initTrHeight()
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.initTrHeight)
  // },
  methods: {
    async getDetail() {
      const token = localStorage.getItem('accessToken')
      // const detailId = localStorage.getItem('btsDetailId')
      this.showDetail = true
      await axios({
        url: URLServices.bts_registration_detail.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.btsId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            // const BDetail = result.data.data[0]
            this.id = result.data.data[0].id
            this.name = result.data.data[0].name
            this.lat = result.data.data[0].latitude
            this.long = result.data.data[0].longitude
            this.stationIdentity = result.data.data[0].station_identity
            this.sidHNn = result.data.data[0].sid_h_nn
            this.sidLongDeg = result.data.data[0].sid_long_deg
            this.sidLongEW = result.data.data[0].sid_long_e_w
            this.sidLongMin = result.data.data[0].sid_long_min
            this.sidLongSec = result.data.data[0].sid_long_sec
            this.sidLatDeg = result.data.data[0].sid_lat_deg
            this.sidLatNS = result.data.data[0].sid_lat_n_s
            this.sidLatMin = result.data.data[0].sid_lat_min
            this.sidLatSec = result.data.data[0].sid_lat_sec

            this.adType = result.data.data[0].address.ad_type
            this.adCity = result.data.data[0].address.ad_city
            this.adDistrict = result.data.data[0].address.ad_district
            this.adCounty = result.data.data[0].address.ad_county
            this.adStreet = result.data.data[0].address.ad_street

            this.transmitterEanIdent = result.data.data[0].transmitter.transmitter_ean_ident
            this.eqpEquipIdent = result.data.data[0].transmitter.eqp_equip_ident
            this.etxEqOutput = result.data.data[0].transmitter.etx_eq_output
            this.eacAnH = result.data.data[0].transmitter.eac_an_h
            this.eacAnPol = result.data.data[0].transmitter.eac_an_pol
            this.eacFeedingLoss = result.data.data[0].transmitter.eac_feeding_loss
            this.eacConnectorLoss = result.data.data[0].transmitter.eac_connector_loss
            this.eacBranchLoss = result.data.data[0].transmitter.eac_branch_loss
            this.related = result.data.data[0].transmitter.frequency.related
            this.eflFreq = result.data.data[0].transmitter.frequency.efl_freq
            this.eflRfBwidth = result.data.data[0].transmitter.frequency.efl_rf_bwidth

            this.eanAntIdent = result.data.data[0].receiver.ean_ant_ident
            this.eqpEquipIdentR = result.data.data[0].receiver.eqp_equip_ident
            this.eacAnHR = result.data.data[0].receiver.eac_an_h
            this.eacAnPolR = result.data.data[0].receiver.eac_an_pol
            this.eacFeedingLossR = result.data.data[0].receiver.eac_feeding_loss
            this.relatedR = result.data.data[0].receiver.frequency.related
            this.eflFreqR = result.data.data[0].receiver.frequency.efl_freq
            this.eflRfBwidthR = result.data.data[0].receiver.frequency.efl_rf_bwidth
          }
          this.showDetail = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showDetail = false
        })
    },
    // initTrHeight() {
    //   this.trSetHeight(null)
    //   this.$nextTick(() => {
    //     this.trSetHeight(this.$refs.form.scrollHeight)
    //   })
    // },
  },
}
</script>

// <style lang="scss">
// @import '@core/scss/vue/pages/page-auth.scss';
// @import '@core/scss/vue/libs/vue-select.scss';
// </style>
