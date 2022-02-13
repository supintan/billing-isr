const moduleRoute = [
  {
    path: '/invoice-modification',
    name: 'invoice-modification',
    redirect: '/invoice-modification/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-modification/index',
        name: 'invoice-modification-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Modifikasi',
          pageTitle: 'Modifikasi',
          parentMenu: 'invoice-modification',
          activeMenu: 'invoice-modification',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Modifikasi',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      // {
      //   path: '/invoice-modification/store',
      //   name: 'store-invoice-modification',
      //   component: () => import('./views/create.vue'),
      //   meta: {
      //     title: 'Tambah Pembayaran Manual',
      //     pageTitle: 'Tambah Pembayaran Manual',
      //     parentMenu: 'manual-payment',
      //     activeMenu: 'invoice-modification-index',
      //     breadcrumb: [
      //       {
      //         text: 'SPP',
      //         active: true,
      //       },
      //       {
      //         text: 'Pembayaran Manual',
      //         active: true,
      //       },
      //       {
      //         text: 'Pembayaran',
      //         to: { name: 'invoice-modification-index' },
      //         active: false,
      //       },
      //       {
      //         text: 'Tambah',
      //         active: true,
      //       },
      //     ],
      //     action: 'store',
      //     resource: 'isr_manual_payment_submission',
      //     auth: true,
      //   },
      // },
      {
        path: '/invoice-modification/detail/:selectedPaymentID',
        name: 'detail-invoice-modification',
        component: () => import('./views/detail.vue'),
        meta: {
          title: 'Detail Modifikasi',
          pageTitle: 'Detail Modifikasi',
          parentMenu: 'invoice-modification',
          activeMenu: 'invoice-modification',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Modifikasi',
              active: false,
              to: { name: 'invoice-modification-index' }
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-modification/update/:selectedPaymentID',
        name: 'update-invoice-modification',
        component: () => import('./views/update.vue'),
        meta: {
          title: 'Ubah Modifikasi',
          pageTitle: 'Ubah Modifikasi',
          parentMenu: 'invoice-modification',
          activeMenu: 'invoice-modification',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Modifikasi',
              active: false,
              to: { name: 'invoice-modification-index' }
            },
            {
              text: 'Ubah',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
