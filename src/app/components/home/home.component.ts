import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  URL: any;

  constructor(private _AuthService: AuthService) {
    this.URL = window.location.origin + '/message/';
  }
  data: any;
  notFoundOrError: string = '';
  ngOnInit(): void {
    this.user = this._AuthService.user.getValue();
    this.getMessageForUser();
  }

  getMessageForUser() {
    this._AuthService.getMessage().subscribe((res) => {
      console.log(res);

      if (res.message == 'success') {
        this.data = res.mes;
      } else {
        this.notFoundOrError = res.message;
      }
    });
  }

  getValueToPublic(_idPublic: string) {
    let dataPub = {
      _id: _idPublic,
      view: (<HTMLInputElement>document.getElementById('Public')).name,
    };
    this._AuthService.changeView(dataPub).subscribe((res) => {
      if (res.message == 'success') {
        this.getMessageForUser();
      }
    });
  }
  getValueToPrivate(_idPrivate: string) {
    let dataPub = {
      _id: _idPrivate,
      view: (<HTMLInputElement>document.getElementById('Private')).name,
    };
    this._AuthService.changeView(dataPub).subscribe((res) => {
      if (res.message == 'success') {
        this.getMessageForUser();
      }
    });
  }
}
