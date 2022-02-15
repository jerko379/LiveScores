import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {user} from "../../model";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage : string = '';
  RegisterForm : FormGroup;
  noviUser : user = {
    username:'', name : '', surname:'' ,  password: '', email : '' , privilege:0
  };
  password2 : string = '';

  constructor(private route:ActivatedRoute, private router:Router,private http: HttpClient ,private auth : AuthService) { }

  ngOnInit(): void {



    this.RegisterForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password1' : new FormControl(null, [Validators.required]),
      'password2' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.email,Validators.required]),
      'name' : new FormControl(null, [ Validators.required]),
      'surname' : new FormControl(null, [ Validators.required])
    });

    this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });

  }


  onRegister() {

    console.log(this.noviUser);
    if (this.password2 == this.noviUser.password) {
      this.auth.register(this.noviUser)
    }
    else {
      console.log(this.errorMessage)
      this.errorMessage = 'Password have to match '
    }

  }

  back() {
    this.router.navigate(['']);
  }
}
