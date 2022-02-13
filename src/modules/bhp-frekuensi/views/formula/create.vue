<template>
  <b-overlay :show="showCreteUserForm" rounded="sm">
    <b-card>
      <b-form ref="form">
        <b-row class="mb-1">
          <b-col lg="7" md="7" sm="12">
            <b-form-group
              label-cols="4"
              label="Nama Formula*"
              label-for="Nama_Formula"
            >
              <b-form-input
                autocomplete="off"
                id="Nama_Formula"
                v-model="FormulaName"
                :readonly="statusReadonly"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="7" md="7" sm="12">
            <b-form-group
              label-cols="4"
              label="Tanggal Mulai*"
              label-for="tgl_mulai"
            >
              <b-form-datepicker
                id="tgl_mulai"
                v-model="StartDate"
                locale="id"
                :readonly="statusReadonly"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="7" md="7" sm="12">
            <b-form-group
              label-cols="4"
              label="Tanggal Akhir*"
              label-for="tgl_akhir"
            >
              <b-form-datepicker
                id="tgl_akhir"
                v-model="EndDate"
                locale="id"
                :readonly="statusReadonly"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1 collapse">
          <b-col lg="7" md="7" sm="12">
            <b-form-group
              label-cols="4"
              label="Lampirkan Regulasi*"
              label-for="file_regulation"
            >
              <b-form-file
                id="file_regulation"
                v-model="file"
                accept=".pdf"
                placeholder="Pilih file / tarik dan taruh file disini..."
                drop-placeholder="Tarik dan taruh file disini..."
                v-if="!statusReadonly"
              ></b-form-file>
              <div v-if="statusEdit && !statusReadonly">
                <small> Pilih file jika anda ingin mengubah
                </small>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col lg="7" md="7" sm="12">
            <b-form-group
              label-cols="4"
              label="Deskripsi*"
              label-for="deskripsi"
            >
              <b-form-textarea
                v-model="DeskripsiFormula"
                class="pt-4"
                :readonly="statusReadonly"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-card-text class="text-muted mt-3">
          Anda dapat menambahkan lebih dari 1 service
        </b-card-text>
        <div v-for="(item, index) in ServicesSubService" :key="index" ref="div">
          <b-row class="mb-1">
            <b-col lg="7" md="7" sm="12">
              <b-form-group
                label="Service"
                label-cols="4"
                label-for="id_services"
                class="my-2"
              >
                <b-overlay
                  :show="!statusShowAppServices"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                >
                  <div v-if="appServices">
                    <v-select
                      id="id_services"
                      v-model="selectedAppServices"
                      :options="appServices"
                      :reduce="appServices => appServices.id"
                      label="name"
                      placeholder="-- Pilih Service --"
                      index="id"
                      @input="selectServices"
                      :disabled="statusReadonly"
                    />
                  </div>
                  <div v-else>
                    Gagal memuat client,
                    <b-link active @click="getServices()">
                      <feather-icon icon="RefreshCwIcon" /> Muat Ulang
                    </b-link>
                  </div>
                </b-overlay>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col lg="7" md="7" sm="12">
              <b-form-group
                label="Sub Service"
                label-cols="4"
                label-for="id_services"
                class="my-2"
              >
                <b-overlay
                  :show="!statusShowAppSubServices"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                >
                  <div v-if="appServices">
                    <v-select
                      id="id_services"
                      v-model="selectedAppSubServices"
                      :options="appSubServices"
                      :reduce="appSubServices => appSubServices.id"
                      label="name"
                      placeholder="-- Pilih Sub Service --"
                      index="id"
                      @input="selectServices"
                      :disabled="statusReadonly"
                    />
                  </div>
                  <div v-else>
                    Gagal memuat client,
                    <b-link active @click="getServices()">
                      <feather-icon icon="RefreshCwIcon" /> Muat Ulang
                    </b-link>
                  </div>
                </b-overlay>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="2" class="mt-2 collapse">
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                size="sm"
                class="mr-2"
                variant="outline-danger"
                @click="removeService(index)"
                v-if="ServicesSubService.length > 1"
              >
                <feather-icon icon="TrashIcon" class="mr-25" />
              </b-button>
              <b-button
                variant="outline-primary"
                size="sm"
                @click="repeateService"
                v-if="ServicesSubService.length - 1 === index"
              >
                <feather-icon icon="PlusIcon" class="mr-25" />
              </b-button>
            </b-col>
          </b-row>
        </div>

        <h5 class="text-primary my-4">RUMUS</h5>

        <div v-if="!statusReadonly">
          <b-overlay :show="showPosisi" rounded="sm">
            <div v-for="(item, index) in Formula" :key="index" ref="div">
              <b-row>
                <b-col>
                  <b-form-group
                    label-cols-sm="3"
                    label-cols-lg="3"
                    :label="'#' + (index + 1)"
                    label-for="Operasi-1"
                  >
                    <v-select
                      id="Operasi-1"
                      v-model="Formula[index].operator_1"
                      :options="operations"
                      placeholder="-- Operasi --"
                      class="text-center"
                      @input="generateFormula(Formula[index])"
                      :readonly="statusReadonly"
                    />
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-input
                    type="number"
                    id="no_sk"
                    v-model="Formula[index].constant_1"
                    autocomplete="off"
                    placeholder="0"
                    class="text-center"
                    @input="generateFormula(Formula[index])"
                    :readonly="statusReadonly"
                  />
                </b-col>

                <b-col>
                  <v-select
                    id="item-posisi"
                    v-model="Formula[index].operator_2"
                    :options="operations"
                    placeholder="-- Operasi --"
                    class="text-center"
                    @input="generateFormula(Formula[index])"
                    :readonly="statusReadonly"
                  />
                </b-col>

                <b-col>
                  <v-select
                    id="item-posisi"
                    v-model="Formula[index].variable_1"
                    :options="variables"
                    placeholder="-- Variabel --"
                    @input="generateFormula(Formula[index])"
                    :readonly="statusReadonly"
                  />
                </b-col>

                <b-col>
                  <v-select
                    id="item-posisi"
                    v-model="Formula[index].operator_3"
                    :options="operations"
                    placeholder="-- Operasi --"
                    @input="generateFormula(Formula[index])"
                    :readonly="statusReadonly"
                  />
                </b-col>
                <b-col>
                  <span class="font-weight-bold text-primary">{{
                    Formula[index].formula
                  }}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="10" md="10" sm="10" class="text-right">
                  <b-button
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    size="sm"
                    variant="outline-danger"
                    @click="removeFormula(index)"
                    v-if="Formula.length !== 1"
                  >
                    <feather-icon icon="TrashIcon" class="mr-25" />
                  </b-button>
                  <b-button
                    variant="outline-primary"
                    class="ml-2"
                    size="sm"
                    @click="repeateFormula"
                  >
                    <feather-icon icon="PlusIcon" class="mr-25" />
                  </b-button>
                </b-col>
              </b-row>
              <hr />
            </div>
          </b-overlay>

          <h5 class="text-primary my-3">
            HASIL AKHIR
          </h5>
        </div>

        <b-form-textarea
          v-model="FinalFormula"
          class="text-center pt-4 font-weight-bold text-primary"
          readonly
        />

        <b-row class="mt-4">
          <b-col class="text-right">
            <b-button
              :to="{
                name: 'bhp-frekuensi-formula-detail',
                params: {
                  selectedIdFormula: this.IdBHPFrekuensi,
                },
              }"
              variant="outline-secondary"
            >
              Batal
            </b-button>
          </b-col>
          <b-col>
            <b-button
              type="submit"
              variant="success"
              class="ml-1"
              @click.prevent="save()"
            >
              Simpan
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </b-overlay>
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
  BFormFile,
  BOverlay,
  BFormTextarea,
  BForm,
  BFormDatepicker,
} from 'bootstrap-vue'
import axios from 'axios'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { uuid } from 'vue-uuid'
import { URLServices, getToken, TokenType } from '@/services/UrlConfig'
import CustomNotification from '@/helpers/custom-notification'
import DateConvertion from '@/helpers/date-convertion'

