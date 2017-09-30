import { NgModule } from '@angular/core';
import { LoginModalComponent } from './login-modal/login-modal';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal';
@NgModule({
	declarations: [LoginModalComponent,
    SignUpModalComponent],
	imports: [],
	exports: [LoginModalComponent,
    SignUpModalComponent]
})
export class ComponentsModule {}
