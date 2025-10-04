import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  title = input.required<string>();
  isOpen = input<boolean>(false);
  closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
