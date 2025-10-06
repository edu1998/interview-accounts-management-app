import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);

  public alert = computed(() => {
    return this.alertService.alert();
  });
  get alertClasses(): string {
    const alert = this.alert();
    if (!alert) return '';

    switch (alert.type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'danger':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return '';
    }
  }

  onClose(): void {
    this.alertService.clearAlert();
  }
}
