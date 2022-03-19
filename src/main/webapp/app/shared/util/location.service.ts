import { IResponse } from 'app/shared/model/response.model';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class LocationService {
  public resourceUrl = SERVER_API_URL + '/area';
  public resourceUrlEthnic = SERVER_API_URL + '/ethnic';
  public resourceUrlChangePass = SERVER_API_URL + '/account';

  constructor(private http: HttpClient) {}

  changePassword(options: any): Observable<any> {
    return this.http.post(`${this.resourceUrlChangePass}/change-password`, options);
  }

  getCountry(): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.resourceUrl}/search`, { observe: 'response' });
  }

  getCity(code: any): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.resourceUrl}/getChildrenNearest/${code}`);
  }
  getDistrict(code: any): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.resourceUrl}/getChildrenNearest/${code}`);
  }
  getEthnic(): Observable<any> {
    return this.http.post(`${this.resourceUrlEthnic}/search`, httpOptions);
  }
}
