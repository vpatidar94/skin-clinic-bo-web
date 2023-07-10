import { Component } from '@angular/core';
import { SvgUtility } from './@shared/utility/svg.utility';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skin-clinic-bo-web';
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,) {
    new SvgUtility(this.matIconRegistry, this.domSanitizer).initIcon();
  }
}

