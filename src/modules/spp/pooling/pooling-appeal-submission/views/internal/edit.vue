<template>
  <b-overlay :show="showCreteSimulasiForm" rounded="sm">
    <b-card>
      <b-card-text
        >Simulasi yang dapat dilakukan adalah BI Rate, NKICB, dan ISR ke
        IPFR</b-card-text
      >
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Kode Draft Simulasi*"
            label-for="kode_simulasi"
            label-cols="4"
          >
            <b-form-input
              id="kode_simulasi"
              class="font-weight-bold"
              placeholder="ABCD1234..."
              required
              :rules="[(v) => !!v || 'NIK wajib diisi']"
              v-model="name"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Jenis Simulasi"
            label-for="jenis_simulasi"
            label-cols="4"
          >
            <b-overlay :show="showFormula">
              <v-select
                :options="formula"
                label="name"
                v-model="formula_id"
                :reduce="(formula) => formula.id"
                placeholder="-- Pilih Jenis Simulasi --"
              />
            </b-overlay>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="12" md="12">
          <hr />
          <!-- Form BI Rate -->
          <div v-if="formula_id === 1">
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Nilai Rate"
                  label-for="rate"
                  label-cols="4"
                  @show="getBHP"
                >
                  <b-input-group append="%">
                    <b-form-input
                      id="rate"
                      class="font-weight-bold"
                      placeholder="1234...."
                      required
                      v-model="bi_rate_value"
                      autocomplete="off"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="No. SPP BHP Sebelumnya"
                  label-for="k_penyesuai"
                  label-cols="4"
                >
                  <b-overlay :show="showBHP">
                    <v-select
                      id="k_penyesuai"
                      :options="bhp"
                      label="number"
                      item-text="number"
                      v-model="bi_rate_previous_invoice_number"
                      :reduce="(bhp) => bhp.id"
                      placeholder="-- Pilih BHP Sebelumnya --"
                    />
                  </b-overlay>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Nilai BHP Sebelumnya"
                  label-for="nilai_bhp_sebelumnya"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="nilai_bhp_sebelumnya"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="bi_rate_previous_invoice_amount"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Nilai BHP Saat Ini"
                  label-for="nilai_bhp_sekarang"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="nilai_bhp_sekarang"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="bi_rate_current_invoice_amount"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Total Biaya"
                  label-for="total_bi_rate"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="total_bi_rate"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="bi_rate_invoice_total_amount"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="4" lg="4">
                <b-button variant="primary"
                  ><feather-icon icon="RefreshCcwIcon"></feather-icon>
                  Kalkulasi</b-button
                >
              </b-col>
            </b-row>
          </div>

          <!-- Form Flat -->
          <div v-if="formula_id === 2">Tidak ada tampilan untuk Flat</div>

          <!-- Form NKICB -->
          <div v-if="formula_id === 3">
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="( N ) Faktor Normalisasi"
                  label-for="n_normalisasi"
                  label-cols="4"
                >
                  <b-form-input
                    id="n_normalisasi"
                    class="font-weight-bold text-right"
                    required
                    placeholder="0,00"
                    v-model="nkicb_n_value"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( K ) Faktor Penyesuaian"
                  label-for="k_penyesuaian"
                  label-cols="4"
                >
                  <b-form-input
                    id="k_penyesuaian"
                    class="font-weight-bold text-right"
                    placeholder="0,00"
                    required
                    v-model="nkicb_k_value"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( I ) Indeks Harga Pasar"
                  label-for="i_harga_pasar"
                  label-cols="4"
                >
                  <b-form-input
                    id="i_harga_pasar"
                    class="font-weight-bold text-right"
                    placeholder="0,00"
                    required
                    v-model="nkicb_i_value"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( C ) Konstanta"
                  label-for="c_konstanta"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="c_konstanta"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="nkicb_c_value"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( B ) Lebar Pita"
                  label-for="b_lebar_pita"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="b_lebar_pita"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="nkicb_b_value"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Biaya BHP"
                  label-for="biaya_bhp"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="biaya_bhp"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="nkicb_bhp_amount"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Total Biaya"
                  label-for="total_nkicb"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="total_nkicb"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="nkicb_invoice_total_amount"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="4" lg="4">
                <b-button variant="primary"
                  ><feather-icon icon="RefreshCcwIcon"></feather-icon>
                  Kalkulasi</b-button
                >
              </b-col>
            </b-row>
          </div>

          <!-- Form Perubahan ISR ke IPFR -->
          <div v-if="formula_id === 4">
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Tahun ke"
                  label-for="isr_ipfr_tahun"
                  label-cols="4"
                >
                  <b-form-input
                    type="number"
                    id="isr_ipfr_tahun"
                    class="font-weight-bold"
                    required
                    placeholder="YYYY"
                    v-model="isr_ipfr_year_period"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Tanggal Mulai"
                  label-for="isr_ipfr_tgl_mulai"
                  label-cols="4"
                >
                  <b-form-datepicker
                    class="font-weight-bold"
                    id="isr_ipfr_tgl_mulai"
                    v-model="isr_ipfr_start_date"
                    locale="id"
                    placeholder="YYYY-MM-DD"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( N ) Faktor Normalisasi"
                  label-for="n_normalisasi"
                  label-cols="4"
                >
                  <b-form-input
                    id="n_normalisasi"
                    class="font-weight-bold text-right"
                    required
                    placeholder="0,00"
                    v-model="isr_ipfr_n_value"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( K ) Faktor Penyesuaian"
                  label-for="k_penyesuaian"
                  label-cols="4"
                >
                  <b-form-input
                    id="k_penyesuaian"
                    class="font-weight-bold text-right"
                    placeholder="0,00"
                    required
                    v-model="isr_ipfr_k_value"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( I ) Indeks Harga Pasar"
                  label-for="i_harga_pasar"
                  label-cols="4"
                >
                  <b-form-input
                    id="i_harga_pasar"
                    class="font-weight-bold text-right"
                    placeholder="0,00"
                    required
                    v-model="isr_ipfr_i_value"
                  />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( C ) Konstanta"
                  label-for="c_konstanta"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="c_konstanta"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="isr_ipfr_c_value"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="( B ) Lebar Pita"
                  label-for="b_lebar_pita"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="b_lebar_pita"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="isr_ipfr_b_value"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Biaya BHP"
                  label-for="biaya_bhp"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="biaya_bhp"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="isr_ipfr_bhp_mount"
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Presentasi tahun ke-N"
                  label-for="presentasi_tahun_ke"
                  label-cols="4"
                >
                  <b-input-group append="%">
                    <b-form-input
                      id="presentasi_tahun_ke"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="isr_ipfr_year_precentage"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="X"
                  label-for="isr_ipfr_x"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="isr_ipfr_x"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="isr_ipfr_x_value"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="4" lg="4">
                <b-button variant="outline-secondary"
                  >
                  <feather-icon icon="DownloadIcon"></feather-icon>
                  Unduh
                  </b-button
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Y"
                  label-for="isr_ipfr_y"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="isr_ipfr_y"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="isr_ipfr_z_value"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="4" lg="4">
                <b-button variant="outline-secondary"
                  >
                  <feather-icon icon="DownloadIcon"></feather-icon>
                  Unduh
                  </b-button
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Delta"
                  label-for="isr_ipfr_delta"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      id="isr_ipfr_delta"
                      class="font-weight-bold text-right"
                      placeholder="0,00"
                      required
                      v-model="isr_ipfr_delta_value"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="8" lg="8">
                <b-form-group
                  class="mb-2"
                  label="Total Biaya"
                  label-for="total_isr_ipfr"
                  label-cols="4"
                >
                  <b-input-group prepend="Rp.">
                    <b-form-input
                      id="total_isr_ipfr"
                      class="font-weight-bold text-right"
                      placeholder="0"
                      required
                      v-model="isr_ipfr_invoice_total_amount"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="4" lg="4">
                <b-button variant="primary"
                  ><feather-icon icon="RefreshCcwIcon"></feather-icon>
                  Kalkulasi</b-button
                >
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col sm="12" lg="12" md="12" class="text-center">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
          >
            Selesai
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
            @click="save()"
          >
            Simpan Draft
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="button"
            variant="outline-secondary"
            class="ml-1"
          >
            Lanjut
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
  BInputGroup,
  BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import axios from 'axios'
