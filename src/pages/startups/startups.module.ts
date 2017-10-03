import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartupsPage } from './startups';

@NgModule({
  declarations: [
    StartupsPage,
  ],
  imports: [
    IonicPageModule.forChild(StartupsPage),
  ],
})
export class StartupsPageModule {}
