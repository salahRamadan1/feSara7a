import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean = false
  constructor( private _AuthService:AuthService , private _Router:Router) { 



  }

  ngOnInit(): void {
    this._AuthService.user.subscribe(()=>{
      if(this._AuthService.user.getValue() == null){
        this.isLoggedIn = false
      }else{
       this.isLoggedIn = true
      }
      
      })
  }
logOut(){
this._AuthService.removeUser()
this._Router.navigate(['/login'])
}
}
