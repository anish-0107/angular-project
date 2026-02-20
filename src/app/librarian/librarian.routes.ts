import { Routes } from "@angular/router";
import { DashboardCompo } from "./dashboard/dashboard-compo/dashboard-compo";
import { BookForm } from "./manage-book/book-form/book-form";
import { UserList } from "./mange_users/user-list/user-list";
import { librarianGuard } from "../auth/guards/librarian-guard";
import { authGuardGuard } from "../auth/guards/auth-guard-guard";

export const lib_ROUTES: Routes =[

    {
        path:'dashboard' ,
        loadComponent:() => import('./dashboard/dashboard-compo/dashboard-compo').then(m => m.DashboardCompo)
    },
    {
        path:'manage',
        loadComponent:() => import('./manage-book/book-list/book-list') .then(m => m.BookList),
        canActivate:[librarianGuard]
    },
    {
        path:'add',
        loadComponent:() => import('./manage-book/book-form/book-form') .then(m => m.BookForm),
        canActivate:[librarianGuard]
    },
    {
        path:'list',
        loadComponent:() => import('./mange_users/user-list/user-list') .then(m => m.UserList),
        canActivate:[librarianGuard]
    },
    {
        path:'list/:id',
        loadComponent:() => UserList,
        canActivate:[librarianGuard]
    }
]