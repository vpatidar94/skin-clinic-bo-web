import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, DepartmentVo, } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class DepartmentApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateDepartment(department: DepartmentVo): Observable<ApiResponse<DepartmentVo>> {
        return this.http.post<ApiResponse<DepartmentVo>>(environment.apiUrl + URL.ADD_UPDATE_DEPARTMENT, department);
    }

    public getOrgDepartmentList(orgId: string): Observable<ApiResponse<DepartmentVo[]>> {
        return this.http.get<ApiResponse<DepartmentVo[]>>(environment.apiUrl + URL.ORG_DEPARTMENT_LIST, { params: { orgId } });
    }

}
