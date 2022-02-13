<template>

    <b-card>
      <b-card-title class="mr-2 text-primary">
      DATA SPP TAHUNAN
      </b-card-title>
      <b-card-sub-title class="mr-1 text-primary">
        Grafik Gambaran Jumlah SPP
      </b-card-sub-title>
      <b-row>
        <b-col sm="5">
          <b-form-group
            label="Pilih Tahun"
            label-cols="4"
            label-for="tanggal"
          >
            <div style="width:250px">
              <date-picker
                v-model="year"
                valueType="format"
                type="year"
                end="2021"
                placeholder="YYYY"
                v-on:change="changeYear"
              >
              </date-picker>
            </div>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button
            variant="primary"
            @click="changeYear"
            hidden
          >
            <feather-icon icon="Icon" /> Tampilkan
            </b-button>
        </b-col>
      </b-row>
      <vue-apex-charts
        type="donut"
        height="350"
        :options="options"
        :series="series"
      />
      </b-card>
  <!-- <b-card>
    <b-card-title class="mr-2 text-primary">
      SPP DATA TAHUN <select v-model="selectedYear" @change="changeYear()">
        <option
            v-for="(yeartime, i) in getYears"
            :key="i"
            :value="yeartime"
        >
            {{ yeartime }}
        </option>
      </select>
    </b-card-title>
    <b-card-sub-title class="mr-1 text-primary">
      Grafik Gambaran Jumlah SPP
    </b-card-sub-title>

    <vue-apex-charts
      type="donut"
      height="350"
      :options="options"
      :series="series"
    />
  </b-card> -->
</template>

<script>
import { 
  BCard,
  BCardTitle, 
  BCardSubTitle 
  } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
import axios from 'axios'
// import vSelect from 'vue-select'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { uuid } from 'vue-uuid'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardTitle,
    BCardSubTitle,
    DatePicker,
    // vSelect,
  },
  computed: {
    getYears () {
      let currentDate = new Date()
      let currentYear = currentDate.getFullYear()
      let minusoneyear = currentYear--
      let minustwoyear = (minusoneyear + (currentYear - minusoneyear) ) - 1
      return [minusoneyear, currentYear, minustwoyear]
    }
  },

  data() {
    let currentDate = new Date()
    let currentYears = currentDate.getFullYear()  
    return {
      // apexChatData,
      // yeartime: Date,
      selectedYear: null,
      year: null,
      tahundata: currentYears,
      series: [],
      options: {
        labels: [],
        dataLabels: {
          enabled: false,
          formatter(val) {
            // eslint-disable-next-line radix
            return `${parseInt(val)}`
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
                name: {
                  fontSize: '10rem',
                  fontFamily: 'Montserrat',
                },
                value: {
                  fontSize: '2rem',
                  fontFamily: 'Montserrat',
                  formatter(val) {
                    // eslint-disable-next-line radix
                    return `${parseInt(val)}`
                  },
                },
              },
            },
          },
        },
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 380,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 576,
            options: {
              chart: {
                height: 320,
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        fontSize: '6rem',
                      },
                      value: {
                        fontSize: '3rem',
                      },
                      total: {
                        fontSize: '1.5rem',
                      },
                    },
                  },
                },
              },
              legend: {
                show: true,
              },
            },
          },
        ],
      },
    }
  },
  // mounted() {
  //   const param = {}
  //   param.request_id = uuid.v4()
  //   param.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
  //   console.log(this.selectedYear, 'Tahun')
  //   axios({
  //     url: URLServices.dashboard.index,
  //     params: param,
  //     method: 'get',
  //     year: this.selectedYear,
  //     headers: {
  //       Authorization: `${TokenType} ${getToken()}`,
  //     },
  //   })
  //     .then(response => {
  //       this.dashboard_data = response.data.data
  //       Object.keys(this.dashboard_data).forEach(key => {
  //         this.series.push(parseInt(this.dashboard_data[key], 10))
  //         this.options.labels.push(key)
  //       })
  //     })
  //     .catch(() => {
  //       this.showTable = false
  //       CustomNotification.notif('danger', 'Gagal Menampilkan Data', 'Mohon coba kembali')
  //     })
  // },
  created() {
    this.yearsData()
  },
  methods: {
    async yearsData() {
      const param = {}
      param.request_id = uuid.v4()
      param.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      this.series = []
      this.options.labels = []
      await axios({
        url: URLServices.dashboard.index,
        params: param,
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dashboard_data = response.data.data
          Object.keys(this.dashboard_data).forEach(key => {
            this.series.push(parseInt(this.dashboard_data[key], 10))
            this.options.labels.push(key)
          })
        })
        .catch(() => {
          this.showTable = false
          CustomNotification.notif('danger', 'Gagal Menampilkan Data', 'Mohon coba kembali')
        })
    },
    async changeYear() {
      // const param = {}
      // param.request_id = uuid.v4()
      // param.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      // param.year = this.selectedYear,
      this.series = []
      this.options.labels = []
      // console.log(param, 'pramater')
      await axios({
        url: URLServices.dashboard.index,
        params:  {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          year: this.year,
        },
        method: 'get',
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dashboard_data = response.data.data
          Object.keys(this.dashboard_data).forEach(key => {
            this.series.push(parseInt(this.dashboard_data[key], 10))
            this.options.labels.push(key)
          })
        })
        .catch(() => {
          this.showTable = false
          CustomNotification.notif('danger', 'Gagal Menampilkan Data', 'Mohon coba kembali')
        })
    },
  },
}
</script>

<style lang="scss">
// @import 'vue-select/src/scss/vue-select.scss';
</style>
