const moduleRoute = [
  {
    path: '/laporan-op',
    name: 'operational-report',
    redirect: '/laporan-operasional',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/laporan-operasional',
        name: 'operational-report',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Laporan Operasional',
          pageTitle: 'Laporan Operasional',
          parentMenu: 'lo-report',
          activeMenu: 'lo-report',
          breadcrumb: [
            {
              text: 'Laporan',
              active: true,
            },
            {
              text: 'Laporan Operasional',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_operational_report',
          auth: true,
        },
      },
      {
        path: '/laporan-operasional/detail',
        name: 'operational-report-detail',
        component: () => import('./views/detail.vue'),
        meta: {
          title: 'Detail Laporan Operasional',
          pageTitle: 'Detail Laporan Operasional',
          parentMenu: 'lo-report',
          activeMenu: 'lo-report',
          breadcrumb: [
            {
              text: 'Laporan',
              active: true,
            },
            {
              text: 'Detail Laporan Operasional',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_operational_report',
          auth: true,
        },
      },
    ],
  },
]
  
  export default router => {
    router.addRoutes(moduleRoute)
  }
  