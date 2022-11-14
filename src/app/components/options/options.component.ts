import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {}

  formPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(null),
    oldPassword: new FormControl(null),
    cPassword: new FormControl(null),
  });
  Password: string = '';
  changePassword() {
    this._AuthService
      .changePassword(this.formPassword.value)
      .subscribe((res) => {
        this.Password = res.message;
      });
  }
  userName: any = this._AuthService.user.getValue();
  formChangeName: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),
  });

  newName: string = '';
  changeName() {
    this._AuthService.changeName(this.formChangeName.value).subscribe((res) => {
      console.log(res.userNew.name);
      if (res.message == 'success') {
        this.newName = res.userNew.name;
       
      }
    });
  }
}
