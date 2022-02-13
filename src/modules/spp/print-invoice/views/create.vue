<template>
  <b-overlay :show="showCreteSimulasiForm" rounded="sm">
    <b-card>
      <b-row>
        <b-col sm="12" lg="8" md="8">
          <b-form-group
            class="mb-2"
            label="Client"
            label-cols="4"
          >
            <b-form-input
              class="font-weight-bold"
              value="1019101"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Aplikasi"
            label-cols="4"
          >
            <b-form-input
              class="font-weight-bold"
              value="1920192"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="No. SPP"
            label-cols="4"
          >
            <b-form-input
              class="font-weight-bold"
              value="Telkomsel"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Nilai"
            label-cols="4"
          >
            <b-input-group prepend="Rp.">
              <b-form-input class="text-right" value="100.000.000"/>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Periode Awal"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
          <b-form-datepicker
            class="font-weight-bold"
            id="isr_ipfr_tgl_mulai"
            locale="id"
            placeholder="YYYY-MM-DD"
          />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Periode Akhir"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
            <b-form-datepicker
              class="font-weight-bold"
              id="isr_ipfr_tgl_mulaia"
              locale="id"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
          <b-form-group
            class="mb-2"
            label="Unggah Surat Cicilan"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
          <b-form-file />
          </b-form-group>
        </b-col>
        <b-col>
          <div class="float-right mb-1">
            <b-button
            variant="outline-primary"
            class="btn-sm"
            >
            <feather-icon :icon="PlusIcon"></feather-icon> Tambah
            </b-button>
          </div>
          <b-table
            id="tableData"
            striped
            hover
            responsive
            class="position-relative bg-white"
            :items="dataField"
            :fields="fields"
          >
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="4">
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: 'fine' }"
            variant="outline-secondary"
          >
            Batal
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="success"
            class="ml-1"
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
  BOverlay,
  BFormDatepicker,
  BFormFile,
  BInputGroup,
  BTable,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import DateConvertion from '@/helpers/date-convertion'
import CustomNotification from '@/helpers/custom-notification'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BOverlay,
    BFormDatepicker,
    BFormFile,
    BInputGroup,
    BTable,
  },
  data() {
    return {
      fields: [
        { key: 'field1', label: 'Cicilan ke' },
        { key: 'field2', label: 'Tgl. Terbit' },
        { key: 'field3', label: 'Tgl. Jatuh Tempo' },
        { key: 'field4', label: 'Nilai Cicilan' },
      ],
      dataField: [
        {
          field1: '1',
          field2: '1 Januari 2021',
          field3: '31 Januari 2021',
          field4: '50.000.000',
        },
        {
          field1: '2',
          field2: '1 Februari 2021',
          field3: '28 Februari 2021',
          field4: '50.000.000',
        },
      ],
    }
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
      this.showBHP = true
      await axios({
        url: URLServices.invoice.index,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: DateConvertion.getTimeNow(),
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
          this.showBHP = false
        })
        .catch(error => {
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showBHP = false
          CustomNotification.notif('danger', 'Gagal mendapatkan role', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getSimulasi() {
      this.showFormula = true
      await axios({
        url: URLServices.formula.index,
        method: 'get',
        params: {
          request_id: 'guid_v4',
          request_date_time: DateConvertion.getTimeNow(),
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
          const errorMessage = `Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFormula = false
          CustomNotification.notif('danger', 'Gagal mendapatkan role', errorMessage)

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
        CustomNotification.notif('warning', 'Pengisian belum lengkap', 'Anda harus memilih minimal 1 role')

        this.showCreteSimulasiForm = false
        return false
      }

      return data
    },
    // async save() {
    //   this.showCreteSimulasiForm = true
    //   const Param = this.createRequestVariable()

    //   if (Param !== false) {
    //     await axios({
    //       url: URLServices.userManagement.store,
    //       method: 'post',
    //       data: {
    //         request_id: 'guid_v4',
    //         DateConvertion.getTimeNow(),
    //       },
    //       headers: {
    //         Authorization: `${TokenType} ${getToken()}`,
    //       },
    //     })
    //       .then(result => {
    //         if (result.data.response_code === '00') {
    //           CustomNotification.notif('success', 'Pengisian belum lengkap', 'Anda harus memilih minimal 1 role')
    //           this.$router.push({ name: 'UserManagement' })
    //         } else {
    //           this.$toast({
    //             component: ToastificationContent,
    //             props: {
    //               title: result.data.response_message,
    //               icon: 'InfoIcon',
    //               variant: 'warning',
    //             },
    //           })
    //         }
    //         this.showCreteSimulasiForm = false
    //       })
    //       .catch(error => {
    //         const notifError = UserManagement.Handling(error)
    //         this.$toast({
    //           component: ToastificationContent,
    //           props: {
    //             title: notifError.message,
    //             icon: notifError.icon,
    //             variant: notifError.status,
    //           },
    //         })
    //         this.showCreteSimulasiForm = false
    //         if (error.response.status && error.response.status === 401) {
    //           localStorage.removeItem('accessToken')
    //           localStorage.removeItem('userData')
    //           this.$router.go({ name: 'session-time-out' })
    //         }
    //       })
    //   }
    // },
  },
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>
