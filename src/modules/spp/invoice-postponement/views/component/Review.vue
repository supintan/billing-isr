<template>
  <b-card>
    <b-form ref="form">
      <b-card-text>
        <h5 class="text-primary my-2">
          {{ title }}
        </h5>
      </b-card-text>

      <!--Keputusan Review-->
      <b-row class="mb-1">
        <b-col
          lg="12"
          sm="12"
        >
          <b-form-group
            label-cols="2"
            label="Keputusan"
          >
            <b-form-radio-group
                v-model="selectedOption"
                :options="fileOptions"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                class="demo-inline-spacing"
                :disabled="isReview"
                @change="selectVerify"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--Nomor Surat Keputusan-->
      <b-row class="mb-1" >
        <b-col
            lg="12"
            sm="12"
        >
          <b-form-group
              label-cols="2"
              label="Nomor Surat Keputusan"
              label-for="staff"
          >
            <b-form-input
                id="staff"
                v-model="letterNumberComputed"
                required
                maxlength="200"
                minlength="10"
                :readonly="isReview"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--File Surat Keputusan-->
      <b-row class="mb-1" >
        <b-col lg="12" sm="12">
          <b-form-group v-if="isReview" label-cols="2" label="File Surat Keputusan" label-for="file">
            <button
                data-v-aa799a9e=""
                type="button"
                class="btn mr-1 btn-info"
                style="position: relative;"
                @click="onClick()"
            > Download File
            </button>
          </b-form-group>
          <b-form-group v-else label-cols="2" label="File Surat Keputusan" label-for="file">
            <b-form-file
                v-model="fileLoc"
                accept=".pdf"
                required
                placeholder="Pilih upload dokumen..."
                drop-placeholder="Drop file here..."
                @change="createBase64File"
                src=""
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--Tanggal Jatuh Tempo Baru-->
      <b-row  class="mb-1">
        <b-col lg="12" sm="12">
          <b-form-group label-cols="2" label="Tanggal Jatuh Tempo Baru" label-for="verify_date">
            <b-form-datepicker
              id="verify_date"
              v-model="newDueDateCompute"
              locale="id"
              :readonly="isReview"
            />
            <!-- <b-form-input v-else type="date" autocomplete="off" id="verify_date" v-model="newDueDateCompute" /> -->
          </b-form-group>
        </b-col>
      </b-row>
      <!--Tanggal Terbit Baru-->
      <b-row class="mb-1">
        <b-col lg="12" sm="12">
          <b-form-group label-cols="2" label="Tanggal Terbit Baru" label-for="publish_date">
            <b-form-datepicker
              id="publish_date"
              v-model="publishDateCompute"
              locale="id"
              :readonly="isReview"
            />
            <!-- <b-form-input v-else type="date" autocomplete="off" id="publish_date" v-model="publishDateCompute" /> -->
          </b-form-group>
        </b-col>
      </b-row>
      <!--Catatan Keputusan-->
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
                :readonly="isReview"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row
        v-show="isReview"
        class="mb-1"
      >
        <b-col
          lg="12"
          sm="12"
        >
          <b-form-group
            label-cols="2"
            label="File Template"
            label-for="template"
          >
            <b-button active v-b-modal.modalPreview @click="preview">
              Tampilkan Preview
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row
        v-show="!isReview"
        class="mb-1"
      >
        <b-col
          lg="6"
          sm="6"
        >
          <b-form-group
            label-cols="4"
            label="Template"
            label-for="item-template"
            >
            <v-select
              id="item-template"
              v-model="selectednameTemplate"
              box
              placeholder="-- Pilih Template --"
              label="name"
              :options="template"
              @input="selectedtemplateInput"
            >
            </v-select>
            <div class="mb-1"></div>
            <template>
              <b-button active v-b-modal.modalPreview @click="anotherPreview">
                Tampilkan Preview
              </b-button>
            </template>
        </b-form-group>
        </b-col>
      </b-row>
      <!--Tanggal Verifikasi-->
      <b-row v-show="isReview" class="mb-1">
        <b-col lg="12" sm="12">
          <b-form-group
              label-cols="2"
              label="Tanggal Review"
              label-for="verify_date"
          >
            <b-form-input
                id="verify_date"
                v-model="reviewDate"
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
          v-show="isReview"
          class="mb-1"
      >
        <b-col
            lg="12"
            sm="12"
        >
          <b-form-group
              label-cols="2"
              label="Petugas Review"
              label-for="staff"
          >
            <b-form-input
                id="staff"
                v-model="reviewer_employee_name"
                required
                maxlength="200"
                minlength="10"
                readonly
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!--Tombol-->
      <b-col
          v-if="isReview"
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
          v-else
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

      <!-- modal template -->
      <b-row>
        <b-modal
          id="modalPreviewGet"
          size="xl"
          ref="modal"
          modal-class="modal-primary"
          ok-title="Tutup"
          ok-only
        >
          <!-- v-if="pdfFile" -->
            <div>
              <!-- :show="showFilePDF" -->
              <b-overlay>
                <b-card-text>
                  Berikut ini adalah tampilan template yang dipilih
                </b-card-text>
                <b-embed
                  :data="'data:application/pdf;base64,' + pdfFile"
                  file
                  type="object"
                  width="100%"
                  height="700px;"
                />
              </b-overlay>
            </div>
          </b-modal>
      </b-row>

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
  BFormFile,
  BCardText,
  BFormInput,
  BForm,
  BFormDatepicker,
} from 'bootstrap-vue'
import axios from 'axios'
import { TokenType, getToken, URLServices } from '@/services/UrlConfig'
import moment from 'moment'
import vSelect from 'vue-select'
import { uuid } from 'vue-uuid'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import UserManagement from '@/services/UserManagement'
import Ripple from 'vue-ripple-directive'
// import { heightTransition } from '@core/mixins/ui/transition'
import CustomNotification from '@/helpers/custom-notification'

