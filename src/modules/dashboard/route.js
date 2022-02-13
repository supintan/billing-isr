const moduleRoute = [
  {
    path: '/',
    name: 'dashboard',
    redirect: '/dashboard/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/dashboard/index',
        name: 'dashboard-index',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Beranda',
          pageTitle: 'Beranda',
          parentMenu: 'dashboard',
          activeMenu: 'dashboard',
          breadcrumb: [
            {
              text: 'Beranda',
              active: true,
            },
          ],
          action: 'index',
          resource: 'dashboard_administrator',
          auth: true,
        },
      },
      {
        path: '/client_dashboard',
        name: 'client-dashboard',
        component: () => import('./views/client/index.vue'),
        meta: {
          title: 'Beranda',
          pageTitle: 'Beranda',
          parentMenu: 'dashboard',
          activeMenu: 'dashboard',
          breadcrumb: [
            {
              text: 'Beranda',
              active: true,
            },
          ],
          action: 'index',
          resource: 'client_dashboard',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
