import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, BookingAddTransactionDto, BookingVo, OrderAddTransactionDto, OrgBookingCountDto, OrgBookingDto, PharmacyOrderVo, UserBookingDto, UserBookingInvestigationDto } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class TransactionApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */

    public addUpdateTransaction(bookingTransaction: BookingAddTransactionDto): Observable<ApiResponse<BookingVo>> {
        return this.http.post<ApiResponse<BookingVo>>(environment.apiUrl + '/api/core/v1/booking/transaction-add-update' , bookingTransaction);
    }

    // Pharmacy Billing
    public addUpdatePharmacyTransaction(PharmacyTransaction: OrderAddTransactionDto): Observable<ApiResponse<PharmacyOrderVo>> {
        return this.http.post<ApiResponse<PharmacyOrderVo>>(environment.apiUrl + '/api/core/v1/pharmacy/transaction-add-update' , PharmacyTransaction);
    }


}

