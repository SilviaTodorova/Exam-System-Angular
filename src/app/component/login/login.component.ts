import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from '../../models/login/sign-in';
import { Register } from '../../models/login/register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isSignInForm: boolean = true;

  signInModel: SignIn = new SignIn();
  registerModel: Register = new Register();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  switchForm(){
    this.isSignInForm = !this.isSignInForm;
  }

  signIn(){
    console.log("signIn", this.signInModel);
    this.router.navigate(['/dashboard']);
  }

  register(){
    alert("valid");
    console.log("register", this.registerModel);
  }
}