import vSelect from 'vue-select'
import moment from 'moment'
import { ServiceConfig, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  data() {
    return {
      showCreteSimulasiForm: false,

      // Form Data
      name: 'BIRate2021',
      formula_id: 1,
      formula: [],

      // BI Rate
      bhp: {},
      bhpSelected: null,
      showBHP: false,
      bi_rate_value: 5.5,
      bi_rate_previous_invoice_number: '/INV/2021/05/07/122',
      bi_rate_previous_invoice_amount: '525986487374',
      bi_rate_current_invoice_amount: '554915744179.57',
      bi_rate_invoice_total_amount: '554915744179.57',

      // NKICB
      nkicb_n_value: '',
      nkicb_k_value: '',
      nkicb_i_value: '',
      nkicb_c_value: '',
      nkicb_b_value: '',
      nkicb_bhp_amount: '',
      nkicb_invoice_total_amount: '',

      // ISR to IPFR
      isr_ipfr_year_period: '',
      isr_ipfr_start_date: '',
      isr_ipfr_n_value: '',
      isr_ipfr_k_value: '',
      isr_ipfr_i_value: '',
      isr_ipfr_c_value: '',
      isr_ipfr_b_value: '',
      isr_ipfr_bhp_mount: '',
      isr_ipfr_year_precentage: '',
      isr_ipfr_x_value: '',
      isr_ipfr_z_value: '',
      isr_ipfr_delta_value: '',
      isr_ipfr_invoice_total_amount: '',
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    vSelect,
    BInputGroup,
    BFormDatepicker,
  },
  directives: {
    Ripple,
  },
  created() {
    this.getSimulasi()
    this.getBHP()
  },
  methods: {
    async getBHP() {
      const token = localStorage.getItem('accessToken')
      this.showBHP = true
      await axios({
        url: ServiceConfig.Config.url.invoice.index,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10,
          year: moment(new Date()).format('YYYY') - 1,
          is_paid: false,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.bhp = result.data.data
          console.log(this.bhp)
          this.showBHP = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showBHP = false
					CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getSimulasi() {
      const token = localStorage.getItem('accessToken')
      this.showFormula = true
      await axios({
        url: ServiceConfig.Config.url.formula.index,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.formula = result.data.data
          this.showFormula = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFormula = false
					CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    createRequestVariable() {
      const data = {}
      data.nik = this.nik
      data.full_name = this.fullName
      data.password = this.password2
      data.email = this.email
      data.role = {
        role_id: this.formulaelected,
      }

      // Mapping Selected roles
      const lengthRole = this.formulaelected.length
      if (lengthRole === 0) {
				const responseMessage = `Anda harus memilih minimal 1 role`
				CustomNotification.notif('warning', 'Warning', responseMessage)
        this.showCreteSimulasiForm = false
        return false
      }

      return data
    },
    async save() {
      const token = localStorage.getItem('accessToken')
      this.showCreteSimulasiForm = true
      const Param = this.createRequestVariable()

      if (Param !== false) {
        await axios({
          url: ServiceConfig.Config.url.userManagement.store,
          method: 'post',
          data: {
            request_id: 'guid_v4',
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
            const responseMessage = `Berhasil menambahkan user baru. [${result.data.response_message}]`
            CustomNotification.notif('success', 'Berhasil', responseMessage)
              this.$router.push({ name: 'UserManagement' })
            } else {
            const responseMessage = `[${result.data.response_message}]`
            CustomNotification.notif('warning', 'Warning', responseMessage)
            }
            this.showCreteSimulasiForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            const responseMessage = `[${notifError.message}]`
            CustomNotification.notif(notifError.status, notifError.status, responseMessage)
            this.showCreteSimulasiForm = false
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
