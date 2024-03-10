import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

    private readonly ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    private readonly teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    private readonly tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    private readonly largeScale = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion'];

    transform(value: number): string {
        if (value === 0) {
            return 'zero';
        } else {
            return this.convertToWords(value);
        }
    }

    private convertToWords(num: number): string {
        if (num < 10) {
            return this.ones[num];
        } else if (num < 20) {
            return this.teens[num - 10];
        } else if (num < 100) {
            return this.tens[Math.floor(num / 10)] + ' ' + this.convertToWords(num % 10);
        } else if (num < 1000) {
            return this.ones[Math.floor(num / 100)] + ' hundred ' + this.convertToWords(num % 100);
        } else if (num < 100000) {
            return this.convertToWords(Math.floor(num / 1000)) + ' thousand ' + this.convertToWords(num % 1000);
        } else if (num < 10000000) {
            return this.convertToWords(Math.floor(num / 100000)) + ' lakh ' + this.convertToWords(num % 100000);
        } else if (num < 1000000000) {
            return this.convertToWords(Math.floor(num / 10000000)) + ' crore ' + this.convertToWords(num % 10000000);
        } else if (num < 100000000000) {
            return this.convertToWords(Math.floor(num / 1000000000)) + ' arab ' + this.convertToWords(num % 1000000000);
        } else if (num < 10000000000000) {
            return this.convertToWords(Math.floor(num / 100000000000)) + ' kharab ' + this.convertToWords(num % 100000000000);
        } else {
            return 'Number too large to convert to words';
        }
    }

}
