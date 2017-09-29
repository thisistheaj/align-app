import { Injectable } from '@angular/core';
import {DatabaseProvider} from "../database/database";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import * as firebase from 'firebase';
import {User} from "../../model/user";
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  private users: FirebaseListObservable<any>;

  constructor(public db: DatabaseProvider) {
    this.users = this.db.getListReference('users')
  }

  public getUsers(): FirebaseListObservable<any> {
    return this.users;
  }

  public addUser(user: User): firebase.Promise<void> {
    return this.db.getObjectReference('users/' + user.uid).set(user);
  }
}
