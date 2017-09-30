import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FirebaseObjectObservable} from "angularfire2/database";
import {UsersProvider} from "../../providers/users/users";

/**
 * Generated class for the ProfileModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-modal',
  templateUrl: 'profile-modal.html'
})
export class ProfileModalComponent {

  public userRef: FirebaseObjectObservable<any>;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public usersPvdr: UsersProvider) {
    let uid = navParams.get('uid');
    this.userRef = this.usersPvdr.getUser(uid);
  }

  public sendCancel() {
    this.viewCtrl.dismiss()
  }


}
