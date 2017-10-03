import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {LoginModalComponent} from "../../components/login-modal/login-modal";
import {AuthProvider} from "../../providers/auth/auth";
import {SignUpModalComponent} from "../../components/sign-up-modal/sign-up-modal";
import {FirebaseObjectObservable} from "angularfire2/database";
import {UsersProvider} from "../../providers/users/users";
import {ImageProvider} from "../../providers/image/image";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userRef: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private authPvdr: AuthProvider, public usersPvdr: UsersProvider, public imagePvdr: ImageProvider) {

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
    // if (params && params.uid) {
    //   console.log('usersPvdr',this.usersPvdr.db);
    //   console.log('params.uid',params.uid);
    //   this.userRef = this.usersPvdr.getUser(params.uid);
    // }
  }

  public parseTextArea(evt) {
    this.userRef.update({skills: evt.split(", ")});
  }

  public changeImage() {
    this.imagePvdr.takePicture().then(image => {
      this.imagePvdr.uploadImage(image).then(imageUrl => {
        if (this.isLoggedIn() && this.isLoggedIn().uid) {
          this.usersPvdr.changeUserImageUrl(this.isLoggedIn().uid,imageUrl)
            .then(data => console.log('change image',data), err => console.error(err));
        }
      })
    }, err => console.error(err.message));
  }

}
