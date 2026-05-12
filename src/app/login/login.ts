import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Authentication} from '../shared/authentication';
import {MatButton} from '@angular/material/button';

interface Response {
  access_token: string;
}

@Component({
  selector: 'bs-login',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
 private fb = inject(FormBuilder);
 private router = inject(Router);
 private authService = inject(Authentication);

 loginForm = this.fb.group({
   username: ["", [Validators.required,Validators.email]],
   password: ["", Validators.required]
 })

  protected login() {
    const val = this.loginForm.value;
    if(val.username && val.password){
      this.authService.login(val.username, val.password).subscribe((res:any)=>{
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/");
      })
    }
  }

  protected isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  protected logout() {
    this.authService.logout();
  }
}
