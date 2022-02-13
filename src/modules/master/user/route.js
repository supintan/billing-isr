const moduleRoute = [
  {
    path: '/master/user',
    name: 'user',
    redirect: '/master/user/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/master/user/index',
        name: 'user-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Pengguna',
          pageTitle: 'Pengguna',
          parentMenu: 'master',
          activeMenu: 'user',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Pengguna',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_employee',
        },
      },
      {
        path: '/master/user/create-user',
        name: 'create-user',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Pengguna',
          pageTitle: 'Tambah Pengguna',
          parentMenu: 'master',
          activeMenu: 'user',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Pengguna',
              to: { name: 'user' },
              active: false,
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_employee',
        },
      },
      {
        path: '/master/user/edit-user/:selectedUserID',
        name: 'edit-user',
        component: () => import('./views/edit.vue'),
        meta: {
          title: 'Edit Pengguna',
          pageTitle: 'Edit Pengguna',
          parentMenu: 'master',
          activeMenu: 'user',
          breadcrumb: [
            {
              text: 'Pengguna',
              to: { name: 'user' },
              active: false,
            },
            {
              text: 'Edit',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_employee',
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
