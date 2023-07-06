import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { DbKey } from '../const/db-key';


@Injectable()
export class KeyValueStorageService {

  /* ************************************ Constructors ************************************ */
  constructor(private storage: LocalStorageService) {
  }

  /* ************************************ Public Methods ************************************ */
  public saveJwtToken(entity: string): void {
    this._insertOrUpdate(DbKey.TOKEN_JWT, entity);
  }

  public saveFbUser(entity: string): void {
    this._insertOrUpdate(DbKey.FB_USER, entity);
  }

  /* ************************************ GET Methods ************************************ */
  public getJwtToken(): string | null {
    return this._get(DbKey.TOKEN_JWT, '');
  }

  public getFbUser(): string | null {
    return this._get(DbKey.FB_USER, null);
  }

  public clear(key: string): void {
    this.storage.clear(key);
  }

  public clearAll() {
    this.storage.clear();
  }

  /* ************************************ Private Methods ************************************ */
  private _get<T>(dbKey: DbKey, defaultValue: T): T | null {
    return this._getVal(DbKey[dbKey], defaultValue);
  }

  private _insertOrUpdate(key: DbKey, value: any): void {
    this.storage.store(DbKey[key], value);
  }

  private _value(key: string): any {
    return this.storage.retrieve(key);
  }

  private _getVal<T>(key: string, defaultValue: T): T | null {
    const jsonVal = this._value(key);
    if (jsonVal) {
      return <T>jsonVal;
    }
    return null;
  }

}
