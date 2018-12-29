import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
.set('Content-Type','application/json')
.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

@Injectable()
export class SearchService {

  url: string = 'http://localhost:8080/api/search';

  constructor(private router: Router,
              private httpClient: HttpClient) { }

  searchByOneField(searchField: String, searchValue: String) {

    return this.httpClient
    .get(this.url + '/' + searchField + '/' + searchValue, {headers: headers});
  }

  searchByMultipleFields(json: any) {

    return this.httpClient
    .post(this.url + '/multipleFields', json, {headers: headers});
  }

  searchByMultipleOptionalFields(body: any) {

    return this.httpClient
    .post(this.url + '/multipleOptionalFields', body, {headers: headers});
  }
}
