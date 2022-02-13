const moduleRoute = [
  {
    path: '/payment_gateway_log',
    name: 'payment-gateway-log',
    redirect: '/payment_gateway_log',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/payment_gateway_log',
        name: 'Paymet Gateway',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Payment Gateway',
          pageTitle: 'Payment Gateway',
          parentMenu: 'external-system',
          activeMenu: 'external-payment-gateway',
          breadcrumb: [
            {
              text: 'Sistem Eksternal',
              active: true,
            },
            {
              text: 'Payment Gateway',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_external_api_payment_gateway_log',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
