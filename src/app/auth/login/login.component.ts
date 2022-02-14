import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage : string = '';
  signinForm : FormGroup;

  constructor() {
  }

  ngOnInit() {

    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    /*this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });
  */
  }



  onLogin(){

    //this.auth.login(this.signinForm.value);

  }

}


