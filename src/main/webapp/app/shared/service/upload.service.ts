import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { IResponse } from 'app/shared/model/response.model';

const httpOptions = {
  responseType: 'blob' as 'json',
  observe: 'response' as 'response',
  headers: new HttpHeaders({
    'Content-Type': 'application/octet-stream',
  }),
};

@Injectable({ providedIn: 'root' })
export class UploadService {
  public resourceUrl = SERVER_API_URL + '/common';

  constructor(protected http: HttpClient) {}

  uploadImage(formData: any): Observable<IResponse> {
    return this.http.post<IResponse>(this.resourceUrl + '/upload', formData);
  }

  downLoadFile(fileName: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl + `/download?fileName=${fileName}`, httpOptions);
  }
}
