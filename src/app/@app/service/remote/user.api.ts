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

    public deleteStaff(orgId: string, userId: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(environment.apiUrl + URL.DELETE_STAFF, { params: { orgId, userId } });
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

        const req = new HttpRequest('POST', environment.apiUrl + URL.USER_ASSET_UPLOAD, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }


    public uploadObservationImage = (file: File, empId: string, fileName: string, assetIdentity: string):Observable<HttpEvent<ApiResponse<string>>> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('assetId', empId);
        formData.append('fileName', fileName);
        formData.append('assetIdentity', assetIdentity);

        // const req = new HttpRequest('POST', environment.apiUrl + URL.USER_ASSET_UPLOAD, formData, {
            const req = new HttpRequest('POST', environment.apiUrl + URL.OBSERVATION_IMAGES_UPLOAD, formData, {
                    reportProgress: true,
                    responseType: 'text'
                });
        
                return this.http.request(req);
    
        // return this.http.post(`${environment.apiUrl + URL.USER_ASSET_UPLOAD}`, formData);
    };
    

    public sendOtp(empCode: string): Observable<ApiResponse<boolean>> {
        return this.http.get<ApiResponse<boolean>>(environment.apiUrl + URL.SEND_OTP, { params: { empCode } });
    }

    public resetPassword(empCode: string, otp: string): Observable<ApiResponse<string>> {
        return this.http.get<ApiResponse<string>>(environment.apiUrl + URL.RESET_PASSWORD_LINK, { params: { empCode, otp } });
    }


    public getImages(folder: string): Observable<string[]> {
        // return this.http.get<string[]>(`https://aayam-clinic-storage.blr1.digitaloceanspaces.com/${folder}`);
        return this.http.get<string[]>(`${environment.apiUrl}/api/core/v1/user/list-images?folder=${folder}`);
      }







    public uploadObservationImages(formData: FormData, visitId: string, assetIdentity: string): Observable<HttpEvent<ApiResponse<string[]>>> {
        formData.append('assetId', visitId);
        formData.append('assetIdentity', assetIdentity);
    
        // const req = new HttpRequest('POST', environment.apiUrl + URL.OBSERVATION_ASSET_UPLOAD, formData, {
            const req = new HttpRequest('POST', environment.apiUrl + URL.USER_ASSET_UPLOAD, formData, {

            reportProgress: true,
            responseType: 'json'
        });
    
        return this.http.request(req);
    }
    
    // public getObservationImages(visitId: string): Observable<HttpEvent<ApiResponse<string[]>>> {
    //     // return this.http.get<ApiResponse<string[]>>(`${environment.apiUrl}${URL.OBSERVATION_ASSET_IMAGES}/${visitId}`);
    //     return this.http.get<ApiResponse<string[]>>(`${environment.apiUrl}${URL.USER_ASSET_UPLOAD}/${visitId}`);

    // }

    public getObservationImages(visitId: string): Observable<ApiResponse<string[]>> {
        return this.http.get<ApiResponse<string[]>>(`${environment.apiUrl}${URL.USER_ASSET_UPLOAD}/${visitId}`);
    }
}

