const moduleRoute = [
  {
    path: '/relaxation/fine',
    name: 'relaxation-fine',
    redirect: '/relaxation/fine/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/relaxation/fine/index',
        name: 'relaxation-fine-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Penghentian Denda Sementara',
          pageTitle: 'Penghentian Denda Sementara',
          parentMenu: 'relaxation-fine',
          activeMenu: 'relaxation-fine',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penghentian Denda',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_fine_relaxation',
          auth: true,
        },
      },
      {
        path: '/relaxation/fine/add',
        name: 'relaxation-fine-add',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Penghentian Denda Sementara',
          pageTitle: 'Tambah Penghentian Denda Sementara',
          parentMenu: 'relaxation-fine',
          activeMenu: 'relaxation-fine',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penghentian Denda',
              active: false,
              to: { name: 'relaxation-fine' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_fine_relaxation',
          auth: true,
        },
      },
      {
        path: '/relaxation/fine/add/:IdRelaxation',
        name: 'relaxation-fine-add-step2',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Penghentian Denda Sementara',
          pageTitle: 'Tambah Penghentian Denda Sementara',
          parentMenu: 'relaxation-fine',
          activeMenu: 'relaxation-fine',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penghentian Denda',
              active: false,
              to: { name: 'relaxation-fine' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_fine_relaxation',
          auth: true,
        },
      },
      {
        path: '/relaxation/fine/edit/:fineRxId',
        name: 'relaxation-fine-edit',
        component: () => import('./views/edit.vue'),
        meta: {
          title: 'Ubah Penundaan Perhitungan Denda',
          pageTitle: 'Ubah Penundaan Perhitungan Denda',
          parentMenu: 'relaxation-fine',
          activeMenu: 'relaxation-fine',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penghentian Denda',
              active: false,
              to: { name: 'relaxation-fine' },
            },
            {
              text: 'Ubah',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_fine_relaxation',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
