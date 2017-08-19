import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpInterceptorService, RESTService } from '@covalent/http';
import { BASE_URI } from '../../../../config/api.config';

@Injectable()
export class FiltersDataService extends RESTService<any> {

    filtersData$: BehaviorSubject<any>;
    ownersData$: BehaviorSubject<any>;
    suggestionsData$: BehaviorSubject<any>;

    constructor(private _http: HttpInterceptorService) {
        super(_http, {
            baseUrl: BASE_URI,
            path: '/',
        });
        this.initializeFiltersDataService();
        this.initializeOwnersDataService();
        this.initializeSuggestionsDataService();
    }

    initializeFiltersDataService() {
        if (!this.filtersData$) {
            this.filtersData$ = new BehaviorSubject<any>(null);
        }
    }

    subscribeToFilterDataService(): Observable<any> {
        return this.filtersData$.asObservable();
    }

    initializeOwnersDataService() {
        if (!this.ownersData$) {
            this.ownersData$ = new BehaviorSubject<any>(null);
        }
    }

    initializeSuggestionsDataService() {
        if (!this.suggestionsData$) {
            this.suggestionsData$ = new BehaviorSubject<any>(null);
        }
    }

    subscribeToOwnerDataService(): Observable<any> {
        return this.ownersData$.asObservable();
    }

    subscribeToSuggestionsDataService(): Observable<any> {
        return this.suggestionsData$.asObservable();
    }

    getFiltersData(): Promise<any> {
        return new Promise<any>(
            (resolve, reject) => {
                this._http.get(BASE_URI + '/filters')
                .subscribe(
                    (data) => {
                        this.filtersData$.next(data.json());
                        resolve();
                    },
                    (error) => {
                        reject(new Error(error));
                    }
                );        
            }
        );
    }

    getOwnersData(): Promise<any> {
        return new Promise<any>(
            (resolve, reject) => {
                this._http.get(BASE_URI + '/owners')
                .subscribe(
                    (data) => {
                        this.ownersData$.next(data.json());
                        resolve();
                    },
                    (error) => {
                        reject(new Error(error));
                    }
                );
            }
        ); 
    }

    getSuggestionsData(): Promise<any>  {
        return new Promise<any>(
            (resolve, reject) => {
                this._http.get(BASE_URI + '/usecases')
                .subscribe(
                    (data) => {
                        this.suggestionsData$.next(data.json());
                        resolve();
                    },
                    (error) => {
                        reject(new Error(error));
                    }
                );
            }
        ); 
    }
}
