import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IResponse } from 'app/shared/model/response.model';

const HITS_API = SERVER_API_URL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HitsService {
  constructor(protected http: HttpClient) {}

  getAllHits(keySearch: string, page: any, size: any): Observable<HttpResponse<IResponse>> {
    const options = new HttpParams().set('keySearch', keySearch).set('page', page).set('size', size);
    return this.http.get<IResponse>(HITS_API + '/hits/search', { params: options, observe: 'response' });
  }
  // searchHits(projectId: any): Observable<HttpResponse<IResponse>> {
  //   return this.http.get<HttpResponse<IResponse>>(HITS_API + '/hits/search/keySearch=' + projectId, httpOptions);
  // }

  // getHits(keySearch: any, data: any): Observable<HttpResponse<IResponse>> {
  //   return this.http.post<HttpResponse<IResponse>>(SERVER_API_URL + '/hits/search/keySearch=' + keySearch + '&page=' + data.page + '&size=' + data.size, httpOptions );
  // }
  uploadHits(data: any): Observable<HttpResponse<IResponse>> {
    return this.http.post<IResponse>(SERVER_API_URL + '/projects/upload', data, { observe: 'response' });
  }
}
