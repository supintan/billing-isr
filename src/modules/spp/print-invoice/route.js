const moduleRoute = [
  {
    path: '/print-invoice',
    name: 'print-invoice',
    redirect: '/print-invoice/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/print-invoice/index',
        name: 'print-invoice-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Pencetakan',
          pageTitle: 'Pencetakan',
          parentMenu: 'print-invoice',
          activeMenu: 'print-invoice',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Pencetakan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_print_invoice',
          auth: true,
        },
      },
      {
        path: '/add-print-invoice',
        name: 'add-print-invoice',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Cicilan',
          pageTitle: 'Tambah Cicilan',
          parentMenu: 'print-invoice',
          activeMenu: 'print-invoice',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pencetakan',
              active: false,
              to: { name: 'print-invoice' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_print_invoice',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
