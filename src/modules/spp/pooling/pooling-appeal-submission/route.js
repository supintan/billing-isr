const moduleRoute = [
  {
    path: '/pooling',
    name: 'review-pooling',
    redirect: '/pooling-appeal-submission',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/pooling-appeal-submission',
        name: 'review-pooling-submission',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Verifikasi Pooling',
          pageTitle: 'Verifikasi Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-verification',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Pooling',
              active: true,
            },
            {
              text: 'Verifikasi',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_pooling_appeal_submission',
          auth: true,
        },
      },
      {
        path: '/add-pooling-appeal-submission/:idpooling/:idappealpooling/:name',
        name: 'add-pooling-appeal-submission',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Detail Verifikasi Pooling',
          pageTitle: 'Detail Verifikasi Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-verification',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pooling',
              active: true,
            },
            {
              text: 'Verifikasi',
              to: { name: 'review-pooling-submission' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_pooling_appeal_submission',
          auth: true,
        },
      },
      {
        path: '/client_invoice_pooling',
        name: 'client-invoice-pooling',
        component: () => import('./views/client/index.vue'),
        meta: {
          title: 'Pooling',
          pageTitle: 'Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-verification',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pooling',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_pooling_appeal_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}