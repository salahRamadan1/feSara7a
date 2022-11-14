import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,    
  ) {}

  formMessage: FormGroup = new FormGroup({
    message: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    userId: new FormControl(null, [
      Validators.required,
      Validators.max(24),
      Validators.min(24),
    ]),
  });
  userName: any;
  userId: any = this._ActivatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.getMessageShare()
    localStorage.setItem('userId', this.userId);
    this._AuthService.getInfoUser().subscribe((res) => {
      this.userName = res.user.name;
    });
  }


  successMessage:string=''
  sendMessage() {
    let data = {
      message: this.formMessage.value.message,
      userId: this._ActivatedRoute.snapshot.paramMap.get('id'),
    };
    this._AuthService.sendMessageFromUser(data).subscribe((res) => {
      this.successMessage = res.message
       
    });
  }

  clear() {
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById('textarea')).value = '';
         (<HTMLElement>document.getElementById('alert')).style.display = 'none'
    }, 1000);

  }
data:any = []
  getMessageShare(){
   this._AuthService.getMessageView().subscribe((res)=>{
    
  this.data = res.mes
 
  // this.getMessage()
  })
  }
}
