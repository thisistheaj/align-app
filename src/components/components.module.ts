import { NgModule } from '@angular/core';
import { LoginModalComponent } from './login-modal/login-modal';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal';
import { ProfileModalComponent } from './profile-modal/profile-modal';
@NgModule({
	declarations: [LoginModalComponent,
    SignUpModalComponent,
    ProfileModalComponent],
	imports: [],
	exports: [LoginModalComponent,
    SignUpModalComponent,
    ProfileModalComponent]
})
export class ComponentsModule {}
