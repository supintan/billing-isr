const moduleRoute = [
  {
    path: '/invoice_installment',
    name: 'invoice-installment',
    redirect: '/invoice-installment',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-installment',
        name: 'Pengajuan',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Permohonan Cicilan',
          pageTitle: 'Permohonan Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-index',
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
              text: 'Permohonan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_installment',
          auth: true,
        },
      },
      {
        path: '/add-invoice-installment',
        name: 'add-invoice-installment',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Pengajuan Permohonan Cicilan',
          pageTitle: 'Pengajuan Permohonan Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-index',
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
              text: 'Permohonan',
              active: false,
              to: { name: 'invoice-installment' },
            },
            {
              text: 'Pengajuan',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_installment',
          auth: true,
        },
      },
      {
        path: '/detail-invoice-installment/:idinstallment',
        name: 'detail-invoice-installment',
        component: () => import('./views/internal/detail.vue'),
        meta: {
          title: 'Detail Permohonan Cicilan',
          pageTitle: 'Detail Permohonan Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-index',
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
              text: 'Permohonan',
              active: false,
              to: { name: 'invoice-installment' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_installment',
          auth: true,
        },
      },
      {
        path: '/client_invoice_installment',
        name: 'client-invoice-installment',
        component: () => import('./views/client/index.vue'),
        meta: {
          title: 'Cicilan',
          pageTitle: 'Cicilan',
          parentMenu: 'invoice-installment',
          activeMenu: 'invoice-installment-index',
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
              text: 'Permohonan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'client_invoice_installment',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