export default {
  name: 'Review',
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BForm,
    BRow,
    BFormTextarea,
    BFormRadioGroup,
    BFormDatepicker,
    vSelect,
  },
  directives: {
    Ripple,
  },
  // mixins: [heightTransition],
  props: {
    title: String,
    id: Number,
    postponement_id: Number,
    postponement_appeal_submissions_id: Number,
    review_date_time: String,
    reviewer_employee_id: Number,
    reviewer_employee_nik: String,
    reviewer_employee_name: String,
    reviewer_employee_position: String,
    review_is_approved: Boolean,
    reviewer_notes: String,
    review_letter_number: String,
    approved_due_date: String,
    template_id: String,
    routeName: {
      type: String,
      default: 'review-invoice-postponement',
    },
    isReview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedFormat: null,
      letterNumber: null,
      newDueDate: null,
      publishDate: null,
      notes: null,
      catatan: this.isReview ? 'Catatan Review Surat Pemohonan' : 'Catatan Keputusan',
      fileOptions: [
        { item: 'DISETUJUI', name: 'DISETUJUI' },
        { item: 'DITOLAK', name: 'DITOLAK' },
      ],
      fileLoc: null,
      fileBase64: '',
      template: [],
      pdfFile: null,
      selectedtemplateID: null,
      selectednameTemplate: null,
      showFilePDF: false,
    }
  },
  computed: {
    selectedOption: {
      get() {
        let selected = ''
        if (this.review_date_time) {
          if (this.review_is_approved) {
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
    letterNumberComputed: {
      get() {
        return this.review_letter_number
      },
      set(letter) {
        this.letterNumber = letter
      },
    },
    newDueDateCompute: {
      get() {
        return this.convDate(this.approved_due_date)
      },
      set(newDate) {
        this.newDueDate = newDate
      },
    },
    publishDateCompute: {
      get() {
        return this.convDate(this.approved_due_date)
      },
      set(publishDate) {
        this.publishDate = publishDate
      },
    },
    computeNotes: {
      get() {
        return this.reviewer_notes
      },
      set(notes) {
        this.notes = notes
      },
    },

    reviewDate() {
      return this.convDate(this.review_date_time)
    },
  },
  created() {
    if (!this.isReview) {
      this.getTemplate()
    }
  },
  methods: {
    selectedtemplateInput(value) {
      this.selectedtemplateID = value.id
      this.selectednameTemplate = value.name
      return true
    },
    anotherPreview() {
      // console.log(this.templateId2, 'valuePriveiw')
      this.pdfFile = null
      this.$bvModal.show('modalPreviewGet')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.selectedtemplateID,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.showFilePDF = true
          }
          this.showFilePDF = false
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplate. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
    },
    preview() {
      // console.log(this.templateId2, 'valuePriveiw')
      this.pdfFile = null
      this.$bvModal.show('modalPreviewGet')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.template_id,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data) {
            this.pdfFile = result.data.file_base64
            this.showFilePDF = true
          }
          this.showFilePDF = false
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplate. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
    },
    async getTemplate() {
      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 10,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.template = response.data.data
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error !', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
        })
    },
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
    createBase64File(e) {
      // console.log('apa ini leeeee', e)
      const file = e.target.files[0]
      // console.log(e.target.files, 'ini files')
      // console.log(file, 'ini file')
      this.createRequestVariable(file)
    },
    createRequestVariable(file) {
      const data = {}
      const reader = new FileReader()
      if (file) {
        reader.onloadend = e => {
          this.fileLoc = e.target.result
          // console.log(this.fileLoc)
          this.fileBase64 = this.fileLoc
        }
        reader.readAsDataURL(file)
      }
      data.id = this.id
      data.is_approved = this.selectedFormat === 'DISETUJUI'
      data.reviewer_notes = this.notes
      data.review_letter_number = this.letterNumber
      data.approved_due_date = this.newDueDate
      data.approved_publish_date = this.publishDate
      data.file_base64 = this.fileLoc

      return data
    },
    async save() {
      const url = this.selectedFormat === 'DISETUJUI'
        ? URLServices.postponement_submission.approve
        : URLServices.postponement_submission.reject
      const Param = this.createRequestVariable()
      // console.log('payload', Param)
      if (Param !== false) {
        if (Param.is_approved == null) {
          const warningMessage = 'Keputusan Verifikasi Wajib Diisi'
          CustomNotification.notif('warning', warningMessage)
        } else if (!Param.reviewer_notes) {
          const errorMessage = 'Catatan Review Wajib Diisi'
          CustomNotification.notif('warning', errorMessage)
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
              request_id: 'guid_v4',
              request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
              data: Param,
            },
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }).then(result => {
            // console.log('response save approval', result.data)
            if (result.data.response_code === '00') {
              const successMessage = 'Berhasil menambahkan data baru'
              CustomNotification.notif('success', 'Sukses !', successMessage)
              this.$router.push({ name: 'review-invoice-postponement' })
            } else {
              const responseMessage = result.data.response_message
              CustomNotification.notif('warning', 'Error !', responseMessage)
            }
            // this.showCreteUserForm = false
          }).catch(error => {
            const errorMessage = '500: Internal Server Error'
            CustomNotification.notif('error', 'Error !', errorMessage)
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
    onClick() {
      axios({
        url: URLServices.postponement_submission.download,
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

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';
</style>
