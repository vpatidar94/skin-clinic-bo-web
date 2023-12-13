import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ItemDetailDto, ItemVo, ServiceTypeVo } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class ServiceItemApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateServiceItem(serviceItem: ItemVo): Observable<ApiResponse<ItemVo>> {
        return this.http.post<ApiResponse<ItemVo>>(environment.apiUrl + URL.ADD_UPDATE_SERVICE_ITEM, serviceItem);
    }

    public getServiceItemList(orgId:string): Observable<ApiResponse<ItemDetailDto[]>> {
        return this.http.get<ApiResponse<ItemDetailDto[]>>(environment.apiUrl + URL.SERVICE_ITEM_LIST, { params: { orgId } });
    }

    public getInvestigationServiceItemList(orgId: string): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(environment.apiUrl + URL.SERVICE_ITEM_INVESTIGATION_LIST, { params: { orgId } });
    }

    public addUpdateServiceType(service: ServiceTypeVo): Observable<ApiResponse<ServiceTypeVo>> {
        return this.http.post<ApiResponse<ServiceTypeVo>>(environment.apiUrl + URL.ADD_UPDATE_SERVICE_TYPE, service);
    }

    public getServiceTypeList(orgId: string): Observable<ApiResponse<ServiceTypeVo[]>> {
        return this.http.get<ApiResponse<ServiceTypeVo[]>>(environment.apiUrl + URL.SERVICE_TYPE_LIST, { params: { orgId } });
    }

}

