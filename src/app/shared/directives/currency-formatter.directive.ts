import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormatter]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyFormatterDirective),
      multi: true,
    },
  ],
})
export class CurrencyFormatterDirective implements ControlValueAccessor {
  private readonly el = inject(ElementRef);
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    const cents = Math.round((value || 0) * 100);
    this.el.nativeElement.value = this.formatCurrency(cents);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const numericValue = this.getNumericValue(value);
    this.onChange(numericValue / 100);
    const formattedValue = this.formatCurrency(numericValue);
    if (inputElement.value !== formattedValue) {
      inputElement.value = formattedValue;
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  private getNumericValue(value: string): number {
    const digits = value.replace(/[^0-9]/g, '');
    return Number(digits) || 0;
  }

  private formatCurrency(value: number): string {
    if (isNaN(value)) {
      return '';
    }
    const amount = value / 100;
    const formattedNumber = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `COP ${formattedNumber}`;
  }
}
