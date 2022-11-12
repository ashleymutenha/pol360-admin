import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { baseurl } from './url';
const headers= new HttpHeaders({'Content-Type':'application/json', 
})

@Injectable({
  providedIn: 'root'
})
export class SetasDefaultService {

  constructor(private http:HttpClient) { }

  setAsDefault(data:any): Observable<any>{
   return this.http.post(`${baseurl}/setasdefault`,data,{'headers':headers})
  }
}
