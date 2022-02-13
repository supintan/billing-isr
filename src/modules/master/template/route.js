const moduleRoute = [
  {
    path: '/template',
    name: 'template',
    redirect: '/master/template',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/master/template',
        name: 'Template',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Template',
          pageTitle: 'Template',
          parentMenu: 'master',
          activeMenu: 'master-template-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Template',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_template',
          auth: true,
        },
      },
      {
        path: '/add-template/:detailTemplateId',
        name: 'add-template',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Template',
          pageTitle: 'Tambah Template',
          parentMenu: 'master',
          activeMenu: 'master-template-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Template',
              active: false,
              to: { name: 'template' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_template',
          auth: true,
        },
      },
      {
        path: '/add-template/next/:detailTemplateId',
        name: 'add-template-next',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Template',
          pageTitle: 'Tambah Template',
          parentMenu: 'master',
          activeMenu: 'master-template-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Template',
              active: false,
              to: { name: 'template' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_template',
          auth: true,
        },
      },
      {
        path: '/detail-template/:detailTemplateId',
        name: 'detail-template',
        component: () => import('./views/detail.vue'),
        meta: {
          title: 'Detail Template',
          pageTitle: 'Detail Template',
          parentMenu: 'master',
          activeMenu: 'master-template-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Template',
              active: false,
              to: { name: 'template' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_template',
          auth: true,
        },
      },
      {
        path: '/edit-template/:detailTemplateId',
        name: 'edit-template',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Edit Template',
          pageTitle: 'Edit Template',
          parentMenu: 'master',
          activeMenu: 'master-template-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Template',
              active: false,
              to: { name: 'template' },
            },
            {
              text: 'Edit',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_template',
          auth: true,
        },
      },
      {
        path: '/history-template/:detailTemplateId',
        name: 'history-template',
        component: () => import('./views/history.vue'),
        meta: {
          title: 'Riwayat Perubahan Template',
          pageTitle: 'Riwayat Perubahan Template',
          parentMenu: 'master',
          activeMenu: 'master-template-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Template',
              active: false,
              to: { name: 'template' },
            },
            {
              text: 'Detail',
              active: true,
            },
            {
              text: 'Riwayat',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_template_history',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
