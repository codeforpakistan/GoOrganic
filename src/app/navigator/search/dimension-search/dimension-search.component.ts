import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataCollectionService } from '../../shared/services/data-collection.service';
import { FiltersDataService } from '../../shared/services/filters-data.service';
import { SendRequestService } from '../../shared/services/send-request.service';
import { Observable } from 'rxjs/Observable';
import { TdSearchBoxComponent } from '@covalent/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
    selector: 'dimension-search',
    templateUrl: './dimension-search.component.html',
    styleUrls: ['./dimension-search.component.scss']  
})
export class DimensionSearchComponent implements OnInit {

    @ViewChild('search') search: TdSearchBoxComponent;

    options: any[];
    filteredOptions: any[];
    filterSelected: boolean;
    
    showDropDown: boolean;

    @ViewChild('input') input;

    @Output() resetAllTriggered: EventEmitter<any>;

    constructor(private dataCollection: DataCollectionService, 
                private filtersData: FiltersDataService,
                private loader: LoaderService,
                private sendRequest: SendRequestService) {

        this.filterSelected = false;
        this.filteredOptions = null;
        
        this.filtersData.subscribeToSuggestionsDataService().subscribe(suggestion => {
            this.options = suggestion;
        });
        
        // Disappearing loader when the data arrives from backend
        this.sendRequest.subscribeToRequestService().subscribe(() => {
            this.loader.resolveLoader();
        });

        this.resetAllTriggered = new EventEmitter<any>();
        this.showDropDown = false;
    }
    ngOnInit() {
        
    }
    onClick(event) {
        if(event.target.id == 'select-owner-container') {
            this.showDropDown = false;
        }
    }
    searchInputTerm(text: string) {
        
        if(this.filterSelected) {
            this.filterSelected = false;
            this.filteredOptions = null;
            return;
        }

        this.filteredOptions = [];
        if(text.length != 0) {
            if(this.options) {
                this.filteredOptions = this.options.filter(option => {
                    if(option.name)
                        return option.name.toLowerCase().indexOf(text.toLowerCase()) != -1
                });
                
                if(this.filteredOptions.length == 0) {
                    this.filteredOptions = [
                        {
                            id: null,
                            name: 'No item found'
                        }
                    ]
                    setTimeout(() => {
                        this.filteredOptions = [];
                    }, 1500);
                }
            }

            this.showDropDown = true;
            
            this.dataCollection.selectDimensionSearchData({
                id: null,
                name: text
            });
        }
        else {
            this.dataCollection.selectDimensionSearchData(null);
        }
    }
    
    selectOption(search, option) {
        this.resetAllTriggered.emit(null);
        this.filterSelected = true;
        search.value = option.name;
        this.dataCollection.selectDimensionSearchData(option);
        this.sendRequest.getResults(this.dataCollection.getDataObject()); 
        //showing loader on screen
        this.loader.registerLoader();
    }
    resetDimensionSearch() {
        this.search.value = '';
    }
    doSearch(text, search) {
        this.resetAllTriggered.emit(null);
        search.value = text;
        this.dataCollection.selectDimensionSearchData({
            id: null,
            name: text
        });
        
        //showing loader on screen
        this.loader.registerLoader();
        this.sendRequest.getResults(this.dataCollection.getDataObject()); 
        
        this.filteredOptions = [];
        this.filterSelected = true;
    }
    resetAll() {
        this.dataCollection.selectDimensionSearchData(null);
        this.resetAllTriggered.emit(null);
    }
    getSearchValue(): string {
        return this.search.value;
    }
}