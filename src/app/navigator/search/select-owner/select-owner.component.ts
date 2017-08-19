import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, Inject } from '@angular/core'
import { IPageChangeEvent } from '@covalent/core';
import { DataCollectionService } from '../../shared/services/data-collection.service';
import { FiltersDataService } from '../../shared/services/filters-data.service';
import { SendRequestService } from '../../shared/services/send-request.service';
import { Observable } from 'rxjs/Observable';
import { TdSearchInputComponent } from '@covalent/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
    selector: 'select-owner',
    templateUrl: './select-owner.component.html',
    styleUrls: ['./select-owner.component.scss'],
})
export class SelectOwnerComponent implements OnInit {
    
    pageSize: number;
    fromRow: number;
    toRow: number;
    showDropDown: boolean;
    event: IPageChangeEvent;
    firstLast: boolean;
    pageSizeAll: boolean;
    filteredOwners: any;
    showAutoComplete: boolean;
    owners : any[];
    pageSizes: number[];
    shouldSearch: boolean;

    @ViewChild('searchInput') searchInput: TdSearchInputComponent; 

    @Output() resetAllTriggered: EventEmitter<any>;

    constructor(private dataCollection: DataCollectionService, 
                private ownersData: FiltersDataService, 
                private eref: ElementRef,
                private sendRequest: SendRequestService,
                private loader: LoaderService){

        this.pageSize = 8;
        this.setRowsRange();
        this.showDropDown = false;
        
        this.ownersData
        .subscribeToOwnerDataService()
        .subscribe(owners => {
            if(owners) {
                this.owners = owners;
                this.owners.map(owner => owner.isSelected = false);
                this.filteredOwners = this.owners;

                this.updateRowsPerPage();
            }
        });

        // Disappearing loader when data from backend arrives
        this.sendRequest.subscribeToRequestService().subscribe(() => {
            this.loader.resolveLoader();
        });

        this.shouldSearch = true;
        this.resetAllTriggered = new EventEmitter<any>();
    };
    ngOnInit() {
        
    }
    onClick(event) {
        if(event.target.id == 'select-owner-container') {
            this.showDropDown = false;
        }
    }
    searchInputTerm(text: string) {

        //todo: this code will be removed in future
        if(!this.shouldSearch) {
            return;
        }
        ///////////////////////////////////////////

        if(text.length != 0) {
            this.showDropDown = true;
            this.fromRow = 0;
            this.toRow = this.owners.length;
        }  
        else {
            this.showDropDown = false;
            //todo: this code will be used in future
            //this.filteredOwners = [];
            this.dataCollection.removeSelectOwnerData(null);
        }

        this.filteredOwners = this.owners.filter(owner => {
            return owner.name.toLowerCase().indexOf(text.toLowerCase()) != -1 ? owner : ''
        });

        this.setRowsRange();
        this.updateRowsPerPage();
    }
    change(event: IPageChangeEvent): void {
        this.event = event;
        this.fromRow = this.event.fromRow - 1;
        this.toRow = this.event.toRow;
    }
    toggleDropDown() {
        this.showDropDown = !this.showDropDown;
        this.fromRow = 0;
        this.toRow = this.fromRow + this.pageSize ;
    }
    toggleFirstLast(): void {
        this.firstLast = !this.firstLast;
    }
    //todo: this function will be used in future
    // selectOwner(owner, isOwnerCardClicked) {
    //     owner.isSelected = !owner.isSelected;
    //     if(owner.isSelected)
    //         this.dataCollection.addSelectOwnerData(owner);
    //     else
    //         this.dataCollection.removeSelectOwnerData(owner);
    // }
    selectOwner(owner, isOwnerCardClicked) {
        this.resetAllTriggered.emit(null);
        owner.isSelected = !owner.isSelected;
        this.searchInput.value = owner.name;
        this.shouldSearch = false;
        this.dataCollection.addSelectOwnerData(owner);

        //showing loader on screen
        this.loader.registerLoader();
        this.sendRequest.getResults(this.dataCollection.getDataObject());
    }
    resetSelectedOwners() {
        //todo: this code will be used in future
        // this.filteredOwners.forEach(owner => {
        //     owner.isSelected = false;
        // });
        /////////////////////////////////////////

        this.searchInput.value = '';
        this.showDropDown = false;
    }
    //todo: this code will be removed in future
    enableSearchInputTerm() {
        this.shouldSearch = true;
    } 
    ///////////////////////////////////////////
    updateRowsPerPage() {
        this.pageSizes = [];
        if(this.filteredOwners.length % this.pageSize == 0) {
            let quotient = this.filteredOwners.length / this.pageSize;
            for(var q = 1; q <= quotient; q++) {
                this.pageSizes.push(this.pageSize * q);
            }
        }
        else {
            let quotient = this.filteredOwners.length / this.pageSize;
            for(var q = 1; q <= quotient + 1; q++) {
                this.pageSizes.push(this.pageSize * q);
            }
        }
    }
    setRowsRange() {
        this.fromRow = 0;
        this.toRow = this.fromRow + this.pageSize;
    }
    resetAll() {
        this.dataCollection.removeSelectOwnerData(null);
        this.resetAllTriggered.emit(null);
    }
    getSearchInputValue(): string {
        return this.searchInput.value;
    }
}