import { Component, Input } from '@angular/core';
import { AssetPathUtility, OrderAddTransactionDto, OrderItemVo, OrgPharmacyOrderDto, OrgVo, PrescriptionVo, ProductVo, TxVo } from 'aayam-clinic-core';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-billing-print',
  templateUrl: './billing-print.component.html',
  styleUrls: ['./billing-print.component.scss']
})
export class BillingPrintComponent {

  /* ************************************* Constructors ******************************************** */
  constructor(private globalEmitterService: GlobalEmitterService,
    private keyValueStorageService: KeyValueStorageService) {
    this.globalEmitterService.getAclChangedEmitter().subscribe(() => {
      this._init();
    });
  }
  /* ************************************ Static Fields ************************************ */
  /* ************************************ Instance Fields ************************************ */
  currentDate = new Date();
  receiptNo = '001223'
  doctorName = 'Dr. John Snow';
  patientId = '1214';
  visitId = '0125'
  patientName = 'Mr Sheru Verma';
  fatherName = 'Mr Singh';
  gender = 'Male';
  age = '29';
  patientAddress = '';
  paymentMode = 'Cash';
  paymentStatus = "Paid";


  org!: OrgVo | null;
  logo!: string | null;

  @Input()
  pharmacyOrder!: OrgPharmacyOrderDto;

  @Input()
  orderTransaction!: OrderAddTransactionDto;

  tx!: TxVo;

  @Input()
  pharmacyItem!: OrderItemVo[];

  @Input()
  prescriptionMap!: { [key: string]: PrescriptionVo };

  @Input()
  productMap!: { [key: string]: ProductVo };

  /* ************************************* Public Methods ******************************************** */
  ngOnInit() {
    this._init();
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this.org = this.keyValueStorageService.getOrg();
    if (this.org?.logo) {
      this.logo = environment.bucketUrl + AssetPathUtility.getPathOrgLogo(this.org._id) + '.png';
    } else {
      this.logo = null;
    }
    if (this.pharmacyOrder.order?.tx?.length > 0) {
      this.tx = this.pharmacyOrder.order.tx[this.pharmacyOrder.order.tx.length - 1];
    }
  }
}
