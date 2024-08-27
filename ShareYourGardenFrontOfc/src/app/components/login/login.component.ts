import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: `.link{
    text-decoration: underline;
}

.link:hover{
    color: black;
}

.button{
  margin-bottom: 10px
}
.email{
  width: 100%;
}`,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  router = inject(Router);
  loginService = inject(LoginService);
  isNotAllowed: boolean = false;
  isNull: boolean = false;

  constructor() {
    this.loginService.removeToken();
  }

  loginForm = this.fb.group({
    email: [null],
    password: [null],
  });

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (token) => {
          if (token) {
            this.loginService.addToken(token);
            const gardener = this.loginService.getLoggedGardener();
            this.router.navigate([`/garden/${gardener.id}`])
          }
        },
        error: (erro) => {
          if (this.loginForm.value.email == null || this.loginForm.value.password == null) {
            this.isNull = true;
            this.isNotAllowed = false;
          } else {
            this.isNotAllowed = true;
            this.isNull = false
          }
          this.loginForm.reset();
        },
      });
  }
}
