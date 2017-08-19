import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DimensionSearchComponent } from './dimension-search/dimension-search.component';
import { SelectOwnerComponent } from './select-owner/select-owner.component';
import { ViewUseCasesComponent } from './view-usecases/view-usecases.component'
import { DataCollectionService } from '../shared/services/data-collection.service';
import { SendRequestService } from '../shared/services/send-request.service';
import { LoaderService } from '../shared/services/loader.service';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']  
})
export class SearchComponent implements OnInit {

    @ViewChild(DimensionSearchComponent) dimSearch: DimensionSearchComponent;
    @ViewChild(SelectOwnerComponent) selectOwner: SelectOwnerComponent;
    @ViewChild(ViewUseCasesComponent) viewUseCases: ViewUseCasesComponent;

    @Input() filters: any;
    
    constructor(private dataCollection: DataCollectionService,
                private sendRequest: SendRequestService,
                private loader: LoaderService) {

        this.sendRequest.subscribeToRequestService().subscribe(() => {
            // disappearing loader when data has arrived
            this.loader.resolveLoader();
        })
    }
    ngOnInit() {}
    resetAll() {
        // this.dimSearch.resetDimensionSearch();
        this.selectOwner.resetSelectedOwners();
        this.viewUseCases.resetViewUseCasesCount();
    }
    resetEverySubComponent() {
        this.dimSearch.resetDimensionSearch();
        this.selectOwner.resetSelectedOwners();
        this.viewUseCases.resetViewUseCasesCount(); 
    }
    viewAll() {
        this.filters.resetData();
        //showing loader before data is arrived from backend
        this.loader.registerLoader();
        // get all results
        this.sendRequest.getResults({});
    }
    resetAllListener() {
        //this.filters.resetData();
        this.filters.showFilters();
    }
    getDimensionSearchValue(): string {
        return this.dimSearch.getSearchValue() ? this.dimSearch.getSearchValue() : '';
    }
    getSelectOwnerValue(): string {
        return this.selectOwner.getSearchInputValue() ? this.selectOwner.getSearchInputValue() : '';
    }
}