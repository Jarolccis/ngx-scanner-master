import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly URL_EXP_DIGITAL_TDA = environment.API_EXP_DIGITAL_TDA;
  constructor(private http: HttpClient) {}
  searchProducts$(
    code_store: string,
    ean: string
  ): Observable<any> {
    const headers = {
      'x-country': 'PE',
      'x-commerce': 'Tottus',
      'x-usrtx': 'tss',
    };

    const body = {
        url: null,
      pais: headers['x-country'],
      local: code_store,
      ean: ean
    };
    const res = this.http.post(
      this.URL_EXP_DIGITAL_TDA + '/readimage',
      body,
      {
        headers,
      }
    );
console.log("SERRES", res)
  
    return res;
  }
}
