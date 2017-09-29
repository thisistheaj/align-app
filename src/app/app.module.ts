import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { DatabaseProvider } from '../providers/database/database';
import { UsersProvider } from '../providers/users/users';

export const firebaseConfig = {
  apiKey: "AIzaSyDIX9h1XPh3A84v_OrT35R4vANTTLj-zQg",
  authDomain: "followers-e0e8d.firebaseapp.com",
  databaseURL: "https://followers-e0e8d.firebaseio.com",
  projectId: "followers-e0e8d",
  storageBucket: "followers-e0e8d.appspot.com",
  messagingSenderId: "758989306245"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SwingModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    UsersProvider
  ]
})
export class AppModule {}
