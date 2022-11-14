import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    
    
    if (localStorage.getItem('userToken') == null) {
      this.removeUser();
       
    } else {
      this.setUserToken();
    }
  }
  user = new BehaviorSubject(null);
  setUserToken() {
    let token = localStorage.getItem('userToken');
    this.user.next(jwt_decode(<string>token));
  }
  removeUser() {
    this.user.next(null);
    localStorage.removeItem('userToken');
  }
  happyToken: string = <string>localStorage.getItem('userToken');
  // register
  registerForm(obj: any): Observable<any> {
    return this._HttpClient.post(`http://localhost:9000/user/signup`, obj);
  }
  // login
  loginForm(obj: any): Observable<any> {
    return this._HttpClient.post(`http://localhost:9000/user/signin`, obj);
  }
  // change password
  changePassword(obj: any): Observable<any> {
    return this._HttpClient.patch(`http://localhost:9000/user/updatePassWord`,  obj , {headers:{token:this.happyToken}});
  }
// change name
  changeName(obj: any): Observable<any> {
    return this._HttpClient.patch(`http://localhost:9000/user/changeNameUser`,  obj , {headers:{token:this.happyToken}});
  }
  // get message
  getMessage(): Observable<any> {
    return this._HttpClient.get(`http://localhost:9000/message`, {
      headers: { token: this.happyToken },
    });
  }
  // send message for user
  sendMessageFromUser(obj: any): Observable<any> {
    return this._HttpClient.post('http://localhost:9000/message', obj);
  }
  userId:any = localStorage.getItem('userId')
  // get info for user 
  getInfoUser(): Observable<any>{
         
    return this._HttpClient.get('http://localhost:9000/message/userInfo' , {headers:{_id:this.userId}});
  }
  // get message public user for user 
  getMessageView():Observable<any>{
    return this._HttpClient.get('http://localhost:9000/message/view' , {headers:{_id:this.userId}})
  }
  
  //  change view public & private 
  changeView(obj:any):Observable<any>{
    return  this._HttpClient.patch('http://localhost:9000/message' ,obj , {headers:{token:this.happyToken}})

  }



}
