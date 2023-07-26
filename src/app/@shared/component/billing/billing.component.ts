import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderItemVo, ItemVo, BookingVo } from 'aayam-clinic-core';

@Component({
  selector: 'app-billing',
  templateUrl: 'billing.component.html'
})
export class BillingComponent implements OnInit {
@Input() orderItemsList: Array<OrderItemVo> = [];
@Input() bookingItemsList!: BookingVo;


  constructor(public dialogRef: MatDialogRef<BillingComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (this.data && this.data.bookingItemsList) {
      this.bookingItemsList = this.data.bookingItemsList;
      this.orderItemsList = this.data.orderItemsList;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
