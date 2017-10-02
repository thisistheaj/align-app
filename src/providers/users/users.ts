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

  private users: FirebaseListObservable<Array<User>>;

  constructor(public db: DatabaseProvider) {
    this.users = this.db.getListReference('users')
  }

  public getUsers(): FirebaseListObservable<Array<User>> {
    return this.users;
  }

  public getUser(uid): FirebaseObjectObservable<User> {
    return this.db.getObjectReference('users/' + uid);
  }

  public addUser(user: User): firebase.Promise<void> {
    return this.db.getObjectReference('users/' + user.uid).set(user);
  }

  public likeUser(u1, u2, likes): firebase.Promise<boolean> {
    u1.likes = likes;
    u2.likes = likes;
    let match = false;
    if (likes && u2.matches && u2.matches[u1.uid]) {
      match = u2.matches[u1.uid].likes;
    }
    u1.matches = null;
    u2.matches = null;
    u1.matched = null;
    u2.matched = null;
    return this.db.getObjectReference('users/' + u1.uid + '/matches/' + u2.uid).set(u2).then(data => {
      return this.db.getObjectReference('users/' + u2.uid + '/matched/' + u1.uid).set(u1).then(data => {
        return match;
      });
    })
  }
}
