const moduleRoute = [
  {
    path: '/invoice_management',
    name: 'invoice-management',
    component: () => import('./views/index.vue'),
    meta: {
      title: 'Manajemen',
      pageTitle: 'Manajemen',
      breadcrumb: [
        {
          text: 'SPP',
          active: true,
        },
        {
          text: 'Manajemen',
          active: true,
        },
      ],
      action: 'index',
      resource: 'invoice_management',
    },
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
