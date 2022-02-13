<template>
  <div id="login" style="min-height: calc(100vh - 20px)" tag="section">
    <b-row class="justify-content-center no-gutters">
      <b-col lg="12" class="d-flex align-items-center">
        <b-card
          no-body
          class="w-100"
        >
          <b-row class="no-gutters" style="min-height: 100vh">
            <b-col
              lg="6"
              class="d-md-flex align-items-center justify-content-center background-login"
            >
              <div class="d-flex align-items-center">
                <div class="p-5">
                  <b-row class="justify-content-center">
                    <b-col cols="12" lg="9" xl="9">
                      <div class="text-secondary">
                        <h2 class="display-5 text-white text-shadow text-center">
                          <img src="@/assets/images/logo-sdppi.png" width="200px" /><br/> BILLING ISR
                        </h2>
                        <h4 class="display-5 font-weight-bold text-white text-center">
                          KEMENTERIAN KOMUNIKASI DAN INFORMATIKA REPUBLIK INDONESIA
                        </h4>
                        <p class="mt-4 text-white font-weight-normal">
                          Spektrum frekuensi radio merupakan sumber daya alam terbatas dan strategis serta mempunyai nilai ekonomis tinggi sehingga harus dikelola secara efektif dan efisien guna memperoleh manfaat yang optimal dengan memperhatikan kaidah hukum nasional maupun internasional.
                        </p>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-col>
            <b-col
              lg="6"
              class="d-md-flex align-items-center justify-content-center"
            >
              <div class="d-flex align-items-center w-100">
                <div class="p-5 w-100">
                  <b-row class="justify-content-center">
                    <b-col cols="12" lg="9" xl="6">
                      <h2 class="font-weight-bold mt-4">Selamat Datang</h2>
                      <h6 class="mb-4">
                        Silahkan masukkan User dan Password anda,
                      </h6>
                      <b-form @submit="CheckIfEnter">
                        <b-form-group>
                          <b-form-input
                            id="txt-username"
                            type="text"
                            placeholder="Username"
                            class="mb-3"
                            v-model="$v.form.username.$model"
                            :state="validateState('username')"
                            autocomplete="off"
                          ></b-form-input>
                          <b-form-invalid-feedback id="txt-username"
                            >Username belum diisi</b-form-invalid-feedback
                          >
                        </b-form-group>
                        <b-form-group>
                          <b-form-input
                            id="txt-pwd"
                            type="password"
                            placeholder="Password"
                            class="mb-3"
                            v-model="$v.form.pwd.$model"
                            :state="validateState('pwd')"
                            autocomplete="off"
                          ></b-form-input>
                          <b-form-invalid-feedback id="txt-pwd"
                            >Password belum diisi</b-form-invalid-feedback
                          >
                        </b-form-group>

                        <!--
                        <div class="d-flex align-items-center">
                          <div class="ml-auto">
                            <a href="javascript:void(0)" class="link"
                              >Lupa Password?</a
                            >
                          </div>
                        </div>
                        -->
                        <b-button
                          variant="primary"
                          :disabled="$v.form.$invalid || showLoadingButton"
                          size="lg"
                          block
                          class="mt-4"
                          type="submit"
                          >
                          <!-- @click="DoLogin" -->
                            <b-spinner v-if="showLoadingButton"></b-spinner>
                            <span v-if="!showLoadingButton">M A S U K</span>
                          </b-button
                        >
                      </b-form>
                      <div
                        class="mt-4 text-center"
                      >
                        <small>&copy; 2021 DIREKTORAT JENDERAL SDPPI - KEMENTERIAN KOMUNIKASI DAN INFORMATIKA RI</small>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="modal-select-role"
      ok-title="Lanjutkan"
      cancel-title="Batal Login"
      modal-class="modal-primary"
      centered
      title="Hak Akses"
      header-class="text-primary"
      @cancel="CancelLogin"
      @ok="authStep2"
    >
      <div class="d-block">
        Anda memiliki akses lebih dari 1. Mohon pilih salah satu dibawah ini:
        <b-form-select
          v-model="selected"
          :options="option"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import AuthServices from '@/services/Authentification'
