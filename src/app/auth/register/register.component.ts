import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {user} from "../../model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage : string = '';
  signinForm : FormGroup;
  noviUser : user = {
    privilege: false, surname: "",
    username:'', name : '' , password: '', email : ''
  };
  password2 : string = '';

  constructor(private route:ActivatedRoute, private router:Router,private http: HttpClient ) { }

  ngOnInit(): void {



    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password1' : new FormControl(null, [Validators.required]),
      'password2' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.email,Validators.required]),
      'name' : new FormControl(null, [ Validators.required])
    });

    /*this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });

     */

  }


  onRegister() {

    /*console.log(this.noviUser);
    if (this.password2 == this.noviUser.password) {
      this.http.post('https://lab5njp-default-rtdb.europe-west1.firebasedatabase.app/users.json', this.noviUser)
        .subscribe((res => {
          console.log(res);
          this.router.navigate(['']);
        }))
    }
    else {
      console.log(this.errorMessage)
      this.errorMessage = 'Passwordi tribaju bi isti'
    }

     */

  }

  back() {
    this.router.navigate(['']);
  }
}


