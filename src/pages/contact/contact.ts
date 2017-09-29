import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public users: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public afDb: AngularFireDatabase) {
    this.users = afDb.list('align/users');
  }

}
