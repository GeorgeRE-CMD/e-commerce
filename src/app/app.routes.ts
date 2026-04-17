import { authGuard } from './guards/auth-guard';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth-component/auth-component';
import { SignInComponenet } from './auth/sign-in-componenet/sign-in-componenet';
import { ForgetPasswordComponent } from './auth/forget-password-component/forget-password-component';
import { HomeComponent } from './features/home-component/home-component';
import { ShopComponent } from './features/shop-component/shop-component';
import { CartComponent } from './features/cart-component/cart-component';
import { ProductDetailsComponent } from './features/product-details-component/product-details-component';
import { Navbar } from './layouts/navbar/navbar';
import { OrdersComponent } from './features/orders-component/orders-component';
import { CheckOutSessions } from './features/check-out-sessions/check-out-sessions';

export const routes: Routes = [
    { path: "", redirectTo: "auth", pathMatch: "full" },
    {
        path: "auth",
        component: AuthComponent,
        loadChildren: () => import('./auth/auth.routes').then((t) => t.routes)
    },

    {
        path: "auth/sign-in",
        component: SignInComponenet
    },

    {
        path: "auth/forget-password",
        component: ForgetPasswordComponent
    },
    {
        path: "",
        component: Navbar,
        children: [
            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "shop",
                component: ShopComponent
            },
            {
                path: "product-details/:productId",
                component: ProductDetailsComponent
            },
            {
                path: "cart",
                canActivate: [authGuard],
                component: CartComponent
            },
            {
                path: "orders",
                canActivate: [authGuard],
                component: OrdersComponent
            },
            {
                path: "check-out-session/:cartId",
                canActivate: [authGuard],
                component: CheckOutSessions
            },
        ]
    }
];
