import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from '../../models/login/sign-in';
import { Register } from '../../models/login/register';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isSignInForm: boolean = true;

  signInModel: SignIn = new SignIn();
  registerModel: Register = new Register();

  constructor(private router: Router,
              private notifier: NotifierService,
              private accountService: AccountService) { }

  ngOnInit() {

  }

  switchForm(){
    this.isSignInForm = !this.isSignInForm;
  }

  signIn(){
    let bind = {
      username: this.signInModel.username,
      password: this.signInModel.password
    };

    this.accountService.login(bind)
    .subscribe(data => {
      this.accountService.setUsername(bind.username);
      this.router.navigate(['/dashboard']);
    }, error => {
      if(error.error.message){
        alert(error.error.message);
      }else{
        alert("Server error");
      }
        // this.notifier.notify(
        //   "success",
        //   "You are awesome! I mean it!",
        //   "THAT_NOTIFICATION_ID"
        // );
    });
  }

  register(){
    let bind = {
      username: this.registerModel.username,
      email: this.registerModel.email,
      password: this.registerModel.password
    };

    this.accountService.register(bind)
    .subscribe(data => {
      this.isSignInForm = true;
    }, error => {
      if(error.error.message){
        alert(error.error.message);
      }else{
        alert("Server error");
      }
        // this.notifier.notify(
        //   "success",
        //   "You are awesome! I mean it!",
        //   "THAT_NOTIFICATION_ID"
        // );
    });
  }
}
