import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IResponse } from 'app/shared/model/response.model';

const AUTH_API = SERVER_API_URL + '/projects/';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects(data: any): Observable<HttpResponse<IResponse>> {
    return this.http.post<IResponse>(AUTH_API + 'get-all-my-projects?page=' + data.page + '&size=' + data.size, data, {
      observe: 'response',
    });
  }
  getProjectsSortMin(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      AUTH_API + 'get-all-my-projects?page=' + data.page + '&size=' + data.size + '&sort=' + data.price + ',desc',
      {}
    );
  }
  getProjectsSortMax(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      AUTH_API + 'get-all-my-projects?page=' + data.page + '&size=' + data.size + '&sort=' + data.price + ',asc',
      { observe: 'response' }
    );
  }
  getDeadlineProjectsNearest(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      AUTH_API + 'get-all-my-projects?page=' + data.page + '&size=' + data.size + '&sort=' + data.deadline + ',desc',
      {}
    );
  }
  getDeadlineProjectsFurthest(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      AUTH_API + 'get-all-my-projects?page=' + data.page + '&size=' + data.size + '&sort=' + data.deadline + ',asc',
      { observe: 'response' }
    );
  }
}
