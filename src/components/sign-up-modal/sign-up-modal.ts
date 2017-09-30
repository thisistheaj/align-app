import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ViewController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth";
import {UsersProvider} from "../../providers/users/users";
import {User} from "../../model/user";

/**
 * Generated class for the SignUpModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sign-up-modal',
  templateUrl: 'sign-up-modal.html'
})
export class SignUpModalComponent {
  public form: FormGroup;

  constructor(public viewCtrl: ViewController, public fb: FormBuilder,public authPvdr: AuthProvider, public usersPvdr: UsersProvider) {
    this.form = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password:["", Validators.compose([Validators.required,Validators.minLength(8)])],
      name:["", Validators.compose([Validators.required])],
      bio:["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(240)])],
    });
    this.authPvdr.addAuthCallback((data)=>{
      let u = new User(this.form.getRawValue());
      u.uid = data.uid;
      this.usersPvdr.addUser(u);
      this.sendDone();
    })
  }

  public signup(): void {
    this.authPvdr.signUpWithEmail(this.form.get('email').value, this.form.get('password').value)
      .then(data => this.loggedIn(data), err => alert(err.message));
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

}
