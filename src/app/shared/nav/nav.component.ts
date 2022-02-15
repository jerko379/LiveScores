import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {user} from "../../model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user:user;
  authenticated=false;
  authChangeSubscription : Subscription;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {

    this.authenticated=this.auth.isAuthenticated();

    this.authChangeSubscription=this.auth.authChange
      .subscribe(res => {
        this.authenticated=this.auth.isAuthenticated();
      });
  }
  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    this.authChangeSubscription.unsubscribe();
  }
  }

