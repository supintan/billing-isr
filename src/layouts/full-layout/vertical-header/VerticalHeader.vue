<template>
  <div>
    <header class="topbar">
      <b-navbar
        toggleable="lg"
        :type="`${navbarColor == 'white' ? 'light' : 'dark'}`"
        class="p-0"
        :variant="navbarColor"
      >
        <b-navbar-nav
          ><b-nav-item @click="showMobileSidebar" class="d-block d-lg-none"
            ><i class="mdi mdi-menu fs-3"></i></b-nav-item
        ></b-navbar-nav>
        <div :class="`navbar-header d-block d-lg-none`">
          <LogoDark v-if="navbarColor == 'white'" />
          <LogoLight v-else />
        </div>
        <b-navbar-toggle target="nav-collapse" class="mx-2 border-0"
          ><i class="ti-more"></i
        ></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav class="">
          <!-- -----------------------------------------------------------
            Left aligned nav items
          ----------------------------------------------------------- -->
          <b-navbar-nav>
            <!-- -----------------------------------------------------------
              Toggle Sidebar
            ----------------------------------------------------------- -->
            <b-nav-item @click="setMiniSidebar" class="d-none d-lg-block"
              ><i class="mdi mdi-menu fs-3"></i
            ></b-nav-item>

          </b-navbar-nav>

          <!-- -----------------------------------------------------------
            Right aligned nav items
          ----------------------------------------------------------- -->
          <b-navbar-nav class="ml-auto">
            <b-dropdown-text class="mr-0">
            </b-dropdown-text>
            <b-dropdown-text class="mr-0">
              <!-- Using 'button-content' slot -->
              <b-dropdown id="dropdown-left" :text="SelectedRoleName" variant="primary" :right="true">
                <b-dropdown-item
                  href="#"
                  v-for="item in RoleList"
                  :key="item.id"
                  :disabled="item.name === SelectedRoleName"
                  @click="ChangeRole(item.id)"
                >
                  {{ item.name }}
                  <span v-if="item.name === SelectedRoleName" class="font-weight-bold">
                    <feather-icon icon="CheckIcon" />
                  </span>
                </b-dropdown-item>
              </b-dropdown>
            </b-dropdown-text>
            <b-dropdown-text>
              <div class="text-right pt-2 mb-0 text-white">
                <h5 class="mb-0">
                  {{ UserName }}
                  <!-- <br/>
                  <small>102191919</small> -->
                </h5>
              </div>
            </b-dropdown-text>

            <!-- -----------------------------------------------------------
              Profile Dropdown
            ----------------------------------------------------------- -->
            <b-nav-item-dropdown right no-caret class="mailbox mr-3">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <div style="font-size: 13px;" class="pt-2">
                  <i class="fas fa-user-circle fa-2x"></i>
                </div>
              </template>
              <b-dropdown-text class="bg-primary text-white">
                <div class="d-flex align-items-center py-2">
                  <div style="font-size: 13px;" class="pt-2">
                    <i class="fas fa-user-circle fa-2x"></i>
                  </div>
                  <div class="ml-3">
                    <h4 class="mb-0">{{ UserName }}</h4>
                    <span class="font-weight-light">{{ UserRole }}</span>
                  </div>
                </div>
              </b-dropdown-text>
              <b-dropdown-item href="#" class="d-flex align-items-center" v-b-modal.modal-prevent-closing>
                <feather type="key" class="feather-sm mr-2 mb-n1"></feather>
                Ubah Password
              </b-dropdown-item>
              <b-dropdown-item href="#" class="d-flex align-items-center" @click="doLogout">
                <feather type="log-out" class="feather-sm mr-2 mb-n1"></feather>
                Keluar
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Ubah password"
      ok-title="Simpan Password"
      cancel-title="Batal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="SavePassword"
    >
      <form ref="form" @submit.stop.prevent="SavePasswordBack">
        <b-form-group
          label="Password Lama"
          label-for="password-lama"
          invalid-feedback="Anda belum mengisikan password lama"
          :state="nameState"
          class="text-primary mb-5"
        >
          <b-form-input
            type="password"
            id="password-lama"
            v-model="passwordLama"
            :state="nameState"
            required
            placeholder="Isikan password saat ini"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password Baru"
          label-for="password-baru"
          invalid-feedback="Anda belum mengisikan password baru"
          :state="nameState"
          class="text-primary"
        >
          <small class="text-dark">
            Minimal <u>8 karakter</u> dan mengandung minimal <u>1 huruf kapital</u> dan <u>1 angka</u>
          </small>
          <b-form-input
            type="password"
            id="password-baru"
            v-model="passwordBaru"
            :state="nameState"
            required
            placeholder="Masukkan password baru"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="ulangi-password-baru"
          invalid-feedback="Mohon isikan inputan diatas dengan ulangi password baru"
          :state="nameState"
        >
          <b-form-input
            type="password"
            id="ulangi-password-baru"
            v-model="UlangiPasswordBaru"
            :state="nameState"
            required
            placeholder="Ulangi masukkan password baru"
            autocomplete="off"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex"
import LogoDark from "../logo-dark/LogoDark"
import LogoLight from "../logo-light/LogoLight"
import AuthServices from "@/services/Authentification"
import Ability from '@/config/Ability'
import CustomNotification from '@/helpers/custom-notification'

