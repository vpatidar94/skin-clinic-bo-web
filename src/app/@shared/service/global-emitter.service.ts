import {EventEmitter, Injectable} from '@angular/core';
import { Message, MessageValue } from 'aayam-clinic-core';
import { AlertMessage } from '../dto/alert-message';


/**
 * GlobalEmitterService
 */
@Injectable()
export class GlobalEmitterService {

  /* ************************************ Instance Fields ************************************ */
  private userSignInEmitter: EventEmitter<any> = new EventEmitter<any>();
  private aclChangedEmitter: EventEmitter<any> = new EventEmitter<any>();

  // private uiState: EventEmitter<any> = new EventEmitter<any>();
  // private profileChangedEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private staffChangedEmitter: EventEmitter<any> = new EventEmitter<any>();
  private apiProgressEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private pushEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private vehicleChangedEmitter: EventEmitter<any> = new EventEmitter<any>();

  private messageEmitter: EventEmitter<any> = new EventEmitter<any>();
  private alertMessageEmitter: EventEmitter<any> = new EventEmitter<any>();

  // private authSuccessEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private authFailedEmitter: EventEmitter<any> = new EventEmitter<any>();

  // private appLaunchEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private orgSelectionEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private vmMessageEmitter: EventEmitter<any> = new EventEmitter<any>();
  // private metaChangedEmitter: EventEmitter<any> = new EventEmitter<any>();

  /* ************************************ Constructors ************************************ */
  constructor() {
  }

  /* ************************************ Public Methods ************************************ */
  public emitUserSignInEmitter(status: string): void {
    this.userSignInEmitter.emit(status);
  }

  public emitAclChangedEmitter(): void {
    this.aclChangedEmitter.emit();
  }

  // public emitProfileChangedEmitter(status: string): void {
  //   this.profileChangedEmitter.emit(status);
  // }

  // public emitStaffChangedEmitter(status: string): void {
  //   this.staffChangedEmitter.emit(status);
  // }

  // public emitAppLaunchEmitter(status: string): void {
  //   this.appLaunchEmitter.emit(status);
  // }

  // public emitUiState(pageParam: any): void {
  //   this.uiState.emit({
  //     page: pageParam
  //   });
  // }

  // public emitAuthSuccessEmitter(): void {
  //   this.authSuccessEmitter.emit(null);
  // }

  // public notifyAuthFail(status: number): void {
  //   this._notifyAuthFail(status);
  // }

  // public addMessage(type: string, text: string, title: string | undefined, param: string[] | undefined): void {
  //   this._addMessage(type, text, title, param);
  // }

  public addMsg(msg: Array<Message>): void {
    this._addMsg(msg);
  }

  public addAlerMsg(msg: AlertMessage): void {
    this._addAlertMsg(msg);
  }

  public startSpinner(): void {
    this.apiProgressEmitter.emit(true);
  }

  public stopSpinner(): void {
    this.apiProgressEmitter.emit(false);
  }

  // public processPushEvent(event: string, eventData: string): void {
  //   this._pushEventEmitter(event, eventData);
  // }

  // public addVmMsg(msg: string): void {
  //   this._addVmMsg(msg);
  // }

  // public emitOrgSelectionEmitter(orgVo: OrgVo): void {
  //   this.orgSelectionEmitter.emit(orgVo);
  // }

  // public emitMetaChangedEmitter(status: string): void {
  //   this.metaChangedEmitter.emit(status);
  // }

  // public getMetaChangedEmitter(): EventEmitter<any> {
  //   return this.metaChangedEmitter;
  // }

  // public emitVehicleChangedEmitter(status: string): void {
  //   this.vehicleChangedEmitter.emit(status);
  // }

  // public getVehicleChangedEmitter(): EventEmitter<any> {
  //   return this.vehicleChangedEmitter;
  // }

  // public emitMakeChangedEmitter(status: string): void {
  //   this.vehicleChangedEmitter.emit(status);
  // }

  // public getMakeChangedEmitter(): EventEmitter<any> {
  //   return this.vehicleChangedEmitter;
  // }

  /* ************************************ get ************************************ */
  // public getUiState(): EventEmitter<any> {
  //   return this.uiState;
  // }

  public getUserSignInEmitter(): EventEmitter<any> {
    return this.userSignInEmitter;
  }

  public getAclChangedEmitter(): EventEmitter<any> {
    return this.aclChangedEmitter;
  }

  // public getProfileChangedEmitter(): EventEmitter<any> {
  //   return this.profileChangedEmitter;
  // }

  // public getStaffChangedEmitter(): EventEmitter<any> {
  //   return this.staffChangedEmitter;
  // }

  // public getAuthSuccessEmitter(): EventEmitter<any> {
  //   return this.authSuccessEmitter;
  // }

  // public getAuthFailedEmitter(): EventEmitter<any> {
  //   return this.authFailedEmitter;
  // }

  public getMessageEmitter(): EventEmitter<any> {
    return this.messageEmitter;
  }

  public getAlertMessageEmitter(): EventEmitter<any> {
    return this.alertMessageEmitter;
  }

  public getApiProgressEmitter(): EventEmitter<any> {
    return this.apiProgressEmitter;
  }

  // public getPushEventEmitter(): EventEmitter<any> {
  //   return this.pushEventEmitter;
  // }

  // public getAppLaunchEmitter(): EventEmitter<any> {
  //   return this.appLaunchEmitter;
  // }

  // public getVmMessageEmitter(): EventEmitter<any> {
  //   return this.vmMessageEmitter;
  // }

  /* ************************************ Private Methods ************************************ */
  // private _pushEventEmitter(eventParam: string, eventData: string): void {
  //   this.pushEventEmitter.emit({
  //     event: eventParam,
  //     data: eventData
  //   });
  // }

  // private _notifyAuthFail(status: number): void {
  //   this.authFailedEmitter.emit({});
  // }

  private _addMsg(msg: Message[]): void {
    // process message if needed
    this._emitMessage(msg);
    setTimeout(() => {
      this._emitMessage(undefined);
    }, 6000);
  }

  private _addAlertMsg(msg: AlertMessage): void {
    // process message if needed
    this._emitAlertMessage(msg);
    setTimeout(() => {
      this._emitAlertMessage(undefined);
    }, 6000);
  }

  // private _addVmMsg(msg: string): void {
  //   // process message if needed
  //   this._emitVmMessage(msg);
  //   // setTimeout(() => {
  //   //   this._emitVmMessage(undefined);
  //   // }, 6000);
  // }

  private _emitMessage(message: Message[] | undefined): void {
    this.messageEmitter.emit(message);
  }

  private _emitAlertMessage(message: AlertMessage | undefined): void {
    this.alertMessageEmitter.emit(message);
  }

  // private _emitVmMessage(message: string): void {
  //   // this.messageEmitter.emit({
  //   //   message: _message
  //   // });
  //   this.vmMessageEmitter.emit(message);
  // }

  /*
   'msg': [
   {
   'type': 'info',
   'value': [
     {
     'title': 'Info Title',
     'text': 'body for info msg param {foo} value',
     'param': {'foo': 'bar'}
     }
   ]
   },
   */
  // private _addMessage(type: string, text: string, title: string | undefined, param: string[] | undefined): void {
  //   const message = {} as Message;
  //   message.type = type;
  //   message.value = [];
  //   const messageVal = {} as MessageValue;
  //   messageVal.text = text;
  //   messageVal.title = title;
  //   messageVal.param = param;
  //   message.value.push(messageVal);
  //   const msg: Message[] = [];
  //   msg.push(message);
  //   this._addMsg(msg);
  // }

}
