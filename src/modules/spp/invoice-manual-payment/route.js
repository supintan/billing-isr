const moduleRoute = [
  {
    path: '/invoice-manual-payment',
    name: 'invoice-manual-payment',
    redirect: '/invoice-manual-payment/index',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-manual-payment/index',
        name: 'invoice-manual-payment-index',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Pembayaran Manual',
          pageTitle: 'Pembayaran Manual',
          parentMenu: 'manual-payment',
          activeMenu: 'invoice-manual-payment-index',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pembayaran Manual',
              active: true,
            },
            {
              text: 'Pembayaran',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-manual-payment/store',
        name: 'store-invoice-manual-payment',
        component: () => import('./views/create.vue'),
        meta: {
          title: 'Tambah Pembayaran Manual',
          pageTitle: 'Tambah Pembayaran Manual',
          parentMenu: 'manual-payment',
          activeMenu: 'invoice-manual-payment-index',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pembayaran Manual',
              active: true,
            },
            {
              text: 'Pembayaran',
              to: { name: 'invoice-manual-payment-index' },
              active: false,
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-manual-payment/detail/:selectedPaymentID',
        name: 'detail-invoice-manual-payment',
        component: () => import('./views/detail_payment.vue'),
        meta: {
          title: 'Pembayaran Detail',
          pageTitle: 'Pembayaran Manual',
          parentMenu: 'manual-payment',
          activeMenu: 'invoice-manual-payment-index',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pembayaran Manual',
              active: true,
            },
            {
              text: 'Pembayaran',
              active: false,
              to: { name: 'invoice-manual-payment-index' }
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-manual-payment/review',
        name: 'review-invoice-manual-payment',
        component: () => import('./views/index-review.vue'),
        meta: {
          title: 'Review Pembayaran',
          pageTitle: 'Review Pembayaran',
          parentMenu: 'manual-payment',
          activeMenu: 'invoice-manual-payment-submission',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pembayaran Manual',
              active: true,
            },
            {
              text: 'Review',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-manual-payment/review/detail/:selectedPaymentID',
        name: 'review-detail-invoice-manual-payment',
        component: () => import('./views/review_detail_payment.vue'),
        meta: {
          title: 'Detail Review Pembayaran',
          pageTitle: 'Detail Review Pembayaran',
          parentMenu: 'manual-payment',
          activeMenu: 'invoice-manual-payment-submission',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pembayaran Manual',
              active: true,
            },
            {
              text: 'Review',
              active: false,
              to: { name: 'review-invoice-manual-payment' }
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
      {
        path: '/invoice-manual-payment/review/detail/view/:selectedPaymentID',
        name: 'review-detail-invoice-manual-payment-view',
        component: () => import('./views/review_detail_payment_view.vue'),
        meta: {
          title: 'Detail Review Pembayaran',
          pageTitle: 'Detail Review Pembayaran',
          parentMenu: 'manual-payment',
          activeMenu: 'invoice-manual-payment-submission',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Pembayaran Manual',
              active: true,
            },
            {
              text: 'Review',
              active: false,
              to: { name: 'review-invoice-manual-payment' }
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_manual_payment_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
