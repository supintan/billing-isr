const moduleRoute = [
  {
    path: '/master/group',
    name: 'group',
    redirect: '/master/group/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/master/group/index',
        name: 'group-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Group',
          pageTitle: 'Group',
          parentMenu: 'master',
          activeMenu: 'group',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Group',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_employee',
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
