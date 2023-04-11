import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './components/goods/goods.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { canActivate } from './helpers/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'made_by — Главная'
    },
    {
        path: 'goods',
        component: GoodsComponent,
        canActivate: [canActivate],
        title: 'made_by — Товары'
    },
    {
        path: 'purchases',
        component: PurchasesComponent,
        canActivate: [canActivate],
        title: 'made_by — Покупки'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'made_by — Авторизация'
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
