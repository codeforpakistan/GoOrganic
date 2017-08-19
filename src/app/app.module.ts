import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentMessageModule } from '@covalent/core';
import { CovalentExpansionPanelModule } from '@covalent/core';
import { StarRatingModule } from 'angular-star-rating';
import { CovalentLayoutModule } from '@covalent/core';
import { TdMediaService } from '@covalent/core';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { routedComponents, AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { USER_PROVIDER, USERS_API } from './users';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';

import { SearchComponent } from './navigator/search/search.component'
import { DimensionSearchComponent } from './navigator/search/dimension-search/dimension-search.component'
import { SelectOwnerComponent } from './navigator/search/select-owner/select-owner.component'
import { OwnerCardComponent } from './navigator/shared/owner-card/owner-card.component'
import { ViewUseCasesComponent } from './navigator/search/view-usecases/view-usecases.component'
import { FiltersComponent } from './navigator/filters/filters.component'
import { DimensionCheckListComponent } from './navigator/filters/dimension-checklist/dimension-checklist.component'
import { DimensionSliderComponent } from './navigator/filters/dimension-slider/dimension-slider.component'
import { ResultsComponent } from './navigator/results/results.component'
import { OwnerComponent } from './navigator/results/owner/owner.component'
import { UseCaseComponent } from './navigator/results/use-case/use-case.component'
import { UseCaseDetailsComponent } from './navigator/results/use-case-details/use-case-details.component'
import { UseCaseOwnerComponent } from './navigator/results/use-case-owner/use-case-owner.component'
import { MaturityLevelComponent } from './navigator/filters/maturity-level/maturity-level.component'
import { SocialButtonComponent } from './navigator/shared/social-button/social-button.component'
import { SocialCardComponent } from './navigator/shared/social-card/social-card.component'
import { MaturityScaleComponent } from './navigator/shared/maturity-scale/maturity-scale.component'

import { DataCollectionService } from './navigator/shared/services/data-collection.service'
import { SendRequestInterceptor } from '../config/interceptors/send-request.interceptor'
import { SendRequestService } from './navigator/shared/services/send-request.service'
import { FiltersDataService } from './navigator/shared/services/filters-data.service'

import { LoaderService } from './navigator/shared/services/loader.service'

import { DirCrudComponent } from './navigator/dir-crud/dir-crud.component';
import { DimensionsListComponent } from './navigator/dir-crud/dimensions-list/dimensions-list.component';

import { NearBySearchComponent } from './nearby-search/nearby-search.component';

import { CovalentChipsModule } from '@covalent/core';

import {MdProgressBarModule} from '@angular/material';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
  SendRequestInterceptor
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    MyNewComponentComponent,
    SearchComponent,
    DimensionSearchComponent,
    SelectOwnerComponent,
    OwnerCardComponent,
    ViewUseCasesComponent,
    FiltersComponent,
    DimensionCheckListComponent,
    DimensionSliderComponent,
    ResultsComponent,
    OwnerComponent,
    UseCaseComponent,
    UseCaseDetailsComponent,
    UseCaseOwnerComponent,
    MaturityLevelComponent,
    SocialButtonComponent,
    SocialCardComponent,
    MaturityScaleComponent,
    DirCrudComponent,
    DimensionsListComponent,
    NearBySearchComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    StarRatingModule,
    CovalentLayoutModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      },{
        interceptor: SendRequestInterceptor, paths: ['**']
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentExpansionPanelModule,
    CovalentMessageModule,
    CovalentChipsModule,
    MdProgressBarModule
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title, {
      provide: USERS_API, useFactory: getAPI,
    }, USER_PROVIDER,
    DataCollectionService,
    SendRequestService,
    FiltersDataService,
    LoaderService,
    TdMediaService
  ], // additional providers needed for this module
  entryComponents: [ UseCaseDetailsComponent, DirCrudComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
