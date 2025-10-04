import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginForm {
  username = signal('admin-user');
  password = signal('123456789');

  login = output<{ username: string; pass: string }>();

  onSubmit() {
    this.login.emit({ username: this.username(), pass: this.password() });
  }
}
