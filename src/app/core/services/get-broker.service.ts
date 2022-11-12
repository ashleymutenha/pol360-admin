import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { baseurl } from './url';
@Injectable({
  providedIn: 'root'
})
export class GetBrokerService {

  constructor(private http:HttpClient) { }

  brokers:any
  getBrokers(): Observable<any>{
    return this.http.get(`${baseurl}/getBrokers`)

  }
}
