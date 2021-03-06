let i = 1
export default [
  {
    id: i++,
    icon: 'home',
    title: 'Dashboard',
    i18n: 'Beranda',
    to: '/dashboard/index',
    name: 'dashboard',
    action: 'index_menu',
    subject: 'dashboard_administrator',
  },
  {
    id: i++,
    icon: 'grid',
    title: 'Master',
    i18n: 'Master',
    name: 'master',
    children: [
      // {
      //   id: `${i}.1`,
      //   icon: 'fas fa-user',
      //   title: 'Employee',
      //   to: '/master/employee',
      //   name: 'master-employee-index',
      //   parent: 'master',
      //   action: 'index_menu',
      //   subject: 'isr_employee',
      // },
      {
        id: i++,
        icon: 'fas fa-subscript',
        title: 'Formula BHP',
        i18n: 'Formula BHP',
        to: '/bhp-frekuensi-formula',
        parent: 'master',
        name: 'bhp-formula-regulation',
        action: 'index_menu',
        subject: 'isr_bhp_formula_regulation',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-credit-card',
        title: 'Denda',
        to: '/master/denda',
        name: 'master-fine-index',
        parent: 'master',
        action: 'index_menu',
        subject: 'isr_fine',
      },
      {
        id: `${i}.3`,
        icon: 'far fa-file-pdf',
        title: 'Template',
        to: '/master/template',
        name: 'master-template-index',
        parent: 'master',
        action: 'index_menu',
        subject: 'isr_template',
      },
      {
        id: `${i}.4`,
        icon: 'fas fa-pencil-alt',
        title: 'Digital Signature',
        to: '/master/digital-signature',
        parent: 'master',
        name: 'master-digital-signature-index',
        action: 'index_menu',
        subject: 'isr_digital_signature',
      },
      {
        id: `${i}.5`,
        icon: 'ti-receipt',
        title: 'Harga Dasar',
        to: '/master/base-price',
        name: 'master-base-price-index',
        parent: 'master',
        action: 'index_menu',
        subject: 'isr_base_price_regulation',
      },
      {
        id: `${i}.6`,
        icon: 'ti-wallet',
        title: 'Harga Index',
        to: '/master/index-price',
        parent: 'master',
        name: 'master-index-price-index',
        action: 'index_menu',
        subject: 'isr_index_price_regulation',
      },
      {
        id: `${i}.7`,
        icon: 'mdi mdi-cast',
        title: 'Service Subservice',
        to: '/master/service_subservice',
        parent: 'master',
        name: 'service-subservice',
        action: 'index_menu',
        subject: 'isr_service',
      },
      {
        id: `${i}.8`,
        icon: 'fas fa-user',
        title: 'Pengguna',
        to: '/master/user',
        parent: 'master',
        name: 'user',
        action: 'index_menu',
        subject: 'isr_user',
      },
      {
        id: `${i}.9`,
        icon: 'fas fa-list',
        title: 'Group',
        to: '/master/group',
        parent: 'master',
        name: 'group',
        action: 'index_menu',
        subject: 'isr_role',
      },
    ],
  },
  {
    id: i++,
    icon: 'radio',
    title: 'Stasiun',
    i18n: 'Stasiun',
    to: '/stasiun',
    name: 'station',
    action: 'index_menu',
    subject: 'isr_station_registration',
  },
  {
    id: i++,
    icon: 'cpu',
    title: 'Sistem Eksternal',
    i18n: 'Sistem Eksternal',
    name: 'external-system',
    children: [
      {
        id: `${i}.1`,
        icon: 'fas fa-cloud',
        title: 'API',
        to: '/api_log',
        parent: 'external-system',
        name: 'external-api-log-index',
        action: 'index_menu',
        subject: 'isr_external_api_log',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-database',
        title: 'Data Warehouse',
        to: '/data_warehouse_log',
        parent: 'external-system',
        name: 'external-api-datawarehouse',
        action: 'index_menu',
        subject: 'isr_external_api_datawarehouse_log',
      },
      {
        id: `${i}.3`,
        icon: 'far fa-money-bill-alt',
        title: 'Payment Gateway',
        to: '/payment_gateway_log',
        parent: 'external-system',
        name: 'external-payment-gateway',
        action: 'index_menu',
        subject: 'isr_external_api_payment_gateway_log',
      },
    ],
  },
  {
    id: i++,
    header: 'SPP',
    icon: 'mdi mdi-dots-horizontal',
  },
  {
    id: i++,
    icon: 'slack',
    title: 'Manajemen Invoice',
    i18n: 'Manajemen Invoice',
    to: '/spp/index',
    name: 'management-spp',
    action: 'index_menu',
    subject: 'isr_invoice',
    // belum ada aclnya 
  },
  {
    id: i++,
    icon: 'printer',
    title: 'Cetak Invoice',
    i18n: 'Cetak Invoice',
    to: '/print-invoice',
    name: 'print-invoice',
    action: 'index_menu',
    subject: 'isr_print_invoice',
  },
  {
    id: i++,
    icon: 'pocket',
    title: 'Pembayaran Manual',
    i18n: 'Pembayaran Manual',
    name: 'manual-payment',
    children: [
      {
        id: `${i}.1`,
        icon: 'mdi mdi-select',
        title: 'Pembayaran',
        i18n: 'Pembayaran',
        to: '/invoice-manual-payment/',
        parent: 'manual-payment',
        name: 'invoice-manual-payment-index',
        action: 'index_menu',
        subject: 'isr_manual_payment_submission',
      },
      {
        id: `${i}.2`,
        icon: 'mdi mdi-select',
        title: 'Review',
        i18n: 'Review',
        to: '/invoice-manual-payment/review',
        parent: 'manual-payment',
        name: 'invoice-manual-payment-submission',
        action: 'index_menu',
        subject: 'isr_manual_payment_submission',
      },
    ],
  },
  {
    id: i++,
    icon: 'credit-card',
    title: 'Deposit',
    i18n: 'Deposit',
    name: 'invoice-deposit',
    children: [
      {
        id: `${i}.1`,
        icon: 'mdi mdi-select',
        title: 'Deposit',
        to: '/invoice-deposit',
        parent: 'invoice-deposit',
        name: 'invoice-deposit-index',
        action: 'index_menu',
        subject: 'isr_deposit',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-file',
        title: 'Permohonan Deposit',
        to: '/permohonan-deposit',
        parent: 'invoice-deposit',
        name: 'invoice-deposit-verification',
        action: 'index_menu',
        subject: 'isr_deposit_usage',
      },
      {
        id: `${i}.3`,
        icon: 'fas fa-search',
        title: 'Review',
        to: '/deposit-submission',
        parent: 'invoice-deposit',
        name: 'invoice-deposit-submission',
        action: 'index_menu',
        subject: 'isr_deposit_usage_submission',
      },
    ],
  },
  {
    id: i++,
    icon: 'book-open',
    title: 'Pooling',
    i18n: 'Pooling',
    name: 'invoice-pooling',
    children: [
      {
        id: `${i}.1`,
        icon: 'fas fa-file',
        title: 'Permohonan',
        to: '/pooling',
        parent: 'invoice-pooling',
        name: 'invoice-pooling-index',
        action: 'index_menu',
        subject: 'isr_pooling',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-edit',
        title: 'Verifikasi',
        to: '/pooling-appeal-submission',
        parent: 'invoice-pooling',
        name: 'invoice-pooling-verification',
        action: 'index_menu',
        subject: 'isr_pooling_appeal_submission',
      },
      {
        id: `${i}.3`,
        icon: 'fas fa-search',
        title: 'Review',
        to: '/pooling-submission',
        parent: 'invoice-pooling',
        name: 'invoice-pooling-submission',
        action: 'index_menu',
        subject: 'isr_pooling_submission',
      },
    ],
  },
  {
    id: i++,
    icon: 'file',
    title: 'Manual Invoice',
    i18n: 'Manual Invoice',
    name: 'spp-manual',
    children: [
      {
        id: `${i}.1`,
        icon: 'mdi mdi-select',
        title: 'Manual',
        to: '/spp/manual',
        parent: 'spp-manual',
        name: 'invoice-manual',
        action: 'index_menu',
        subject: 'isr_manual_invoice',
      },
      {
        id: `${i}.2`,
        icon: 'mdi mdi-select',
        title: 'Review',
        to: '/invoice_manual/review',
        parent: 'spp-manual',
        name: 'review-invoice-manual',
        action: 'index_menu',
        subject: 'isr_invoice_submission',
      }
    ],
  },
  {
    id: i++,
    icon: 'folder',
    title: 'Mutasi',
    i18n: 'Mutasi',
    to: '/invoice_mutation',
    name: 'invoice-mutation',
    action: 'index_menu',
    subject: 'isr_invoice_mutation',
  },
  {
    id: i++,
    icon: 'edit',
    title: 'Modifikasi',
    i18n: 'Modifikasi',
    to: '/invoice-modification',
    name: 'invoice-modification',
    action: 'index_menu',
    subject: 'isr_invoice_mutation',
    // subject: 'isr_invoice_modification',
  },
  {
    id: i++,
    header: 'Keringanan',
    icon: 'mdi mdi-dots-horizontal',
  },
  {
    id: i++,
    icon: 'pause-circle',
    title: 'Penundaan',
    i18n: 'Penundaan',
    name: 'invoice-postponement',
    children: [
      {
        id: `${i}.1`,
        icon: 'fas fa-file',
        title: 'Permohonan',
        to: '/spp/penundaan_manual',
        parent: 'invoice-postponement',
        name: 'invoice-postponement-index',
        action: 'index_menu',
        subject: 'isr_postponement',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-edit',
        title: 'Verifikasi',
        to: '/spp/verifikasi_penundaan',
        parent: 'invoice-postponement',
        name: 'invoice-postponement-verification',
        action: 'index_menu',
        subject: 'isr_postponement_appeal_submission',
      },
      {
        id: `${i}.3`,
        icon: 'fas fa-search',
        title: 'Review',
        to: '/spp/pratinjau_penundaan',
        parent: 'invoice-postponement',
        name: 'invoice-postponement-submission',
        action: 'index_menu',
        subject: 'isr_postponement_submission',
      },
    ],
  },
  {
    id: i++,
    icon: 'file-minus',
    title: 'Pengurangan',
    i18n: 'Pengurangan',
    name: 'invoice-reduction',
    children: [
      {
        id: `${i}.1`,
        icon: 'fas fa-file',
        title: 'Permohonan',
        i18n: 'Permohonan',
        to: '/invoice-reduction',
        parent: 'invoice-reduction',
        name: 'invoice-reduction-index',
        action: 'index_menu',
        subject: 'isr_reduction',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-edit',
        title: 'Verifikasi',
        i18n: 'Verifikasi',
        to: '/invoice-reduction-appeal-submission',
        parent: 'invoice-reduction',
        name: 'invoice-reduction-verification',
        action: 'index_menu',
        subject: 'isr_reduction_appeal_submission',
      },
      {
        id: `${i}.3`,
        icon: 'fas fa-search',
        title: 'Review',
        i18n: 'Review',
        to: '/invoice-reduction-submission',
        parent: 'invoice-reduction',
        name: 'invoice-reduction-submission',
        action: 'index_menu',
        subject: 'isr_reduction_submission',
      },
    ],
  },
  {
    id: i++,
    icon: 'server',
    title: 'Cicilan',
    i18n: 'Cicilan',
    name: 'invoice-installment',
    children: [
      {
        id: `${i}.1`,
        icon: 'fas fa-file',
        title: 'Permohonan',
        to: '/invoice-installment',
        parent: 'invoice-installment',
        name: 'invoice-installment-index',
        action: 'index_menu',
        subject: 'isr_installment',
      },
      {
        id: `${i}.2`,
        icon: 'fas fa-edit',
        title: 'Verifikasi',
        to: '/installment-appeal-submission',
        parent: 'invoice-installment',
        name: 'invoice-installment-verification',
        action: 'index_menu',
        subject: 'isr_installment_appeal_submission',
      },
      {
        id: `${i}.3`,
        icon: 'fas fa-search',
        title: 'Review',
        to: '/installment-submission',
        parent: 'invoice-installment',
        name: 'invoice-installment-submission',
        action: 'index_menu',
        subject: 'isr_installment_invoice',
      },
    ],
  },
  {
    id: i++,
    icon: 'pause',
    title: 'Penghentian Denda',
    i18n: 'Penghentian Denda',
    to: '/relaxation/fine',
    name: 'relaxation-fine',
    action: 'index_menu',
    subject: 'isr_fine_relaxation',
  },
  {
    id: i++,
    header: 'Rekonsiliasi',
    icon: 'mdi mdi-dots-horizontal',
  },
  {
    id: i++,
    icon: 'refresh-cw',
    title: 'Penerimaan',
    i18n: 'Penerimaan',
    to: '/reconciliation/receipt',
    name: 'reconciliation-receipt',
    action: 'index_menu',
    subject: 'isr_revenue_reconciliation',
  },
  {
    id: i++,
    icon: 'clipboard',
    title: 'Piutang',
    i18n: 'Piutang',
    to: '/rekonsiliasi/piutang',
    name: 'reconciliation-account-receivable',
    action: 'index_menu',
    subject: 'isr_bhp_account_receivable_reconciliation',
  },
  {
    id: i++,
    header: 'Laporan',
    icon: 'mdi mdi-dots-horizontal',
  },
  {
    id: i++,
    icon: 'file-text',
    title: 'Pembayaran Dimuka',
    i18n: 'Pembayaran dimuka',
    to: '/upfront-fee-report',
    name: 'upfront-fee-report',
    action: 'index_menu',
    subject: 'isr_upfront_fee_payment_report',
  },
  {
    id: i++,
    icon: 'file-text',
    title: 'Operasional',
    i18n: 'Operasional',
    to: '/laporan-operasional',
    name: 'lo-report',
    action: 'index_menu',
    subject: 'isr_operational_report',
  },
  {
    id: i++,
    icon: 'file-text',
    title: 'Realisasi Anggaran',
    i18n: 'Realisasi Anggaran',
    to: '/budget-realisation-report',
    name: 'realisation-report',
    action: 'index_menu',
    subject: 'isr_budget_realisation_report',
  },
  {
    id: i++,
    header: 'Messaging',
    icon: 'mdi mdi-dots-horizontal',
  },
  {
    id: i++,
    icon: 'mail',
    title: 'Invoice E-mail',
    i18n: 'Invoice E-mail',
    to: '/invoice-email',
    name: 'invoice-mail',
    action: 'index_menu',
    subject: 'isr_invoice_email',
  },
]
