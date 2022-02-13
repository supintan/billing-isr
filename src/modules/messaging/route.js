const moduleRoute = [
  {
    path: '/messaging',
    name: 'messaging',
    redirect: '/invoice-email',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-email',
        name: 'invoice-email',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Invoice Email',
          pageTitle: 'Invoice Email',
          parentMenu: 'invoice-mail',
          activeMenu: 'invoice-mail',
          breadcrumb: [
            {
              text: 'Email',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_invoice_email',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
