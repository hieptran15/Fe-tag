import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ProfileInfo, InfoResponse } from './profile-info.model';
import { IResponse } from 'app/shared/model/response.model';

const AUTH_API = SERVER_API_URL + '/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private infoUrl = SERVER_API_URL + '/management/info';
  private profileInfo$!: Observable<ProfileInfo>;

  constructor(private http: HttpClient) {}

  getProfileInfo(): Observable<ProfileInfo> {
    if (this.profileInfo$) {
      return this.profileInfo$;
    }

    this.profileInfo$ = this.http.get<InfoResponse>(this.infoUrl).pipe(
      map((response: InfoResponse) => {
        const profileInfo: ProfileInfo = {
          activeProfiles: response.activeProfiles,
          inProduction: response.activeProfiles && response.activeProfiles.includes('prod'),
          swaggerEnabled: response.activeProfiles && response.activeProfiles.includes('swagger'),
        };
        if (response.activeProfiles && response['display-ribbon-on-profiles']) {
          const displayRibbonOnProfiles = response['display-ribbon-on-profiles']!.split(',');
          const ribbonProfiles = displayRibbonOnProfiles.filter(
            profile => response.activeProfiles && response.activeProfiles.includes(profile)
          );
          if (ribbonProfiles.length > 0) {
            profileInfo.ribbonEnv = ribbonProfiles[0];
          }
        }
        return profileInfo;
      }),
      shareReplay()
    );
    return this.profileInfo$;
  }

  getPercent(): Observable<any> {
    return this.http.get(AUTH_API + 'get-static-info', httpOptions);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(AUTH_API + 'get-user-profile', httpOptions);
  }

  getUserLang(): Observable<any> {
    return this.http.get(AUTH_API + 'get-language-profile', httpOptions);
  }

  getUserExp(): Observable<any> {
    return this.http.get(AUTH_API + 'get-experience-profile', httpOptions);
  }

  getUserEdu(): Observable<any> {
    return this.http.get(AUTH_API + 'get-education-profile', httpOptions);
  }

  getUserDoc(): Observable<any> {
    return this.http.get(AUTH_API + 'get-document-profile', httpOptions);
  }

  updateProfile(data: any): any {
    return this.http.post(AUTH_API + 'update-profile', data, httpOptions);
  }

  updateAvt(data: any): any {
    return this.http.post(AUTH_API + 'update-profile', data, httpOptions);
  }

  updateLang(data: any): any {
    return this.http.post(AUTH_API + 'update-language', data, httpOptions);
  }

  deleteLang(data: any): any {
    return this.http.post(AUTH_API + 'delete-language', data, httpOptions);
  }

  updateExp(data: any): any {
    return this.http.post(AUTH_API + 'update-experience', data, httpOptions);
  }

  deleteExp(data: any): any {
    return this.http.post(AUTH_API + 'delete-experience', data, httpOptions);
  }

  updateEdu(data: any): any {
    return this.http.post(AUTH_API + 'update-education', data, httpOptions);
  }

  deleteEdu(data: any): any {
    return this.http.post(AUTH_API + 'delete-education', data, httpOptions);
  }
  updateDoc(formData: any): Observable<IResponse> {
    return this.http.post<IResponse>(AUTH_API + 'uploadDocument', formData);
  }
  deleteDoc(data: any): any {
    return this.http.post(AUTH_API + 'delete-document', data, httpOptions);
  }
  getLinkUpload(fileName: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${AUTH_API}get-link?fileName=${fileName}`);
  }
}
