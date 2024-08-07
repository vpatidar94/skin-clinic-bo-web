import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ItemDetailDto, ItemVo, OrgBookingDto, ServiceTypeVo } from 'aayam-clinic-core';
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

    public getInvestigationServiceItemList(orgId: string): Observable<ApiResponse<ItemVo[]>> {
        return this.http.get<ApiResponse<any[]>>(environment.apiUrl + URL.SERVICE_ITEM_INVESTIGATION_LIST, { params: { orgId } });
    }

    public addUpdateServiceType(service: ServiceTypeVo): Observable<ApiResponse<ServiceTypeVo>> {
        return this.http.post<ApiResponse<ServiceTypeVo>>(environment.apiUrl + URL.ADD_UPDATE_SERVICE_TYPE, service);
    }

    public getServiceTypeList(orgId: string): Observable<ApiResponse<ServiceTypeVo[]>> {
        return this.http.get<ApiResponse<ServiceTypeVo[]>>(environment.apiUrl + URL.SERVICE_TYPE_LIST, { params: { orgId } });
    }

    public deleteByItemId(itemId: string): Observable<ApiResponse<boolean>> {
        return this.http.get<ApiResponse<boolean>>(environment.apiUrl + URL.DELETE_ITEM, { params: { itemId } });
    }


    // public searchOrgBooking(
    //     orgId: string,
    //     query: string,
    //     limit: number,
    //     offset: number
    //   ): Observable<OrgBookingDto[]> {
    //     const url = `${environment.apiUrl}/api/core/v1/booking/search-booking`; // Adjust the URL based on your API route
    //     return this.http.post<OrgBookingDto[]>(url, {
    //       orgId,
    //       query,
    //       limit,
    //       offset,
    //     });
    //   }

    searchOrgBooking(orgId: string, searchQuery: string, page: number, size: number): Observable<any> {
        const params = new HttpParams()
          .set('orgId', orgId)
          .set('query', searchQuery)
          .set('pageNumber', page.toString())
          .set('maxRecord', size.toString());
      
        return this.http.get<any>(`${environment.apiUrl}/api/core/v1/booking/search-booking`, { params });
      }

}

