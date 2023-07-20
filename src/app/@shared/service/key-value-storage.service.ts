import { Injectable } from '@angular/core';
import { FnUtility, OrgVo, UserAccessDto,ItemVo } from 'aayam-clinic-core';
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

  public saveRole(entity: string): void {
    this._insertOrUpdate(DbKey.ROLE, entity);
  }

  public saveOrgId(entity: string): void {
    this._insertOrUpdate(DbKey.ORG_ID, entity);
  }

  public saveServiceItemId(entity: string): void {
    this._insertOrUpdate(DbKey.SERVICE_ITEM_ID, entity);
  }

  public saveSubRole(entity: string): void {
    this._insertOrUpdate(DbKey.SUB_ROLE, entity);
  }

  public saveOrg(entity: OrgVo): void {
    this._insertOrUpdate(DbKey.ORG, JSON.stringify(entity));
  }

  public saveServiceItem(entity: ItemVo): void {
    this._insertOrUpdate(DbKey.SERVICE_ITEM, JSON.stringify(entity));
  }

  public saveCurrentAccess(entity: UserAccessDto): void {
    this._insertOrUpdate(DbKey.CURRENT_ACCESS, JSON.stringify(entity));
  }

  public saveAllAccess(entity: UserAccessDto[]): void {
    this._insertOrUpdate(DbKey.ALL_ACCESS, JSON.stringify(entity));
  }

  /* ************************************ GET Methods ************************************ */
  public getJwtToken(): string | null {
    return this._get(DbKey.TOKEN_JWT, '');
  }

  public getFbUser(): string | null {
    return this._get(DbKey.FB_USER, null);
  }

  public getRole(): string | null {
    return this._get(DbKey.ROLE, null);
  }

  public getOrgId(): string | null {
    return this._get(DbKey.ORG_ID, null);
  }

  public getSubRole(): string | null {
    return this._get(DbKey.SUB_ROLE, null);
  }

  public getOrg(): OrgVo | null {
    const org = this._get(DbKey.ORG, null);
    if (org && !FnUtility.isEmpty(org)) {
      return JSON.parse(org);
    }
    return null;
  }

  public removeOrg(): void { 
    this.clear(DbKey[DbKey.ORG]);
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