import CustomNotification from '@/helpers/custom-notification'
// import { SubDirectory } from '@/services/UrlConfig'
// import Ability from '@/config/Ability'
// import FetchAbility from '@/services/Ability'

export default {
  name: "Login",
  mixins: [validationMixin],
  data: () => ({
    showLoadingButton: false,
    selected: null,
    option: [],
    showAccess: false,

    form: {
      username: "",
      pwd: "",
    },
    checkbox: false,
  }),
  computed: {},
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(4),
      },
      pwd: {
        required,
        minLength: minLength(5),
      },
    },
  },
  methods: {
    validateState(username) {
      const { $dirty, $error } = this.$v.form[username];
      return $dirty ? !$error : null;
    },
    DoLogin() {
      this.showLoadingButton = true
      AuthServices
      .login(this.form.username, this.form.pwd)
      .then(results => {
        const result = results.data
        if (result.response_code === '00') {
					localStorage.setItem('accessToken', result.data.token)
					localStorage.setItem('userData', JSON.stringify(result.data.user_details))
          localStorage.setItem('userRole', JSON.stringify(result.data.role_user))

					// Multiple Role
					if (result.data.role_user && result.data.role_user.length > 1) {
						this.selected = null
						const newOptions = []
						for (let i = 0; i < result.data.role_user.length; i += 1) {
							const newOption = {
								text: result.data.role_user[i].name,
								value: result.data.role_user[i].id,
							}
							newOptions.push(newOption)
						}

						this.option = newOptions
						this.showAccess = true
            this.$bvModal.show('modal-select-role')
					} else if (result.data.role_user.length === 1) {
						// Single Role
						this.selected = result.data.role_user[0].id
						this.authStep2()
					}
        } else {
          CustomNotification.notif('warning', 'Login Gagal', 'Periksa kembali username dan password Anda')
        }
        this.showLoadingButton = false
      })
    },
    authStep2() {
      if (!this.selected) {
        CustomNotification.notif('warning', 'Role Belum Dipilih', 'Anda wajib memilih salah satu role yang tersedia')
        return
      }

      AuthServices
      .setSessionRole(this.selected)
      .then(result => {
        if (result.data.response_code === '00') {
          localStorage.setItem('currentRole', this.selected)
          CustomNotification.notif('success', 'Login Berhasil', 'Session berhasil dibuat')
          // FetchAbility
          // .getData()
          // .then(AbilityData => {
          //   if (AbilityData) {
          //     Ability.update(AbilityData)
          //   } else {
          //     CustomNotification.notif('warning', 'Hak akses gagal dimuat', 'Disebabkan karena jaringan/session telah berakhir')
          //     Ability.update([])
          //   }
          // })

          this.$router.go('/')
        } else {
          CustomNotification.notif('warning', 'Login Gagal', 'Mohon refresh halaman dan coba kembali')
        }
      })
      .catch(() => {
        CustomNotification.notif('danger', 'Login Gagal', 'Mohon refresh halaman dan coba kembali')
        console.log(3)
      })
    },

    CancelLogin() {
      AuthServices
      .logout()
      .then(result => {
        if (result.data.response_code === '00') {
          this.form.pwd = ''
          this.form.username = ''
					localStorage.removeItem('accessToken')
					localStorage.removeItem('userData')
          CustomNotification.notif('success', 'Login Berhasil Dibatalkan', 'Session Anda telah dihapus')
        } else {
          CustomNotification.notif('warning', 'Login Gagal Dibatalkan', 'Mohon refresh halaman dan coba kembali')
        }
      })
      .catch(() => {
        CustomNotification.notif('danger', 'Login Gagal Dibatalkan', 'Mohon refresh halaman dan coba kembali')
      })
    },

    CheckIfEnter(e) {
      e.preventDefault()
      this.DoLogin()
    },
  },
};
</script>

<style>
  .background-login {
    background: url('../../assets/images/background/radio-tower-bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
  }
</style>