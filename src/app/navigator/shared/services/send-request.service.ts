import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpInterceptorService, RESTService } from '@covalent/http';
import { BASE_URI } from '../../../../config/api.config';

@Injectable()
export class SendRequestService extends RESTService<any> {

    results$: BehaviorSubject<any>;
    
    constructor(private _http: HttpInterceptorService) {
        super(_http, {
            baseUrl: BASE_URI,
            path: '/',
        });
        this.results$ = new BehaviorSubject<any>(null);
    }

    getResults(requestObject: object) {
        this.http
        .post(BASE_URI + '/search', requestObject)
        .map((res: Response) => {
            return res.json();
        })
        .catch((error) => { 
            throw new Error(error) 
        })
        .subscribe(
            results => {
                let useCasesCount = 0;
                results.usecases.map(u => {
                    useCasesCount += u.businessFunctionList.length;
                });

                results.useCasesCount = useCasesCount; 

                this.results$.next({
                    data: results
                });
                
            },
            error => { 
                this.results$.next({error: error});
            }
        );
    }

    subscribeToRequestService(): Observable<any> {
        return this.results$.asObservable();
    }
}
