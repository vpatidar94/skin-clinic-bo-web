import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, OrgCodeNoDto, OrgVo } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
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

    public getLastOrderNo(orgId: string): Observable<ApiResponse<OrgCodeNoDto>> {
        return this.http.get<ApiResponse<OrgCodeNoDto>>(environment.apiUrl + URL.LAST_ORDER_NO, { params: { orgId } });
    }

    public uploadOrgImage(file: File, orgId: string, assetIdentity: string): Observable<HttpEvent<ApiResponse<string>>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('assetId', orgId);
        formdata.append('assetIdentity', assetIdentity);

        const req = new HttpRequest('POST', environment.apiUrl + URL.ORG_ASSET_UPLOAD, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }
}

