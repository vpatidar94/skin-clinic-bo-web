import {Component} from '@angular/core';
import {GlobalEmitterService} from 'src/app/@shared/service/global-emitter.service';

@Component({
  selector: 'app-eg-spinner-component',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  public active: boolean = false;

  public constructor(private globalEmitterService: GlobalEmitterService) {
    /*
    spinner.status.subscribe((spinnerResponse: any) => {
      this.active = spinnerResponse.status;
      this.waitMessage = spinnerResponse.msg;
    });
    */
    this._checkApiProgress();
  }

  /* ************************************ Private Methods ************************************ */
  private _checkApiProgress(): void {
    this.globalEmitterService.getApiProgressEmitter().subscribe((inProgress: boolean) => {
      this.active = inProgress;
    });
  }
}
