import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IUser } from 'app/core/user/user.model';

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {
  constructor(private http: HttpClient) {}

  save(mail: IUser): Observable<{}> {
    return this.http.post(SERVER_API_URL + '/account/reset-password/init', mail);
  }
}
