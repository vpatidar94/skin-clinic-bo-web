import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, OrgVo, ItemVo, UserAuthDto, ItemDetailDto, UserVo, ServiceTypeVo } from 'aayam-clinic-core';
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

    public addUpdateServiceType(service: ServiceTypeVo): Observable<ApiResponse<ServiceTypeVo>> {
        return this.http.post<ApiResponse<ServiceTypeVo>>(environment.apiUrl + '/api/core/v1/service-item/service-type-add-update', service);
    }

    public getServiceTypeList(orgId: string): Observable<ApiResponse<ServiceTypeVo[]>> {
        return this.http.get<ApiResponse<ServiceTypeVo[]>>(environment.apiUrl + '/api/core/v1/service-item/service-type-list?orgId=64d1eb29e42c4aa42aadb542', { params: { orgId } });
    }

}

