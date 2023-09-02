import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ObservationVo, UserBookingDto, BookingUtility, BookingAddTransactionDto, ApiResponse, ResponseStatus, BookingVo } from 'aayam-clinic-core';
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

  bookingTransaction!: BookingAddTransactionDto;

  @Output()
  userBookingChange = new EventEmitter<UserBookingDto>();

  @Output()
  pubSub = new EventEmitter<any>();

  @ViewChild('billingForm', { static: true })
  billingForm!: NgForm;

  panelOpenState = false;

  showChequeInbox: boolean = false;



  /* ************************************ Constructors ************************************ */
  constructor(private transactionApi: TransactionApi) {

  }

  
  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    const transactionItem = {} as BookingAddTransactionDto;
    // this.userBookingChange.emit(this.userBooking);
    this.bookingTransaction=transactionItem;
  }

  public onPaymentModeChange(event: Event) {

    const selectElement = event.target as HTMLSelectElement;
    this.showChequeInbox = selectElement.value === 'Cheque';
  }

  public getCommaSeparatedServices(): string {
    return this.userBooking?.booking?.items?.map((item) => item.name).join(', ');
  }

  public applyDiscount(): void {
    BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
    this.userBookingChange.emit(this.userBooking);
    console.log("llll", this.userBooking);
  }

  public payMethod(): void {
    this.transactionApi.addUpdateTransaction(this.bookingTransaction).subscribe((res: ApiResponse<BookingVo>) => {
      if ((res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body)) {
        this.userBooking.booking = res.body;
        console.log('ll',res.body);
      }
      console.log("hhhh",res.body);

    });

  }

  /* ************************************ Private Methods ************************************ */

  private _formChanged(): void {
    const actionDto = {
      action: 'CHANGE_FORM_PATIENT',
      data: this.billingForm.invalid
    } as UiActionDto<boolean>;
    this.pubSub.emit(actionDto);
  }
}

