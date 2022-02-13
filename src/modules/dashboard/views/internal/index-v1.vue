<template>
  <b-card>
    <b-card-title class="mr-2 text-primary">
      SPP DATA TAHUN <select v-model="selectedYear">
        <option
            v-for="(year, i) in getYears"
            :key="i"
            :value="year"

        >
            {{ year }}
        </option>
      </select>
    </b-card-title>
    <b-card-sub-title class="mr-1 text-primary">
      Grafik Gambaran Jumlah SPP 
      <br>
      <!-- <br/>
      <div id="app" >
        Tahun : {{ selectedYear }} <br>
      <select v-model="selectedYear" >
        <option value="">Pilih Tahun</option>
        <option
            v-for="(year, i) in getYears"
            :key="i"
            :value="year"
        >
            {{ year }}
        </option>
      </select>

      </div> -->
    </b-card-sub-title>
      
    <vue-apex-charts
      type="donut"
      height="350"
      :options="apexChatData.donutChart.chartOptions"
      :series="apexChatData.donutChart.series"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'
import apexChatData from './apexChartData-v1'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardTitle,
    BCardSubTitle,
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
      apexChatData,
      selectedYear: currentYears,
    }
  },
}
</script>
