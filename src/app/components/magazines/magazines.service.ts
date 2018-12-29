import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const jwtHelper = new JwtHelperService();

const headersWithAuthentication = new HttpHeaders()
.set('Authorization', 'Bearer ' + localStorage.getItem('token'));

@Injectable()
export class MagazinesService {

  url : string = 'http://localhost:8080/api/magazine';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url + '/getAll', {headers: headersWithAuthentication});
  }
}
