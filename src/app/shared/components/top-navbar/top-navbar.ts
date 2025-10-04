import { Component, output } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss',
})
export class TopNavbar {
  logout = output<void>();

  onLogout() {
    this.logout.emit();
  }
}
