import {Component, Output} from '@angular/core';
import {GlobalEmitterService} from 'src/app/@shared/service/global-emitter.service';
import {MatSnackBar} from '@angular/material/snack-bar';


/**
 * @title AlertMessage / Snack-bar with a custom component
 */
@Component({
  selector: 'app-eg-alert-message-web',
  templateUrl: './alert-message-web.component.html',
  styleUrls: ['./alert-message-web.component.scss'],
})
export class AlertMessageWebComponent {

  /* ************************************ Static Fields ************************************ */
  /* ************************************ Instance Fields ************************************ */
  @Output()
  messages: any;

  /* ************************************ Constructors ************************************ */
  constructor(private globalEmitterService: GlobalEmitterService,
              public snackBar: MatSnackBar) {
    this._getMessageEmitter();
  }

  /* ************************************ Private Methods ************************************ */
  private _getMessageEmitter(): void {
    this.globalEmitterService.getMessageEmitter().subscribe(msg => {
      this.messages = msg;
    });
  }
}
