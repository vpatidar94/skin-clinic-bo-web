import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, UserAuthDto } from 'aayam-clinic-core';

@Injectable()
export class AuthAPi {

    /* ************************************ Constructors ************************************ */
    constructor(private http: HttpClient) {
    }

    /* ************************************ Public Methods ************************************ */
    public authenticate(userAuthDto: UserAuthDto): Observable<ApiResponse<string>> {
        return this.http.post<ApiResponse<string>>(environment.apiUrl + '/api/core/v1/auth/login', userAuthDto);
    }
}

