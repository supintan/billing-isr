const moduleRoute = [
  {
    path: '/master/base-price',
    name: 'base-price',
    redirect: '/master/base-price/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/master/base-price/index',
        name: 'base-price-index',
        component: () => import('./views/base-price/index.vue'),
        meta: {
          title: 'Harga Dasar',
          pageTitle: 'Harga Dasar',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_base_price_regulation',
          auth: true,
        },
      },
      {
        path: '/master/base-price/detail/:IDBase',
        name: 'base-price-detail',
        component: () => import('./views/master-tarif/index.vue'),
        meta: {
          title: 'Tarif Detail',
          pageTitle: 'Tarif Detail',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_base_price_regulation',
          auth: true,
        },
      },
      {
        path: '/master/base-price/update/:selectedFineID',
        name: 'base-price-update',
        component: () => import('./views/base-price/update.vue'),
        meta: {
          title: 'Ubah Harga Dasar',
          pageTitle: 'Ubah Harga Dasar',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Ubah',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_base_price_regulation',
          auth: true,
        },
      },
      {
        path: '/master/base-price/create',
        name: 'TambahTarifIPFR',
        component: () => import('./views/base-price/create.vue'),
        meta: {
          title: 'Tambah Harga Dasar',
          pageTitle: 'Tambah Harga Dasar',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_base_price_regulation',
          auth: true,
        },
      },
      // ====================================== Harga Dasar DETAIL =====================================
      {
        path: '/master/base-price/detail/add/:IDBase',
        name: 'base-price-detail-addx',
        component: () => import('./views/master-tarif/index.vue'),
        meta: {
          title: 'Tarif Frekuensi ',
          pageTitle: 'Tarif Frekuensi Detail',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Tambah Detail Frekuensi',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_base_price_detail',
          auth: true,
        },
      },
      {
        path: '/master/base-price/detail/add-rule/:IDBase',
        name: 'base-price-detail-add',
        component: () => import('./views/master-tarif/create.vue'),
        meta: {
          title: 'Tambah Aturan Pembayaran Frekuensi ',
          pageTitle: 'Tambah',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Tambah Detail',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_base_price_detail',
          auth: true,
        },
      },
      {
        path: '/master/base-price/detail-rule/:BasePriceId',
        name: 'base-price-detail-rule',
        component: () => import('./views/master-tarif/update.vue'),
        meta: {
          title: 'Tariff Detail',
          pageTitle: 'Tariff Detail',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Info Detail Tarif',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_base_price_detail',
          auth: true,
        },
      },
      {
        path: '/master/base-price/update-rule/:BasePriceId/:IdRule',
        name: 'base-price-update-rule',
        component: () => import('./views/master-tarif/update.vue'),
        meta: {
          title: 'Update Tarif',
          pageTitle: 'Update Tarif',
          parentMenu: 'master',
          activeMenu: 'master-base-price-index',
          breadcrumb: [
            {
              text: 'Master',
              active: true,
            },
            {
              text: 'Harga Dasar',
              to: { name: 'base-price' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
            {
              text: 'Ubah',
              active: true,
            },
          ],
          action: 'update',
          resource: 'isr_base_price_detail',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
