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
  }

  public login(): void {
    this.authPvdr.logInWithEmail(this.form.get('email').value, this.form.get('password').value)
      .then(data => this.sendDone(), err => alert(err.message));
  }

  public signup(): void {
    this.authPvdr.logInWithEmail(this.form.get('email').value, this.form.get('password').value)
      .then(data => this.sendDone(), err => alert(err.message));
  }

  public logOut(){
    this.authPvdr.logOut();
  }

  public sendCancel() {
    this.viewCtrl.dismiss()
  }

  public sendDone() {
    alert('Logged in');
  }

  public checkLoggedIn(){
    alert(this.authPvdr.isLoggedIn());
  }

}
