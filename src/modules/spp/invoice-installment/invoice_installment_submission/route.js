const moduleRoute = [
  {
    path: '/installment-submission',
    name: 'invoice_installment',
    redirect: '/installment-submission/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/installment-submission/index',
        name: 'review-cicilan',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Review Cicilan',
          pageTitle: 'Review Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-submission',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Cicilan',
              active: true,
            },
            {
              text: 'Review',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_installment_invoice',
          auth: true,
        },
      },
      {
        path: '/add-installment-submission/:idSubmision/:idInstallment',
        name: 'add-installment-submission',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Detail Review Cicilan',
          pageTitle: 'Detail Review Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-submission',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Cicilan',
              active: true,
            },
            {
              text: 'Review',
              active: false,
              to: { name: 'invoice_installment' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_installment_invoice',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
