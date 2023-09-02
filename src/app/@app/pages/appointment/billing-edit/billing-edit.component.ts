import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ObservationVo, UserBookingDto, BookingUtility, BookingAddTransactionDto, ApiResponse, ResponseStatus, BookingVo } from 'aayam-clinic-core';
import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
import { ConfirmDeleteDialogComponent } from 'src/app/@shared/component/dialog/confirm-delete-dialog.component';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
  selector: 'app-billing-edit',
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.scss'],
})
export class BillingEditComponent implements OnInit {
  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */

  // @Input()
  // billing!: Array<string>;
  // @Output()
  // billingChange = new EventEmitter<Array<string>>();

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
  // public ngOnInit(): void {
  //     this._init();
  //     // @ts-ignore
  //     this.testForm.valueChanges.subscribe(() => {
  //         this._formChanged();
  //     });
  // }

  // public addTestSuggestion(): void {
  //     this.test.push("");
  // }

  // public removeTestSuggestion(index: number): void {
  //     this._confirmRemoveItem(index);
  // }

  // public trackByIndex(index: number, obj: any): any {
  //     return index;
  // }


  // /* ************************************ Private Methods ************************************ */
  // private _init(): void {
  // }

  // private _confirmRemoveItem(index: number): void {
  //     const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
  //         width: '250px',
  //         data: { key: 'test' }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //         if (result) {
  //             this.test.splice(index, 1);
  //         }
  //     });
  // }

  // private _formChanged(): void {
  //     const actionDto = {
  //         action: 'CHANGE_FORM_TEST',
  //         data: this.testForm.invalid
  //     } as UiActionDto<boolean>;
  //     this.pubSub.emit(actionDto);
  // }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    const transactionItem = {} as BookingAddTransactionDto;
    // prescriptionItem.dosage = "";
    // prescriptionItem.duration = 1;
    // prescriptionItem.instruction = "";
    // prescriptionItem.name = "";
    // this.userBooking.booking.prescription.push(prescriptionItem);
    // this.userBookingChange.emit(this.userBooking);
    this.bookingTransaction=transactionItem;
  }

  public onPaymentModeChange(event: Event) {

    const selectElement = event.target as HTMLSelectElement;
    this.showChequeInbox = selectElement.value === 'Cheque';
  }

  public getCommaSeparatedServices(): string {
    return this.userBooking.booking.items.map((item) => item.name).join(', ');
  }

  public applyDiscount(): void {
    BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
    this.userBookingChange.emit(this.userBooking);
    console.log("llll", this.userBooking);
  }

  public payMethod(): void {
    this.transactionApi.addUpdateTransaction(this.bookingTransaction).subscribe((res: ApiResponse<UserBookingDto>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
        // this.booking = res.body
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

