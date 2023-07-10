import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EgSpacerComponent} from './utility.component';

const EG_COMPONENT = [
    EgSpacerComponent
];

@NgModule({
    imports: [CommonModule],
    declarations: [...EG_COMPONENT],
    exports: [...EG_COMPONENT]
})
export class UtilityModule {
}
