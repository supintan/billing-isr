<template>
  <div>
    <h4 class="mb-5 mt-3 text-primary">
      Tabel Rekapitulasi
      <div class="float-right">
        <b-button variant="light" @click="tableRefresh()" class="text-primary">
          <feather-icon icon="RefreshCcwIcon" /> Refresh
        </b-button>
      </div>
    </h4>

    <b-row>
      <b-col>
        <div v-if="seen" class="d-flex justify-content-between flex-wrap">
          <!-- filter -->
          <b-card class="card bg-white m-0 p-1 col-12 mb-2">
            <b-input-group size="md">
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
                  class="btn btn-danger"
                  @click="filter = ''; getDataTable()"
                >
                  Reset
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-card>
        </div>
      </b-col>

      <b-col cols="12">
        <b-card no-body class="p-0 mb-4">
          <div v-if="isBusy" class="text-center">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <div v-else class="scroll">
            <table width="100%" class="text-left" border="0">
              <tbody>
                <tr>
                  <td width="20px">&nbsp;</td>
                  <td width="20px">&nbsp;</td>
                  <td width="20px">&nbsp;</td>
                  <td width="20px">&nbsp;</td>
                  <td width="*">&nbsp;</td>
                  <td width="150px">&nbsp;</td>
                  <td width="150px">&nbsp;</td>
                  <td width="150px">&nbsp;</td>
                </tr>
                <tr>
                  <td class="font-weight-bold border-bottom" width="30px">I.</td>
                  <td class="font-weight-bold border-bottom" colspan="6">LAPORAN BENDAHARA (LRA)</td>
                  <td class="font-weight-bold border-bottom">{{ convertNumber(LraBendahara) }}</td>
                </tr>
                <tr>
                  <td colspan="8">&nbsp;</td>
                </tr>
                <tr>
                  <td class="font-weight-bold border-bottom">II.</td>
                  <td class="font-weight-bold border-bottom" colspan="6">REKENING KORAN</td>
                  <td class="font-weight-bold border-bottom">{{ convertNumber(LraRekeningKoran) }}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="font-weight-bold">H2H</td>
                  <td class="font-weight-bold">NON H2H</td>
                  <td></td>
                </tr>
                <tr v-for="(data, index) in DataAkun" :key="index">
                  <td></td>
                  <td>{{ index + 1 }}.</td>
                  <td colspan="3">{{ data.nama }}</td>
                  <td class="text-right">{{ convertNumber(data.h2h) }}</td>
                  <td class="text-right">{{ convertNumber(data.non_h2h) }}</td>
                  <td></td>
                </tr>
                <!--
                <tr>
                  <td></td>
                  <td>1.</td>
                  <td colspan="3">MANDIRI</td>
                  <td class="text-right">{{ convertNumber(LraRekeningKoranMandiriH2h) }}</td>
                  <td class="text-right">{{ convertNumber(LraRekeningKoranMandiriNonH2h) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>2.</td>
                  <td colspan="3">BNI</td>
                  <td class="text-right">{{ convertNumber(LraRekeningKoranBniH2h) }}</td>
                  <td class="text-right">{{ convertNumber(LraRekeningKoranBniNonH2h) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>3.</td>
                  <td colspan="3">BRI</td>
                  <td class="text-right">{{ convertNumber(LraRekeningKoranBriH2h) }}</td>
                  <td class="text-right">{{ convertNumber(LraRekeningKoranBriNonH2h) }}</td>
                  <td></td>
                </tr>
                -->
                <tr>
                  <td colspan="8">&nbsp;</td>
                </tr>
                <tr>
                  <td class="font-weight-bold border-bottom">III.</td>
                  <td class="font-weight-bold border-bottom" colspan="6">DATA SIMS</td>
                  <td class="font-weight-bold border-bottom">{{ convertNumber(LraSims) }}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>1.</td>
                  <td colspan="3">Pembayaran Host To Host (H2H)</td>
                  <td></td>
                  <td class="text-right">{{ convertNumber(LraSimsH2h) }}</td>
                  <td></td>
                </tr>
                <!--
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">IPFR</td>
                  <td class="text-right">{{ convertNumber(LraSimsH2hIpfr) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                -->
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">ISR</td>
                  <td class="text-right">{{ convertNumber(LraSimsH2hIsr) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>2.</td>
                  <td colspan="3">Pembayaran Non Host To Host (Non H2H)</td>
                  <td></td>
                  <td class="text-right">{{ convertNumber(LraSimsNonH2h) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">Full Payment</td>
                  <td class="text-right">{{ convertNumber(LraSimsNonH2hFullPayment) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">Cicilan</td>
                  <td class="text-right">{{ convertNumber(LraSimsNonH2hFullCicilan) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>3.</td>
                  <td colspan="3">HASIL KOREKSI SALAH SETOR</td>
                  <td></td>
                  <td class="text-right">{{ convertNumber(LraSimsNonH2hHasilKoreksiSalahSetor) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">DITJEN PPI KE DITJEN SDPPI</td>
                  <td class="text-right">{{ convertNumber(LraSimsNonH2hHasilKoreksiSalahSetorPpi) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">REKENING SERTIFIKASI KE REKENING BHP</td>
                  <td class="text-right">{{ convertNumber(LraSimsNonH2hHasilKoreksiSalahSetorSertifikasi) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="8">&nbsp;</td>
                </tr>
                <tr>
                  <td class="font-weight-bold border-bottom">IV.</td>
                  <td class="font-weight-bold border-bottom" colspan="6">SELISIH</td>
                  <td class="font-weight-bold border-bottom"></td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-danger font-weight-bold">1.</td>
                  <td colspan="3" class="text-danger font-weight-bold">LAPORAN BENDAHARA - REKENING KORAN</td>
                  <td></td>
                  <td class="text-danger font-weight-bold text-right">{{ convertNumber(SelisihLapBendahara) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3">
                    <u>KETERANGAN SELISIH</u>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">Koreksi Pengembalian Double Kredit BNI Tahun 2019 (SP2D Bulan Januari 2020)</td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaKoreksi1) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">
                    <!-- 
                    <b-link to="#double-kredit">
                    </b-link>
                      <feather-icon icon="ExternalLinkIcon" />
                    -->
                      Koreksi Pengembalian Double Kredit  Tahun 2020
                  </td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaKoreksi2) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>c.</td>
                  <td colspan="2">
                    <!--
                    <b-link to="#double-kredit">
                    </b-link>
                      <feather-icon icon="ExternalLinkIcon" />
                    -->
                      Double Kredit yang didebet langsung kembali oleh Bank
                  </td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaDoubleKredit) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>d.</td>
                  <td colspan="2">Koreksi Salah Setor :</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1)</td>
                  <td>
                    <!--
                    <b-link to="#salah-setor">
                    </b-link>
                      <feather-icon icon="ExternalLinkIcon" />
                    -->
                      DITJEN PPI ke Ditjen SDPPI
                  </td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaSalahSetor1) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>2)</td>
                  <td>
                    <!--
                    <b-link to="#salah-setor">
                    </b-link>
                      <feather-icon icon="ExternalLinkIcon" />
                    -->
                      Rekening Sertifikasi ke Rekening BHP Frekrad
                  </td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaSalahSetor2) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>3)</td>
                  <td>
                    <!--
                    <b-link to="#salah-setor">
                    </b-link>
                      <feather-icon icon="ExternalLinkIcon" />
                    -->
                      DITJEN SDPPI ke DITJEN PPI
                  </td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaSalahSetor3) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>4)</td>
                  <td>
                    <!--
                    <b-link to="#salah-setor">
                    </b-link>
                      <feather-icon icon="ExternalLinkIcon" />
                    -->
                      Rekening BHP Frekrad ke Rekening Sertifikasi
                  </td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaSalahSetor4) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>e.</td>
                  <td colspan="2">Pengembalian Double Bayar</td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaPengembalianDoubleBayar) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>f.</td>
                  <td colspan="2">Debet Bank Mandiri</td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaDebetBankMandiri) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>g.</td>
                  <td colspan="2">Pembulatan</td>
                  <td class="text-right">{{ convertNumber(SelisihLapBendaharaPembulatan) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="8">&nbsp;</td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-danger font-weight-bold">2.</td>
                  <td class="text-danger font-weight-bold" colspan="3">REKENING KORAN - DATA SIMS</td>
                  <td></td>
                  <td class="text-danger font-weight-bold text-right">{{ convertNumber(RekKoranSims) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3">
                    <u>KETERANGAN SELISIH</u>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3" class="font-weight-bold">
                    Host to Host (H2H)
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">
                    <!--
                    <b-link to="#double-kredit">
                    </b-link>
                    <feather-icon icon="ExternalLinkIcon" />
                    -->
                      Double Kredit
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsH2hDoubleKredit) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">
                    <!-- 
                    <b-link to="#sisa-bayar">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Sisa Penggunaan Deposit
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsH2hSisaDeposit) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3" class="font-weight-bold">
                    Non Host to Host (Non H2H)
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">
                    <!--
                    <b-link to="#double-bayar">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Double Bayar
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsNonH2hDoubleBayar) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">Salah Setor</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1)</td>
                  <td>
                    <!--
                    <b-link to="#salah-setor">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      DITJEN SDPPI ke DITJEN PPI
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsNonH2hSalahSetor1) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>2)</td>
                  <td>
                    <!--
                    <b-link to="#salah-setor">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Rekening Sertifikasi
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsNonH2hSalahSetor2) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>c.</td>
                  <td colspan="2">
                    <!--
                    <b-link to="#sisa-bayar">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Sisa Pembayaran
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsNonH2hSisaPembayaran) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>d.</td>
                  <td colspan="2">Pencatatan hasil koreksi salah setor </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1)</td>
                  <td>
                    <!--
                    <b-link to="#non-h2h">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      DITJEN SDPPI ke DITJEN PPI
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsNonH2hPencatatanKoreksi1) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>2)</td>
                  <td>
                    <!--
                    <b-link to="#non-h2h">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Rekening Sertifikasi
                  </td>
                  <td class="text-right">{{ convertNumber(RekKoranSimsNonH2hPencatatanKoreksi2) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="8">&nbsp;</td>
                </tr>
                <tr>
                  <td></td>
                  <td class="text-danger font-weight-bold">3.</td>
                  <td class="text-danger font-weight-bold" colspan="3">LAPORAN BENDAHARA - DATA SIMS</td>
                  <td></td>
                  <td class="text-danger font-weight-bold text-right">{{ convertNumber(LaporanBendaharaSims) }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3">
                    <u>KETERANGAN SELISIH</u>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3" class="font-weight-bold">
                    Host to Host (H2H)
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">Koreksi Pengembalian Double Kredit BNI Tahun 2019 (SP2D Bulan Januari 2020)</td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsH2hKoreksi) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">
                    <!-- 
                    <b-link to="#double-kredit">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Double Kredit yang belum dikoreksi
                  </td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsH2hDoubleKredit) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>c.</td>
                  <td colspan="2">
                    <!--
                    <b-link to="#sisa-bayar">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Sisa Penggunaan Deposit
                  </td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsH2hSisaDeposit) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colspan="3" class="font-weight-bold">
                    Non Host to Host (Non H2H)
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>a.</td>
                  <td colspan="2">
                    <!--
                    <b-link to="#double-bayar">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Double Bayar yang belum direstitusi
                  </td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsNonH2hDoubleBayar) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>b.</td>
                  <td colspan="2">
                    <!-- 
                    <b-link to="#sisa-bayar">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link>
                    -->
                      Sisa Pembayaran
                  </td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsNonH2hSisaBayar) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>c.</td>
                  <td colspan="2">
                    <!-- 
                    <b-link to="#non-h2h-salah-setor">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link> -->
                      Hasil Koreksi Salah Setor yang belum dicatat di SIMS
                  </td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsNonH2hHasilKoreksi) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>d.</td>
                  <td colspan="2">
                    <!-- 
                    <b-link to="#non-h2h-salah-setor">
                      <feather-icon icon="ExternalLinkIcon" />
                    </b-link> 
                    -->
                      Sisa Pembayaran dari Hasil Koreksi Salah Setor
                  </td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsNonH2hSisaBayarHasilKoreksi) }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>e.</td>
                  <td colspan="2">Debet Bank Mandiri</td>
                  <td class="text-right">
                    {{ convertNumber(LaporanBendaharaSimsNonH2hDebetBank) }}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>f.</td>
                  <td colspan="2">Pembulatan 0.5</td>
                  <td class="text-right">{{ convertNumber(LaporanBendaharaSimsNonH2hPembulatan) }}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCard,
  BSpinner,
} from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
import CustomNotification from '@/helpers/custom-notification'
import InputFormat from '@/helpers/input-format'
import DateConvertion from '@/helpers/date-convertion'
import { URLServices, TokenType, getToken } from '@/services/UrlConfig'
import { uuid } from 'vue-uuid'

