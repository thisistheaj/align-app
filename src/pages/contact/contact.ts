import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {UsersProvider} from "../../providers/users/users";
import {ProfileModalComponent} from "../../components/profile-modal/profile-modal";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public users: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public usersPvdr: UsersProvider, public modalCtrl: ModalController) {
    this.users = this.usersPvdr.getUsers();
  }

  public presentProfileModal(uid) {
    let modal = this.modalCtrl.create(ProfileModalComponent,{uid: uid});
    modal.present()
  }
}
