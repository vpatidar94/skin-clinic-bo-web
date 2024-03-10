import {NgModule} from '@angular/core';
import { NumberToWordsPipe } from './number.to-words.pipe';


@NgModule({
  imports: [],
  declarations: [NumberToWordsPipe],
  providers: [],
  exports: [
    NumberToWordsPipe
  ]
})
export class SharedPipeModule {
}
