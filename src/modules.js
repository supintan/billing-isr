// Sample
import Sample from '@/modules/sample'
import MasterFine from '@/modules/master/fine'
import MasterEmployee from '@/modules/master/employee'
import MasterTemplate from '@/modules/master/template'
import MasterDigitalSignature from '@/modules/master/digital-signature'
import MasterIndexPrice from '@/modules/master/price/index-price'
import MasterServiceSubservice from '@/modules/master/service-subservice'
import StationModule from '@/modules/station'
import SPPManagementModule from '@/modules/spp-management'
import BHPFrekuensi from '@/modules/bhp-frekuensi'
import DashboardModule from '@/modules/dashboard'
import ApiLogModule from '@/modules/external-system/api-log'
import DataWarehouseLogModule from '@/modules/external-system/data-warehouse-log'
import PaymentgatewayLogModule from '@/modules/external-system/payment-gateway-log'
import PrintInvoiceModule from '@/modules/spp/print-invoice'
// import InvoiceManagementModule from '@/modules/spp/invoice-management'
import InvoiceManualPaymentModule from '@/modules/spp/invoice-manual-payment'
import InvoiceReductionModule from '@/modules/spp/invoice-reduction/reduction'
import InvoiceReductionAppealSubmissionModule from '@/modules/spp/invoice-reduction/reduction-appeal-submission'
import InvoiceReductionSubmissionModule from '@/modules/spp/invoice-reduction/reduction-submission'
import InvoiceInstallmentModule from '@/modules/spp/invoice-installment'
import InvoiceInstallmentAppealSubmissionModule from '@/modules/spp/invoice-installment/invoice_installment_appeal_submission'
import InvoiceInstallmentSubmissionModule from '@/modules/spp/invoice-installment/invoice_installment_submission'
import InvoiceMutationModule from '@/modules/spp/invoice-mutation'
import PoolingModule from '@/modules/spp/pooling'
import PoolingAppealSubmissionModule from '@/modules/spp/pooling/pooling-appeal-submission'
import PoolingSubmissionModule from '@/modules/spp/pooling/pooling-submission'
import InvoiceDepositModule from '@/modules/spp/invoice-deposit'
import InvoicePostponement from '@/modules/spp/invoice-postponement'
import InvoiceManual from '@/modules/spp/invoice-manual'
import InvoiceModification from '@/modules/spp/invoice-modification'
import FineRelaxationModule from '@/modules/relaxation/fine-relaxation'
import BudgetRealisationReportModule from '@/modules/report/budget-realisation-report'
import UpfrontFeeReportModule from '@/modules/report/advance-payment-report'
import OperationalReportModule from '@/modules/report/operational-report'
import BasePriceModule from '@/modules/master/price/base-price'
import ReceiptReconsiliationModule from '@/modules/reconciliation/receipt'
import CreditReconsiliationModule from '@/modules/reconciliation/credit'
import MessagingModule from '@/modules/messaging'
import MasterUserModule from '@/modules/master/user'
import MasterGroupModule from '@/modules/master/group'

const data = {
  // Sample
  Sample,
  MasterFine,
  MasterEmployee,
  MasterTemplate,
  MasterDigitalSignature,
  MasterIndexPrice,
  MasterServiceSubservice,
  StationModule,
  SPPManagementModule,
  BHPFrekuensi,
  DashboardModule,
  ApiLogModule,
  DataWarehouseLogModule,
  PaymentgatewayLogModule,
  PrintInvoiceModule,
  // InvoiceManagementModule
  InvoiceManualPaymentModule,
  InvoiceReductionModule,
  InvoiceReductionAppealSubmissionModule,
  InvoiceReductionSubmissionModule,
  InvoiceInstallmentModule,
  InvoiceInstallmentAppealSubmissionModule,
  InvoiceInstallmentSubmissionModule,
  InvoiceMutationModule,
  PoolingModule,
  PoolingAppealSubmissionModule,
  PoolingSubmissionModule,
  InvoiceDepositModule,
  InvoicePostponement,
  InvoiceManual,
  InvoiceModification,
  FineRelaxationModule,
  BudgetRealisationReportModule,
  UpfrontFeeReportModule,
  OperationalReportModule,
  BasePriceModule,
  ReceiptReconsiliationModule,
  CreditReconsiliationModule,
  MessagingModule,
  MasterUserModule,
  MasterGroupModule,
}

export const ax = a => a

export const modulesData = data
