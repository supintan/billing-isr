const moduleRoute = [
  {
    path: '/employee',
    name: 'employee',
    redirect: '/master/employee',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/master/employee',
        name: 'employee-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Employee',
          pageTitle: 'Employee',
          parentMenu: 'master',
          activeMenu: 'master-employee-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Employee',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_employee',
          auth: true,
        },
      },
      {
        name: 'employee-add',
        path: 'add',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Employee',
          parentMenu: 'master',
          activeMenu: 'master-employee-index',
          breadcrumb: [
            {
              text: 'Master',
              active: false,
            },
            {
              text: 'Employee',
              active: true,
              to: {
                name: 'employee',
              }
            },
            {
              text: 'Tambah',
              active: false,
            },
          ],
          action: 'store',
          resource: 'isr_employee',
          auth: true,
        },
      },
      {
        name: 'employee-edit',
        path: 'edit/:selectedUserID',
        component: () => import('./views/edit.vue'),
        meta: {
          title: 'Edit Employee',
          parentMenu: 'master',
          activeMenu: 'master-employee-index',
          breadcrumb: [
            {
              text: 'Master',
              active: false,
            },
            {
              text: 'Employee',
              active: true,
              to: {
                name: 'employee',
              }
            },
            {
              text: 'Edit',
              active: false,
            },
          ],
          action: 'update',
          resource: 'isr_employee',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
