const moduleRoute = [
  {
    path: '/invoice',
    name: 'invoice',
    redirect: '/spp/manual',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/spp/manual',
        name: 'manual-invoice',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Invoice Manual',
          pageTitle: 'Invoice Manual',
          parentMenu: 'invoice-manual',
          activeMenu: 'invoice-manual',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Manual',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_manual_invoice',
          auth: true,
        },
      },
      {
        path: '/add-manual-invoice',
        name: 'add-manual-invoice',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Invoice Manual',
          pageTitle: 'Tambah Invoice Manual',
          parentMenu: 'invoice-manual',
          activeMenu: 'invoice-manual',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Manual',
              active: false,
              to: { name: 'manual-invoice' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_manual_invoice',
          auth: true,
        },
      },
      {
        path: '/edit-manual-invoice',
        name: 'edit-manual-invoice',
        component: () => import('./views/edit.vue'),
        meta: {
          title: 'Edit Invoice Manual',
          pageTitle: 'Edit Invoice Manual',
          parentMenu: 'invoice-manual',
          activeMenu: 'invoice-manual',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Manual',
              active: false,
              to: { name: 'manual-invoice' },
            },
            {
              text: 'Edit',
              active: true,
            },
          ],
          action: 'edit',
          resource: 'isr_manual_invoice',
          auth: true,
        },
      },
      {
        path: '/detail-manual-invoice:invoiceId',
        name: 'detail-manual-invoice',
        component: () => import('./views/detail.vue'),
        meta: {
          title: 'Detail Invoice Manual',
          pageTitle: 'Detail Invoice Manual',
          parentMenu: 'invoice-manual',
          activeMenu: 'invoice-manual',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Manual',
              active: false,
              to: { name: 'manual-invoice' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_manual_invoice',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/review_invoice',
    name: 'review-invoice',
    redirect: '/invoice_manual/review',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice_manual/review',
        name: 'review-manual-invoice',
        component: () => import('./review/views/index.vue'),
        meta: {
          title: 'Review Invoice Manual',
          pageTitle: 'Review Invoice Manual',
          parentMenu: 'review-invoice-manual',
          activeMenu: 'review-invoice-manual',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Review Invoice Manual',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_invoice_submission',
          auth: true,
        },
      },
      {
        path: '/detail_review_manual_invoice/:IdInvoice',
        name: 'detail-review-manual-invoice',
        component: () => import('./review/views/detail.vue'),
        meta: {
          title: 'Detail Review Invoice Manual',
          pageTitle: 'Detail Review Invoice Manual',
          parentMenu: 'review-invoice-manual',
          activeMenu: 'review-invoice-manual',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Review Invoice Manual',
              active: false,
              to: { name: 'review-manual-invoice' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_invoice_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
