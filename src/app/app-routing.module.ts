import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
import { FeaturesFormComponent } from './dashboard-product/features/form/form.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { LandingPageComponet } from './navigator/landingPage.component';
import { EndHungerComponent } from './end-hunger/end-hunger.component';
import { EndPovertyComponent } from './end-poverty/end-poverty.component';
import { GetToWorkComponent } from './get-to-work/get-to-work.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                component: LandingPageComponet,
                path: '',
            },
            {
                component: EndHungerComponent,
                path: 'charity',
            },
            {
                component: EndPovertyComponent,
                path: 'buy',
            },
            {
                component: GetToWorkComponent,
                path: 'market',
            }
        ]
    }
    /*{
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'product',
                component: DashboardProductComponent,
                children: [
                    {
                        path: '',
                        component: ProductOverviewComponent
                    },
                    {
                        path: 'stats',
                        component: ProductStatsComponent
                    },
                    {
                        path: 'features',
                        children: [
                            {
                                path: '',
                                component: ProductFeaturesComponent
                            },
                            {
                                path: 'add',
                                component: FeaturesFormComponent
                            },
                            {
                                path: ':id/delete',
                                component: FeaturesFormComponent
                            },
                            {
                                path: ':id/edit',
                                component: FeaturesFormComponent
                            },
                        ]
                    },
                ]
            },
            {
                path: 'item/:id',
                component: DetailComponent
            },
            {
                path: 'form',
                component: FormComponent
            },
            { path: '', loadChildren: './users/users.module#UsersModule' },
        ],
    },*/
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    MainComponent, LoginComponent,
    DashboardProductComponent,
    FormComponent, DetailComponent,
    FeaturesFormComponent, ProductFeaturesComponent, ProductOverviewComponent, ProductStatsComponent,
    NavigatorComponent, EndHungerComponent, EndPovertyComponent, GetToWorkComponent
];
