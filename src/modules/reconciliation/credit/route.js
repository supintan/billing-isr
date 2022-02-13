const moduleRoute = [
  {
    path: '/rekonsiliasi/piutang',
    name: 'reconciliation-piutang',
    redirect: '/rekonsiliasi/piutang/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/rekonsiliasi/piutang/index',
        name: 'credit-reconciliation-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Piutang',
          pageTitle: 'Piutang',
          parentMenu: 'reconciliation',
          activeMenu: 'reconciliation-account-receivable',
          breadcrumb: [
            {
              text: 'Rekonsiliasi',
              active: true,
            },
            {
              text: 'Piutang',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_bhp_account_receivable_reconciliation',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
