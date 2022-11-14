import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {}
  // form login
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  err: string = '';
  // function login 
  login() {
    this._AuthService.loginForm(this.LoginForm.value).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this._Router.navigate(['home']);
                 localStorage.setItem('userToken' , res.token)
                 this._AuthService.setUserToken()      
      } else {
        this.err = res.message;
      }
    });
  }
}
