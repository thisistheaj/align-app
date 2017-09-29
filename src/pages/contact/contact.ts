import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {UsersProvider} from "../../providers/users/users";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public users: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public usersPvdr: UsersProvider) {
    this.users = this.usersPvdr.getUsers();
  }
}
