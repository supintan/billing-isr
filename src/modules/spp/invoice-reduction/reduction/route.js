const moduleRoute = [
  {
    path: '/invoice-reduction',
    name: 'invoice-reduction',
    redirect: '/invoice-reduction/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-reduction/index',
        name: 'invoice-reduction-index',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Permohonan Pengurangan',
          pageTitle: 'Permohonan Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Pengurangan',
              active: true,
            },
            {
              text: 'Permohonan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_reduction',
          auth: true,
        },
      },
      {
        path: '/invoice-reduction/add',
        name: 'invoice-reduction-add',
        component: () => import('./views/internal/addNewReduction.vue'),
        meta: {
          title: 'Tambah Permohonan Pengurangan',
          pageTitle: 'Tambah Permohonan Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Pengurangan',
              active: true,
            },
            {
              text: 'Permohonan',
              to: { name: 'invoice-reduction' },
              active: false,
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_reduction',
          auth: true,
        },
      },
      {
        path: '/invoice-reduction/detail/:reductionId',
        name: 'invoice-reduction-detail',
        component: () => import('./views/internal/ReviewReduction.vue'),
        meta: {
          title: 'Detail Permohonan Pengurangan',
          pageTitle: 'Detail Permohonan Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Pengurangan',
              active: true,
            },
            {
              text: 'Permohonan',
              to: { name: 'invoice-reduction' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_reduction',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
