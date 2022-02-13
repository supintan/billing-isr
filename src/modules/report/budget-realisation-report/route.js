const moduleRoute = [
  {
    path: '/budget-realisation-report',
    name: 'report-lra',
    redirect: '/budget-realisation-report/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/budget-realisation-report/index',
        name: 'report-lra-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Laporan Realisasi Anggaran',
          pageTitle: 'Laporan Realisasi Anggaran',
          parentMenu: 'realisation-report',
          activeMenu: 'realisation-report',
          breadcrumb: [
            {
              text: 'Laporan',
              active: true,
            },
            {
              text: 'Laporan Realisasi Anggaran',
              active: true,
            },
          ],
          action: 'index_recap',
          resource: 'isr_budget_realisation_report',
          auth: true,
        },
      },
      {
        path: '/budget-realisation-report/detail',
        name: 'report-lra-detail',
        component: () => import('./views/detail.vue'),
        meta: {
          title: 'Laporan Realisasi Anggaran',
          pageTitle: 'Laporan Realisasi Anggaran',
          parentMenu: 'realisation-report',
          activeMenu: 'realisation-report',
          breadcrumb: [
            {
              text: 'Laporan',
              active: true,
            },
            {
              text: 'Laporan Realisasi Anggaran',
              active: false,
              to: {
                name: 'report-lra',
              }
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'index_recap',
          resource: 'isr_budget_realisation_report',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
