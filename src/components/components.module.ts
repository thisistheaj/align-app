import { NgModule } from '@angular/core';
import { LoginModalComponent } from './login-modal/login-modal';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal';
import { ProfileModalComponent } from './profile-modal/profile-modal';
import { LocalSearchbarComponent } from './local-searchbar/local-searchbar';
@NgModule({
	declarations: [LoginModalComponent,
    SignUpModalComponent,
    ProfileModalComponent,
    LocalSearchbarComponent],
	imports: [],
	exports: [LoginModalComponent,
    SignUpModalComponent,
    ProfileModalComponent,
    LocalSearchbarComponent]
})
export class ComponentsModule {}
