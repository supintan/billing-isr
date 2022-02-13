const moduleRoute = [
  {
    path: '/bhp-frekuensi-formula',
    name: 'bhp-frekuensi-formula',
    redirect: '/bhp-frekuensi-formula/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/bhp-frekuensi-formula/index',
        name: 'bhp-frekuensi-formula-index',
        component: () => import('./views/regulation/index.vue'),
        meta: {
          title: 'Formula BHP',
          pageTitle: 'Formula BHP',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      {
        path: '/bhp-frekuensi-formula/update/:selectedIdFormula',
        name: 'bhp-frekuensi-formula-update',
        component: () => import('./views/regulation/update.vue'),
        meta: {
          title: 'Edit Formula BHP',
          pageTitle: 'Edit Formula BHP',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Edit',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      {
        path: '/bhp-frekuensi-formula/add',
        name: 'bhp-frekuensi-formula-add',
        component: () => import('./views/regulation/create.vue'),
        meta: {
          title: 'Tambah Formula BHP',
          pageTitle: 'Tambah Formula BHP',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      // {
      //   path: '/bhp-frekuensi-formula/detail/:selectedIdFormula',
      //   name: 'bhp-frekuensi-formula-detail',
      //   component: () => import('./views/detail.vue'),
      //   meta: {
      //     title: 'Detail Formula BHP',
      //     pageTitle: 'Detail Formula BHP Frekuensi',
      //     parentMenu: 'bhp-formula-regulation',
      //     activeMenu: 'bhp-formula-regulation',
      //     breadcrumb: [
      //       {
      //         text: 'Formula BHP Frekuensi',
      //         active: false,
      //         to: { name: 'bhp-frekuensi-formula' },
      //       },
      //       {
      //         text: 'Detail',
      //         active: true,
      //       },
      //     ],
      //     action: 'update',
      //     resource: 'isr_bhp_formula_regulation',
      //     auth: true,
      //   },
      // },
      // Detail Formula
      {
        path: '/bhp-frekuensi-formula/detail/:selectedIdFormula',
        name: 'bhp-frekuensi-formula-detail',
        component: () => import('./views/formula/index.vue'),
        meta: {
          title: 'Formula BHP Detail',
          pageTitle: 'Formula BHP Detail',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      {
        path: '/bhp-frekuensi-formula/detail/:selectedIdFormula/add',
        name: 'bhp-frekuensi-formula-add-detail',
        component: () => import('./views/formula/create.vue'),
        meta: {
          title: 'Tambah Detail Formula BHP',
          pageTitle: 'Tambah Detail Formula BHP Frekuensi',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Tambah Detail',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      {
        path: '/bhp-frekuensi-formula/detail/:selectedIdFormula/edit/:selectedDetailFormula',
        name: 'bhp-frekuensi-formula-edit-detail',
        component: () => import('./views/formula/update.vue'),
        meta: {
          title: 'Edit Detail Formula BHP',
          pageTitle: 'Edit Detail Formula BHP',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Edit Detail',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      {
        path: '/bhp-frekuensi-formula/detail/:selectedIdFormula/show/:selectedDetailFormula',
        name: 'bhp-frekuensi-formula-show-detail',
        component: () => import('./views/formula/detail.vue'),
        meta: {
          title: 'Detail Formula BHP',
          pageTitle: 'Detail Formula BHP',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Detail Formula',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
      {
        path: '/bhp-frekuensi-formula/riwayat/:selectedIdFormula',
        name: 'bhp-frekuensi-formula-riwayat',
        component: () => import('./views/formula/history.vue'),
        meta: {
          title: 'Riwayat Perubahan Formula BHP',
          pageTitle: 'Riwayat Perubahan Formula BHP',
          parentMenu: 'bhp-formula-regulation',
          activeMenu: 'bhp-formula-regulation',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Formula BHP',
              active: false,
              to: { name: 'bhp-frekuensi-formula' },
            },
            {
              text: 'Riwayat Perubahan',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_bhp_formula_regulation',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
