import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private authCallbacks: Array<(any) => void> = [];

  constructor(public afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged(snapshot => {
      if (snapshot) {
        this.authCallbacks.map((f) => f(snapshot));
      }
    })
  }

  public addAuthCallback(callback: (any) => void){
    this.authCallbacks.push(callback)
  }

  public logInWithEmail(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(data => data, err => err);
  }

  public signUpWithEmail(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => data, err => err);
  }

  public logOut(): void {
    this.afAuth.auth.signOut();
  }

  public isLoggedIn() {
    return this.afAuth.auth.currentUser;
  }

}
