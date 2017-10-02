import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import {UsersProvider} from "../../providers/users/users";
import {User} from "../../model/user";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards: Array<User>;
  stackConfig: StackConfig;
  usersSnap: Array<User>;
  currentUserSnap: User;
  foo = [];

  constructor(public navCtrl: NavController,public authPvdr: AuthProvider, public usersPvdr: UsersProvider) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };

    if (this.isLoggedIn().uid) {
      this.usersPvdr.getUser(this.isLoggedIn().uid).subscribe(userSnap => {
        this.currentUserSnap = userSnap;
      })
    }

    let sub = this.usersPvdr.getUsers().subscribe(usersSnap => {
      this.usersSnap = usersSnap.filter(u => {
        if (!this.isLoggedIn()) {
          return true;
        } else if (u.uid == this.isLoggedIn().uid) {
          return false;
        }else if(!this.currentUserSnap.matches) {
          return true;
        } else if (this.currentUserSnap.matches[u.uid]) {
          return false;
        } else {
          return true;
        }
      });
      this.cards = [{email: '', name: '',imageUrl: null,matches:{}, uid:'', bio:'', skills: []}];
      this.addNewCards(1);
      sub.unsubscribe();
    });


  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.addNewCards(1);
    if (like) {
      this.onLiked(removedCard);
    } else {
      this.onDisliked(removedCard);
    }
  }

// Add new cards to our array
  addNewCards(count: number) {
    // this.http.get('https://randomuser.me/api/?results=' + count)
    //   .map(data => data.json().results)
    //   .subscribe(result => {
    //     for (let val of result) {
    //       this.cards.push(val);
    //     }
    //   });
    if(this.usersSnap && this.usersSnap.length > 0) {
      this.cards.push(this.usersSnap.pop());
      console.log(this.cards);
    }
  }

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  public onLiked(user: User) {
    if (this.isLoggedIn()) {
      this.usersPvdr.likeUser(this.currentUserSnap, user, true).then(isMatch => {
        console.log('match: ', isMatch);
        if (isMatch) {
          alert('You matched with: ' + user.name);
        }
      });
    } else {
      this.promptLogin();
    }
  }

  public onDisliked(user: User) {
    if (this.isLoggedIn()) {
      // alert("You disliked " + user.name);
      this.usersPvdr.likeUser(this.currentUserSnap, user, false).then(data => console.log('match: ', data));
    } else {
      this.promptLogin();
    }
  }

  public isLoggedIn() {
    // if (this.authPvdr.isLoggedIn()) {
    //   this.userRef = this.usersPvdr.getUser(this.authPvdr.isLoggedIn().uid);
    // }
    return this.authPvdr.isLoggedIn();
  }

  public promptLogin() {
    alert('Log in');
  }

}
