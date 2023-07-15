import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, OrgVo, UserAccessDetailDto, UserEmpDto, UserVo } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { URL } from '../../const/url';

@Injectable()
export class UserApi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public addUpdateStaff(user: UserEmpDto): Observable<ApiResponse<UserVo>> {
        return this.http.post<ApiResponse<UserVo>>(environment.apiUrl + URL.ADD_UPDATE_STAFF, user);
    }

    public getStaffList(orgId: string): Observable<ApiResponse<UserVo[]>> {
        return this.http.get<ApiResponse<UserVo[]>>(environment.apiUrl + URL.STAFF_LIST, { params: { orgId } });
    }

    public getUserAllAccessList(): Observable<ApiResponse<UserAccessDetailDto>> {
        return this.http.get<ApiResponse<UserAccessDetailDto>>(environment.apiUrl + URL.ACCESS_LIST);
    }
}

