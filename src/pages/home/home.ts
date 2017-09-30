import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {LoginModalComponent} from "../../components/login-modal/login-modal";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private authPvdr: AuthProvider) {

  }

  public presentLoginModal(){
    let modal = this.modalCtrl.create(LoginModalComponent);
    modal.present();
  }

  public isLoggedIn(){
   return this.authPvdr.isLoggedIn()
  }

  public logOut() {
    this.authPvdr.logOut();
  }
}
