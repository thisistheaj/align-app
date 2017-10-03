import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {UsersProvider} from "../../providers/users/users";
import {ProfileModalComponent} from "../../components/profile-modal/profile-modal";
import {LocalSearchbarComponent} from "../../components/local-searchbar/local-searchbar";
import {User} from "../../model/user";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public users: FirebaseListObservable<any>;
  public filteredUsers: any = [];
  public currentUserSnap: User;

  constructor(public navCtrl: NavController, public usersPvdr: UsersProvider, public modalCtrl: ModalController, public authPvdr: AuthProvider) {
    this.users = this.usersPvdr.getUsers();
    let sub = this.users.subscribe( data => {
      this.filteredUsers = data;
      // sub.unsubscribe();
    });
    if (this.authPvdr.isLoggedIn() && this.authPvdr.isLoggedIn().uid) {
      this.usersPvdr.getUser(this.authPvdr.isLoggedIn().uid).subscribe(userSnap => {
        this.currentUserSnap = userSnap;
      });
    }
  }

  public presentProfileModal(uid) {
    let modal = this.modalCtrl.create(ProfileModalComponent,{uid: uid});
    modal.present()
  }

  public onItemsFiltered(ev){
    console.log(this.filteredUsers);
    this.filteredUsers = ev;
  }
}
