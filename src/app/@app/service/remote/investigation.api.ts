import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, InvestigationParamVo, } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class InvestigationApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateInvestigation(investigationParameters: InvestigationParamVo): Observable<ApiResponse<InvestigationParamVo>> {
        return this.http.post<ApiResponse<InvestigationParamVo>>(environment.apiUrl + URL.ADD_UPDATE_INVESTIGATION, investigationParameters);
    }

    public getInvestigationList(orgId: string): Observable<ApiResponse<InvestigationParamVo[]>> {
        return this.http.get<ApiResponse<InvestigationParamVo[]>>(environment.apiUrl + URL.ORG_DEPARTMENT_LIST, { params: { orgId } });
    }

}
