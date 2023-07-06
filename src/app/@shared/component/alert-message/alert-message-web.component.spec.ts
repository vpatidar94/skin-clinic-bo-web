import {AlertMessageWebComponent} from './alert-message-web.component';

describe('AlertMessageWebComponent Service', () => {
  let alertMessageWebComponent: AlertMessageWebComponent;
  let globalEmitterService: any;
  let matSnackBar: any;
  beforeEach(() => {
    globalEmitterService = jasmine.createSpyObj('GlobalEmitterService', ['getMessageEmitter']);
    matSnackBar = jasmine.createSpyObj('MatSnackBar', ['']);
    globalEmitterService.getMessageEmitter.and.returnValue({subscribe: (callback: any) => callback(true)});
    alertMessageWebComponent = new AlertMessageWebComponent(globalEmitterService, matSnackBar);
  });

  it('should return globalEmitterService getMessageEmitter when AlertMessageWebComponent is loaded', () => {
    expect(globalEmitterService.getMessageEmitter).toHaveBeenCalled();
  });

  it('should return globalEmitterService messages as true', () => {
    expect(alertMessageWebComponent.messages).toBeTruthy();
  });

});
