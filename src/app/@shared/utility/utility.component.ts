import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

// ---------------------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-eg-spacer', template: '',
  styles: ['.eg-layout-spacer {-webkit-flex-grow: 1; -ms-flex-positive: 1; flex-grow: 1}'],
  encapsulation: ViewEncapsulation.None
})
export class EgSpacerComponent {

  @HostBinding('attr.class') attClass = 'eg-layout-spacer'; // , host: {class: 'eg-layout-spacer'}}
  /*
  @HostListener('mouseenter') onMouseEnter() {
    // do work
  }
   */
}

// ---------------------------------------------------------------------------------------------------------------------

