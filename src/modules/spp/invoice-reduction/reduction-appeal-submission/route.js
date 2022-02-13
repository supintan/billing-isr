const moduleRoute = [
  {
    path: '/invoice-reduction-appeal-submission',
    name: 'invoice-reduction-appeal-submission',
    redirect: '/invoice-reduction-appeal-submission/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-reduction-appeal-submission/index',
        name: 'reduction-appeal-submission-index',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Verifikasi Pengurangan',
          pageTitle: 'Verifikasi Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-verification',
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
              text: 'Verifikasi',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_reduction_appeal_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-reduction-appeal-submission/review/:reductionId',
        name: 'reduction-appeal-detail',
        component: () => import('./views/internal/ReviewReductionAppeal.vue'),
        meta: {
          title: 'Detail Verifikasi Pengurangan',
          pageTitle: 'Detail Verifikasi Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-verification',
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
              text: 'Verifikasi',
              to: { name: 'invoice-reduction-appeal-submission' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_reduction_appeal_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
