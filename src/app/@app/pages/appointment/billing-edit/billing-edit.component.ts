import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponse, BookingAddTransactionDto, BookingUtility, BookingVo, ResponseStatus, UserBookingDto } from 'aayam-clinic-core';
import { BookingApi } from 'src/app/@app/service/remote/booking.api';
import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
        this.showPendingAmount = false;
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
    this.makeAmountEditable = true;
    
  }

  public removeServiceItem(): void {
    this.showPendingAmount = false;
    this.makeAmountEditable = false;
  }

  public addServiceItemNew(): void {
    this.showPendingAmount = true;
    this.newPendingAmount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid- this.bookingTransaction.amount;
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this.bookingTransaction = {} as BookingAddTransactionDto;
    this.bookingTransaction.bookingId = this.userBooking.booking._id;
    this.bookingTransaction.amount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid
    this.bookingTransactionChange.emit(this.bookingTransaction);
  }
}