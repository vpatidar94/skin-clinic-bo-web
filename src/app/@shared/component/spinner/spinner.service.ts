import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {
  public status: Subject<any> = new Subject();
  private active = false;
  private spinnerResponse: any;

  public getActive(): boolean {
    return this.active;
  }

  public manageSpinner(v: boolean, message: string): void {
    this.active = v;
    this.spinnerResponse = {status: v, msg: message};
    this.status.next(this.spinnerResponse);
  }

  public start(msg: string): void {
    this.manageSpinner(true, msg);
  }

  public stop(): void {
    this.manageSpinner(false, '');
  }
}
