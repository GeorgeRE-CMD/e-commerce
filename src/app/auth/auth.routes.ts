import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up-component/sign-up-component';
import { SignInComponenet } from './sign-in-componenet/sign-in-componenet';
import { AuthComponent } from './auth-component/auth-component';
import { ForgetPasswordComponent } from './forget-password-component/forget-password-component';

export const routes: Routes = [
    {path:"", redirectTo:"sign-up", pathMatch:'full'},
    {path:"auth", component:AuthComponent},
    {path:"sign-up", component:SignUpComponent},

];