export default {
  name: 'CreateFormula',
  props: ['statusEdit', 'DataCreate', 'statusReadonly'],
  directives: {
    Ripple,
  },
  data() {
    return {
      URLSave: URLServices.isr_bhp_formula.store,
      showCreteUserForm: false,
      showPosisi: false,
      FinalResult: '',
      StartDate: null,
      EndDate: null,
      DeskripsiFormula: null,
      file: null,
      IdBHPFrekuensi: this.$route.params.selectedIdFormula,
      IdDetailFormula: this.$route.params.selectedDetailFormula,

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
      FinalFormula: '',
      nextTodoId: 2,

      FormulaName: null,

      // Services
      ServicesSubService: [
        {
          IdServices: 1,
        },
      ],
      selectServices: null,
      selectedAppServices: null,

      appServices: [],
      service_id: null,
      statusShowAppServices: true,
      selectedAppServicesName: null,

      appSubServices: [],
      selectedAppSubServices: null,
      selectedAppSubServicesName: null,
      statusShowAppSubServices: true,

      // Formula
      operations: ['(', '*', '/', '+', '-', ')'],

      // Variable
      variables: ['Ib', 'B', 'HDDP', 'Ip', 'p'],
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BFormFile,
    BFormDatepicker,
    BRow,
    BOverlay,
    vSelect,
  },
  created() {
    this.getServices()
    this.getSubServices()
    if (this.statusEdit) {
      this.URLSave = URLServices.isr_bhp_formula.update
      this.StartDate = this.DataCreate.StartDate
      this.EndDate = this.DataCreate.EndDate
      this.DeskripsiFormula = this.DataCreate.DeskripsiFormula
      this.FormulaName = this.DataCreate.FormulaName
      this.selectedAppServices = this.DataCreate.selectedAppServices
      this.selectedAppSubServices = this.DataCreate.selectedAppSubServices
      
      if (this.DataCreate.Formula && this.DataCreate.Formula.length > 0) this.Formula = this.DataCreate.Formula

      this.generateFormula(this.Formula)
    }
  },
  // watch: {
  //   Formula: {
  //     handler: 'generateFormula',
  //     deep: true,
  //   },
  // },
  methods: {
    getValueFromObject(Obj, id, value, field) {
      let returnVar = ''
      Object.keys(Obj).forEach(key => {
        if (Obj[key][id] === value) {
          returnVar = Obj[key][field]
        }
      })
      return returnVar
    },
    generateFormula(array) {
      if (array) {
        this.FinalFormula = ''
        Object.keys(this.Formula).forEach(key => {
          let tempFormula = ''

          if (this.Formula[key].operator_1)
            tempFormula += this.Formula[key].operator_1 + ' '

          if (this.Formula[key].constant_1)
            tempFormula += this.Formula[key].constant_1 + ' '

          if (this.Formula[key].operator_2)
            tempFormula += this.Formula[key].operator_2 + ' '

          if (this.Formula[key].variable_1)
            tempFormula += this.Formula[key].variable_1 + ' '

          if (this.Formula[key].operator_3)
            tempFormula += this.Formula[key].operator_3 + ' '

          this.Formula[key].formula = tempFormula
          this.FinalFormula += this.Formula[key].formula
        })
      }
    },
    generateFormulaStore() {
      let data = []
      let index = 1
      if (this.Formula) {
        Object.keys(this.Formula).forEach(key => {
          let temp = {}
          temp.sequence_number = index
          temp.operator_1 = this.Formula[key].operator_1
            ? this.Formula[key].operator_1
            : ''
          temp.constant_1 = this.Formula[key].constant_1
            ? this.Formula[key].constant_1
            : ''
          temp.operator_2 = this.Formula[key].operator_2
            ? this.Formula[key].operator_2
            : ''
          temp.variable_1 = this.Formula[key].variable_1
            ? this.Formula[key].variable_1
            : ''
          temp.operator_3 = this.Formula[key].operator_3
            ? this.Formula[key].operator_3
            : ''
          data.push(temp)
          index++
        })
      }

      return data
    },
    async getServices() {
      this.statusShowAppServices = false
      await axios({
        url: URLServices.service.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.appServices = result.data.data
          this.statusShowAppServices = true
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan Service. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    async getSubServices() {
      this.statusShowAppSubServices = false
      await axios({
        url: URLServices.service_subservice.index,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          page: 1,
          length: 1000,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          this.appSubServices = result.data.data
          this.statusShowAppSubServices = true
        })
        .catch(error => {
          const errorMessage = `Gagal mendapatkan Service. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', errorMessage)

          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'session-time-out' })
          }
        })
    },
    repeateService() {
      this.ServicesSubService.push({
        index: (this.nextTodoId += this.nextTodoId),
      })
    },
    removeService(index) {
      this.ServicesSubService.splice(index, 1)
    },
    repeateFormula() {
      this.Formula.push({
        index: (this.nextTodoId += this.nextTodoId),
      })
    },
    removeFormula(index) {
      this.Formula.splice(index, 1)
    },
    async save() {
      this.showCreteUserForm = true
      const ParamsSave = {}
      
      if (this.statusEdit) ParamsSave.bhp_formula_id = this.IdDetailFormula
      
      ParamsSave.request_id = uuid.v4()
      ParamsSave.request_date_time = DateConvertion.getTimeNow()
      ParamsSave.data = {
        bhp_formula_regulation_id: this.IdBHPFrekuensi,
        formula_name: this.FormulaName,
        validity_start_date: this.StartDate,
        validity_end_date: this.EndDate,
        service_id: this.selectedAppServices,
        subservice_id: this.selectedAppSubServices,
        formula_description: this.DeskripsiFormula,
        formula_details: this.generateFormulaStore(),
      }

      await axios({
        url: this.URLSave,
        method: 'post',
        data: ParamsSave,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.response_code === '00') {
            CustomNotification.notif(
              'success',
              'Berhasil menyimpan',
              'Halaman akan diarahkan ke index'
            )
            this.$router.push(
              { 
                name: 'bhp-frekuensi-formula-detail',
                params: {
                  selectedIdFormula: this.IdBHPFrekuensi
                }
              }
            )
          } else {
            CustomNotification.notif(
              'warning',
              'Gagal menyimpan data',
              result.data.response_message
            )
          }
          this.showCreteUserForm = false
        })
        .catch(error => {
          CustomNotification.notif(
            'danger',
            'Gagal menyimpan data',
            'Mohon coba beberapa saat kembali'
          )

          this.showCreteUserForm = false
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
