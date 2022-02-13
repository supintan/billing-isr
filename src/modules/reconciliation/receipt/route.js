const moduleRoute = [
  {
    path: '/reconciliation/receipt',
    name: 'reconciliation',
    redirect: '/reconciliation/receipt/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/reconciliation/receipt/index',
        name: 'reconciliation-receipt-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Penerimaan',
          pageTitle: 'Penerimaan',
          parentMenu: 'reconciliation',
          activeMenu: 'reconciliation-receipt',
          breadcrumb: [
            {
              text: 'Rekonsiliasi',
              active: true,
            },
            {
              text: 'Penerimaan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_revenue_reconciliation',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
