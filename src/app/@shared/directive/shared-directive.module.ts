import {NgModule} from '@angular/core';
import {NumberOnlyDirective} from './number-only.directive';
import {AmountOnlyDirective} from './amount-only.directive';
import {DecimalOnlyDirective} from './decimal-only.directive';


@NgModule({
  imports: [],
  declarations: [NumberOnlyDirective, AmountOnlyDirective, DecimalOnlyDirective],
  providers: [],
  exports: [
    NumberOnlyDirective,
    AmountOnlyDirective,
    DecimalOnlyDirective
  ]
})
export class SharedDirectiveModule {
}