export default {
  name: 'Rekap',
  props: ['Year'],
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BSpinner,
  },
  data() {
    return {
      LraBendahara: 0,
      
      LraRekeningKoran: 0,
      LraRekeningKoranMandiriH2h: 0,
      LraRekeningKoranMandiriNonH2h: 0,
      LraRekeningKoranBniH2h: 0,
      LraRekeningKoranBniNonH2h: 0,
      LraRekeningKoranBriH2h: 0,
      LraRekeningKoranBriNonH2h: 0,

      LraSims: 0,
      LraSimsH2h: 0,
      LraSimsH2hIpfr: 0,
      LraSimsH2hIsr: 0,
      LraSimsNonH2h: 0,
      LraSimsNonH2hFullPayment: 0,
      LraSimsNonH2hFullCicilan: 0,
      LraSimsNonH2hHasilKoreksiSalahSetor: 0,
      LraSimsNonH2hHasilKoreksiSalahSetorPpi: 0,
      LraSimsNonH2hHasilKoreksiSalahSetorSertifikasi: 0,

      SelisihLapBendahara: 0,
      SelisihLapBendaharaKoreksi1: 0,
      SelisihLapBendaharaKoreksi2: 0,
      SelisihLapBendaharaDoubleKredit: 0,
      SelisihLapBendaharaSalahSetor1: 0,
      SelisihLapBendaharaSalahSetor2: 0,
      SelisihLapBendaharaSalahSetor3: 0,
      SelisihLapBendaharaSalahSetor4: 0,
      SelisihLapBendaharaPengembalianDoubleBayar: 0,
      SelisihLapBendaharaDebetBankMandiri: 0,
      SelisihLapBendaharaPembulatan: 0,

      RekKoranSims: 0,
      RekKoranSimsH2hDoubleKredit: 0,
      RekKoranSimsH2hSisaDeposit: 0,
      RekKoranSimsNonH2hDoubleBayar: 0,
      RekKoranSimsNonH2hSalahSetor1: 0,
      RekKoranSimsNonH2hSalahSetor2: 0,
      RekKoranSimsNonH2hSisaPembayaran: 0,
      RekKoranSimsNonH2hPencatatanKoreksi1: 0,
      RekKoranSimsNonH2hPencatatanKoreksi2: 0,

      LaporanBendaharaSims: 0,
      LaporanBendaharaSimsH2hKoreksi: 0,
      LaporanBendaharaSimsH2hDoubleKredit: 0,
      LaporanBendaharaSimsH2hSisaDeposit: 0,
      LaporanBendaharaSimsNonH2hDoubleBayar: 0,
      LaporanBendaharaSimsNonH2hSisaBayar: 0,
      LaporanBendaharaSimsNonH2hHasilKoreksi: 0,
      LaporanBendaharaSimsNonH2hSisaBayarHasilKoreksi: 0,
      LaporanBendaharaSimsNonH2hDebetBank: 0,
      LaporanBendaharaSimsNonH2hPembulatan: 0,

      showTable: false,
      searchTitle: '',
      isBusy: true,
      seen: false,
      perPage: 10,
      pageOptions: [10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      activeFilter: null,
      filterOn: [],
      no: 1,

      fields: [
        { key: 'no', label: 'No.' },
        { key: 'money_received', label: 'Money Received' },
        { key: 'bi_begin', label: 'BI Begin' },
        { key: 'pendapatan_lo', label: 'Pendapatan LO' },
        { key: 'action', label: 'Aksi' },
      ],
      itemss: [
        {
          no: 1,
          money_received: '2021',
          bi_begin: '2020',
          pendapatan_lo: '14.345.000.000',
        },
      ],
      items: [],
      DataAkun: [],
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  created() {
    this.getDataTable()
  },
  methods: {
    convertNumber(number) {
      return InputFormat.NumberFormat(number)
    },
    async showDelete(templateId, namaTemplate) {
      this.selectedTemplateId = templateId
      this.titleDelete = `Apakah anda ingin template ${namaTemplate}?`
      this.$bvModal.show('modalDelete')
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

      return params
    },

    async getDataTable() {
      this.showTable = true
      this.isBusy = true

      await axios({
        url: URLServices.isr_lra.index_recap,
        method: 'get',
        params: {
          request_id: uuid.v4(),
          request_date_time: DateConvertion.getTimeNow(),
          year: this.Year,
        },
        headers: {
          Authorization: `${TokenType} ${getToken()}`,
        },
      })
        .then(result => {
          if (result.data.data) {
            this.items = result.data.data
            if (this.items) {
              this.LraBendahara = 0

              // Account
              this.DataAkun = []
              if (this.items.account[0].H2H) {
                const TempDataH2H = this.items.account[0].H2H
                const TempDataNonH2H = this.items.account[1].NON_H2H
                Object.keys(TempDataH2H).forEach(key => {
                  this.DataAkun.push({
                    nama: TempDataH2H[key].BANK,
                    h2h: TempDataH2H[key].PAYMENTS,
                    non_h2h: TempDataNonH2H[key].PAYMENTS,
                  })
                })
              }
              // console.log(this.DataAkun)

              if (this.items.account[2].total_account) this.LraRekeningKoran = this.items.account[2].total_account

              // Data SIMS
              if (this.items.data_sims[0].payment_host_to_host_isr) this.LraSimsH2hIsr = this.items.data_sims[0].payment_host_to_host_isr
              if (this.items.data_sims[1].total_payment_host_to_host_isr) this.LraSimsH2h = this.items.data_sims[1].total_payment_host_to_host_isr

              if (this.items.data_sims[4].total_payment_non_host_to_host) this.LraSimsNonH2h = this.items.data_sims[4].total_payment_non_host_to_host
              if (this.items.data_sims[2].payment_non_host_to_host_full_payment) this.LraSimsNonH2hFullPayment = this.items.data_sims[2].payment_non_host_to_host_full_payment
              if (this.items.data_sims[3].payment_non_host_to_host_installment) this.LraSimsNonH2hFullCicilan = this.items.data_sims[3].payment_non_host_to_host_installment

              // Selisih
              if (this.items.data_account_sims[0].difference_H2H_deposit) this.RekKoranSimsH2hSisaDeposit = this.items.data_account_sims[0].difference_H2H_deposit

              this.LraRekeningKoranMandiriH2h = 0
              this.LraRekeningKoranMandiriNonH2h = 0
              this.LraRekeningKoranBniH2h = 0
              this.LraRekeningKoranBniNonH2h = 0
              this.LraRekeningKoranBriH2h = 0
              this.LraRekeningKoranBriNonH2h = 0
            }
            this.totalRows = result.data.totalRecords
            this.showTable = result.data.totalRecords > 0 || this.filter
          } else {
            this.items = []
            this.totalRows = 0
            this.showTable = false
          }
          this.isBusy = false
        })
        .catch(error => {
          this.showTable = false
          this.isBusy = false
          const errorMessage = 'Gagal memuat data. Mohon ulangi beberapa saat kembali'
          CustomNotification.notif('danger', 'Error', errorMessage)
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            // this.$router.go({ name: 'session-time-out' })
          }

        })
      this.isBusy = false
    },

    handlePageChange(value) {
      this.currentPage = value
      this.getDataTable()
    },

    handlePageSizeChange(value) {
      this.perPage = value
      this.currentPage = 1
      this.getDataTable()
    },

    tableRefresh() {
      this.filter = ''
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
    onFiltered() {
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
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    deleteTemplate(bvModalEvt) {
      bvModalEvt.preventDefault()
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      // API REQUEST
      axios({
        url: URLServices.template.destroy,
        data: {
          request_id: this.guidv4,
          reuqest_date_time: moment(new Date()).format('YYYY-MM-DD H:mm:s'),
          id: this.selectedTemplateId,
          notes: this.deleteReason,
        },
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then(response => {
          if (response.data.response_code === '00') {
            const notifTitle = 'Berhasil menghapus data'
            CustomNotification.notif('success', notifTitle)
            this.$bvModal.hide('modalDelete')
            this.getDataTable()
          } else {
            const errorTitle = response.data.response_message
            CustomNotification.notif('warning', errorTitle)
          }
        })
        .catch(error => {
          if (error.response.status && error.response.status === 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            this.$router.go({ name: 'login' })
          }
          const failNotif = 'Gagal menghapus. Mohon coba kembali'
          CustomNotification.notif('warning', failNotif)
        })
    },
  },
}
</script>

<style>
.border-bottom {
  border-bottom: 1px solid black;
}

.scroll {
  height: 500px;
  overflow-y: auto;
}
</style>