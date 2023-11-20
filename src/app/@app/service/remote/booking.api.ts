import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, OrgBookingCountDto, OrgBookingDto, UserBookingDto, UserBookingInvestigationDto } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class BookingApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateBooking(booking: UserBookingDto): Observable<ApiResponse<UserBookingDto>> {
        return this.http.post<ApiResponse<UserBookingDto>>(environment.apiUrl + URL.ADD_UPDATE_BOOKING, booking);
    }

    public getBookingList(userId: string, orgId: string): Observable<ApiResponse<UserBookingInvestigationDto>> {
        return this.http.get<ApiResponse<UserBookingInvestigationDto>>(environment.apiUrl + URL.BOOKING_LIST, { params: { userId, orgId } });
    }

    public getOrgBookingList(orgId: string, type: string, pageNumber: number, maxRecord: number): Observable<ApiResponse<OrgBookingCountDto>> {
        return this.http.get<ApiResponse<OrgBookingCountDto>>(environment.apiUrl + URL.ORG_BOOKING_LIST, { params: { orgId, type, pageNumber, maxRecord } });
    }

    public generateReceipt(bookingId: string, transactionId: string): Observable<any> {
        const httpOptions = {
            responseType: 'blob' as 'json',
            params: { bookingId, transactionId }
        };
        return this.http.get(environment.apiUrl + URL.BOOKING_RECEIPT, httpOptions);
    }

    public convertToPatient(bookingId: string, patientType: string, orgId: string): Observable<ApiResponse<null>> {
        return this.http.get<ApiResponse<null>>(environment.apiUrl + URL.CONVERT_PATIENT, { params: { bookingId, patientType, orgId } });
    }

    public getInvestigationList(orgId: string):Observable<ApiResponse<OrgBookingDto[]>> {
        return this.http.get<ApiResponse<OrgBookingDto[]>>(environment.apiUrl + '/api/core/v1/investigation/patient-list', { params: { orgId } });

    }

}

