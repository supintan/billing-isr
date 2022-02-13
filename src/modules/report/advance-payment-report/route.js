const moduleRoute = [
  {
    path: '/laporan',
    name: 'report',
    redirect: 'upfront-fee-report',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/upfront-fee-report',
        name: 'upfront-fee-report',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Laporan Pembayaran Dimuka',
          pageTitle: 'Laporan Pembayaran Dimuka',
          parentMenu: 'upfront-fee-report',
          activeMenu: 'upfront-fee-report',
          breadcrumb: [
            {
              text: 'Laporan',
              active: true,
            },
            {
              text: 'Laporan Pembayaran Dimuka',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_upfront_fee_payment_report',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
