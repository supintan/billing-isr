<template>
  <b-card>
    <b-form ref="form">
        <b-card-text>
          <h5 class="text-primary my-2">
            {{ title }}
          </h5>
        </b-card-text>
        <!--KM-->
        <!-- <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Client" label-for="client">
              <b-form-input
                  id="client"
                  v-model="client"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row> -->
        <!--Aplikasi-->
        <!-- <b-row class="mb-1">
          <b-col
              lg="12"
              sm="12"
          >
            <b-form-group label-cols="2" label="Aplikasi" label-for="aplikasi_name">
              <b-form-input
                  id="aplikasi_name"
                  v-model="applicationName"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row> -->
        <!--Nomor SPP-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Nomor SPP 2" label-for="invoice_number">
              <b-form-input
                  id="invoice_number"
                  v-model="invoice_number"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Nilai SPP-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Nilai SPP" label-for="invoice_amount">
              <b-input-group prepend="Rp.">
                <b-form-input
                    id="invoice_amount"
                    :value="invoice_amount"
                    class="form-control font-weight text-right"
                    placeholder="10.000.000"
                    maxlength="200"
                    minlength="10"
                    required
                    autocomplete="off"
                    readonly
                />
                <!-- <cleave
                    id="invoice_amount"
                    :value="invoice_amount"
                    class="form-control font-weight-bold text-right"
                    :raw="false"
                    :options="options.number"
                    placeholder="10.000.000"
                    maxlength="200"
                    minlength="10"
                    required
                    autocomplete="off"
                    readonly
                /> -->
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Tangal Jatuh Tempo-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Tanggal Jatuh Tempo" label-for="billing_end_date">
              <b-form-input
                  id="billing_end_date"
                  v-model="invoiceDueDate"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Tanggal Surat-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Tanggal Surat" label-for="publish_date">
              <b-form-input
                  id="publish_date"
                  v-model="appealLetterPublishDate"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Nomor Surat Permohonan-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Nomor Surat Permohonan" label-for="nomorSurat">
              <b-form-input
                  id="nomorSurat"
                  v-model="appeal_letter_number"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Tanggal jatuh Tempo Baru-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Tanggal Jatuh Tempo Baru" label-for="jatuh_tempo2">
              <b-form-input
                  id="jatuh_tempo2"
                  v-model="appealDueDate"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <!--File Surat Permohonan-->
        <b-row class="mb-1">
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="File Surat Permohonan">
              <button
                  data-v-aa799a9e=""
                  type="button"
                  class="btn mr-1 btn-info"
                  style="position: relative;"
                  @click="onClick()"
              > Download File
              </button>
            </b-form-group>
          </b-col>
        </b-row>
        <!--Catatan Permohonan-->
        <b-row class="mb-1">
          <b-col
            lg="12"
            sm="12"
          >
            <b-form-group label-cols="2" label="Catatan Permohonan" label-for="description">
              <b-form-textarea
                  id="description"
                  v-model="appeal_submission_notes"
                  required
                  maxlength="200"
                  minlength="10"
                  readonly
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    <b-col
          offset-md="4"
          v-show="!isVerify && !isReview"
      >
        <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            :to="{ name: routeNameCompute }"
            variant="outline-secondary"
        >
          Kembali
        </b-button>
      </b-col>
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
  BFormTextarea,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import moment from 'moment'
// import { heightTransition } from '@core/mixins/ui/transition'
// import Cleave from 'vue-cleave-component'
import InputFormat from '@/helpers/input-format'
import { URLServices, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'

export default {
  name: 'Penundaan',
  props: [
    'title',
    'isVerify',
    'isReview',
    'routeName',
    'id',
    'application_id',
    'application_name',
    'ministerial_decree_id',
    'ministerial_decree_number',
    'client',
    'invoice_id',
    'invoice_number',
    'invoice_due_date',
    'invoice_total_amount',
    'appeal_letter_number',
    'appeal_letter_publish_date',
    'appeal_due_date',
    'upload_date_time',
    'submission_notes',
  ],
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BRow,
    BFormTextarea,
    // Cleave,
    BInputGroup,
  },
  directives: {
    Ripple,
  },
  // mixins: [heightTransition],
  data() {
    return {
      options: {
        number: InputFormat.options('number'),
      },
    }
  },
  computed: {
    applicationName() {
      return this.application_name
    },
    routeNameCompute() {
      return !this.routeName ? 'invoice-postponement' : this.routeName
    },
    invoiceDueDate() {
      return this.convDate(this.invoice_due_date)
    },
    appealLetterPublishDate() {
      return this.convDate(this.appeal_letter_publish_date)
    },
    appealDueDate() {
      return this.convDate(this.appeal_due_date)
    },
    invoice_amount() {
      return this.NumberFormat(this.invoice_total_amount)
    },
    appeal_submission_notes() {
      return this.submission_notes
    },
  },
  methods: {
    NumberFormat(number) {
    this.value = number
      if (this.value) {
        return Number(this.value).toLocaleString('in-ID', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 5,
        })
      }
      return '-'
    },
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    onClick() {
      axios({
        url: URLServices.postponement.download,
        method: 'POST',
        params: {
          request_id: 'guid_v4',
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.id,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }).then(result => {
        // console.log(result.data)
        const fileURL = result.data.file_base64
        const fileLink = document.createElement('a')
        const convert = 'data:application/pdf;base64, '
        // console.log(fileURL)
        fileLink.href = `${convert}${fileURL}`
        // console.log(fileLink.href)
        fileLink.setAttribute('download', result.data.file_name)
        document.body.appendChild(fileLink)
        fileLink.click()
      }).catch(error => {
        const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
        CustomNotification.notif('error', errorMessage)
      })
    },
  },
}
</script>
