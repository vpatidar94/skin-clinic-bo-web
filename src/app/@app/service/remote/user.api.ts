import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, OrgVo, UserAccessDetailDto, UserAccountVo, UserAuthVo, UserEmpDto, UserTypeDetailDto, UserTypeVo, UserVo } from 'aayam-clinic-core';
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

    public getDoctorList(orgId: string, subRole: string): Observable<ApiResponse<UserVo[]>> {
        return this.http.get<ApiResponse<UserVo[]>>(environment.apiUrl + URL.DOCTOR_ITEM_LIST, { params: { orgId, subRole } });
    }

    /*--Newly added to get doctor by departmentId--*/
    public getDoctorListByDepartmentId(orgId: string, departmentId: string): Observable<ApiResponse<UserVo[]>> {
        return this.http.get<ApiResponse<UserVo[]>>(environment.apiUrl +  URL.DOCTOR_BY_DEPT, { params: { orgId, departmentId } });
    }

    /*--user type--*/
    public addUpdateUserType(userType: UserTypeVo): Observable<ApiResponse<UserTypeVo>> {
        return this.http.post<ApiResponse<UserTypeVo>>(environment.apiUrl +  URL.ADD_UPDATE_USER_TYPE , userType);
    }

    public getUserTypeList(orgId: string): Observable<ApiResponse<UserTypeDetailDto[]>> {
        return this.http.get<ApiResponse<UserTypeDetailDto[]>>(environment.apiUrl + URL.USER_LIST, { params: { orgId } });
    }

    // userAccount update api
    public addUpdateUserAccount(userAccount: UserAccountVo): Observable<ApiResponse<UserAccountVo>> {
        return this.http.post<ApiResponse<UserAccountVo>>(environment.apiUrl +  '/api/core/v1/user/user-account-add-update' , userAccount);
    }

    public uploadUserImage(file: File, empId: string, assetIdentity: string): Observable<HttpEvent<ApiResponse<string>>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('assetId', empId);
        formdata.append('assetIdentity', assetIdentity);

        const req = new HttpRequest('POST', environment.apiUrl + URL.SEND_OTP, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    public sendOtp(empCode: string): Observable<ApiResponse<boolean>> {
        return this.http.get<ApiResponse<boolean>>(environment.apiUrl + URL.SEND_OTP, { params: { empCode } });
    }

    public resetPassword(empCode: string, otp: string): Observable<ApiResponse<string>> {
        return this.http.get<ApiResponse<string>>(environment.apiUrl + URL.RESET_PASSWORD_LINK, { params: { empCode, otp } });
    }
}

