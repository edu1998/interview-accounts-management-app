import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true,
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formattedNumber = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return `COP ${formattedNumber}`;
  }
}
