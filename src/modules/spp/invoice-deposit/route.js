const moduleRoute = [
  {
    path: '/invoice-deposit',
    name: '/invoice-deposit',
    redirect: '/invoice-deposit',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/invoice-deposit',
        name: 'invoice-deposit',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Deposit',
          pageTitle: 'Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-index',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_deposit',
          auth: true,
        },
      },
      {
        path: '/add-invoice-deposit',
        name: 'add-invoice-deposit',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Tambah Deposit',
          pageTitle: 'Tambah Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-index',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: false,
              to: { name: 'invoice-deposit' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_deposit',
          auth: true,
        },
      },
      // PERMOHONAN DEPOSIT URL SERVICE
      {
        path: '/permohonan-deposit',
        name: 'verifikasi-deposit',
        component: () => import('./permohonan-deposit/views/internal/index.vue'),
        meta: {
          title: 'Permohonan Penggunaan Deposit',
          pageTitle: 'Permohonan Penggunaan Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-verification',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Permohonan Penggunaan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_deposit_usage',
          auth: true,
        },
      },
      {
        path: '/add-permohonan-deposit',
        name: 'add-permohonan-deposit',
        component: () => import('./permohonan-deposit/views/internal/create.vue'),
        meta: {
          title: 'Tambah Permohonan Penggunaan Deposit',
          pageTitle: 'Tambah Permohonan Penggunaan Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-verification',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Permohonan Penggunaan',
              active: false,
              to: { name: 'verifikasi-deposit' },
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_deposit_usage',
          auth: true,
        },
      },
      {
        path: '/approve-permohonan-deposit/:detailDepositApproveId/:idClientDeposit',
        name: 'approve-permohonan-deposit',
        component: () => import('./permohonan-deposit/views/internal/approve.vue'),
        meta: {
          title: 'Persetujuan Detail Deposit',
          pageTitle: 'Detail Penggunaan',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-verification',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Persetujuan Permohonan Penggunaan',
              active: false,
              to: { name: 'verifikasi-deposit' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_deposit_usage',
          auth: true,
        },
      },
      {
        path: '/detail-permohonan-deposit/:detailDepositId/:idClientDeposit/:SubmissionDepositId',
        name: 'detail-permohonan-deposit',
        component: () => import('./permohonan-deposit/views/internal/get.vue'),
        meta: {
          title: 'Detail Penggunaan',
          pageTitle: 'Detail Penggunaan',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-verification',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Permohonan Penggunaan',
              active: false,
              to: { name: 'verifikasi-deposit' },
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_deposit_usage',
          auth: true,
        },
      },
      // REVIEW DEPOSIT URL SERVICE DEPOSIT USAGE SUBMISSION
      {
        path: '/deposit-submission',
        name: 'deposit-submission',
        component: () => import('./deposit-usage-submission/views/internal/index.vue'),
        meta: {
          title: 'Review Permohonan Penggunaan Deposit',
          pageTitle: 'Review Permohonan Penggunaan Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-submission',
          breadcrumb: [
            {
              text: 'Invoice',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Review',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_deposit_usage_submission',
          auth: true,
        },
      },
      {
        path: '/deposit-submission-approve/:IddetailDeposit/:idClientDeposit/:idDepositUsageSubmission',
        name: 'deposit-submission-approve',
        component: () => import('./deposit-usage-submission/views/internal/approve.vue'),
        meta: {
          title: 'Persetujuan Permohonan Penggunaan Deposit',
          pageTitle: 'Persetujuan Permohonan Penggunaan Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-submission',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Review',
              to: { name: 'deposit-submission' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_deposit_usage_submission',
          auth: true,
        },
      },
      {
        path: '/deposit-submission-review/:IddetailDeposit/:idClientDeposit/:idDepositUsageSubmission',
        name: 'deposit-submission-review',
        component: () => import('./deposit-usage-submission/views/internal/get.vue'),
        meta: {
          title: 'Detail Permohonan Penggunaan Deposit',
          pageTitle: 'Detail Permohonan Penggunaan Deposit',
          parentMenu: 'invoice-deposit',
          activeMenu: 'invoice-deposit-submission',
          breadcrumb: [
            {
              text: 'SPP',
              active: true,
            },
            {
              text: 'Deposit',
              active: true,
            },
            {
              text: 'Review',
              to: { name: 'deposit-submission' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_deposit_usage_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}