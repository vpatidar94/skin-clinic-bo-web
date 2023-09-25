import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponse, BookingAddTransactionDto, BookingUtility, BookingVo, ResponseStatus, UserBookingDto } from 'aayam-clinic-core';
import { BookingApi } from 'src/app/@app/service/remote/booking.api';
import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-billing-edit',
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.scss'],
})
export class BillingEditComponent implements OnInit {
  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */
  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;
  @Input()
  userBooking!: UserBookingDto;

  @Input()
  bookingTransaction!: BookingAddTransactionDto;
  @Output()
  bookingTransactionChange = new EventEmitter<BookingAddTransactionDto>();

  @Output()
  userBookingChange = new EventEmitter<UserBookingDto>();

  @Output()
  pubSub = new EventEmitter<any>();

  @ViewChild('billingForm', { static: true })
  billingForm!: NgForm;

  panelOpenState = false;

  showChequeInbox: boolean = false;

  isPdfLoaded: boolean = false;
  private pdf!: PDFDocumentProxy;
  public src!: Uint8Array;


  showPendingAmount: boolean = false;
  payingAmount!: number;
  newPendingAmount!: number;
  makeAmountEditable: boolean = false;


  /* ************************************ Constructors ************************************ */
  constructor(private transactionApi: TransactionApi,
    private bookingApi: BookingApi,
    private dialog: MatDialog) {
  }


  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    this._init();
  }

  public onPaymentModeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.showChequeInbox = selectElement.value === 'CHEQUE';
  }

  public getCommaSeparatedServices(): string {
    return this.userBooking?.booking?.items?.map((item) => item.name).join(', ');
  }

  public applyDiscount(): void {
    BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
    this.userBookingChange.emit(this.userBooking);
  }

  public pay(): void {
    this.transactionApi.addUpdateTransaction(this.bookingTransaction).subscribe((res: ApiResponse<BookingVo>) => {
      if ((res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body)) {
        this.userBooking.booking = res.body;
        this.userBookingChange.emit(this.userBooking);
      }
      
    });
  }

  public downloadReceipt(): void {
    this.bookingApi.generateReceipt(this.userBooking.booking._id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' })
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.src = new Uint8Array(fileReader.result as ArrayBuffer);
      };
      fileReader.readAsArrayBuffer(blob);
    });
  }

  public print(): void {
    this.pdf.getData().then((u8) => {
      let blob = new Blob([u8.buffer], {
        type: 'application/pdf'
      });

      const blobUrl = window.URL.createObjectURL((blob));
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow?.print();
    });
  }

  public onLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isPdfLoaded = true;
  }

  public showReceiptPopup() {
    this.downloadReceipt();
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          // TODO: Replace the following line with your code.
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }

    })
  }

  public addServiceItem(): void {
    this.showPendingAmount = true;
    // this.newPendingAmount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid- this.bookingTransaction.amount;
    this.makeAmountEditable = true;
    
  }

  removeServiceItem(): void {
    this.showPendingAmount = false;
    this.makeAmountEditable = false;
  }



  public addServiceItemNew(): void {
    this.showPendingAmount = true;
    this.newPendingAmount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid- this.bookingTransaction.amount;
    // this.makeAmountEditable=true;
    
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this.bookingTransaction = {} as BookingAddTransactionDto;
    this.bookingTransaction.bookingId = this.userBooking.booking._id;
    this.bookingTransaction.amount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid
    this.bookingTransactionChange.emit(this.bookingTransaction);
  }

  
}





// import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ObservationVo, UserBookingDto, BookingUtility, BookingAddTransactionDto, ApiResponse, ResponseStatus, BookingVo } from 'aayam-clinic-core';
// import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
// import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

// @Component({
//   selector: 'app-billing-edit',
//   templateUrl: './billing-edit.component.html',
//   styleUrls: ['./billing-edit.component.scss'],
// })
// export class BillingEditComponent implements OnInit {
//   /* ********************************* Static Field *************************************** */
//   /* *********************************** Instance Field *********************************** */
  
//   @Input()
//   userBooking!: UserBookingDto;

//   bookingTransaction!: BookingAddTransactionDto;

//   @Output()
//   userBookingChange = new EventEmitter<UserBookingDto>();

//   @Output()
//   pubSub = new EventEmitter<any>();
//  @ViewChild('billingForm', { static: true })
//   billingForm!: NgForm;

//   panelOpenState = false;

//   showChequeInbox: boolean = false;

//   showInstallmentTwo:boolean = false;

//   newVar: number = 0;
//   newVar2: number = 0;
  



//   /* ************************************ Constructors ************************************ */
//   constructor(private transactionApi: TransactionApi) {

//   }

  
//   /* ************************************ Public Methods ************************************ */
//   public ngOnInit(): void {
//     const transactionItem = {} as BookingAddTransactionDto;
//     // this.userBookingChange.emit(this.userBooking);
//     this.bookingTransaction=transactionItem;
//     this.newVar = this.userBooking.booking.totalDue;
//     // this.newVar2 = this.userBooking.booking.totalDue - this.newVar
//   }

//   public onPaymentModeChange(event: Event) {

//     const selectElement = event.target as HTMLSelectElement;
//     this.showChequeInbox = selectElement.value === 'Cheque';
//   }

//   public getCommaSeparatedServices(): string {
//     return this.userBooking?.booking?.items?.map((item) => item.name).join(', ');
//   }

//   public applyDiscount(): void {
//     BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
//     this.userBookingChange.emit(this.userBooking);
//     console.log("llll", this.userBooking);
//   }

//   public payMethod(): void {
//     this.transactionApi.addUpdateTransaction(this.bookingTransaction).subscribe((res: ApiResponse<BookingVo>) => {
//       if ((res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body)) {
//         this.userBooking.booking = res.body;
//         console.log('ll',res.body);
//       }
//       console.log("hhhh",res.body);

//     });

//   }

//   public addServiceItem(): void {
//     // const orderItem = {} as OrderItemVo;
//     // orderItem.item = {} as ItemVo;
//     // orderItem.amount = 0;
//     // this.userBooking.booking.items.push(orderItem);
//     // this.userBookingChange.emit(this.userBooking);
//     this.showInstallmentTwo = true;
//     // this.newVar = this.userBooking.booking.totalDue;
//      this.newVar2 = this.userBooking.booking.totalDue - this.newVar
// }

//   /* ************************************ Private Methods ************************************ */

//   private _formChanged(): void {
//     const actionDto = {
//       action: 'CHANGE_FORM_PATIENT',
//       data: this.billingForm.invalid
//     } as UiActionDto<boolean>;
//     this.pubSub.emit(actionDto);
//   }
// }