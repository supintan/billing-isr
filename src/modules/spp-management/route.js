const moduleRoute = [
    {
      path: '/spp-transactional',
      name: 'spp-transactional',
      redirect: '/spp/index',
      component: () => import('@/layouts/full-layout/FullLayout'),
      children: [
        {
          path: '/spp/index',
          name: 'spp-index',
          component: () => import('./views/index.vue'),
          meta: {
            title: 'Manajemen Invoice',
            pageTitle: 'Manajemen Invoice',
            parentMenu: 'management-spp',
            activeMenu: 'management-spp',
            breadcrumb: [
              {
                text: 'Invoice',
                active: true,
              },
              {
                text: 'Manajemen Invoice',
                active: true,
              },
            ],
            action: 'index',
            resource: 'isr_invoice',
          },
        },
        {
          path: '/spp/detail/:invoiceId',
          name: 'spp-detail',
          component: () => import('./views/detail.vue'),
          meta: {
            title: 'Detail SPP',
            pageTitle: 'Detail SPP',
            parentMenu: 'management-spp',
            activeMenu: 'management-spp',
            breadcrumb: [
              {
                text: 'SPP',
                active: true,
              },
              {
                text: 'Manajemen SPP',
                to: { name: 'spp-index' },
                active: false,
              },
              {
                text: 'Detail',
                active: true,
              },
            ],
            action: 'show',
            resource: 'isr_invoice',
          },
        },
        // {
        //   path: '/bhp-frekuensi-formula/edit/:selectedIdFormula',
        //   name: 'bhp-frekuensi-formula-edit',
        //   component: () => import('./views/create.vue'),
        //   meta: {
        //     title: 'Edit Formula BHP',
        //     pageTitle: 'Edit Formula BHP Frekuensi',
        //     breadcrumb: [
        //       {
        //         text: 'Formula BHP Frekuensi',
        //         active: false,
        //         to: { name: 'bhp-frekuensi-formula' },
        //       },
        //       {
        //         text: 'Edit',
        //         active: true,
        //       },
        //     ],
        //     action: 'index',
        //     resource: 'formula',
        //   },
        // },
        // {
        //   path: '/bhp-frekuensi-formula/riwayat/:selectedIdFormula',
        //   name: 'bhp-frekuensi-formula-riwayat',
        //   component: () => import('./views/history.vue'),
        //   meta: {
        //     title: 'Riwayat Perubahan Formula BHP',
        //     pageTitle: 'Riwayat Perubahan Formula BHP',
        //     breadcrumb: [
        //       {
        //         text: 'Formula BHP Frekuensi',
        //         active: false,
        //         to: { name: 'bhp-frekuensi-formula' },
        //       },
        //       {
        //         text: 'Riwayat Perubahan',
        //         active: true,
        //       },
        //     ],
        //     action: 'index',
        //     resource: 'formula',
        //   },
        // },
      ],
    },
  ]
  
  export default router => {
    router.addRoutes(moduleRoute)
  }
  