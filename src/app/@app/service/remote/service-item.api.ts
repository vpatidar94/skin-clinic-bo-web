import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, OrgVo, ItemVo, UserAuthDto, ItemDetailDto } from 'aayam-clinic-core';
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
}

