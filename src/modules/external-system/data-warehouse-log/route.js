const moduleRoute = [
  {
    path: '/data_warehouse_log',
    name: 'data-warehouse-log',
    redirect: '/data_warehouse_log',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/data_warehouse_log',
        name: 'Data Warehouse',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Data Warehouse',
          pageTitle: 'Data Warehouse',
          parent: 'external-system',
          activeMenu: 'external-api-datawarehouse',
          breadcrumb: [
            {
              text: 'Sistem Eksternal',
              active: true,
            },
            {
              text: 'Data Warehouse',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_external_api_datawarehouse_log',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
