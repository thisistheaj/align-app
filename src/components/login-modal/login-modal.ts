import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LoginModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.html'
})
export class LoginModalComponent {
  public form: FormGroup;

  constructor(public viewCtrl: ViewController, public fb: FormBuilder,public authPvdr: AuthProvider) {
    this.form = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password:["", Validators.compose([Validators.required,Validators.minLength(8)])]
    });
    this.authPvdr.addAuthCallback((data)=>{
      this.sendDone();
    })
  }

  public login(): void {
    this.authPvdr.logInWithEmail(this.form.get('email').value, this.form.get('password').value)
      .then(data => this.loggedIn(data), err => alert(err.message));
  }

  public signup(): void {
    this.authPvdr.signUpWithEmail(this.form.get('email').value, this.form.get('password').value)
      .then(data => this.loggedIn(data), err => alert(err.message));
  }

  public logOut(){
    this.authPvdr.logOut();
  }

  public sendCancel() {
    this.viewCtrl.dismiss()
  }

  public sendDone() {
    this.viewCtrl.dismiss()
  }

  public loggedIn(data){
    if (data.message) { //check for error (does not go into err callback)
      alert(data.message);
    }
  }

  public checkLoggedIn(){
    alert(this.authPvdr.isLoggedIn());
  }

}
