import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponse, BookingAddTransactionDto, BookingUtility, BookingVo, ResponseStatus, UserBookingDto } from 'aayam-clinic-core';
import { BookingApi } from 'src/app/@app/service/remote/booking.api';
import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
  selector: 'app-billing-edit',
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.scss'],
})
export class BillingEditComponent implements OnInit {
  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */
  
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

  /* ************************************ Constructors ************************************ */
  constructor(private transactionApi: TransactionApi,
    private bookingApi: BookingApi) {

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
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = `RECEIPT_${this.userBooking.booking.no}.pdf`;
      link.click();
    });
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this.bookingTransaction = {} as BookingAddTransactionDto;
    this.bookingTransaction.bookingId = this.userBooking.booking._id;
    this.bookingTransaction.amount = this.userBooking.booking.totalDue - this.userBooking.booking.totalPaid
    this.bookingTransactionChange.emit(this.bookingTransaction);
  }
}

