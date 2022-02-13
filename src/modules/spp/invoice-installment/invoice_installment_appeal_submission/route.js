const moduleRoute = [
  {
    path: '/installment-appeal-submission',
    name: 'installment_appeal_submission',
    redirect: '/installment-appeal-submission/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/installment-appeal-submission/index',
        name: 'verifikasi-cicilan',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Verifikasi Cicilan',
          pageTitle: 'Verifikasi Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-verification',
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
              text: 'Verifikasi',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_installment_appeal_submission',
          auth: true,
        },
      },
      {
        path: '/add-installment-appeal-submission/:idAppeal/:idInstallment',
        name: 'add-installment-appeal-submission',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Detail Verifikasi Cicilan',
          pageTitle: 'Detail verifikasi Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-verification',
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
              text: 'Verifikasi',
              active: false,
              to: { name: 'installment_appeal_submission' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_installment_appeal_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
