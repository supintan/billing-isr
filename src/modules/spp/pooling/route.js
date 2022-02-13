const moduleRoute = [
  {
    path: '/pooling',
    name: 'pooling',
    redirect: '/pooling',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/pooling',
        name: 'Pooling',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Permohonan Pooling',
          pageTitle: 'Permohonan Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-index',
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
              text: 'Permohonan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_pooling',
          auth: true,
        },
      },
      {
        path: '/add-pooling',
        name: 'add-pooling',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Tambah Permohonan Pooling',
          pageTitle: 'Tambah Permohonan Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-index',
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
              text: 'Permohonan',
              active: false,
              to: { name: 'pooling' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_pooling',
          auth: true,
        },
      },
      {
        path: '/detail-pooling/:idpooling/:name',
        name: 'detail-pooling',
        component: () => import('./views/internal/detail.vue'),
        meta: {
          title: 'Detail Permohonan Pooling',
          pageTitle: 'Detail Permohonan Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-index',
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
              text: 'Permohonan',
              active: false,
              to: { name: 'pooling' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_pooling',
          auth: true,
        },
      },
      {
        path: '/edit-pooling',
        name: 'edit-pooling',
        component: () => import('./views/internal/edit.vue'),
        meta: {
          title: 'Edit Pooling',
          pageTitle: 'Edit Pooling',
          parentMenu: 'invoice-pooling',
          activeMenu: 'invoice-pooling-index',
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
              text: 'Permohonan',
              active: false,
              to: { name: 'pooling' },
            },
            {
              text: 'Edit',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_pooling',
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
          activeMenu: 'invoice-pooling-index',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Pooling',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_pooling',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
