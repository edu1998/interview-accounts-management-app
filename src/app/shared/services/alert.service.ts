import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alert = signal<Alert | null>(null);

  public showAlert(alert: Alert): void {
    this.alert.set(alert);
    setTimeout(() => this.clearAlert(), 5000);
  }

  public clearAlert(): void {
    this.alert.set(null);
  }
}
