const moduleRoute = [
  {
    path: '/station-module',
    name: 'station-module',
    redirect: '/stasiun',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/stasiun',
        name: 'station',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Registrasi Stasiun',
          pageTitle: 'Registrasi Stasiun',
          parentMenu: 'station',
          activeMenu: 'station',
          breadcrumb: [
            {
              text: 'Registrasi Stasiun',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_station_registration',
          auth: true,
        },
      },
      {
        path: '/registrasi_stasiun',
        name: 'station-registration',
        component: () => import('./views/internal/IndexStationRegistrationDetail.vue'),
        meta: {
          title: 'Detail Registrasi Stasiun',
          navActiveLink: 'station',
          pageTitle: 'Detail Registrasi Stasiun',
          parentMenu: 'station',
          activeMenu: 'station',
          breadcrumb: [
            {
              text: 'Registrasi Stasiun',
              to: { name: 'station' },
              active: false,
            },
            {
              text: 'Stasiun',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_station_registration_detail',
          auth: true,
        },
      },
      {
        path: '/stasiun/registrasi_stasiun/detail',
        // :btsDetailId
        name: 'station-registration-detail',
        component: () => import('./views/internal/DetailStationRegistrationDetail.vue'),
        meta: {
          title: 'Detail Registrasi Stasiun',
          navActiveLink: 'station',
          pageTitle: 'Detail Registrasi Stasiun',
          parentMenu: 'station',
          activeMenu: 'station',
          breadcrumb: [
            {
              text: 'Registrasi Stasiun',
              to: { name: 'station' },
              active: false,
            },
            {
              text: 'Stasiun',
              active: false,
              to: { name: 'station-registration' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_station_registration_detail',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/client_bts_registration',
    name: 'client-bts-registration',
    component: () => import('./views/client/index.vue'),
    meta: {
      title: 'Registrasi BTS',
      pageTitle: 'Registrasi BTS',
      parentMenu: 'station',
      activeMenu: 'station',
      breadcrumb: [
        {
          text: 'Registrasi BTS',
          active: true,
        },
      ],
      action: 'index',
      resource: 'client_bts_registration',
      auth: true,
    },
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
