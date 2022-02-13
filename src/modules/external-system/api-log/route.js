const moduleRoute = [
  {
    path: '/api-log',
    name: 'external-system-log',
    redirect: '/api_log',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/api_log',
        name: 'external-api-log-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'API',
          pageTitle: 'API',
          parent: 'external-system',
          activeMenu: 'external-api-log-index',
          breadcrumb: [
            {
              text: 'Sistem Eksternal',
              active: true,
            },
            {
              text: 'API',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_external_api_log',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
