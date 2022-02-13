<template>
  <b-card>
    <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">
          {{ title }}
        </h5>
      </b-card-text>

      <!--Keputusan Verifikasi-->
      <b-row class="mb-1">
        <b-col
          lg="12"
          sm="12"
        >
          <b-form-group
            label-cols="2"
            label="Keputusan Verifikasi"
          >
            <b-form-radio-group
              v-model="selectedOption"
              :options="fileOptions"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              class="demo-inline-spacing"
              :disabled="isVerify"
              @change="selectVerify"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--Catatan Vefikasi-->
      <b-row class="mb-1">
        <b-col
          lg="12"
          sm="12"
        >
          <b-form-group
            label-cols="2"
            :label="catatan"
            label-for="reviewer_notes"
          >
            <b-form-textarea
              id="reviewer_notes"
              v-model="computeNotes"
              required
              maxlength="200"
              minlength="10"
              :readonly="isVerify"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--Tanggal Verifikasi-->
      <b-row
        v-show="isVerify"
        class="mb-1"
      >
        <b-col
          lg="12"
          sm="12"
        >
          <b-form-group
            label-cols="2"
            label="Tanggal Verifikasi"
            label-for="verify_date"
          >
            <b-form-input
              id="verify_date"
              v-model="verification_date"
              required
              maxlength="200"
              minlength="10"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--Petugas Verifikasi-->
      <b-row
        v-show="isVerify"
        class="mb-1"
      >
        <b-col
          lg="12"
          sm="12"
        >
          <b-form-group
            label-cols="2"
            label="Petugas Verifikasi"
            label-for="staff"
          >
            <b-form-input
              id="staff"
              v-model="verification_employee_name"
              required
              maxlength="200"
              minlength="10"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-col
        v-if="isVerify && !isReview"
        offset-md="4"
      >
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          :to="{ name: routeName }"
          variant="outline-secondary"
        >
          Kembali
        </b-button>
      </b-col>
      <b-col
        v-else-if="!isReview && !isReview"
        offset-md="4"
      >
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          :to="{ name: routeName }"
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
</template>

<script>
import {
  BButton,
  BCard,
  BCol,
  BRow,
  BFormGroup,
  BFormTextarea,
  BFormRadioGroup,
  BCardText,
  BFormInput,
  BForm,
} from 'bootstrap-vue'
import axios from 'axios'
import { uuid } from 'vue-uuid'
import { getToken, URLServices } from '@/services/UrlConfig'
import moment from 'moment'
// import vSelect from 'vue-select'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import UserManagement from '@/services/UserManagement'
import Ripple from 'vue-ripple-directive'
import CustomNotification from '@/helpers/custom-notification'
// import { heightTransition } from '@core/mixins/ui/transition'

export default {
  name: 'Verifikasi',
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
    BFormRadioGroup,
  },
  directives: {
    Ripple,
  },
  // mixins: [heightTransition],
  props: {
    title: String,
    id: Number,
    postponement_id: Number,
    verification_decision: Boolean,
    verification_notes: String,
    verification_date_time: String,
    verification_employee_name: String,
    routeName: {
      type: String,
      default: 'verify-invoice-postponement',
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    isReview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedFormat: null,
      notes: null,
      catatan: this.isVerify ? 'Catatan Verifikasi Surat Pemohonan' : 'Catatan Verifikasi',
      fileOptions: [
        { item: 'DISETUJUI', name: 'DISETUJUI' },
        { item: 'DITOLAK', name: 'DITOLAK' },
      ],
    }
  },
  computed: {
    selectedOption: {
      get() {
        let selected = ''
        if (this.verification_date_time) {
          if (this.verification_decision) {
            selected = 'DISETUJUI'
          } else {
            selected = 'DITOLAK'
          }
        }
        return selected
      },
      set(val) {
        this.selectedFormat = val
      },
    },
    computeNotes: {
      get() {
        return this.verification_notes
      },
      set(notes) {
        this.notes = notes
      },
    },
    verification_date() {
      return this.convDate(this.verification_date_time)
    },
  },
  methods: {
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    selectVerify(value) {
      this.selectedFormat = value
      // console.log('value', value)
    },
    createRequestVariable() {
      const data = {}
      data.is_approved = this.selectedFormat === 'DISETUJUI'
      data.id = this.id
      data.reviewer_notes = this.notes
      if (this.selectedFormat == null) {
        data.is_approved = null
      }
      return data
    },
    async save() {
      // this.showCreteUserForm = true
      const url = this.selectedFormat === 'DISETUJUI'
        ? URLServices.postponement_appeal.approve
        : URLServices.postponement_appeal.reject
      const Param = this.createRequestVariable()
      console.log('payload', Param)
      if (Param !== false) {
        if (Param.is_approved == null) {
          const warningMessage = 'Keputusan Verifikasi Wajib Diisi'
          CustomNotification.notif('warning', 'Warning !', warningMessage)
        } else if (!Param.reviewer_notes) {
          const warningRev = 'Catatan Review Wajib Diisi'
          CustomNotification.notif('warning', 'Warning', warningRev)
        } else {
          /* this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil menambahkan data baru',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push({ name: 'verify-invoice-postponement' }) */
          await axios({
            url,
            method: 'post',
            data: {
              request_id: uuid.v4(),
              request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
              data: Param,
            },
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }).then(result => {
            // console.log('response save approval', result.data)
            if (result.data.response_code === '00') {
              const success = 'Berhasil menambahkan data baru'
              CustomNotification.notif('success', 'Sukses !', success)
              this.$router.push({ name: 'verify-invoice-postponement' })
            } else {
              const responseMessage = result.data.response_message
              CustomNotification.notif('warning', 'Error !', responseMessage)
            }
            // this.showCreteUserForm = false
          }).catch(error => {
            const notifError = '500: Internal Server Error'
            CustomNotification.notif('error', 'Error !', notifError)
            // this.showCreteUserForm = false
            if (error.response.status && error.response.status === 401) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userData')
              this.$router.go({ name: 'session-time-out' })
            }
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
