import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, BookingAddTransactionDto, BookingVo, OrgBookingCountDto, OrgBookingDto, UserBookingDto, UserBookingInvestigationDto } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class TransactionApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */

    public addUpdateTransaction(bookingTransaction: BookingAddTransactionDto): Observable<ApiResponse<UserBookingDto>> {
        return this.http.post<ApiResponse<UserBookingDto>>(environment.apiUrl + '/api/core/v1/booking/transaction-add-update' , bookingTransaction);
    }

}

