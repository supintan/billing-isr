<template>
  <aside
    class="left-sidebar"
    :class="
      Sidebar_drawer ? `show-sidebar bg-${SidebarColor}` : `bg-${SidebarColor}`
    "
  >
    <div :class="`bg-${logoColor} navbar-header`">
      <LogoDark v-if="logoColor == 'white'" />
      <LogoLight v-else />
      <span
        class="d-block d-lg-none close-sidebar-btn"
        @click="showMobileSidebar"
        ><i class="ti ti-close"></i
      ></span>
    </div>
    <VuePerfectScrollbar class="scrlbar">
      <div v-if="statusLoading" class="p-5">
        <b-overlay :show="true" />
      </div>
      <div v-else>
        <ul class="nav flex-column mb-0">
          <template v-for="(parent, i) in NewSidebarData">
            <!---Menu Title -->
            <li
              class="nav-item"
              :key="parent.header"
              v-if="parent.header && IdHeader.includes(parent.id)"
            >
              <div class="d-flex nav-small-cap">
                <i :class="parent.icon"></i>
                <span class="hide-text">{{ parent.header }}</span>
              </div>
            </li>
            <!---Sub Menu -->
            <li class="nav-item" :key="parent.title" v-if="parent.children">
              <a class="nav-link d-flex" v-b-toggle="'Col' + parent.id">
                <feather :type="parent.icon"></feather>
                <span class="hide-text">
                  {{ $t(parent.i18n) || parent.title }}
                </span>
                <i class="ti ti-angle-down dd-arrow ml-auto hide-text"></i>
              </a>
              <b-collapse
                :id="'Col' + parent.id"
                accordion="sidebar-accordion"
                :visible="parent.name === currentParentMenu"
              >
                <ul class="nav flex-column sub-menu">
                  <template v-for="(subroute, i) in parent.children">
                    <li 
                      :class="'nav-item ' + (currentActiveMenu === subroute.name ? 'active-menu-custom' : '')"
                      :key="i"
                    >
                      <router-link class="nav-link" :to="`${subroute.to}`">
                        <i :class="subroute.icon"></i>
                        <span class="hide-text">{{ subroute.title }}</span>
                      </router-link>
                    </li>
                  </template>
                </ul>
              </b-collapse>
            </li>
            <!---Single Menu -->
            <li
              :class="'nav-item ' + (currentActiveMenu === parent.name ? 'active-menu-custom' : '')"
              :key="i"
              v-if="!parent.children && !parent.header"
            >
              <router-link :to="`${parent.to}`" class="nav-link d-flex">
                <feather :type="parent.icon"></feather>
                <span class="hide-text">
                  {{ $t(parent.i18n) || parent.title }}
                </span>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </VuePerfectScrollbar>
  </aside>
</template>

<script>
import { BOverlay } from 'bootstrap-vue'
import LogoDark from '../logo-dark/LogoDark'
import LogoLight from '../logo-light/LogoLight'
import { mapState } from 'vuex'
import SidebarData from './SidebarData'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import FetchAbility from '@/services/Ability'
import ability from '@/config/Ability'

export default {
  name: 'VerticalSidebar',
  components: {
    LogoDark,
    LogoLight,
    VuePerfectScrollbar,
    BOverlay,
  },
  data: () => ({
      initialShow: true,
      routes: SidebarData,
      NewSidebarData: [],
      IdHeader: [],
      statusLoading: true,
  }),
  computed: {
    ...mapState(['logoColor', 'Sidebar_drawer', 'SidebarColor']),
    check() {
      return this.$router.history.current
    },
    currentParentMenu() {
      return this.$route.meta.parentMenu
    },
    currentActiveMenu() {
      return this.$route.meta.activeMenu
    },
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      this.statusLoading = true
      FetchAbility
      .getData()
      .then(data => {
        if (data) {
          ability.update(data)
          this.CalculateSideBarData()
        }
        this.statusLoading = false
      })
    },
    showMobileSidebar() {
      this.$store.commit('SET_SIDEBAR_DRAWER', false)
    },
    CalculateSideBarData() {
      this.NewSidebarData = []
      this.IdHeader = []
      let IdPrevHeader = null
      let CountMenu = 0

      Object.keys(this.routes).forEach(keyParent => {
        const menu = this.routes[keyParent]
        let ShowMenu = false

        // Data header baru
        if (menu.header) {
          this.NewSidebarData.push(menu)
          IdPrevHeader = menu.id
          CountMenu = 0
        }

        // kalkulasi child
        let CountChildren = 0
        let ChildMenu = []
        if (menu.children) {
          Object.keys(menu.children).forEach(keyChild => {
            if (
              menu.children[keyChild].action &&
              menu.children[keyChild].subject &&
              this.$can(
                menu.children[keyChild].action,
                menu.children[keyChild].subject
              )
            ) {
              CountChildren++
              ChildMenu.push(menu.children[keyChild])
            }
          })
        }

        if (!menu.header) {
          if (
            menu.action &&
            menu.subject &&
            this.$can(menu.action, menu.subject)
          ) {
            ShowMenu = true
          } else if (CountChildren > 0) {
            ShowMenu = true
          }

          if (ShowMenu) {
            if (ChildMenu && ChildMenu.length > 0) {
              menu.children = ChildMenu
            }
            this.NewSidebarData.push(menu)
            CountMenu++
          }
        }

        if (IdPrevHeader && CountMenu > 0) {
          this.IdHeader.push(IdPrevHeader)
        }
      })
    },
  },
}
</script>

<style>
.active-menu-custom {
  font-weight: bold;
  background: #0faafc;
  color: white;
}
</style>
