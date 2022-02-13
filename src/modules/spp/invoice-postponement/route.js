const moduleRoute = [
  {
    path: '/invoice',
    name: 'invoice',
    redirect: '/spp/penundaan_manual',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/spp/penundaan_manual',
        name: 'penundaan-manual',
        component: () => import('./views/internal/index.vue'),
        meta: {
          title: 'Permohonan Penundaan',
          pageTitle: 'Permohonan Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Permohonan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_postponement',
          auth: true,
        },
      },
      {
        path: '/client_invoice_postponement',
        name: 'client-invoice-postponement',
        component: () => import('./views/client/index.vue'),
        meta: {
          title: 'Penundaan',
          pageTitle: 'Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Permohonan',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_postponement',
          auth: true,
        },
      },
      {
        path: '/store_invoice_postponement',
        name: 'store-invoice-postponement',
        component: () => import('./views/internal/create.vue'),
        meta: {
          title: 'Tambah Permohonan Penundaan',
          pageTitle: 'Tambah Permohonan Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Permohonan',
              to: { name: 'invoice' },
              active: false,
            },
            {
              text: 'Tambah',
              active: true,
            },
          ],
          action: 'store',
          resource: 'isr_postponement',
          auth: true,
        },
      },
      {
        path: '/detail_invoice_postponement:postponementId',
        name: 'detail-invoice-postponement',
        component: () => import('./views/internal/detail_penundaan.vue'),
        meta: {
          title: 'Detail Permohonan Penundaan',
          pageTitle: 'Detail Permohonan Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-index',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Permohonan',
              to: { name: 'invoice' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_postponement',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/invoice-postponement',
    name: 'invoice-postponement',
    redirect: '/spp/pratinjau_penundaan',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/spp/pratinjau_penundaan',
        name: 'review-invoice-postponement',
        component: () => import('./review-submission/views/internal/index.vue'),
        meta: {
          title: 'Tinjau Penundaan',
          pageTitle: 'Tinjau Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-submission',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Review',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_postponement_submission',
          auth: true,
        },
      },
      {
        path: '/detail_review_invoice_postponement/:submissionId',
        name: 'detail-review-invoice-postponement',
        component: () => import('./review-submission/views/internal/detail.vue'),
        meta: {
          title: 'Detail Tinjau Penundaan',
          pageTitle: 'Detail Tinjau Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-submission',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Review',
              to: { name: 'review-invoice-postponement' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'show',
          resource: 'isr_postponement_submission',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/invoice-postponement-verify',
    name: 'invoice-postponement-verify',
    redirect: '/spp/verifikasi_penundaan',
    component: () => import('@/layouts/full-layout/FullLayout'),
    children: [
      {
        path: '/spp/verifikasi_penundaan',
        name: 'verify-invoice-postponement',
        component: () => import('./verify-submission/views/internal/index.vue'),
        meta: {
          title: 'Verifikasi Penundaan',
          pageTitle: 'Verifikasi Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-verification',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Verifikasi',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_postponement_appeal_submission',
          auth: true,
        },
      },
      {
        path: '/detail_verify_invoice_postponement/:appealId',
        name: 'detail-verify-invoice-postponement',
        component: () => import('./verify-submission/views/internal/detail.vue'),
        meta: {
          title: 'Detail Verifikasi Penundaan',
          pageTitle: 'Detail Verifikasi Penundaan',
          parentMenu: 'invoice-postponement',
          activeMenu: 'invoice-postponement-verification',
          breadcrumb: [
            {
              text: 'Keringanan',
              active: true,
            },
            {
              text: 'Penundaan',
              active: true,
            },
            {
              text: 'Verifikasi',
              to: { name: 'verify-invoice-postponement' },
              active: false,
            },
            {
              text: 'Detail',
              active: true,
            },
          ],
          action: 'index',
          resource: 'isr_postponement_appeal_submission',
          auth: true,
        },
      },
    ],
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
