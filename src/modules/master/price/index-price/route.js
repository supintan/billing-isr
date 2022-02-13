const moduleRoute = [
    {
      path: '/price',
      name: 'price',
      redirect: '/master/index-price',
      component: () => import('@/layouts/full-layout/FullLayout'),
      children: [
        {
          path: '/master/index-price',
          name: 'index-price',
          component: () => import('./views/index.vue'),
          meta: {
            title: 'Harga Index',
            pageTitle: 'Harga Index',
            parentMenu: 'master',
            activeMenu: 'master-index-price-index',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Harga Index',
                active: true,
              },
            ],
            action: 'index',
            resource: 'isr_index_price_regulation',
            auth: true,
          },
        },
        {
          path: '/index_price/add',
          name: 'index-price-create',
          component: () => import('./views/create.vue'),
          meta: {
            title: 'Tambah Peraturan',
            pageTitle: 'Tambah Peraturan Tarif',
            parentMenu: 'master',
            activeMenu: 'master-index-price-index',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Harga Index',
                to: { name: 'index-price' },
                active: false,
              },
              {
                text: 'Tambah Peraturan Tarif',
                active: true,
              },
            ],
            action: 'store',
            resource: 'isr_index_price_regulation',
            auth: true,
          },
        },
        {
          path: '/index_price/edit/:selectedIdIndexPrice',
          name: 'index-price-edit',
          component: () => import('./views/edit.vue'),
          meta: {
            title: 'Ubah Peraturan',
            pageTitle: 'Ubah Peraturan Tarif',
            parentMenu: 'master',
            activeMenu: 'master-index-price-index',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Harga Index',
                to: { name: 'index-price' },
                active: false,
              },
              {
                text: 'Ubah Peraturan Tarif',
                active: true,
              },
            ],
            action: 'update',
            resource: 'isr_index_price_regulation',
            auth: true,
          },
        },
        {
          path: '/index_price/detail/index/:selectedIdIndexPrice',
          name: 'index-price-detail',
          component: () => import('./index-price-detail/index.vue'),
          meta: {
            title: 'Detail Peraturan',
            pageTitle: 'Detail Peraturan',
            parentMenu: 'master',
            activeMenu: 'master-index-price-index',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Harga Index',
                to: { name: 'index-price' },
                active: false,
              },
              {
                text: 'Detail',
                active: true,
              },
            ],
            action: 'index',
            resource: 'isr_index_price_detail',
            auth: true,
          },
        },
        {
          path: '/index_price_detail/add/:selectedIdIndexPrice',
          name: 'index-price-detail-create',
          component: () => import('./index-price-detail/create.vue'),
          meta: {
            title: 'Tambah Detail Harga Index',
            pageTitle: 'Tambah Detail Harga Index',
            parentMenu: 'master',
            activeMenu: 'master-index-price-index',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Harga Index',
                to: { name: 'index-price-detail' },
                active: false,
              },
              {
                text: 'Tambah Detail',
                active: true,
              },
            ],
            action: 'store',
            resource: 'isr_index_price_detail',
            auth: true,
          },
        },
        {
          path: '/index_price_detail/edit/:selectedIdIndexPriceDetail',
          name: 'index-price-detail-edit',
          component: () => import('./index-price-detail/edit.vue'),
          meta: {
            title: 'Ubah Detail Harga Index',
            pageTitle: 'Ubah Detail Harga Index',
            parentMenu: 'master',
            activeMenu: 'master-index-price-index',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Harga Index',
                to: { name: 'index-price-detail' },
                active: false,
              },
              {
                text: 'Ubah Detail',
                active: true,
              },
            ],
            action: 'update',
            resource: 'isr_index_price_detail',
            auth: true,
          },
        },
      ],
    },
  ]
  
  export default router => {
    router.addRoutes(moduleRoute)
  }
  