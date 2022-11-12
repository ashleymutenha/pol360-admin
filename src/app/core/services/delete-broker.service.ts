import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { baseurl } from './url';
const headers= new HttpHeaders({'Content-Type':'application/json', 
})

@Injectable({
  providedIn: 'root'
})
export class DeleteBrokerService {

  constructor(private http:HttpClient) { }

  deleteBrokerService(data:any): Observable<any>{
    return this.http.post(`${baseurl}/deleteBroker`,data,{'headers':headers})
  }
}
