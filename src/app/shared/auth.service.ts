import { Injectable } from '@angular/core';
import {user} from "../model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : user
  private token : string;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();
  authUrl = environment.apiurl + 'auth';

  constructor(private http : HttpClient, private router : Router) { }

  login(credentials : {username : string, password: string}){

    this.http.post(this.authUrl + '/login' , credentials)
      .subscribe( (res: {status:string, user:user})=>{

        if (res.status=="OK") {
          console.log(res.user)
          this.user = res.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authChange.next(true);
          this.router.navigate(['/']);
        } else {
          this.errorEmitter.next('Wrong credentials!');
        }

      });



  }

  register(noviUser:user) {
    this.http.post(this.authUrl + '/register' , {noviUser})
      .subscribe( (res: {status:string, user:user})=>{
        if (res.status=="OK") {
          this.router.navigate(['./']);
        }
      });


  }

  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/auth']);
  }

  getUser(){
    if (!this.user) this.user=JSON.parse(localStorage.getItem('user'));
    return {...this.user};
  }


  isAuthenticated(){
    return this.user!=null;
  }



}

