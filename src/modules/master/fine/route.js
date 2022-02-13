const moduleRoute = [
  {
    path: '/denda',
    name: 'fine',
    redirect: '/master/denda',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/master/denda',
        name: 'Denda',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Denda',
          pageTitle: 'Denda',
          parentMenu: 'master',
          activeMenu: 'master-fine-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Denda',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_fine',
          auth: true,
        },
      },
      {
        path: '/master/denda/tambah',
        name: 'tambah-denda',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Denda',
          pageTitle: 'Tambah Denda',
          parentMenu: 'master',
          activeMenu: 'master-fine-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Denda',
              to: { name: 'fine' },
              active: false,
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_fine',
          auth: true,
        },
      },
      {
        path: '/fine-update/:selectedFineID',
        name: 'updateFine',
        component: () => import('./views/update.vue'),
        meta: {
          title: 'Ubah Denda',
          pageTitle: 'Ubah Denda',
          parentMenu: 'master',
          activeMenu: 'master-fine-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Denda',
              to: { name: 'fine' },
              active: false,
            },
            {
              text: 'Ubah',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_fine',
          auth: true,
        },
      },
    ],
  },
  // {
  //   path: '/fine-add-new',
  //   name: 'addNewFine',
  //   component: () => import('./views/create.vue'),
  //   meta: {
  //     title: 'Tambah Denda Baru',
  //     pageTitle: 'Tambah',
  //     breadcrumb: [
  //       {
  //         text: 'Denda Baru',
  //         to: { name: 'fine' },
  //         active: false,
  //       },
  //       {
  //         text: 'Tambah denda baru',
  //         active: true,
  //       },
  //     ],
  //     action: 'create',
  //     resource: 'user',
  //   },
  // },
  // {
  //   path: '/fine-update/:selectedFineID',
  //   name: 'updateFine',
  //   component: () => import('./views/update.vue'),
  //   meta: {
  //     title: 'Ubah Aturan Denda',
  //     pageTitle: 'Ubah',
  //     breadcrumb: [
  //       {
  //         text: 'Ubah Aturan',
  //         to: { name: 'fine' },
  //         active: false,
  //       },
  //       {
  //         text: 'Ubah Aturan Denda',
  //         active: true,
  //       },
  //     ],
  //     action: 'update',
  //     resource: 'user',
  //   },
  // },
]

export default router => {
  router.addRoutes(moduleRoute)
}
