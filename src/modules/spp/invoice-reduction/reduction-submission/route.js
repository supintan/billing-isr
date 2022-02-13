const moduleRoute = [
  {
    path: '/invoice-reduction-submission',
    name: 'invoice-reduction-submission',
    redirect: '/invoice-reduction-submission/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-reduction-submission/index',
        name: 'invoice-reduction-submission-index',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Review Pengurangan',
          pageTitle: 'Review Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-submission',
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
              text: 'Review',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_reduction_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-reduction-submission/detail/:reductionId',
        name: 'invoice-reduction-submission-detail',
        component: () => import('./views/internal/ReviewReductionSubmission.vue'),
        meta: {
          title: 'Detail Review Pengurangan',
          pageTitle: 'Detail Review Pengurangan',
          parentMenu: 'invoice-reduction',
          activeMenu: 'invoice-reduction-submission',
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
              text: 'Review',
              to: { name: 'invoice-reduction-submission' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_reduction_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
