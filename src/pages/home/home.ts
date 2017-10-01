import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {LoginModalComponent} from "../../components/login-modal/login-modal";
import {AuthProvider} from "../../providers/auth/auth";
import {SignUpModalComponent} from "../../components/sign-up-modal/sign-up-modal";
import {FirebaseObjectObservable} from "angularfire2/database";
import {UsersProvider} from "../../providers/users/users";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userRef: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private authPvdr: AuthProvider, public usersPvdr: UsersProvider) {

  }

  public presentLoginModal(){
    let modal = this.modalCtrl.create(LoginModalComponent);
    modal.present();
    modal.onDidDismiss(this.loadUser)
  }

  public presentSignUpModal(){
    let modal = this.modalCtrl.create(SignUpModalComponent);
    modal.present();
    modal.onDidDismiss(this.loadUser)
  }

  public isLoggedIn(){
    if (this.authPvdr.isLoggedIn()) {
      this.userRef = this.usersPvdr.getUser(this.authPvdr.isLoggedIn().uid);
    }
   return this.authPvdr.isLoggedIn()
  }

  public logOut() {
    this.authPvdr.logOut();
  }

  public loadUser(params) {
    if (params) {
      this.userRef = this.usersPvdr.getUser(params.uid);
    }
  }

  public parseTextArea(evt) {
    this.userRef.update({skills: evt.split(", ")});
  }

}
