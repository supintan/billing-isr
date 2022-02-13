const moduleRoute = [
{
  path: '/digital-signature',
  name: 'digital-signature',
  redirect: '/master/digital-signature',
  component: () => import('@/layouts/full-layout/FullLayout'),
  children: [
    {
      path: '/master/digital-signature',
      name: 'digital-signature-index',
      title: 'digital-signature-index',
      component: () => import('./views/index.vue'),
      meta: {
        title: 'Tanda Tangan Digital',
        pageTitle: 'Tanda Tangan Digital',
        parentMenu: 'master',
        activeMenu: 'master-digital-signature-index',
        breadcrumb: [
          {
            text: 'Master',
            active: true,
          },
          {
            text: 'Digital Signature',
            active: true,
          },
        ],
        action: 'index',
        resource: 'isr_digital_signature',
        auth: true,
      },
    },
    {
      path: '/store-digital-signature',
      name: 'CreateDGS',
      component: () => import('./views/create.vue'),
      meta: {
        title: 'Tambah Tanda Tangan Digital',
        pageTitle: 'Tambah Tanda Tangan Digitial',
        parentMenu: 'master',
        activeMenu: 'master-digital-signature-index',
        breadcrumb: [
          {
            text: 'Master',
            active: true,
          },
          {
            text: 'Digital Signature',
            to: { name: 'digital-signature' },
            active: false,
          },
          {
            text: 'Tambah baru',
            active: true,
          },
        ],
        action: 'store',
        resource: 'isr_digital_signature',
        auth: true,
      },
    },
  ],
},
  {
    path: '/digital-signature-update/:selectedDGSID',
    name: 'updateDigitalSignature',
    component: () => import('./views/update.vue'),
    meta: {
      title: 'Ubah Tanda Tangan Digital',
      pageTitle: 'Ubah',
      parentMenu: 'master',
      activeMenu: 'master-digital-signature-index',
      breadcrumb: [
        {
          text: 'Master',
          active: true,
        },
        {
          text: 'Digital Signature',
          to: { name: 'digital-signature' },
          active: false,
        },
        {
          text: 'Ubah',
          active: true,
        },
      ],
      action: 'update',
      resource: 'isr_digital_signature',
      auth: true,
    },
  },
]

export default router => {
  router.addRoutes(moduleRoute)
}
