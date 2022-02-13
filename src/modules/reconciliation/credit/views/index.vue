<template>
  <div>
    <b-card class="mb-4">
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
              >
              </date-picker>
            </div>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button
            variant="primary"
            @click="getDataTable"
          >
            <feather-icon icon="Icon" /> Tampilkan
            </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button variant="primary" @click="download()">
          <feather-icon icon="DownloadIcon" /> Download
        </b-button>
        <b-button variant="light" @click="seen = !seen" v-if="showTable">
          <feather-icon icon="SearchIcon" /> Cari
        </b-button>
        <!-- <b-button variant="light" @click="tableRefresh()">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button> -->
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-card no-body responsive>
          <b-tabs card>
            <b-tab title="Rekap" active>
              <!-- v-if="showTable" -->
              <b-row>
                <b-col>
                  <div class="d-flex justify-content-between flex-wrap" v-if="seen">
                  <!-- filter -->
                    <b-card class="card bg-white m-0 p-1 col-12 mb-2">
                      <b-input-group>
                        <b-form-input
                          id="filterInput"
                          v-model="filter"
                          type="search"
                          placeholder="Ketik kata yang anda cari ..."
                          autocomplete="off"
                        />
                          <b-input-group-append>
                            <b-button
                              :disabled="!filter"
                              @click="filter = ''; getDataTable()"
                              class="btn btn-danger"
                            >
                              Reset
                            </b-button>
                          </b-input-group-append>
                      </b-input-group>
                    </b-card>
                  </div>
                </b-col>

                <b-col cols="12">
                  <b-card no-body class="p-0">
                    <div>
                      <b-table-simple hover small caption-top responsive>
                        <caption>REKONSILIASI PIUTANG BHP FREKUENSI RADIO (LAPORAN vs SIMS) pada tahun {{ this.year }}:</caption>
                        <colgroup><col><col></colgroup>
                        <colgroup><col><col><col></colgroup>
                        <colgroup><col><col></colgroup>
                        <b-thead head-variant="light">
                          <b-tr>
                            <b-th colspan="4" class="center" style="vertical-align:middle">NILAI PIUTANG tahun {{ this.year }}</b-th>
                            <b-th rowspan="2" class="center" style="vertical-align:middle">KETERANGAN</b-th>
                            <b-th rowspan="2" class="center" style="vertical-align:middle">TINDAK LANJUT</b-th>
                            <b-th rowspan="2" class="center" style="vertical-align:middle">PIC</b-th>
                          </b-tr>
                          <b-tr>
                            <b-th class="center">SIMS</b-th>
                            <b-th class="center">LAPORAN</b-th>
                            <b-th class="center">SELISIH</b-th>
                            <b-th class="center">RINCIAN SELISIH</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody>
                          <b-tr>
                            <b-th variant="warning" class="center">a</b-th>
                            <b-th variant="warning" class="center">b</b-th>
                            <b-th variant="warning" class="center">c=a-b</b-th>
                            <b-th variant="warning" class="center">d</b-th>
                            <b-th variant="warning" class="center">e</b-th>
                            <b-th variant="warning" class="center">f</b-th>
                            <b-th variant="warning" class="center">h</b-th>
                          </b-tr>
                          <b-tr>
                            <b-td rowspan="3" class="text-right" style="width:200px">
                               <!-- 2,200,326,098 -->
                              <!-- <b-input-group prepend="Rp."> -->
                                <label for="sims">{{ Number(simsValue).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</label>
                                <!-- <b-form-input
                                  id="sims"
                                  type="number"
                                  class="font-weight text-right"
                                  v-model="simsValue"
                                  readonly
                                /> -->
                              <!-- </b-input-group> -->
                            </b-td>
                            <b-td rowspan="3" class="text-right" style="width:200px">
                               <!-- 2,198,099,561 -->
                              <!-- <b-input-group prepend="Rp."> -->
                                <b-form-input
                                  id="laporan"
                                  type="number"
                                  class="font-weight text-right"
                                  v-model="reportValue"
                                  @input="changeValue"
                                />
                              <!-- </b-input-group> -->
                              <label for="sims">{{ Number(reportValue).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</label>
                            </b-td>
                            <b-td rowspan="3" class="text-right">{{ Number(sumTotal).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b-td>
                            <b-td class="text-right">{{ Number(this.totalSppTidakValid).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b-td>
                            <b-td>Invoice Tidak Valid</b-td>
                            <b-td>- Cancel Invoice Reminder, - Cancel Aplikasi</b-td>
                            <b-td>- Subdit SIMS, - Subdit BHP</b-td>
                          </b-tr>
                          <b-tr>
                            <b-td class="text-right">{{ Number(totalSppPenghapusan).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b-td>
                            <b-td>Invoice Penghapusan</b-td>
                            <b-td>- Cancel Invoice</b-td>
                            <b-td>- Subdit SIMS, - Subdit BHP</b-td>
                          </b-tr>
                          <b-tr>
                            <b-td class="text-right">{{ Number(this.totalSppSudahDibayar).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b-td>
                            <b-td>Invoice Sudah Dibayar</b-td>
                            <b-td>Melakukan payment di SIMS</b-td>
                            <b-td>- Subdit BHP</b-td>
                          </b-tr>
                        </b-tbody>
                        <b-tfoot>
                          <b-tr>
                            <b-td></b-td>
                            <b-td></b-td>
                            <b-th variant="secondary">TOTAL</b-th>
                            <b-td variant="secondary" class="text-right">
                              <b>{{ Number(sumTotal).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</b>
                            </b-td>
                          </b-tr>
                        </b-tfoot>
                      </b-table-simple>
                    </div>
                  </b-card>
                </b-col>
              </b-row>
              <!-- v-else -->
              <!-- <b-row>
                <b-col>
                  <b-card>
                    <h5 class="text-center">
                      Data tidak ditemukan
                    </h5>
                  </b-card>
                </b-col>
              </b-row> -->
            </b-tab>
            <b-tab title="Invoice Tidak Valid">
              <!-- v-if="showTable" -->
              <b-row>
                <b-col>
                  <div class="d-flex justify-content-between flex-wrap" v-if="seen">
                  <!-- filter -->
                    <b-card class="card bg-white m-0 p-1 col-12 mb-2">
                      <b-input-group>
                        <b-form-input
                          id="filterInput"
                          v-model="filter"
                          type="search"
                          placeholder="Ketik kata yang anda cari ..."
                          autocomplete="off"
                        />
                          <b-input-group-append>
                            <b-button
                              :disabled="!filter"
                              @click="filter = ''; getDataTable()"
                              class="btn btn-danger"
                            >
                              Reset
                            </b-button>
                          </b-input-group-append>
                      </b-input-group>
                    </b-card>
                  </div>
                </b-col>

                <b-col cols="12">
                  <b-card no-body class="p-0">
                    <b-table
                      id="tableData"
                      striped
                      hover
                      responsive
                      class="position-relative shadow mb-0"
                      :busy="isBusy"
                      :per-page="perPage"
                      :items="itemsSppTidakValid"
                      :fields="fieldsSppTidakValid"
                      :current-page="currentPage"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :sort-direction="sortDirection"
                      :filter="filter"
                      :filter-included-fields="filterOn"
                      @filtered="onFiltered"
                    >
                      <template #table-busy>
                        <div class="text-center text-primary my-2">
                          <b-spinner class="align-middle"></b-spinner>
                          <strong> Mohon tunggu ...</strong>
                        </div>
                      </template>
                      <template #cell(no)="data">
                        {{ perPage * (currentPage - 1) + data.index + 1 }}
                      </template>
                      <template #cell(invoice_publish_date)="data">
                        {{ convDate(data.item.invoice_publish_date) }}
                      </template>
                      <template #cell(debet)="data">
                        {{ Number(data.item.debet).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </template>
                      <template #cell(credit)="data">
                        {{ Number(data.item.credit).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </template>
                      <!-- <template #cell(action)="data">
                        <b-button
                          variant="light"
                          btn-sm
                          class="btn-sm text-primary"
                          @click="detail(data.item.action)"
                        >
                          <feather-icon icon="ZoomInIcon" size="16" />
                        </b-button>
                      </template> -->
                    </b-table>
                  </b-card>
                </b-col>
                <b-col cols="12">
                  <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
                    <!-- page length -->
                    <b-form-group
                      label="Per hal"
                      label-align="left"
                      label-for="sortBySelect"
                      class="text-nowrap mb-md-0 mr-0 form-inline"
                    >
                      <b-form-select
                        id="perPageSelect"
                        v-model="perPage"
                        size="sm"
                        inline
                        :options="pageOptions"
                        @change="handlePageSizeChange($event)"
                      />
                    </b-form-group>
                    <!-- pagination -->
                    <div>
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="rowsSppTidakValid"
                        :per-page="perPage"
                        :current-page="currentPage"
                        first-number
                        last-number
                        prev-class="prev-item"
                        next-class="next-item"
                        class="mb-0"
                        @change="handlePageChange"
                      >
                        <template #prev-text>
                          <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                          <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                      </b-pagination>
                    </div>
                  </b-card-body>
                </b-col>
              </b-row>
              <!-- v-else -->
              <!-- <b-row>
                <b-col>
                  <b-card>
                    <h5 class="text-center">
                      Data tidak ditemukan
                    </h5>
                  </b-card>
                </b-col>
              </b-row> -->
            </b-tab>
            <b-tab title="Invoice Penghapusan">
              <!-- v-if="showTable" -->
              <b-row>
                <b-col>
                  <div class="d-flex justify-content-between flex-wrap" v-if="seen">
                    <!-- filter -->
                    <b-card class="card bg-white m-0 p-1 col-12 mb-2">
                      <b-input-group>
                        <b-form-input
                          id="filterInput"
                          v-model="filter"
                          type="search"
                          placeholder="Ketik kata yang anda cari ..."
                          autocomplete="off"
                        />
                        <b-input-group-append>
                          <b-button
                            :disabled="!filter"
                            @click="filter = ''; getDataTable()"
                            class="btn btn-danger"
                          >
                            Reset
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-card>
                  </div>
                </b-col>

                <b-col cols="12">
                  <b-card no-body class="p-0">
                    <b-table
                      id="tableData"
                      striped
                      hover
                      responsive
                      class="position-relative shadow mb-0"
                      :busy="isBusy"
                      :per-page="perPage"
                      :items="itemsSppPenghapusan"
                      :fields="fieldsSppPenghapusan"
                      :current-page="currentPage"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :sort-direction="sortDirection"
                      :filter="filter"
                      :filter-included-fields="filterOn"
                      @filtered="onFiltered"
                    >
                      <template #table-busy>
                        <div class="text-center text-primary my-2">
                          <b-spinner class="align-middle"></b-spinner>
                          <strong> Mohon tunggu ...</strong>
                        </div>
                      </template>
                      <template #cell(no)="data">
                        {{ perPage * (currentPage - 1) + data.index + 1 }}
                      </template>
                      <template #cell(invoice_publish_date)="data">
                        {{ convDate(data.item.invoice_publish_date) }}
                      </template>
                      <template #cell(debet)="data">
                        {{ Number(data.item.debet).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </template>
                      <template #cell(credit)="data">
                        {{ Number(data.item.credit).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </template>
                      <!-- <template #cell(action)="data">
                        <b-button
                          variant="light"
                          btn-sm
                          class="btn-sm text-primary"
                          @click="detail(data.item.action)"
                        >
                          <feather-icon icon="ZoomInIcon" size="16" />
                        </b-button>
                      </template> -->
                    </b-table>
                  </b-card>
                </b-col>
                <b-col cols="12">
                  <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
                    <!-- page length -->
                    <b-form-group
                      label="Per hal"
                      label-align="left"
                      label-for="sortBySelect"
                      class="text-nowrap mb-md-0 mr-0 form-inline"
                    >
                      <b-form-select
                        id="perPageSelect"
                        v-model="perPage"
                        size="sm"
                        inline
                        :options="pageOptions"
                        @change="handlePageSizeChange($event)"
                      />
                    </b-form-group>
                    <!-- pagination -->
                    <div>
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="rowsSppPenghapusan"
                        :per-page="perPage"
                        :current-page="currentPage"
                        first-number
                        last-number
                        prev-class="prev-item"
                        next-class="next-item"
                        class="mb-0"
                        @change="handlePageChange"
                      >
                        <template #prev-text>
                          <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                          <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                      </b-pagination>
                    </div>
                  </b-card-body>
                </b-col>
              </b-row>
              <!-- v-else -->
              <!-- <b-row>
                <b-col>
                  <b-card>
                    <h5 class="text-center">
                      Data tidak ditemukan
                    </h5>
                  </b-card>
                </b-col>
              </b-row> -->
            </b-tab>
            <b-tab title="Invoice Sudah dibayar">
              <!-- v-if="showTableSppSudahDibayar" -->
              <b-row>
                <b-col>
                  <div class="d-flex justify-content-between flex-wrap" v-if="seen">
                    <!-- filter -->
                    <b-card class="card bg-white m-0 p-1 col-12 mb-2">
                      <b-input-group>
                        <b-form-input
                          id="filterInput"
                          v-model="filter"
                          type="search"
                          placeholder="Ketik kata yang anda cari ..."
                          autocomplete="off"
                        />
                        <b-input-group-append>
                          <b-button
                            :disabled="!filter"
                            @click="filter = ''; getDataTable()"
                            class="btn btn-danger"
                          >
                            Reset
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-card>
                  </div>
                </b-col>

                <b-col cols="12">
                  <b-card no-body class="p-0">
                    <b-table
                      id="tableData"
                      striped
                      hover
                      responsive
                      class="position-relative shadow mb-0"
                      :busy="isBusySppSudahDibayar"
                      :per-page="perPage"
                      :items="itemsSppSudahDibayar"
                      :fields="fieldsSppSudahDibayar"
                      :current-page="currentPage"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :sort-direction="sortDirection"
                      :filter="filter"
                      :filter-included-fields="filterOn"
                      @filtered="onFiltered"
                    >
                      <template #table-busy>
                        <div class="text-center text-primary my-2">
                          <b-spinner class="align-middle"></b-spinner>
                          <strong> Mohon tunggu ...</strong>
                        </div>
                      </template>
                      <template #cell(no)="data">
                        {{ perPage * (currentPage - 1) + data.index + 1 }}
                      </template>
                      <template #cell(invoice_publish_date)="data">
                        {{ convDate(data.item.invoice_publish_date) }}
                      </template>
                      <template #cell(debet)="data">
                        {{ Number(data.item.debet).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </template>
                      <template #cell(credit)="data">
                        {{ Number(data.item.credit).toLocaleString('in-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                      </template>
                      <!-- <template #cell(action)="data">
                        <b-button
                          variant="light"
                          btn-sm
                          class="btn-sm text-primary"
                          @click="detail(data.item.action)"
                        >
                          <feather-icon icon="ZoomInIcon" size="16" />
                        </b-button>
                      </template> -->
                    </b-table>
                  </b-card>
                </b-col>
                <b-col cols="12">
                  <b-card-body class="d-flex justify-content-between flex-wrap pt-0">
                    <!-- page length -->
                    <b-form-group
                      label="Per hal"
                      label-align="left"
                      label-for="sortBySelect"
                      class="text-nowrap mb-md-0 mr-0 form-inline"
                    >
                      <b-form-select
                        id="perPageSelect"
                        v-model="perPage"
                        size="sm"
                        inline
                        :options="pageOptions"
                        @change="handlePageSizeChange($event)"
                      />
                    </b-form-group>
                    <!-- pagination -->
                    <div>
                      <b-pagination
                        aria-controls="tableData"
                        v-model="currentPage"
                        :total-rows="rowsSppSudahDibayar"
                        :per-page="perPage"
                        :current-page="currentPage"
                        last-number
                        prev-class="prev-item"
                        next-class="next-item"
                        class="mb-0"
                        @change="handlePageChange"
                      >
                      first-number
                        <template #prev-text>
                          <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                          <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                      </b-pagination>
                      <p class="mt-3">Current Page: {{ currentPage }}</p>
                    </div>
                  </b-card-body>
                </b-col>
              </b-row>
              <!-- v-else -->
              <!-- <b-row>
                <b-col>
                  <b-card>
                    <h5 class="text-center">
                      Data tidak ditemukan
                    </h5>
                  </b-card>
                </b-col>
              </b-row> -->
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal -->
    <b-modal
      id="modalDetail"
      ref="modal"
      size="lg"
      :title="this.title.detail"
      modal-class="modal-primary"
      ok-title="Tutup"
      ok-only
      @ok="resetModalDetail"
      @hidden="resetModalDetail"
    >

      <div class="p-1 text-center" v-show="!getDetailUserSuccessed">
        <b-spinner class="align-middle mr-1"></b-spinner>Mohon tunggu ...
      </div>

      <div v-show="getDetailUserSuccessed">
        <b-card-text>
          <h5 class="text-primary mt-2">BIODATA USER</h5>
        </b-card-text>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="NIK" label-for="nik">
              <b-form-input
                id="nik"
                plaintext
                :value="detailUser.nik"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Nama Lengkap"
              label-for="full_name"
            >
              <b-form-input
                id="full_name"
                plaintext
                :value="detailUser.full_name"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Tgl. Lahir"
              label-for="date_of_birth"
            >
              <b-form-input
                id="date_of_birth"
                plaintext
                :value="convDate(detailUser.date_of_birth)"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="Jenis Kelamin"
              label-for="gender"
            >
              <b-form-input
                id="gender"
                plaintext
                :value="convSexCode(detailUser.gender)"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" sm="12">
            <b-form-group label-cols="4" label="Email" label-for="email">
              <b-form-input
                id="email"
                plaintext
                :value="detailUser.email"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" sm="12">
            <b-form-group
              label-cols="4"
              label="No. Telepon"
              label-for="phone_number"
            >
              <b-form-input
                id="phone_number"
                plaintext
                :value="detailUser.phone_number"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" sm="12">
            <b-form-group label-cols="2" label="Alamat" label-for="address">
              <b-form-input
                id="address"
                plaintext
                :value="detailUser.address"
                class="font-weight-bold"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <hr />
        <h5 class="text-primary mt-2">LOGIN</h5>
        <div v-for="(val, id) in detailUser.login" :key="id">
          <b-row>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Username"
                label-for="username"
              >
                <b-form-input
                  id="username"
                  plaintext
                  :value="val.username"
                  class="font-weight-bold"
                />
              </b-form-group>
            </b-col>
            <b-col lg="6" sm="12">
              <b-form-group
                label-cols="4"
                label="Email"
                label-for="email-login"
              >
                <b-form-input
                  id="email-login"
                  plaintext
                  :value="val.email"
                  class="font-weight-bold"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <hr />
        <h5 class="text-primary mt-2">POSISI</h5>
        <div v-if="items">
          <b-card-text>
            Menampilkan daftar posisi user
          </b-card-text>
          <b-row>
            <b-col>
              <b-table
                id="tablePosisi"
                striped
                hover
                responsive
                :items="detailUser.positions"
                :fields="fieldsDetail"
                class="position-relative shadow mb-0"
              >
                <template #cell(start_date)="data">
                  {{ convDate(data.item.start_date) }}
                </template>
                <template #cell(end_date)="data">
                  {{ convDate(data.item.end_date) }}
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>
        <div v-else class="my-2 text-center">
          Tidak ditemukan
        </div>
      </div>
    </b-modal>

    <!-- Modal Delete -->
    <b-modal
      id="modalDelete"
      ref="modal"
      :title="this.title.delete"
      modal-class="modal-primary"
      ok-title="Hapus User"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="deleteUser"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Mohon isikan alasan anda menghapus user ini"
          label-for="deleteReason"
          invalid-feedback="Mohon isikan alasan anda"
          :state="nameState"
        >
          <b-form-textarea
            id="deleteReason"
            v-model="deleteReason"
            :state="nameState"
            required
            maxlength="100"
            minlength="10"
            placeholder="Maksimal 100 karakter"
          ></b-form-textarea>
        </b-form-group>
        <b-alert variant="warning" show class="p-1">
          <small>
            <feather-icon icon="InfoIcon"></feather-icon> User yang telah dihapus tidak dapat dikembalikan. Klik tombol Hapus User untuk melanjutkan
          </small>
        </b-alert>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BTable,
  // BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardBody,
  BCard,
  BSpinner,
  BModal,
  BCardText,
  BFormTextarea,
  BAlert,
  // BFormDatepicker,
  BTab,
  BTabs,
  BThead,
  BTableSimple,
  BTr,
  BTd,
  BTh,
  BTfoot,
  BTbody,
} from 'bootstrap-vue'

import moment from 'moment'
import { uuid } from 'vue-uuid'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import axios from 'axios'
import CustomNotification from '@/helpers/custom-notification'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    // BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
    BSpinner,
    BModal,
    // FeatherIcon,
    BCardText,
    BFormTextarea,
    BAlert,
    // BFormDatepicker,
    BTab,
    BTabs,
    BThead,
    DatePicker,
    BTableSimple,
    BTr,
    BTd,
    BTh,
    BTfoot,
    BTbody,
  },
  data() {
    return {
      searchTitle: '',
      isBusy: true,
      isBusySppSudahDibayar: true,
      seen: false,
      perPage: 10,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      totalRowsSppSudahDibayar: 1,
      totalRowsSppPenghapusan: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      activeFilter: null,
      filterOn: [],
      no: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fieldsRekap: [
        { key: 'field1', label: 'No.', class: 'center' },
        { key: 'field2', label: 'a', class: 'center' },
        { key: 'field3', label: 'b', class: 'center' },
        { key: 'field5', label: 'c=a-b', class: 'center' },
        { key: 'field6', label: 'd', class: 'center' },
        { key: 'field7', label: 'e', class: 'center' },
        { key: 'field8', label: 'f', class: 'center' },
        { key: 'field9', label: 'h', class: 'center' },
      ],
      fields: [],
      fieldsSppTidakValid: [
        { key: 'no', label: 'No.' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'client_spectra_id', label: 'No. Pelanggan' },
        { key: 'invoice_publish_date', label: 'Tgl. Piutang' },
        { key: 'account_receivable_type', label: 'Jenis Piutang' },
        { key: 'invoice_number', label: 'No. Invoice' },
        { key: 'application_id', label: 'No. Aplikasi' },
        { key: 'debet', label: 'Debet' },
        { key: 'credit', label: 'Kredit' },
        { key: 'description', label: 'Keterangan' },
        // { key: 'action', label: 'Aksi' },
      ],
      fieldsSppPenghapusan: [
        { key: 'no', label: 'No.' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'client_spectra_id', label: 'No. Pelanggan' },
        { key: 'invoice_publish_date', label: 'Tgl. Piutang' },
        { key: 'account_receivable_type', label: 'Jenis Piutang' },
        { key: 'invoice_number', label: 'No. Invoice' },
        { key: 'application_id', label: 'No. Aplikasi' },
        { key: 'debet', label: 'Debet' },
        { key: 'credit', label: 'Kredit' },
        { key: 'description', label: 'Keterangan' },
        // { key: 'action', label: 'Aksi' },
      ],
      fieldsSppSudahDibayar: [
        { key: 'no', label: 'No.' },
        { key: 'client_name', label: 'Pelanggan' },
        { key: 'client_spectra_id', label: 'No. Pelanggan' },
        { key: 'invoice_publish_date', label: 'Tgl. Piutang' },
        { key: 'account_receivable_type', label: 'Jenis Piutang' },
        { key: 'invoice_number', label: 'No. Invoice' },
        { key: 'application_id', label: 'No. Aplikasi' },
        { key: 'debet', label: 'Debet' },
        { key: 'credit', label: 'Kredit' },
        { key: 'description', label: 'Keterangan' },
        // { key: 'action', label: 'Aksi' },
      ],
      items: [],
      selectedUser: [],
      title: {},
      deleteReason: '',
      nameState: null,
      showTable: false,
      showTableSppSudahDibayar: false,

      // Tabel Detail Posisi per User
      detailUser: {},
      showDetailContent: false,
      fieldsDetail: [
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'official_name', label: 'Nama Resmi', sortable: true },
        { key: 'appointment_letter_number', label: 'No. SK', sortable: true },
        { key: 'start_date', label: 'Tgl. Mulai', sortable: true },
        { key: 'end_date', label: 'Tgl. Selesai', sortable: true },
      ],
      itemsDetail: [],
      getDetailUserSuccessed: false,
      showDetailUser: true,
      startDate: null,
      year: null,
      itemsSppTidakValid: [],
      itemsSppPenghapusan: [],
      itemsSppSudahDibayar: [],
      totalSppTidakValid: 0,
      totalSppPenghapusan: 0,
      totalSppSudahDibayar: 0,
      totalRincianSelisih: 0,
      reportValue: 0,
      simsValue: 0,
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    rowsSppTidakValid() {
      return this.itemsSppTidakValid.length - 1
    },
    rowsSppPenghapusan() {
      return this.itemsSppPenghapusan.length - 1
    },
    rowsSppSudahDibayar() {
      return this.itemsSppSudahDibayar.length - 1
    },
    sumTotal() {
      return this.totalSppTidakValid + this.totalSppPenghapusan + this.totalSppSudahDibayar
    },
  },
  created() {
    // this.getDataTable()
  },
  methods: {
    changeValue() {
      const a = (this.totalSppTidakValid + this.totalSppPenghapusan + this.totalSppSudahDibayar) - this.reportValue
      this.simsValue = a
    },
    async showDelete(idUser, NamaUser) {
      this.selectedIDUser = idUser
      this.title = {
        delete: `Apakah anda ingin menghapus user ${NamaUser}?`,
      }
      this.$bvModal.show('modalDelete')
    },
    convDate(date) {
      if (date !== null) {
        moment.locale('id')
        return moment(date).format('D MMMM YYYY')
      }
      return '-'
    },
    convSexCode(code) {
      if (code === ('M' || 'm')) {
        return 'laki-laki'
      }
      return 'perempuan'
    },
    async detail() {
      this.getDetailUserSuccessed = false
      this.showDetailUser = true
      this.$bvModal.show('modalDetail')
      // API REQUEST
    },
    selectingID(id) {
      this.selectedUser = this.items[id]
      this.title = {
        delete: `Menghapus user '${this.selectedUser.user_name}'`,
      }
    },
    getRequestParams(filter, currentPage, perPage) {
      const params = {}

      if (filter) {
        params.search = filter
      }

      if (currentPage) {
        params.page = currentPage
      }

      if (perPage) {
        params.length = perPage
      }

      params.request_id = uuid.v4()
      params.request_date_time = moment(new Date()).format('YYYY-MM-DD H:mm:s')
      params.reconciliation_year = this.year

      return params
    },

    async getDataTable() {
      this.showTable = true
      this.showTableSppSudahDibayar = true
      this.isBusy = true
      
      if (this.filter !== this.activeFilter) {
        this.currentPage = 1
        this.activeFilter = this.filter
      }

      const param = this.getRequestParams(
        this.filter,
        this.currentPage,
        this.perPage,
      )

      await axios({
        url: URLServices.bhp_account_receivable_reconciliation.index,
        method: 'get',
        params: param,
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.items = result.data.data
            this.itemsSppTidakValid = result.data.data.cancelled_invoices
            this.itemsSppPenghapusan = result.data.data.revoked_invoices
            this.itemsSppSudahDibayar = result.data.data.paid_invoices
            this.totalSppTidakValid = this.items.revoked_invoices_total_amount
            this.totalSppPenghapusan = this.items.cancelled_invoices_total_amount
            this.totalSppSudahDibayar = this.items.paid_invoices_total_amount
            this.showTable = result.data.totalRecords > 0 || this.filter
            this.showTableSppSudahDibayar = result.data.totalRecords > 0 || this.filter
            const successMessage = 'Berhasil memuat data rekonsiliasi piutang !'
            CustomNotification.notif('success', 'Success !', successMessage)
          } else {
            this.items = []
            this.totalRows = 0
            this.showTable = false
            this.showTableSppSudahDibayar = false
            const errorMessage = 'Gagal memuat data. Mohon ulangi beberapa saat kembali'
            CustomNotification.notif('warning', 'Error', errorMessage)
          }
          this.isBusy = false
          this.isBusySppSudahDibayar = false
        })
        .catch(error => {
          this.showTable = false
          this.showTableSppSudahDibayar = false
          this.isBusy = false
          this.isBusySppSudahDibayar = false
          const errorMessage = 'Gagal memuat data. Mohon ulangi beberapa saat kembali'
          CustomNotification.notif('danger', 'Error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }
        })
      this.isBusy = false
      this.isBusySppSudahDibayar = false
    },

    async download() {
      await axios({
        url: URLServices.bhp_account_receivable_reconciliation.download,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          reconciliation_year: this.year
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
          const errorMessage = 'Data berhasil didownload'
          CustomNotification.notif('success', 'Sukses !', errorMessage)
        })
        .catch(error => {
          const errorMessage = `Dokumen gagal didownload. Mohon ulangi beberapa saat kembali. [${error.response.status}]`
          CustomNotification.notif('error', 'Error !', errorMessage)
        })
    },

    handlePageChange(value) {
      this.currentPage = value
      // this.getDataTable()
    },

    handlePageSizeChange(value) {
      this.perPage = value
      this.currentPage = 1
      // this.getDataTable()
    },

    tableRefresh() {
      this.getDataTable()
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      this.totalRowsSppSudahDibayar = filteredItems.length
      this.totalRowsSppPenghapusan = filteredItems.length
      this.currentPage = 1
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },

    // Reset Modal
    resetModal() {
      this.name = ''
      this.nameState = null
      this.deleteReason = ''
    },
    resetModalDetail() {
      this.userData = {}
      this.getDetailUserSuccessed = false
      this.title = {
        detail: 'Detail user ...',
      }
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteUser(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }

      // API REQUEST
    },
  },
}
</script>

<style>
  .center {
    text-align: center;
    margin: auto;
  }
</style>
