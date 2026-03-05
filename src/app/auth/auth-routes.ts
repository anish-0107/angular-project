import { Routes } from "@angular/router";
import { authGuardGuard } from "./guards/auth-guard-guard";

export const Auth_routes:Routes=[
    {
        path:'login',
        loadComponent:() => import('./login/login').then(m=>m.Login),
        data: { isPublic: true }
    },
    {
        path:'register',
        loadComponent:() => import('./register/register').then(m =>m.Register)
    },
    {
        path:'profile',
        canActivate:[authGuardGuard],
        loadComponent:() => import('./profile/profile').then (a=> a.Profile)
    }
]