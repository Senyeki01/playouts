import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  dataUrl: string = 'https://api.coindesk.com/v1/bpi/currentprice.json'

  constructor(private http: HttpClient) { }

  getData(): Observable<unknown> {
    return this.http.get(this.dataUrl);
  }
}
