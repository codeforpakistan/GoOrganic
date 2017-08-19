import { Component, OnInit } from '@angular/core';
import { SendRequestService } from '../shared/services/send-request.service';
import { Subject } from 'rxjs/Subject';
 
@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    usecases: any[];
    
    owners: any[];

    _dialogRef: any;

    isVisible: boolean;

    promptMsg: string;

    resultsCount$: Subject<number>;
    startOffset: number;
    endOffset: number;
    totalPages: number;
    pageOffset: number;

    changableOwners: any[];
    showNextBtn: boolean;
    showPrevBtn: boolean;

    constructor( private sendRequest: SendRequestService){

        this.usecases = [];
        this.promptMsg = '';
        this.resultsCount$ = new Subject<number>();

        // this.startOffset = 0;
        // this.endOffset = 4;
         this.pageOffset = 4;
        // this.totalPages = 0;
        
        this.showNextBtn = false;
        this.showPrevBtn = false;
    
        this.sendRequest.subscribeToRequestService().subscribe(result => {
            if(result && result.data) {

                this.startOffset = 0;
                this.endOffset = 4;
                this.totalPages = 0;
                
                let data = result.data;
                
                if(!data.owners || data.owners.length == 0 && !data.usecases || data.usecases.length == 0 ) {
                    this.promptMsg = 'No results found.';
                    this.owners = [];
                    this.usecases = [];
                    this.changableOwners = [];
                    this.showNextBtn = false;
                    this.showPrevBtn = false;
                }
                else {
                    this.promptMsg = '';
                    this.owners = data.owners;

                    if(this.owners.length > 4) {
                        this.showNextBtn = true;

                        if(this.owners.length % this.pageOffset == 0) 
                            this.totalPages = this.owners.length / this.pageOffset;
                        else
                            this.totalPages = (this.owners.length / this.pageOffset) + 1;

                        this.changableOwners = this.owners.slice(this.startOffset, this.endOffset);   
                    }
                    else {
                        this.changableOwners = this.owners;
                        this.showNextBtn = false;
                        this.showPrevBtn = false;
                    }
                        
                        
                    this.totalPages = parseInt(this.totalPages.toString());
                    this.usecases = data.usecases;
                }

                if(this.usecases) {
                    let resultsCount = 0;
                    this.usecases.map((usecase, i) => {
                        if(i == 0) {
                            usecase.showPanel = true;
                        }
                        else {
                            usecase.showPanel = false;
                        }
                        
                        resultsCount += usecase.businessFunctionList.length;
                    });
                    this.resultsCount$.next(resultsCount);
                }
            }
            if(result && result.error) {
                console.log(result.error);
                this.resetResults();
                this.promptMsg = 'Something went wrong. Please try again.';
            }
        });
    }
    ngOnInit() {
        
    }
    resetResults() {
        this.owners = [];
        this.changableOwners = [];
        this.usecases = [];
        this.promptMsg = '';
        this.showNextBtn = false;
        this.showPrevBtn = false;
    }
    getResultsCount(): Subject<number> {
        return this.resultsCount$;
    }
    showNextOwners() {
        if(this.endOffset < this.totalPages * this.pageOffset) {
            this.startOffset += this.pageOffset;
            this.endOffset += this.pageOffset;
            this.changableOwners = this.owners.slice(this.startOffset, this.endOffset); 

            this.showPrevBtn = true;
        } 
        if(this.endOffset == this.totalPages * this.pageOffset) 
            this.showNextBtn = false;
            
    }
    showPrevOwners() {
        if(this.startOffset > 0) {
            this.startOffset -= this.pageOffset;
            this.endOffset -= this.pageOffset;
            this.changableOwners = this.owners.slice(this.startOffset, this.endOffset); 

            this.showNextBtn = true;        
        }
        if(this.startOffset == 0) 
            this.showPrevBtn = false;
    }

} 