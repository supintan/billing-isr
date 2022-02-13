const moduleRoute = [
  {
    path: '/pooling',
    name: 'pooling',
    redirect: '/pooling',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/pooling-submission',
        name: 'review-poling',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Review Pooling',
          pageTitle: 'Review Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-submission',
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
              text: 'Review',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_pooling_submission',
          auth: true,
        },
      },
      {
        path: '/add-pooling-submission/:idpooling/:idpoolingsubmission/:idappealpoolingsubmission/:name',
        name: 'add-pooling-submission',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Detail Review Pooling',
          pageTitle: 'Detail Review Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-submission',
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
              text: 'Review',
              active: false,
              to: { name: 'review-poling' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_pooling_submission',
          auth: true,
        },
      },
      {
        path: '/edit-invoice-pooling',
        name: 'edit-invoice-pooling',
        component: () => import('./views/internal/edit.vue'),
        meta: {
          title: 'Edit Pooling',
          pageTitle: 'Edit Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-submission',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pooling',
              active: false,
              to: { name: 'manual-invoice' },
            },
            {
              text: 'Edit',
              active: true,
            },
          ],
          action: 'update',
          resource: 'invoice_pooling',
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
          activeMenu: 'invoice-pooling-submission',
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
          resource: 'isr_pooling_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
