const moduleRoute = [
    {
      path: '/service_subservice',
      name: 'service',
      redirect: '/master/service_subservice',
      component: () => import('@/layouts/full-layout/FullLayout'),
      children: [
        {
          path: '/master/service_subservice',
          name: 'service-subservice',
          component: () => import('./views/index.vue'),
          meta: {
            title: 'Service Subservice',
            pageTitle: 'Service SubService',
            parentMenu: 'master',
            activeMenu: 'service-subservice',
            breadcrumb: [
              {
                text: 'Master',
                active: true,
              },
              {
                text: 'Service Subservice',
                active: true,
              },
            ],
            action: 'index',
            resource: 'isr_service',
          },
        },
        // {
        //   path: '/index_price/add',
        //   name: 'index-price-create',
        //   component: () => import('./views/create.vue'),
        //   meta: {
        //     title: 'Tambah Peraturan',
        //     pageTitle: 'Tambah Peraturan Tarif',
        //     breadcrumb: [
        //       {
        //         text: 'Tambah',
        //         to: { name: 'index-price' },
        //         active: false,
        //       },
        //       {
        //         text: 'Tambah Peraturan Tarif',
        //         active: true,
        //       },
        //     ],
        //     action: 'create',
        //     resource: 'index_price',
        //   },
        // },
        // {
        //   path: '/index_price/edit/:selectedIdIndexPrice',
        //   name: 'index-price-edit',
        //   component: () => import('./views/edit.vue'),
        //   meta: {
        //     title: 'Ubah Peraturan',
        //     pageTitle: 'Ubah Peraturan Tarif',
        //     breadcrumb: [
        //       {
        //         text: 'Ubah',
        //         to: { name: 'index-price' },
        //         active: false,
        //       },
        //       {
        //         text: 'Ubah Peraturan Tarif',
        //         active: true,
        //       },
        //     ],
        //     action: 'update',
        //     resource: 'index_price',
        //   },
        // },
        // {
        //   path: '/index_price/detail/index/:selectedIdIndexPrice',
        //   name: 'index-price-detail',
        //   component: () => import('./index-price-detail/index.vue'),
        //   meta: {
        //     title: 'Detail Peraturan',
        //     pageTitle: 'Detail Peraturan',
        //     breadcrumb: [
        //       {
        //         text: 'Detail',
        //         to: { name: 'index-price' },
        //         active: false,
        //       },
        //       {
        //         text: 'Index Price',
        //         active: true,
        //       },
        //     ],
        //     action: 'index',
        //     resource: 'index_price_detail',
        //   },
        // },
        // {
        //   path: '/index_price_detail/add/:selectedIdIndexPrice',
        //   name: 'index-price-detail-create',
        //   component: () => import('./index-price-detail/create.vue'),
        //   meta: {
        //     title: 'Tambah Detail',
        //     pageTitle: 'Tambah Detail',
        //     breadcrumb: [
        //       {
        //         text: 'Tambah',
        //         to: { name: 'index-price-detail' },
        //         active: false,
        //       },
        //       {
        //         text: 'Index Price',
        //         active: true,
        //       },
        //     ],
        //     action: 'create',
        //     resource: 'index_price_detail',
        //   },
        // },
        // {
        //   path: '/index_price_detail/edit/:selectedIdIndexPriceDetail',
        //   name: 'index-price-detail-edit',
        //   component: () => import('./index-price-detail/edit.vue'),
        //   meta: {
        //     title: 'Ubah Detail',
        //     pageTitle: 'Ubah Detail',
        //     breadcrumb: [
        //       {
        //         text: 'Index Price Detail',
        //         to: { name: 'index-price-detail' },
        //         active: false,
        //       },
        //       {
        //         text: 'Ubah',
        //         active: true,
        //       },
        //     ],
        //     action: 'update',
        //     resource: 'index_price_detail',
        //   },
        // },
      ],
    },
  ]
  
  export default router => {
    router.addRoutes(moduleRoute)
  }
  