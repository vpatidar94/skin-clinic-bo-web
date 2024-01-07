import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, InvestigationParamVo, OrgPharmacyOrderCountDto, PharmacyOrderVo, } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class PharmacyApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateOrder(vo: PharmacyOrderVo): Observable<ApiResponse<PharmacyOrderVo>> {
        return this.http.post<ApiResponse<PharmacyOrderVo>>(environment.apiUrl + URL.PHARMACY_ORDER_ADD_UPDATE, vo);
    }

    public getOrderList(orgId: string, pageNumber: number, maxRecord: number): Observable<ApiResponse<OrgPharmacyOrderCountDto>> {
        return this.http.get<ApiResponse<OrgPharmacyOrderCountDto>>(environment.apiUrl + URL.PHARMACY_ORDER_ORDER_LIST_BY_ORG, { params: { orgId, pageNumber, maxRecord } });
    }

    // public getOrderList(orgId: string): Observable<ApiResponse<InvestigationParamVo[]>> {
    //     return this.http.get<ApiResponse<InvestigationParamVo[]>>(environment.apiUrl + URL.INVESTIGATION_LIST, { params: { orgId } });
    // }
}
