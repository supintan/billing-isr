<template>
  <div>
    <b-card class="shadow p-0 mb-4">
      <b-row>
        <b-col sm="5">
        <b-form-group
          label="Tahun"
          label-cols="5"
          label-for="Year"
        >
          <date-picker
            v-model="Year"
            valueType="format"
            type="year"
            end="2021"
            placeholder="YYYY"
          >
          </date-picker>
        </b-form-group>
        </b-col>
        <b-col>
          <b-button
            :disabled="!Year"
            variant="primary"
            @click="CalculateReport()"
          >
            <feather-icon icon="Icon" /> Tampilkan
            </b-button>
        </b-col>
      </b-row>
    </b-card>
    <div v-if="CalculateStatus" class="mt-5">
      <h5 class="mb-3 text-muted">
        <feather-icon icon="SearchIcon" size="20" /> Hasil Pencarian
      </h5>
      <b-card title="Hasil Pencarian" no-body class="shadow p-0 mb-4">
        <b-card-header header-tag="nav">
          <b-nav card-header tabs>
            <b-nav-item
              to="#"
              :active="$route.hash === '#' || $route.hash === ''">
              Rekap
            </b-nav-item>
            <!--
            <b-nav-item to="#h2h-ipfr" :active="$route.hash === '#h2h-ipfr'">
              H2H - IPFR
            </b-nav-item>
            -->
            <b-nav-item to="#h2h-isr" :active="$route.hash === '#h2h-isr'">
              H2H - ISR
            </b-nav-item>
            <b-nav-item to="#non-h2h" :active="$route.hash === '#non-h2h'">
              NON H2H
            </b-nav-item>
            <!--
            <b-nav-item to="#non-h2h-salah-setor" :active="$route.hash === '#non-h2h-salah-setor'">
              NON H2H (Salah Setor)
            </b-nav-item>
            <b-nav-item to="#salah-setor" :active="$route.hash === '#salah-setor'">
              Salah Setor
            </b-nav-item>
            <b-nav-item to="#double-bayar" :active="$route.hash === '#double-bayar'">
              Double Bayar
            </b-nav-item>
            <b-nav-item to="#sisa-bayar" :active="$route.hash === '#sisa-bayar'">
              Sisa Bayar
            </b-nav-item>
            <b-nav-item to="#double-kredit" :active="$route.hash === '#double-kredit'">
              Double Kredit
            </b-nav-item>
            -->
          </b-nav>
        </b-card-header>

        <b-card-body>
          <div class="tab-content">
            <div
              :class="[
                'tab-pane',
                { active: $route.hash === '#' || $route.hash === '' },
              ]"
              class="p-2">
              <rekap v-if="$route.hash === '#' || $route.hash === ''" :Year="Year"/>
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#h2h-ipfr' }]"
              class="p-2">
              <h2h-ipfr v-if="$route.hash === '#h2h-ipfr'" />
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#h2h-isr' }]"
              class="p-2">
              <h2h-isr v-if="$route.hash === '#h2h-isr'" :Year="Year"/>
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#non-h2h' }]"
              class="p-2">
              <non-h2h v-if="$route.hash === '#non-h2h'" :Year="Year"/>
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#non-h2h-salah-setor' }]"
              class="p-2">
              <non-h2h-salah-setor v-if="$route.hash === '#non-h2h-salah-setor'" />
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#salah-setor' }]"
              class="p-2">
              <salah-setor v-if="$route.hash === '#salah-setor'" />
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#double-bayar' }]"
              class="p-2">
              <double-bayar v-if="$route.hash === '#double-bayar'" />
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#sisa-bayar' }]"
              class="p-2">
              <sisa-bayar v-if="$route.hash === '#sisa-bayar'" />
            </div>
            <div
              :class="['tab-pane', { active: $route.hash === '#double-kredit' }]"
              class="p-2">
              <double-kredit v-if="$route.hash === '#double-kredit'" />
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BButton,
  BCardBody,
  BCard,
  // BSpinner,
} from 'bootstrap-vue'
import Rekap from './rekap.vue'
import H2hIpfr from './h2h-ipfr.vue'
import H2hIsr from './h2h-isr.vue'
import NonH2h from './non-h2h.vue'
import NonH2hSalahSetor from './non-h2h-salah-setor.vue'
import SalahSetor from './salah-setor.vue'
import DoubleBayar from './double-bayar.vue'
import SisaBayar from './sisa-bayar.vue'
import DoubleKredit from './double-kredit.vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import CustomNotification from '@/helpers/custom-notification'
import moment from 'moment'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BButton,
    BCardBody,
    Rekap,
    H2hIpfr,
    H2hIsr,
    NonH2h,
    NonH2hSalahSetor,
    SalahSetor,
    DoubleBayar,
    SisaBayar,
    DoubleKredit,
    DatePicker,
  },
  data() {
    return {
      Year: null,

      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },

      title: {},
      deleteReason: '',
      nameState: null,

      // Delete Modal
      titleDelete: null,
      CalculateStatus: false,
      CurrentYear: moment().format('YYYY'),
    }
  },
  methods: {
    CalculateReport() {
      if (this.Year > this.CurrentYear) {
        this.CalculateStatus = false
        CustomNotification.notif('warning', `Maksimal tahun adalah ${this.CurrentYear}`, 'Mohon periksa kembali' )
        return
      }
      this.CalculateStatus = true
    }
  }
}
</script>
