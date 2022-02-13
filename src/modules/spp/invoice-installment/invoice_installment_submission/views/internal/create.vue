<template>
  <b-overlay :show="showCreteSimulasiForm" rounded="sm">
    <div v-if="Selectedsubmission == '-'">
      <b-card>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Surat Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Aplikasi" label-cols="4">
              <b-form-input
                id="readOnlyInput"
                v-model="applicationName"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nomor SPP" label-cols="4">
              <b-form-input
                v-model="InvoiceNumber"
                id="readOnlyInput"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nilai Pokok" label-cols="4">
              <b-input-group prepend="Rp.">
                <b-form-input
                  v-model="InvoiceTotalNumber"
                  id="readOnlyInput"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nilai Denda"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  v-model="InvoiceFineNumber"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Jatuh Tempo"
              label-for="tgl_jatuh_tempo"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="InvoiceDueDate"
                id="isr_ipfr_tgl_mulai"
                locale="id"
                placeholder="YYYY-MM-DD"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Surat"
              label-for="tgl_surat"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="AppealLetterPublishDate"
                id="tgl_surat"
                locale="id"
                placeholder="YYYY-MM-DD"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Bulan Cicilan"
              label-cols="4"
            >
              <b-form-input
                v-model="NumberOfMonthsInstallment"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="File Surat Permohonan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1"
                @click="download()"
              >
                Download File
              </b-button>
            </b-form-group>
          <b-form-group
            class="mb-2"
            label="Dokumen Pendukung"
            label-for="isr_ipfr_tgl_mulai"
            label-cols="4"
          >
            <!-- <b-form-file /> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="info"
              class="ml-1"
              @click="downloadappealsubmissionZIP()"
            >
              Download Dokumen Pedukung
            </b-button>
          </b-form-group>
            <b-form-group
              class="mb-2"
              label="Catatan Permohonan"
              label-cols="4"
            >
              <b-form-textarea
                v-model="SubmissionNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card label>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">
                Verifikasi Surat Permohonan Cicilan
              </h5>
            </b-card-text>
            <b-form-group
              class="mb-2"
              label="Keputusan Verifikasi"
              label-cols="4"
            >
              <b-form-radio
                v-model="SelectedVerification"
                name="some-radio9"
                value="true"
                class="custom-control-success"
                disabled
              >
                Setuju
              </b-form-radio>
              <b-form-radio
                v-model="SelectedVerification"
                name="some-radio9"
                value="false"
                class="custom-control-danger"
                cols="4"
                disabled
              >
                Tolak
              </b-form-radio>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Surat Balasan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1"
                @click="downloadFileVerification()"
              >
              <!-- {{this.InvoiceSubmissionNotes}} -->
                Download Surat Balasan
              </b-button>
            </b-form-group>
            <!-- <b-form-group
            label-cols="4"
            label="Template SPP"
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
              hidden
            />
            <v-select
              id="item-template"
              v-model="templateId"
              box
              placeholder="-- Pilih Template --"
              label="name"
              :options="template"
              :reduce="template => template.id"
              index="id"
            /> -->
            <!-- <template v-slot:option="template">
            <span>{{ template.name }}</span>
          </template> -->
            <!-- <div class="mb-1"></div>
            <template> -->
              <!-- <b-button active v-b-modal.modalPreview @click="cek_preview_appeal(templateIdApeal)" v-if="verification_decision = true && review_status === '-'">
                Tampilkan Preview
              </b-button> -->
              <!-- <b-button active v-b-modal.modalPreview @click="preview(templateId)">
                Tampilkan Preview
              </b-button> -->
              <!-- <small
                type="button"
                style="color:blue"
                v-b-modal.modalPreview
                @click="preview"
              >
                Tampilkan preview
              </small> -->
            <!-- </template>
          </b-form-group> -->
            <b-form-group
              class="mb-2"
              label="Catatan Verifikasi"
              label-cols="4"
            >
              <b-form-textarea
                v-model="VerificationNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
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
         <!-- v-if="pdfFile" -->
        <div>
          <!-- :show="showFilePDF" -->
          <b-overlay>
            <b-card-text>
              Berikut ini adalah preview pengurangan SPP
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
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Review Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Keputusan" label-cols="4">
              <b-col>
                <b-form-radio
                  id="review_inputA"
                  v-model="Selected"
                  name="some-radio9B"
                  value="1"
                  class="custom-control-success"
                >
                  Setuju
                </b-form-radio>
              </b-col>
              <b-col>
                <b-form-radio
                  id="review_inputB"
                  v-model="Selected"
                  name="some-radio9B"
                  value="0"
                  class="custom-control-danger"
                  cols="4"
                >
                  Tolak
                </b-form-radio>
              </b-col>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nomor Surat Keputusan"
              label-cols="4"
            >
              <b-form-input
                v-model="ReviewLetterNumber"
                id="readOnlyInput"
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="File Surat Keputusan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <b-form-file
                v-model="fileUpdate[0]"
                accept=""
                placeholder="Pilih file disini..."
                drop-placeholder="Masukkan file disini..."
                @change="createBase64File"
                required
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Bulan Cicilan Disetujui"
              label-cols="4"
            >
              <b-form-input
                v-model="NumberOfMonthsInstallmentApprove"
                @change="CalculateInstallment(NumberOfMonthsInstallmentApprove)"
                required
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Catatan Review" label-cols="4">
              <b-form-textarea
                v-model="InstallmentSubmissionNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              id="tableData"
              striped
              hover
              class="position-relative bg-white"
              :items="items"
              :fields="fields"
            >
              <template #cell(month_sequence_number)="data">
                {{ data.item.month_sequence_number }}
              </template>
              <template #cell(due_date)="data">
                <b-form-datepicker
                  v-model="DataDuedate[data.index]"
                  locale="id"
                  placeholder="YYYY-MM-DD"
                />
              </template>
              <!-- <template #cell(amount_installment)="data">
                <b-form-input
                  v-model="DataAmount[data.index]"
                  :id="'Amountid' + fields.index"
                />
              </template> -->
              <template #cell(annual_installment)="data">
                <b-form-input
                  v-model="DataAnnualAmount[data.index]"
                  :id="'Amountid' + fields.index"
                />
              </template>
              <template #cell(fine_installment)="data">
                <b-form-input
                  v-model="DataFineAmount[data.index]"
                  :id="'Amountid' + fields.index"
                />
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              :to="{ name: 'review-cicilan' }"
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
    <div v-else>
      <b-card>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Surat Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Aplikasi" label-cols="4">
              <b-form-input
                id="readOnlyInput"
                v-model="applicationName"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nomor SPP" label-cols="4">
              <b-form-input
                v-model="InvoiceNumber"
                id="readOnlyInput"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Nilai Pokok" label-cols="4">
              <b-input-group prepend="Rp.">
                <!-- <b-form-input
                v-model="{{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}"
                  id="readOnlyInput"
                  class="text-right"
                  readonly
                /> -->
                <!-- <label class="form-control" readonly>{{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}</label> -->
                <!-- {{ Number(InvoiceTotalNumber).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }} -->
                <b-form-input
                  v-model="InvoiceTotalNumber"
                  id="readOnlyInput"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nilai Denda"
              label-cols="4"
            >
              <b-input-group prepend="Rp.">
                <b-form-input
                  v-model="InvoiceFineNumber"
                  class="text-right"
                  readonly
                />
              </b-input-group>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Jatuh Tempo"
              label-for="tgl_jatuh_tempo"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="InvoiceDueDate"
                id="isr_ipfr_tgl_mulai"
                locale="id"
                placeholder="YYYY-MM-DD"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Tanggal Surat"
              label-for="tgl_surat"
              label-cols="4"
            >
              <b-form-datepicker
                v-model="AppealLetterPublishDate"
                id="tgl_surat"
                locale="id"
                placeholder="YYYY-MM-DD"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Bulan Cicilan"
              label-cols="4"
            >
              <b-form-input
                v-model="NumberOfMonthsInstallment"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="File Surat Permohonan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1"
                @click="download()"
              >
                Download File
              </b-button>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Dokumen Pendukung"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1"
                @click="downloadappealsubmissionZIP()"
              >
                Download Dokumen Pedukung
              </b-button>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Catatan Permohonan"
              label-cols="4"
            >
              <b-form-textarea
                v-model="SubmissionNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card label>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">
                Verifikasi Surat Permohonan Cicilan
              </h5>
            </b-card-text>
            <b-form-group
              class="mb-2"
              label="Keputusan Verifikasi"
              label-cols="4"
            >
              <b-form-radio
                v-model="SelectedVerification"
                name="some-radio9"
                value="true"
                class="custom-control-success"
                disabled
              >
                Setuju
              </b-form-radio>
              <b-form-radio
                v-model="SelectedVerification"
                name="some-radio9"
                value="false"
                class="custom-control-danger"
                cols="4"
                disabled
              >
                Tolak
              </b-form-radio>
            </b-form-group>
            <!-- <b-form-group
              class="mb-2"
              label="File Surat Template SPP"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <b-button active @click="cek_preview(templateId)">
                Tampilkan Preview
              </b-button>
            </b-form-group>
            <b-modal
              id="modalPreviewGet"
              size="xl"
              ref="modal"
              modal-class="modal-primary"
              ok-title="Tutup"
              ok-only
            >
              <div>
                <b-overlay>
                  <b-card-text>
                    Berikut ini adalah preview pengurangan SPP GET
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
            </b-modal> --><b-form-group
              class="mb-2"
              label="Surat Balasan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1"
                @click="downloadFileVerification()"
              >
              <!-- {{this.InvoiceSubmissionNotes}} -->
                Download Surat Balasan
              </b-button>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Catatan Verifikasi"
              label-cols="4"
            >
              <b-form-textarea
                v-model="VerificationNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card>
        <b-row>
          <b-col sm="12" lg="8" md="8">
            <b-card-text>
              <h5 class="text-primary my-2">Review Permohonan Cicilan</h5>
            </b-card-text>
            <b-form-group class="mb-2" label="Keputusan" label-cols="4">
              <b-col>
                <b-form-radio
                  v-model="Selectedsubmission"
                  value="diterima"
                  class="custom-control-success"
                  disabled
                >
                  Setuju
                </b-form-radio>
              </b-col>
              <b-col>
                <b-form-radio
                  v-model="Selectedsubmission"
                  value="ditolak"
                  class="custom-control-danger"
                  cols="4"
                  disabled
                >
                  Tolak
                </b-form-radio>
              </b-col>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Nomor Surat Keputusan"
              label-cols="4"
            >
              <b-form-input
                v-model="ReviewLetterNumber"
                id="readOnlyInput"
                readonly
              />
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="File Surat Keputusan"
              label-for="isr_ipfr_tgl_mulai"
              label-cols="4"
              readonly
            >
              <!-- <b-form-file /> -->
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="info"
                class="ml-1"
                @click="downloadsubmission(SubmissionId)"
              >
                <!-- {{SubmissionId}} -->
                Download File
              </b-button>
            </b-form-group>
            <b-form-group
              class="mb-2"
              label="Jumlah Bulan Cicilan Disetujui"
              label-cols="4"
            >
              <b-form-input
                v-model="ApprovedNumberOfMonthsInstallment"
                readonly
              />
            </b-form-group>
            <b-form-group class="mb-2" label="Catatan Review" label-cols="4">
              <b-form-textarea
                v-model="ReviewNotes"
                id="textarea-rows"
                placeholder=""
                rows="3"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              id="tableData"
              striped
              hover
              class="position-relative bg-white"
              :items="itemsInvoice"
              :fields="fieldsInvoice"
            >
              <template #cell(month_sequence_number)="data">
                {{ data.item.month_sequence_number }}
              </template>
              <template #cell(approved_due_date)="data">
                {{ convDate(data.item.approved_due_date) }}
              </template>
              <!-- <template #cell(approved_total_amount)="data">
                {{
                  Number(data.item.approved_total_amount).toLocaleString(
                    'in-ID',
                    {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 5,
                    }
                  )
                }}
              </template> -->
              <template #cell(annual_amount)="data">
                {{ Number(data.item.annual_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </template>
              <template #cell(fine_amount)="data">
                {{ Number(data.item.fine_amount).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 5 }) }}
              </template>
            </b-table>
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
  BFormFile,
  BInputGroup,
  // BFormSelect,
  BTable,
  BFormTextarea,
  BFormRadio,
  BEmbed,
  BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UserManagement from '@/services/UserManagement'
import axios from 'axios'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import { uuid } from 'vue-uuid'
// import vSelect from 'vue-select'
import moment from 'moment'
// import { forEach } from 'postcss-rtl/lib/affected-props'
// import { forEach } from 'postcss-rtl/lib/affected-props'

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
    BFormTextarea,
    // BCardCode,
    // BFormSelect,
    BFormRadio,
    // vSelect,
    BEmbed,
    BCardText,
  },
  data() {
    return {
      guid_v4: uuid.v4(),
      idSubmision: this.$route.params.idSubmision,
      idInstallment: this.$route.params.idInstallment,
      detailInstallment: [],
      dataAppeal: [],
      fileUpdate: [],
      VerifikasiNotes: '',
      InstallmentId: '',
      applicationName: '',
      InvoiceNumber: '',
      InvoiceTotalNumber: '',
      InvoiceFineNumber: null,
      InvoiceDueDate: '',
      AppealLetterNumber: '',
      AppealLetterPublishDate: '',
      NumberOfMonthsInstallment: '',
      NumberOfMonthsInstallmentCaculate: this.NumberOfMonthsInstallment,
      UploadDateTime: '',
      VerificationNotes: '',
      ReviewSubmissionNotes: '',
      DueDateValue: '2020-01-01',
      AmountValue: '1000',
      NumberOfMonthsInstallmentApprove: '',
      ReviewLetterNumber: '',
      InstallmentSubmissionNotes: '',
      calculate: '',
      dataCalculate: [],
      DueDateValueArr: [],
      DataDuedate: [],
      // DataAmount: [],
      DataAnnualAmount: [],
      DataFineAmount: [],
      DataSequence: [],
      templateId: '',
      templateIdApeal: '',
      pdfFile: '',
      fields: [
        { key: 'month_sequence_number', label: 'Bulan ke' },
        { key: 'due_date', label: 'Tanggal Jatuh Tempo' },
        // { key: 'amount_installment', label: 'Nilai Cicilan Pokok' },
        { key: 'annual_installment', label: 'Nilai Cicilan Pokok' },
        { key: 'fine_installment', label: 'Nilai Cicilan Denda' },
      ],
      fieldsInvoice: [
        { key: 'month_sequence_number', label: 'Bulan ke' },
        { key: 'approved_due_date', label: 'Tanggal Jatuh Tempo' },
        // { key: 'approved_total_amount', label: 'Nilai Cicilan' },
        { key: 'annual_amount', label: 'Nilai Cicilan Pokok' },
        { key: 'fine_amount', label: 'Nilai Cicilan Denda' },
      ],
      items: [],
      itemsInvoice: [],
      showCreteSimulasiForm: false,
      Selectedsubmission: null,
      Selected: null,
      template: [],
      selectednameTemplate: null,
      ReviewNotes: '',
      ApprovedNumberOfMonthsInstallment: '',
      SelectedVerification: null,
      SubmissionNotes: '',
    }
  },
  directives: {
    Ripple,
  },
  created() {
    this.getDetailInstallment()
    this.getDetailAppeal()
    // this.GetCalculateInstallment()
    // this.getTemplate()
    this.getDetailInvoice()
    this.getDetailsubmission()
    // this.alertTrial()
  },
  methods: {
    alertTrial() {
        const succesMessage = `Data berhasil didapat.`
        CustomNotification.notif('success', 'Berhasil', succesMessage)
    },
    convDate(dateconv) {
      // console.log(dateconv)
      if (dateconv === '-') {
        return '-'
      }
      moment.locale('id')
      return moment(dateconv).format('DD MMMM YYYY')
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
          length: 10000,
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
          const errorMessage = `Gagal mendapatkan role. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showPosisi = false
        })
    },
    selectedtemplateInput(value) {
      // this.selectedApp = value.id
      this.templateId = value.id
      this.selectednameTemplate = value.name
      // this.getApplication(this.selectedApp)
      // this.preview(this.selectedtemplateID)
      // console.log(this.selectedtemplateID, 'selectedtemplateID')
      return true
    },
    async getDetailsubmission() {
      await axios({
        url: URLServices.installment_submission.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          installment_id: this.idInstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataInvoice = response.data.data
          this.SubmissionId = this.dataInvoice[0].id
          this.InvoiceSubmissionNotes = this.dataInvoice[0].submission_notes
          this.Selectedsubmission = this.dataInvoice[0].review_status
          this.ReviewLetterNumber = this.dataInvoice[0].review_letter_number
          this.ApprovedNumberOfMonthsInstallment = this.dataInvoice[0].approved_number_of_months_installment
          this.ReviewNotes = this.dataInvoice[0].review_notes
          this.templateId = this.dataInvoice[0].template_id
          console.log(this.templateId, 'log templateId')
          // this.cek_preview(this.templateId)
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
    preview(value) {
      // if (this.selectedtemplateID !== '') {
      //   this.idtem = this.selectedtemplateID
      //   console.log(this.selectedtemplateID, 'this.selectedtemplateID')
      // } else {
      //   this.idtem = this.templateId
      //   console.log(this.templateId, 'this.templateId')
      // }
      // console.log(value, 'valuer')
      this.pdfFile = null
      this.$bvModal.show('modalPreview')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
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
          if (result.data) {
            this.pdfFile = result.data.file_base64
            // console.log(this.pdfFile, 'this.pdfFile')
            this.showFilePDF = true
          }
          this.showFilePDF = false
          // const fileURL = result.data.file_base64
          // const fileLink = document.createElement('a')
          // const convert = 'data:application/pdf;base64, '
          // fileLink.href = `${convert}${fileURL}`
          // fileLink.setAttribute('download', result.data.file_name)
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplate. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', errorMessage)
        })
    },
    cek_preview(value) {
      this.pdfFile = null
      this.$bvModal.show('modalPreviewGet')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
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
          if (result.data) {
            this.pdfFile = result.data.file_base64
            // console.log(this.pdfFile, 'this.pdfFile')
            this.showFilePDF = true
          }
          this.showFilePDF = false
          // const fileURL = result.data.file_base64
          // const fileLink = document.createElement('a')
          // const convert = 'data:application/pdf;base64, '
          // fileLink.href = `${convert}${fileURL}`
          // fileLink.setAttribute('download', result.data.file_name)
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplate. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', errorMessage)
        })
    },
    cek_preview_appeal(value) {
      this.pdfFile = null
      this.$bvModal.show('modalPreviewGet')
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      axios({
        url: URLServices.template.download,
        method: 'get',
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
          if (result.data) {
            this.pdfFile = result.data.file_base64
            // console.log(this.pdfFile, 'this.pdfFile')
            this.showFilePDF = true
          }
          this.showFilePDF = false
          // const fileURL = result.data.file_base64
          // const fileLink = document.createElement('a')
          // const convert = 'data:application/pdf;base64, '
          // fileLink.href = `${convert}${fileURL}`
          // fileLink.setAttribute('download', result.data.file_name)
          // document.body.appendChild(fileLink)
          // fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data tamplate. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          this.showFilePDF = false
          CustomNotification.notif('error', errorMessage)
        })
    },
    async downloadFileVerification() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment_appeal_submission.download,
        method: 'post',
        params: {
          request_id: uuid.v4(),
          request_date_time: today,
          id: this.AppealId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('warning', 'Warning', errorMessage)
        })
    },
    async downloadappealsubmissionZIP() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment.downloadZip,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.idInstallment,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/x-zip-compressed;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('danger', 'Warning', errorMessage)
        })
    },
    async download() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: this.idInstallment,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          const fileURL = result.data.file_base64
          const fileLink = document.createElement('a')
          const convert = 'data:application/pdf;base64, '
          fileLink.href = `${convert}${fileURL}`
          fileLink.setAttribute('download', result.data.file_name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
        .catch(error => {
          const errorMessage = `Gagal mengunduh data cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
        })
    },
    async downloadsubmission(SubmissionId) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      await axios({
        url: URLServices.installment_submission.download,
        method: 'post',
        params: {
          request_id: this.guid_v4,
          request_date_time: today,
          id: SubmissionId,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
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
          CustomNotification.notif('error', errorMessage)
        })
    },
    async getDetailInvoice() {
      await axios({
        url: URLServices.installment_invoice.index,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          installment_id: this.idInstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.itemsInvoice = data
          // console.log(this.itemsInvoice, 'itemsInvoice')
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
    async getDetailInstallment() {
      await axios({
        url: URLServices.installment.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          id: this.idInstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.detailInstallment = response.data.data
          // console.log(this.detailInstallment)
          this.InstallmentId = this.detailInstallment[0].id
          this.applicationName = this.detailInstallment[0].application_name
          // console.log(this.applicationName)
          this.InvoiceNumber = this.detailInstallment[0].invoice_number
          this.InvoiceTotalNumber = InputFormat.NumberFormat(this.detailInstallment[0].invoice_total_amount)
          this.InvoiceFineNumber = InputFormat.NumberFormat(this.detailInstallment[0].invoice_fine_amount)
          this.InvoiceDueDate = this.detailInstallment[0].invoice_due_date
          this.AppealLetterNumber = this.detailInstallment[0].appeal_letter_number
          this.AppealLetterPublishDate = this.detailInstallment[0].appeal_letter_publish_date
          this.NumberOfMonthsInstallment = this.detailInstallment[0].number_of_months_installment
          this.UploadDateTime = this.detailInstallment[0].upload_date_time

          this.CalculateInstallment()
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan detail cicilan. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    getRequestParams() {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      const params = {}

      if (this.NumberOfMonthsInstallmentApprove !== '') {
        params.number_of_months_installment = this.NumberOfMonthsInstallmentApprove
      } else {
        params.number_of_months_installment = this.NumberOfMonthsInstallment
      }
      params.id = this.idInstallment
      params.request_id = this.guid_v4
      params.request_date_time = today
      // console.log(this.NumberOfMonthsInstallmentApprove)
      return params
    },
    async CalculateInstallment(NumberOfMonthsInstallmentApprove) {
      const param = this.getRequestParams(
        NumberOfMonthsInstallmentApprove,
        this.request_id,
        this.id,
        this.number_of_months_installment,
        this.request_date_time,
      )
      await axios({
        url: URLServices.installment.installment_calculate,
        method: 'POST',
        params: param,
        // params: {
        //   request_id: this.guid_v4,
        //   id: this.idInstallment,
        //   number_of_months_installment: this.NumberOfMonthsInstallment,
        //   request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        // },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          const { data } = response.data
          this.items = data
          // this.dataCalculate = response.data.data
          // console.log(this.items, 'logs items')
          this.DataDuedate.splice(0)
          // this.DataAmount.splice(0)
          this.DataAnnualAmount.splice(0)
          this.DataFineAmount.splice(0)
          Object.keys(this.items).forEach(key => {
            this.DataDuedate[key] = this.items[key].due_date
            // this.DataAmount[key] = this.items[key].amount_installment
            this.DataAnnualAmount[key] = this.items[key].annual_installment
            this.DataFineAmount[key] = this.items[key].fine_installment
          })
          this.showCreteUserForm = true
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan data kalkulasi. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
          this.showCreteUserForm = false
        })
    },
    // async GetCalculateInstallment() {
    //   // const param = this.getRequestParams(
    //   //   this.request_id,
    //   //   this.id,
    //   //   this.number_of_months_installment,
    //   //   this.request_date_time,
    //   // )
    //   await axios({
    //     url: URLServices.installment.installment_calculate,
    //     method: 'get',
    //     // params: param,
    //     params: {
    //       request_id: this.guid_v4,
    //       id: this.idInstallment,
    //       number_of_months_installment: this.NumberOfMonthsInstallment,
    //       request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
    //     },
    //     headers: {
    //       Authorization: `${TokenType} ${getToken()}`,
    //     },
    //   })
    //     .then(response => {
    //       const { data } = response.data
    //       this.items = data
    //       // this.dataCalculate = response.data.data
    //       console.log(this.items, 'logs items')
    //       Object.keys(this.items).forEach(key => {
    //         this.DataDuedate[key] = this.items[key].due_date
    //         this.DataAmount[key] = this.items[key].amount_installment
    //       })
    //     })
    //     .catch(error => {
    //       const errorMessage = `Gagal mendapatkan data kalkulasi. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
    //       CustomNotification.notif('error', errorMessage)
    //       if (error.response.status && error.response.status === 401) {
    //         localStorage.removeItem('accessToken')
    //         localStorage.removeItem('userData')
    //         this.$router.go({ name: 'session-time-out' })
    //       }
    //     })
    // },
    async getDetailAppeal() {
      await axios({
        url: URLServices.installment_appeal_submission.get,
        method: 'get',
        params: {
          request_id: this.guid_v4,
          installment_id: this.idInstallment,
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(response => {
          this.dataAppeal = response.data.data
          this.AppealId = this.dataAppeal[0].id
          this.SubmissionNotes = this.dataAppeal[0].submission_notes
          this.VerificationNotes = this.dataAppeal[0].verification_notes
          this.SelectedVerification = this.dataAppeal[0].verification_decision
          this.templateIdApeal = this.dataAppeal[0].template_id
          this.templateId = this.dataAppeal[0].template_id
          // this.cek_preview_appeal(this.templateIdApeal)
          // console.log(this.dataAppeal, 'data appeal')
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
    createBase64File(e) {
      const file = e.target.files[0]
      this.createRequestVariableFile(file)
    },
    createRequestVariableFile(file) {
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

      data.id = this.idSubmision
      data.is_approve = this.Selected
      data.review_letter_number = this.ReviewLetterNumber
      data.template_id = this.templateId

      if (this.NumberOfMonthsInstallmentApprove !== null) {
        data.approved_number_of_months_installment = this.NumberOfMonthsInstallmentApprove
      } else {
        CustomNotification.notif('warning', 'data')
      }
      data.file_base64 = this.fileLoc
      data.reviewer_notes = this.InstallmentSubmissionNotes
      return data
    },
    createRequestVariable() {
      const data = []
      // console.log(this.DataDuedate, 'log create variable')
      Object.keys(this.DataDuedate).forEach(key => {
        data[key] = {
          installment_submission_id: this.idSubmision,
          month_sequence_number: parseInt(key, 10) + 1,
          approved_due_date: this.DataDuedate[key],
          // approved_total_amount: this.DataAmount[key],
          approved_annual_amount: this.DataAnnualAmount[key],
          approved_fine_amount: this.DataFineAmount[key],
        }
      })

      return data
    },
    async save() {
      const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      this.showCreteSimulasiForm = true
      // console.log(this.DataDuedate, 'log due date save')
      const Param = this.createRequestVariableFile()
      const Params = this.createRequestVariable()
      // console.log(Param, 'result createRequestVariableFile')
      // console.log(Params, 'result createRequestVariable')
      if (Param !== false) {
        if (Param.is_approve === '1') {
          await axios({
            url: URLServices.installment_submission.approve,
            // url: URLServices.installment_invoice.store,
            method: 'post',
            data: {
              request_id: this.guid_v4,
              request_date_time: today,
              // data: Params,
              data: Param,
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
                this.saveInvoice(Params)
              } else {
                const succesMessage = `[${result.data.response_message}]`
                CustomNotification.notif('warning', 'Warning', succesMessage)}
              this.showCreteSimulasiForm = false
            })
            .catch(error => {
              const notifError = UserManagement.Handling(error)
              const succesMessage = `[${error.notifError.message}]`
              CustomNotification.notif(notifError.status, notifError.status, succesMessage)
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        } else {
          await axios({
            url: URLServices.installment_submission.reject,
            method: 'post',
            data: {
              request_id: this.guid_v4,
              request_date_time: today,
              data: Param,
            },
            headers: {
              Authorization: `${TokenType} ${getToken()}`,
            },
          })
            .then(result => {
              if (result.data.response_code === '00') {
              const succesMessage = `Berhasil mereview cicilan baru.`
              CustomNotification.notif('success', 'Berhasil', succesMessage)
                this.$router.push({ name: 'review-cicilan' })
              } else {
                const succesMessage = `[${result.data.response_message}]`
                CustomNotification.notif('warning', 'Warning', succesMessage)
                this.$router.push({ name: 'review-cicilan' })
              }
              this.showCreteUserForm = false
            })
            .catch(error => {
              const notifError = UserManagement.Handling(error)
              const succesMessage = `[${notifError.message}]`
              CustomNotification.notif(notifError.status, notifError.status, succesMessage)
              this.showCreteUserForm = false
              if (error.response.status && error.response.status === 401) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userData')
                this.$router.go({ name: 'session-time-out' })
              }
            })
        }
      }
    },
    saveInvoice(value) {
      const today = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
      this.showCreteSimulasiForm = true
      // console.log(value, 'log save uinvoice')
      if (value !== false) {
        axios({
          url: URLServices.installment_invoice.store,
          // url: URLServices.installment_submission.approve,
          method: 'post',
          // data: value,
          data: {
            request_id: this.guid_v4,
            request_date_time: today,
            data: value,
          },
          headers: {
            Authorization: `${TokenType} ${getToken()}`,
          },
        })
          .then(result => {
            if (result.data.response_code === '00') {
              const succesMessage = `Berhasil mereview cicilan baru.`
              CustomNotification.notif('success', 'Berhasil', succesMessage)
              this.$router.push({ name: 'review-cicilan' })
            } else {
              const succesMessage = `[${result.data.response_message}].`
              CustomNotification.notif('warning', 'Warning', succesMessage)
            }
            this.showCreteUserForm = false
          })
          .catch(error => {
            const notifError = UserManagement.Handling(error)
            const succesMessage = `[${notifError.message}]`
            CustomNotification.notif(notifError.status, notifError.status, succesMessage)
            this.showCreteUserForm = false
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
