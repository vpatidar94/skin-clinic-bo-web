import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse, BookingAddTransactionDto, BookingUtility, BookingVo, MessageType, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { BookingApi } from 'src/app/@app/service/remote/booking.api';
import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
import { PdfViewerDialogComponent } from './pdf-viewer-dialog.component';
import { AlertMessage } from 'src/app/@shared/dto/alert-message';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { BillingReceiptPrintComponent } from './billing-receipt-print/billing-receipt-print.component';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';

@Component({
  selector: 'app-patient-billing-edit',
  templateUrl: './patient-billing-edit.component.html',
  styleUrls: ['./patient-billing-edit.component.scss'],
})
export class PatientBillingEditComponent implements OnInit {
  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */
  @Input()
  userBooking!: UserBookingDto;

  @Input()
  doctorList!: UserVo[];

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

  paymentMode!: string;

  showPayInfo: boolean = true;



  /* ************************************ Constructors ************************************ */
  constructor(private transactionApi: TransactionApi,
    private bookingApi: BookingApi,
    private zone: NgZone,
    private dialog: MatDialog,
    private glabalEmitterService: GlobalEmitterService) {
  }


  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    if((this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid)===0){
      this.showPayInfo = false;
    }
    this._init();
  }

  public onPaymentModeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.showChequeInbox = selectElement.value === 'CHEQUE';
    this.paymentMode = this.bookingTransaction.paymentMode;
    console.log("mode is ",this.paymentMode);
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
      if ((res.status === ResponseStatusConst.SUCCESS && res.body)) {
        this.userBooking.booking = res.body;
        this.userBookingChange.emit(this.userBooking);
        this.showPendingAmount = false;
        
        // const message = {} as AlertMessage;
        // message.type = MessageTypeConst.SUCCESS;
        // message.text = 'Paid Successfully';
        // this.glabalEmitterService.addAlerMsg(message);
      }
      if((this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid)===0){
        this.showPayInfo = false;
      }

    });
  }

  public downloadReceipt(index: number): void {
    this.bookingApi.generateReceipt(this.userBooking.booking._id, this.userBooking.booking.tx[index]._id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' })
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.src = new Uint8Array(fileReader.result as ArrayBuffer);
        this._showReceiptPopup(this.src);
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
    this.newPendingAmount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid - this.bookingTransaction.amount;
  }

  public getDoctorById(Id: string|null |undefined ): string|null |undefined {
    const doctorId = Id;
    const doctor = this.doctorList?.find(doc => doc._id === doctorId);
    return doctor ? doctor.nameF + " " + doctor.nameL : "";
  }

  public generateReceipt(): void {
    console.log("receipt is generated");
    this.dialog.open(BillingReceiptPrintComponent, {
      height: '1500px',


      data: { userBooking:{...this.userBooking}, doctorList:this.doctorList, paymentMode: this.paymentMode },
    });
    // console.log("mode",selectElement);
    console.log("mode2",this.paymentMode)
  }

 
  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this.bookingTransaction = {} as BookingAddTransactionDto;
    this.bookingTransaction.bookingId = this.userBooking.booking._id;
    this.bookingTransaction.amount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid
    this.bookingTransactionChange.emit(this.bookingTransaction);
  }

  private _showReceiptPopup(src: Uint8Array): void {
    this.dialog.open(PdfViewerDialogComponent, {
      width: '800px',
      data: { src },
    });
  }
}