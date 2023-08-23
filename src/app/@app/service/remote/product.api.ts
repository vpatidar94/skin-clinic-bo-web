import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ProductVo, } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class ProductApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateProduct(product: ProductVo): Observable<ApiResponse<ProductVo>> {
        return this.http.post<ApiResponse<ProductVo>>(environment.apiUrl + URL.ADD_UPDATE_PRODUCT, product);
    }

    public getProductList(orgId: string): Observable<ApiResponse<ProductVo[]>> {
        return this.http.get<ApiResponse<ProductVo[]>>(environment.apiUrl + URL.PRODUCT_LIST, { params: { orgId } });
    }

}
