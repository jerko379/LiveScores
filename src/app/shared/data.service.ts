import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiRoot =environment.apiurl+  'api/';

  constructor(private http:HttpClient) { }


  getCountries(){

    return this.http.get(this.apiRoot+'countries');

  }

  deleteCountry(id){
    return this.http.delete(this.apiRoot+'countries/'+ id)
  }


}
