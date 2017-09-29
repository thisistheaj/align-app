import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private static DBRoot: string = 'align/dev/V1/';

  constructor(public afDb: AngularFireDatabase) {
  }

  public getObjectReference(path: string): FirebaseObjectObservable<any> {
    if (this.validatePath(path)) {
      return this.afDb.object( DatabaseProvider.DBRoot + path);
    }
  }

  public getListReference(path: string): FirebaseListObservable<any> {
    if (this.validatePath(path)) {
      return this.afDb.list(DatabaseProvider.DBRoot + path);
    }
  }

  private validatePath(path: string): boolean {
    let fullPath = DatabaseProvider.DBRoot + path;
    return path && !fullPath.endsWith('/');
  }
}
