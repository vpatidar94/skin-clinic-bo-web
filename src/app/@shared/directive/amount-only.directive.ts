import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[appAmountOnly]'
})
export class AmountOnlyDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: any): void {
    let initialValue = this.el.nativeElement.value;
    for (let i = 1; i <= 3 - initialValue?.length ?? 0; i++) {
      initialValue = '0' + initialValue;
    }
    initialValue = initialValue.replace(/[^0-9]*/g, '');
    initialValue = initialValue.replace(/\./g, '');
    initialValue.trim();
    const decimal = initialValue?.substring(initialValue?.length - 2);
    const num = Number(initialValue?.substring(0, initialValue?.length - 2)) ?? '';
    initialValue = num + '.' + decimal;
    this.el.nativeElement.value = initialValue;
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  // [0-9]+(\.[0-9][0-9]?)?
  // ([0-9]+(\.[0-9]+)?)
}
