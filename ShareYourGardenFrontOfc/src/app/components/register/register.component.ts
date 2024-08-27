import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackButtonComponent } from '../back-button/back-button.component';
import { GardenerService } from '../../services/gardener.service';
import { GardenerInterface } from '../../interfaces/gardener-interface';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, BackButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  gardenerService = inject(GardenerService);
  private fb = inject(FormBuilder);
  router = inject(Router);

  gardener!: GardenerInterface;
  isNull: boolean = false;
  passwordsNotMatch: boolean = false;
  notEmail: boolean = false;

  registerForm = this.fb.group({
    name: [null],
    username: [null, Validators.email],
    password: [null],
    role: ['USER'],
    confirmPassword: [null],
    likes: [0],
    plants:[0]
  });

  async register() {
    this.gardener = this.registerForm.value as unknown as GardenerInterface;
    if (!this.validateFields()) {
      this.isNull = true;
      this.notEmail = false;
      this.passwordsNotMatch = false;
    } else if (this.registerForm.controls.username.errors) {
      this.notEmail = true;
      this.isNull = false;
      this.passwordsNotMatch = false;
    } else if (!this.validatePassword()) {
      this.passwordsNotMatch = true;
      this.isNull = false;
      this.notEmail = false;
    } else {
      this.registerForm.value.role = "USER"
      lastValueFrom(this.gardenerService.addGardener(this.gardener));
      this.router.navigate(['/login']);
    }
    this.registerForm.reset();
  }

  validatePassword() {
    if (
      this.registerForm.value.password !=
      this.registerForm.value.confirmPassword
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateFields() {
    if (
      this.registerForm.value.name == null ||
      this.registerForm.value.username == null ||
      this.registerForm.value.password == null ||
      this.registerForm.value.confirmPassword == null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