export default {
  name: "vertical-header",
  data: () => ({
    UserName: '- ',
    FullName: '- ',
    UserRole: '- ',
    showToggle: false,
    href() {
      return undefined;
    },
    RoleList: [],
    statusLoadingChangeRole: false,
    selectedRole: null,
    SelectedRoleName: null,
    name: '',
    nameState: null,
    submittedNames: [],
    passwordLama: null,
    passwordBaru: null,
    UlangiPasswordBaru: null,
  }),
  components: {
    LogoDark,
    LogoLight,
  },
  computed: {
    ...mapState(["navbarColor", "logoColor", "LayoutType"]),
    getCurrentLanguage() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { lang: "flag-icon flag-icon-us" };
      else if (locale == "fr") return { lang: "flag-icon flag-icon-fr" };
      else if (locale == "ch") return { lang: "flag-icon flag-icon-ch" };
      else if (locale == "gr") return { lang: "flag-icon flag-icon-gr" };
      return this.locale;
    },
  },
  created() {
    this.getDetailUser()
    this.RoleList = JSON.parse(localStorage.getItem('userRole'))
    this.selectedRole = JSON.parse(localStorage.getItem('currentRole'))
    if (this.RoleList && this.selectedRole) this.getRoleName(this.selectedRole)
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid

      if (this.passwordBaru !== this.UlangiPasswordBaru) {
        CustomNotification.notif('warning', 'Password baru tidak sama', 'Mohon periksa kembali')
        return false
      }

      if ((this.passwordBaru && this.passwordBaru.length < 8) || (this.UlangiPasswordBaru && this.UlangiPasswordBaru.length < 8)) {
        CustomNotification.notif('warning', 'Password baru minimal 8 karakter', 'Mohon periksa kembali')
        return false
      }

      return valid
    },
    resetModal() {
      this.passwordLama = null
      this.passwordBaru = null
      this.UlangiPasswordBaru = null
      this.nameState = null
    },
    SavePassword(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.SavePasswordBack()
    },
    SavePasswordBack() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      // Push the name to submitted names
      AuthServices
      .updatePassword(this.passwordLama, this.passwordBaru)
      .then(result => {
        if (result.data.response_code === '00') {
          CustomNotification.notif('success', 'Berhasil diubah', 'Password baru akan berlaku pada login selanjutnya')
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
          })
        } else if (result.data.response_code === '99') {
          CustomNotification.notif('warning', 'Password lama tidak sesuai', 'Mohon periksa kembali')
        } else {
          CustomNotification.notif('warning', 'Gagal diubah', 'Mohon coba kembali')
        }
      })
      .catch(() => {
        CustomNotification.notif('danger', 'Password Gagal Diubah', 'Mohon refresh halaman dan coba kembali')
      })

    },
    getRoleName(idRole) {
      Object.keys(this.RoleList).forEach(key => {
        if (this.RoleList[key].id === parseInt(idRole)) this.SelectedRoleName = this.RoleList[key].name
      })
    },
    ChangeRole(idRole) {
      this.selectedRole = idRole

      CustomNotification.notif('info', 'Session akan diperbaharui', 'Halaman akan direload. Mohon tunggu ...')
      AuthServices
      .updateSessionRole(this.selectedRole)
      .then(result => {
        if (result.data.response_code === '00') {
          this.getRoleName(idRole)
          CustomNotification.notif('success', 'Berhasil', 'Session berhasil dibuat')
          localStorage.setItem('accessToken', result.data.new_token)
          localStorage.setItem('currentRole', this.selectedRole)
          Ability.update([])
          this.$router.go('/')
        } else {
          CustomNotification.notif('warning', 'Session Gagal', 'Mohon coba kembali')
        }
      })
      .catch(() => {
        CustomNotification.notif('danger', 'Session Gagal Dibuat', 'Mohon refresh halaman dan coba kembali')
      })
    },
    getDetailUser() {
      const LocalStorage = localStorage.getItem('userData')
      if (LocalStorage) {
        const Storage = JSON.parse(LocalStorage)
        this.UserName = Storage.full_name
        this.FullName = Storage.full_name
        this.UserRole = Storage.role_name
      }
    },
    doLogout() {
      AuthServices
      .logout()
      .then(result => {
        if (result.data.response_code === '00') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userData')
          localStorage.removeItem('userRole')
          localStorage.removeItem('currentRole')
          CustomNotification.notif('info', 'Session anda telah berakhir', 'Session Anda telah dihapus')
          Ability.update([])

          this.$router.push({ name: 'login' })
        } else {
          CustomNotification.notif('danger', 'Gagal logout. Mohon coba kembali', 'Mohon refresh halaman dan coba kembali')
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userData')
          localStorage.removeItem('userRole')
          localStorage.removeItem('currentRole')
          this.$router.push({ name: 'login' })
        }
      })
    },
    showMobileSidebar() {
      this.$store.commit("SET_SIDEBAR_DRAWER", true);
    },
    setMiniSidebar() {
      if (this.LayoutType == "full-sidebar") {
        this.$store.dispatch("setLayoutType", "mini-sidebar");
      } else if (this.LayoutType == "mini-sidebar") {
        this.$store.dispatch("setLayoutType", "full-sidebar");
      }
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>
