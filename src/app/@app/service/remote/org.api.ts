import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, OrgOrderNoDto, OrgVo, UserAuthDto } from 'aayam-clinic-core';
import { URL } from '../../const/url';

@Injectable()
export class OrgApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateOrg(org: OrgVo): Observable<ApiResponse<OrgVo>> {
        return this.http.post<ApiResponse<OrgVo>>(environment.apiUrl + URL.ADD_UPDATE_ORG, org);
    }

    public getOrgList(): Observable<ApiResponse<OrgVo[]>> {
        return this.http.get<ApiResponse<OrgVo[]>>(environment.apiUrl + URL.ORG_LIST);
    }

    public getLastOrderNo(orgId: string): Observable<ApiResponse<OrgOrderNoDto>> {
        return this.http.get<ApiResponse<OrgOrderNoDto>>(environment.apiUrl + URL.LAST_ORDER_NO, { params: { orgId } });
    }
}

