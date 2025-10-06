import { Component, inject } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [LoginForm, FormsModule],
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);

  onLogin(credentials: { username: string; pass: string }) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/accounts']);
      },
      error: (error) => {
        this.alertService.showAlert({
          message: error.error.message,
          type: 'danger',
        });
      },
    });
  }
}
