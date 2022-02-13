<template>
  <b-overlay :show="showCreteSimulasiForm" rounded="sm">
    <b-card>
        <b-row>
          <b-col>
            <b-card-text>
                <h5 class="text-primary my-2">Permohonan Pooling</h5>
              </b-card-text>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-form-group
              class="mb-2"
              label="Pelanggan"
              label-cols="4"
            >
              <b-input-group>
                <b-form-input
                  v-model="client_name"
                  id="readOnlyInput"
                  class="text-left"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Surat"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
            <b-form-datepicker
              class="font-weight-bold"
              id="isr_ipfr_tgl_mulai"
              locale="id"
              placeholder="YYYY-MM-DD"
              v-model="appeal_leter_publish_date"
              readonly
            />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nomor Surat Permohonan"
              label-cols="4"
            >
              <b-input-group>
                <b-form-input
                  v-model="appeal_letter_number"
                  id="readOnlyInput"
                  class="text-left"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Jatuh Tempo Baru"
              label-for="tgl_new_due_date"
              label-cols="4"
              readonly
            >
              <b-form-datepicker
                class="font-weight-bold"
                id="tgl_new_due_date"
                locale="id"
                placeholder="YYYY-MM-DD"
                v-model="appeal_due_date"
                readonly
              />
              (*Tanggal jatuh tempo selanjutnya akan mengikuti tanggal ini)
              </b-form-group>
              <b-form-group
                label-cols="4"
                label="File Surat Permohonan*"
                label-for="file"
              >
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="info"
                  type="button"
                  class="ml-1"
                  @click="download(id_pooling)"
                >
                <!-- {{id_pooling}} -->
                  Download File
                </b-button>
              </b-form-group>
              <b-form-group
                class="mb-2"
                label="Catatan Permohonan"
                label-cols="4"
              >
              <b-form-textarea
                v-model="appeal_notes"
                id="textarea-rows"
                placeholder=""
                rows="6"
                readonly
              />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
                <b-card-text >
                  <h2>SPP yang di ajukan</h2>
                </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-table
                id="tableData"
                striped
                hover
                class="position-relative bg-white"
                :items="itemslistapplication"
                :fields="fields"
                readonly
              >
              <template #cell(no)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(billing_parameter_due_date)="data">
                  {{ convDate(data.item.billing_parameter_due_date) }}
                </template>
                <template #cell(billing_parameter_total_amount)="data">
                {{ Number(data.item.billing_parameter_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </template>
              </b-table>
            </b-col>
          </b-row>
    </b-card>
      <div v-if="isStatus === 'DISETUJUI' || isStatus === 'MENUNGGU REVIEW'">
        <b-card>
            <b-row>
              <b-col>
                <b-card-text>
                    <h5 class="text-primary my-2">Verifikasi Surat Permohonan Pooling</h5>
                  </b-card-text>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="8" md="8">
                <b-form-group
                    class="mb-2"
                    label="Keputusan Verifikasi"
                    label-cols="4"
                  >
                  <b-form-radio
                    v-model="verification_is_approved "
                    name="some-radio9"
                    value="true"
                    class="custom-control-success"
                    disabled
                  >
                    Setuju
                  </b-form-radio>
                  <b-form-radio
                    v-model="verification_is_approved "
                    name="some-radio9"
                    value="false"
                    class="custom-control-danger"
                    cols ='4'
                    disabled
                  >
                    Tolak
                  </b-form-radio>
                </b-form-group>
                <b-form-group
                  label-cols="4"
                  label="Template"
                  label-for="item-template"
                >
                  <!-- <v-select
                    id="item-template"
                    v-model="selectednameTemplate"
                    box
                    placeholder="-- Pilih Template --"
                    label="name"
                    :options="template"
                    @input="selectedtemplateInput"
                  >
                  </v-select> -->
                  <!-- <div class="mb-1"></div> -->
                  <template>
                    <b-button @click="onPreview(templateId)">
                      Tampilkan Preview
                    </b-button>
                  </template>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Catatan Verifikasi"
                  label-cols="4"
                >
                <b-form-textarea
                  v-model="appeal_submission_note"
                  id="textarea-rows"
                  placeholder=""
                  rows="6"
                  disabled
                />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Tanggal Verifikasi"
                  label-for="tgl_verifikasi"
                  label-cols="4"
                >
                <b-form-datepicker
                  class="font-weight-bold"
                  id="tgl_verifikasi"
                  locale="id"
                  placeholder="YYYY-MM-DD"
                  v-model="verification_date_time "
                  readonly
                />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Petugas Verifikasi"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      v-model="verification_employee_full_name"
                      id="readOnlyInput"
                      class="text-left"
                      readonly
                      >
                    </b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-modal
                id="modalOnPreview"
                size="xl"
                ref="modal"
                modal-class="modal-primary"
                ok-title="Tutup"
                ok-only
              >
                <div>
                  <b-overlay>
                    <b-card-text>
                      Berikut ini adalah preview Pooling SPP
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
        </b-card>
        <b-card>
            <b-row>
              <b-col>
                <b-card-text>
                    <h5 class="text-primary my-2">Review Surat Permohonan Pooling</h5>
                  </b-card-text>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" lg="8" md="8">
                <b-form-group
                    class="mb-2"
                    label="Keputusan Review"
                    label-cols="4"
                  >
                  <b-form-radio
                    v-model="review_is_approved"
                    name="review_is_approved"
                    value="true"
                    class="custom-control-success"
                    disabled
                  >
                    Setuju
                  </b-form-radio>
                  <b-form-radio
                    v-model="review_is_approved"
                    name="review_is_approved"
                    value="false"
                    class="custom-control-danger"
                    cols ='4'
                    disabled
                  >
                    Tolak
                  </b-form-radio>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Nomor Surat Keputusan"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      v-model="reviewer_letter_number"
                      id="readOnlyInput"
                      class="text-left"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  label-cols="4"
                  label="File Surat Keputusan"
                  label-for="file"
                >
                  <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="info"
                      type="button"
                      class="ml-1"
                      @click="downloadreview(pooling_submission_id)"
                    >
                    <!-- {{id_pooling}} -->
                      Download File
                    </b-button>
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Catatan Review"
                  label-cols="4"
                >
                <b-form-textarea
                  v-model="reviewer_notes"
                  id="textarea-rows"
                  placeholder=""
                  rows="6"
                  readonly
                />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Tanggal Review"
                  label-for="tgl_review"
                  label-cols="4"
                >
                <b-form-datepicker
                  class="font-weight-bold"
                  id="tgl_review"
                  locale="id"
                  placeholder="YYYY-MM-DD"
                  v-model="review_date_time "
                  readonly
                />
                </b-form-group>
                <b-form-group
                  class="mb-2"
                  label="Petugas Review"
                  label-cols="4"
                >
                  <b-input-group>
                    <b-form-input
                      v-model="reviewer_employee_full_name "
                      id="readOnlyInput"
                      class="text-left"
                      readonly
                    />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  label-cols="4"
                  label="SPP Pooling"
                  label-for="file"
                >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-table
                  id="tableDatapooling"
                  striped
                  hover
                  class="position-relative bg-white"
                  :items="items2"
                  :fields="fieldsPooling"
                  readonly
                >
                  <template #cell(no)="data">
                    {{ data.index + 1 }}
                  </template>
                  <template #cell(pooling_invoice_due_date)="data">
                    {{ convDate(data.item.pooling_invoice_due_date) }}
                  </template>
                  <template #cell(period)="data">
                    {{ convDate(data.item.pooling_billing_begin_date) }} - {{ convDate(data.item.pooling_billing_end_date) }}
                  </template>
                  <template #cell(pooling_prorate_per_months)="data">
                {{ Number(data.item.pooling_prorate_per_months).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
                </template>
                <template #cell(pooling_invoice_total_amount)="data">
                {{ Number(data.item.pooling_invoice_total_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
                </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label-cols="4"
                  label="Perubahan Periode Pengesahan IPFR"
                  label-for="file"
                >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-table
                  id="tableDatapoolingchange"
                  striped
                  hover
                  class="position-relative bg-white"
                  :items="items3"
                  :fields="fieldsPoolingChanged"
                  readonly
                >
                <template #cell(no)="data">
                    {{ data.index + 1 }}
                  </template>
                  <template #cell(pooling_original_due_date)="data">
                    {{ convDate(data.item.pooling_original_due_date) }}
                  </template>
                  <template #cell(pooling_billing_begin_date)="data">
                    {{ convDate(data.item.pooling_billing_begin_date) }}
                  </template>
                  <template #cell(pooling_billing_end_date)="data">
                    {{ convDate(data.item.pooling_billing_end_date) }}
                  </template>
                  <template #cell(pooling_calculated_due_date)="data">
                    {{ convDate(data.item.pooling_calculated_due_date) }}
                  </template>
                </b-table>
              </b-col>
            </b-row>
        </b-card>
      </div>
      <div v-if="isStatus === 'MENUNGGU VERIFIKASI'">
        <b-card>
          <b-row>
            <b-col>
              <b-card-text>
                  <h5 class="text-primary my-2">Verifikasi Surat Permohonan Pooling</h5>
                </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" lg="8" md="8">
              <b-form-group
                  class="mb-2"
                  label="Keputusan Verifikasi"
                  label-cols="4"
                >
                <b-form-radio
                  v-model="Selected"
                  name="some-radio9"
                  value="1"
                  class="custom-control-success"
                >
                  Setuju
                </b-form-radio>
                <b-form-radio
                  v-model="Selected"
                  name="some-radio9"
                  value="0"
                  class="custom-control-danger"
                  cols ='4'
                >
                  Tolak
                </b-form-radio>
              </b-form-group>
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
                  <b-button active @click="preview">
                    Tampilkan Preview
                  </b-button>
                </template>
              </b-form-group>
              <b-form-group
                class="mb-2"
                label="Catatan Verifikasi"
                label-cols="4"
              >
              <b-form-textarea
                v-model="appeal_submission_note"
                id="textarea-rows"
                placeholder=""
                rows="6"
                required
              />
              </b-form-group>
            </b-col>
          </b-row>

          <b-modal
            id="modalPreview"
            size="xl"
            ref="modal"
            modal-class="modal-primary"
            ok-title="Tutup"
            ok-only
          >
            <div>
              <b-overlay>
                <b-card-text>
                  Berikut ini adalah preview Pooling SPP
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

          <b-row>
            <b-col offset-md="4">
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                :to="{ name: 'pooling-appeal-submission' }"
                variant="outline-secondary"
              >
                Batal
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="success"
                class="ml-1"
                @click="save()"
              >
                Simpan
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </div>
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
  // BFormFile,
  BTable,
  // BFormCheckbox,
  BFormTextarea,
  BFormRadio,
  BModal,
  BEmbed,
  BInputGroup,
  BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import UserManagement from '@/services/UserManagement'
import axios from 'axios'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { uuid } from 'vue-uuid'
import moment from 'moment'

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
    // BFormFile,
    BTable,
    // BFormCheckbox,
    BFormTextarea,
    BFormRadio,
    vSelect,
    BModal,
    BEmbed,
    BInputGroup,
    BCardText,
  },
  data() {
    return {
      // selected: ['A', 'C'],
      id_pooling: this.$route.params.idpooling,
      idappealpooling: this.$route.params.idappealpooling,
      client_name: this.$route.params.name,
      appeal_due_date: '',
      appeal_leter_publish_date: '',
      appeal_letter_number: '',
      appeal_notes: '',
      reviewer_letter_number: '',
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'application_official_name', label: 'Aplikasi' },
        // { key: 'ministerial_decree_number', label: 'Nomor KM Induk' },
        { key: 'billing_parameter_cycle_number', label: 'Tahun Ke-' },
        { key: 'billing_parameter_total_amount', label: 'Nilai SPP' },
        { key: 'billing_parameter_due_date', label: 'Tanggal Jatuh Tempo' },
      ],
      fieldsPooling: [
        { key: 'no', label: 'No.' },
        { key: 'application_official_name', label: 'Aplikasi' },
        // { key: 'ministerial_decree_number', label: 'KM' },
        { key: 'pooling_invoice_due_date', label: 'Tanggal Jatuh Tempo' },
        { key: 'period', label: 'Periode Pengesahan IPFR' },
        { key: 'pooling_number_of_months_roundup', label: 'Jumlah Bulan' },
        { key: 'pooling_prorate_per_months', label: 'Prorate Per Bulan' },
        { key: 'pooling_invoice_total_amount', label: 'Nilai SPP Pooling' },
      ],
      fieldsPoolingChanged: [
        { key: 'no', label: 'No.' },
        { key: 'application_official_name', label: 'Aplikasi' },
        // { key: 'ministerial_decree_number', label: 'KM Induk' },
        { key: 'pooling_billing_begin_date', label: 'Tanggal Jatuh Tempo Awal' },
        { key: 'pooling_billing_end_date', label: 'Tanggal Jatuh Tempo Baru' },
        { key: 'pooling_calculated_due_date', label: 'Periode Pengesahan IPFR' },
      ],
      items: [],
      items2: [],
      items3: [],
      itemslistapplication: [],
      guid_v4: uuid.v4(),
      selectedtemplateID: '',
      selectednameTemplate: null,
      template: [],
      pdfFile: null,
      showFilePDF: false,
      Selected: null,
      showCreteSimulasiForm: false,
      InvoiceSubmissionNotes: '',
      verification_is_approved: '',
      verification_date_time: '',
      appeal_submission_note: '',
      verification_employee_full_name: '',
      reviewer_notes: '',
      templateId: '',
      reviewer_employee_full_name: '',
      review_date_time: '',
      review_is_approved: '',
      isStatus: this.$route.params.status,
    }
  },
  directives: {
    Ripple,
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  created() {
    this.getSPPPooling()
    this.getDetailPooling()
    this.getPoolingApplicationList()
    this.getTemplate()
  },
  methods: {
    convDate(dateconv) {
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY')
    },
    selectedtemplateInput(value) {
      this.selectedtemplateID = value.id
      this.selectednameTemplate = value.name
      return true
    },
    preview() {
      this.pdfFile = null
      this.$bvModal.show('modalPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
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
          const errorMessage = `Gagal mengunduh data tamplete. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    onPreview(templateId) {
      this.pdfFile = null
      this.$bvModal.show('modalOnPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: templateId,
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
          const errorMessage = `Gagal mengunduh data tamplete. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
      // if (!this.selectednameTemplate) {
      //   const errorMessage = 'Silakan pilih template !'
      //   this.$toast({
      //     component: ToastificationContent,
      //     props: {
      //       title: errorMessage,
      //       icon: 'WarningIcon',
      //       variant: 'warning',
      //     },
      //   })
      // } else {
      // }
    },
    async download(value) {
      // console.log(value, 'value')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.hkppooling.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: value,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // console.log(result, 'hasil download')
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data surat review. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async downloadreview(value) {
      // console.log(value, 'value')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.hkppoolingsubmission.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: value,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          // console.log(result, 'hasil download')
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data surat review. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async getSPPPooling() {
      await axios({
        url: URLServices.pooling_billing_parameter.calculate,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          pooling_id: this.id_pooling,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.items2 = data
          const { data2 } = response.data
          this.items3 = data2
          // console.log(this.items3, 'items3')
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getDetailPooling() {
      await axios({
        url: URLServices.hkppooling.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          id: this.id_pooling,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataAppeal = response.data.data
          // console.log(this.dataAppeal, 'detail pooling')
          this.Poolingid = this.dataAppeal.id
          this.appeal_due_date = this.dataAppeal.appeal_due_date
          this.appeal_leter_publish_date = this.dataAppeal.appeal_leter_publish_date
          this.appeal_letter_number = this.dataAppeal.appeal_letter_number
          this.appeal_notes = this.dataAppeal.appeal_notes
          this.verification_is_approved = this.dataAppeal.verification_is_approved
          this.verification_employee_full_name = this.dataAppeal.verification_employee_full_name
          this.verification_date_time = this.dataAppeal.verification_date_time
          this.pooling_submission_id = this.dataAppeal.pooling_submission_id
          this.appeal_submission_note = this.dataAppeal.verification_notes
          this.review_is_approved = this.dataAppeal.review_is_approved
          this.reviewer_employee_full_name = this.dataAppeal.reviewer_employee_full_name
          this.review_date_time = this.dataAppeal.review_date_time
          this.reviewer_notes = this.dataAppeal.reviewer_notes
          this.reviewer_letter_number = this.dataAppeal.review_letter_number
          this.templateId = this.dataAppeal.template_id
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'session-time-out' })
          // }
        })
    },
    async getPoolingApplicationList() {
      await axios({
        url: URLServices.hkppoolingappealsubmission.get_pooling_application_list,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          pooling_id: this.id_pooling,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.itemslistapplication = data
          // console.log(this.itemslistapplication, 'getPoolingApplicationList')
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail permohonan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          // if (error.response.status && error.response.status === 401) {
          //   localStorage.removeItem('accessToken')
          //   localStorage.removeItem('userData')
          //   this.$router.go({ name: 'session-time-out' })
          // }
        })
    },
    async getTemplate() {
      this.showPosisi = true
      await axios({
        url: URLServices.template.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          page: 1,
          length: 100,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.template = response.data.data
          // console.log(this.template, 'response tem')
          this.showPosisi = false
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data template. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    createRequestVariable() {
      const data = {}
      data.id = this.idappealpooling
      data.is_approved = this.Selected
      data.reviewer_notes = this.appeal_submission_note
      data.template_id = this.selectedtemplateID
      data.pooling_appeal_submission_id = this.$route.params.idappealpooling

      return data
    },
    createRequestUrl(selected) {
      let url = ''

      if (selected === '1') {
        url = URLServices.hkppoolingappealsubmission.approve
      } else if (selected === '0') {
        url = URLServices.hkppoolingappealsubmission.reject
      }
      return url
    },
    async save() {
      // const token = localStorage.getItem('accessToken')
      this.showCreteSimulasiForm = true
      const Param = this.createRequestVariable()
      // console.log(Param, 'Param save')
      const Url = this.createRequestUrl(Param.is_approved)
      if (Param !== false) {
        await axios({
          url: Url,
          method: 'post',
          data: {
            request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
            request_id: this.guid_v4,
            data: Param,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
            const responseMessage = `Berhasil melakukan review pooling. [${result.data.response_message}]`
            CustomNotification.notif('success', 'Berhasil', responseMessage)
              this.$router.push({ name: 'review-pooling' })
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
