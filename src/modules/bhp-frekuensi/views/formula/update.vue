<template>
  <div>
    <create-formula
      v-if="!showForm"
      :statusEdit="true"
      :DataCreate="DetailFormula"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { URLServices, getToken, TokenType } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'
import CreateFormula from './create'

export default {
  data() {
    return {
      showForm: false,
      showPosisi: false,
      selectedDetailFormula: this.$route.params.selectedDetailFormula,
      DetailFormula: {
        StartDate: null,
        EndDate: null,
        DeskripsiFormula: null,
        file: null,
        selectedAppServices: [],
        selectedAppSubServices: [],
        Formula: [
          {
            sequence_number: null,
            operator_1: null,
            constant_1: null,
            operator_2: null,
            variable_1: null,
            operator_3: null,
            formula: null,
          },
        ],
      },
    }
  },
  components: {
    CreateFormula,
  },
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      this.showForm = true

      await axios({
        url: URLServices.isr_bhp_formula.get,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          id: this.selectedDetailFormula,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            const Detail = result.data.data[0]

            this.DetailFormula = {
              FormulaName: Detail.formula_name,
              StartDate: Detail.validity_start_date,
              EndDate: Detail.validity_end_date,
              DeskripsiFormula: Detail.formula_description,
              file: null,
              selectedAppServices: Detail.service_id,
              selectedAppSubServices: Detail.subservice_id,
              Formula: Detail.bhp_details,
            }
            this.showForm = false
          } else {
            this.DetailFormula = {}
            CustomNotification.notif(
              'warning',
              'Gagal memuat data',
              result.data.response_message
            )
            this.showForm = false
          }
        })
        .catch(error => {
          CustomNotification.notif(
            'danger',
            'Gagal memuat data',
            'Mohon coba beberapa saat kembali'
          )

          this.showForm = false
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
