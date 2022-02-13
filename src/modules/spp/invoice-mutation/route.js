const moduleRoute = [
  {
    path: '/invoice_mutation',
    name: 'Mutasi',
    redirect: '/invoice-mutation',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice_mutation',
        name: 'Mutasi',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Mutasi',
          pageTitle: 'Mutasi',
          parentMenu: 'invoice-mutation',
          activeMenu: 'invoice-mutation',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Mutasi',
              active: true,
            },
          ],
          action: 'generate_report',
          resource: 'isr_invoice_mutation',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}