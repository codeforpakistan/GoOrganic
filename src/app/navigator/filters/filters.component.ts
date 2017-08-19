import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { DataCollectionService } from '../shared/services/data-collection.service';
import { SendRequestService } from '../shared/services/send-request.service';
import { FiltersDataService } from '../shared/services/filters-data.service';
import { DimensionCheckListComponent } from './dimension-checklist/dimension-checklist.component';
import { DimensionSliderComponent } from './dimension-slider/dimension-slider.component';
import { TdLoadingService, LoadingMode, LoadingType, LoadingStrategy } from '@covalent/core';

@Component({
    selector: 'filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']  
})
export class FiltersComponent implements OnInit {

    
    industries:object[];
    businessFunctions:object[];
    functionalInsights:object[];
    analyticalCapabilities:object[];
    maturityLevels:object[];

    disabled: boolean = false;
    isHidden: boolean = false;
    resultsCountDesc: string;
    isApplied: boolean;

    @ViewChildren('in, bf, fi, ac') dimCheckComponents: QueryList<DimensionCheckListComponent>;
    @ViewChild(DimensionSliderComponent) dimSlideComponent: DimensionSliderComponent;

    @Input() searchBar: any;
    @Input() results: any;

    searchTextStr: string;
    ownersStr: string;
    indusStr: string;
    bfStr: string;
    fiStr: string;
    acStr: string;
    maturityLevelsStr: string;
    indusCount: number;
    bfCount: number;
    fiCount: number;
    acCount: number;
    

    filtersCount: number;
    noResultsPrompt: boolean;

    constructor(private dataCollection: DataCollectionService, 
                private sendRequest: SendRequestService,
                private filtersData: FiltersDataService,
                private loadingService: TdLoadingService) {

        this.filtersData
        .subscribeToFilterDataService()
        .subscribe(data => {
            if(data) {
                this.industries = data.industries;
                this.businessFunctions = data.businessFunctions;
                this.functionalInsights = data.functionalInsights;
                this.analyticalCapabilities = data.analyticalCapabilities;
                this.maturityLevels = data.maturityLevels;
            }
        });

        this.searchTextStr = '';
        this.ownersStr = '';
        this.indusStr = '';
        this.bfStr = '';
        this.fiStr = '';
        this.acStr = '';
        this.maturityLevelsStr = '';

        this.loadingService.create({
            name: 'resultsLoader',
            mode: LoadingMode.Indeterminate,
            type: LoadingType.Circular,
            color: 'accent'
        });

        this.filtersCount = 0;

        this.sendRequest.subscribeToRequestService().subscribe(result => {
            if(result && result.data) {
                this.collapseFilters();
                let data = result.data;
                let usecases = data.usecases;
                let totalCount = 0;
                if(usecases) {
                    usecases.map((usecase) => {
                        totalCount += usecase.businessFunctionList.length;
                    });
                }
                
                this.dimCheckComponents.forEach(dimCheck => {
                    if(dimCheck.checklistId == 1) {
                        dimCheck.setResultantDimensionsCount(this.indusCount);
                    }
                    if(dimCheck.checklistId == 2) {
                        dimCheck.setResultantDimensionsCount(this.bfCount);
                    }
                    if(dimCheck.checklistId == 3) {
                        dimCheck.setResultantDimensionsCount(this.fiCount);
                    }
                    if(dimCheck.checklistId == 4) {
                        dimCheck.setResultantDimensionsCount(this.acCount);
                    }
                });

                let collectedData: any = this.dataCollection.getDataObject();
                
                this.filtersCount = collectedData.industries ? collectedData.industries.length : 0;
                this.filtersCount += collectedData.businessFunctions ? collectedData.businessFunctions.length : 0;
                this.filtersCount += collectedData.functionalInsights ? collectedData.functionalInsights.length : 0;
                this.filtersCount += collectedData.analyticalCapabilities ? collectedData.analyticalCapabilities.length : 0;
                
                if( 
                    !collectedData.hasOwnProperty('searchText') && 
                    !collectedData.hasOwnProperty('selectedOwners') && 
                    !collectedData.hasOwnProperty('industries') &&
                    !collectedData.hasOwnProperty('businessFunctions') &&
                    !collectedData.hasOwnProperty('functionalInsights') &&
                    !collectedData.hasOwnProperty('analyticalCapabilities') &&
                    !collectedData.hasOwnProperty('maturityLevels') 
                ) {
                    this.resultsCountDesc = 'Showing all results';
                }
                else {
                    this.resultsCountDesc = 'Showing ' + totalCount + ' results from ';
                }

                this.searchTextStr = collectedData.searchText ? collectedData.searchText.name : '';
                this.maturityLevelsStr = '';
                if(collectedData.maturityLevels) {
                    collectedData.maturityLevels.map((ml,i) => {
                        if(i == collectedData.maturityLevels.length - 1 )
                            this.maturityLevelsStr = this.maturityLevelsStr.concat(ml.name);
                        else 
                            this.maturityLevelsStr = this.maturityLevelsStr.concat(ml.name + ',');
                    });
                }
                
                
                this.indusStr = collectedData.industries ? collectedData.industries.map(ind => ind.name).join(', ') : '';
                this.bfStr = collectedData.businessFunctions ? collectedData.businessFunctions.map(bf => bf.name).join(', ') : '';
                this.fiStr = collectedData.functionalInsights ? collectedData.functionalInsights.map(fi => fi.name).join(', ') : '';
                this.acStr = collectedData.analyticalCapabilities ? collectedData.analyticalCapabilities.map(ac => ac.name).join(', ') : '';
                this.ownersStr = collectedData.selectedOwners ? collectedData.selectedOwners.map(owner => owner.name).join(', ') : ''; 
            

                this.loadingService.resolve('resultsLoader');
            }
            if(result && result.error) {
                this.collapseFilters();
                this.loadingService.resolve('resultsLoader');
            }
        });

        this.isApplied = true;
        
    }
    ngOnInit() {
        
    }

    collapseFilters() {
        this.isHidden = true;
    }
    showFilters() {
        this.isHidden = false;
    }
    viewData() {
        this.loadingService.register('resultsLoader');
        this.sendRequest.getResults(this.dataCollection.getDataObject());
    }
    resetData() {
        this.dataCollection.resetAllData();
        this.dimCheckComponents.forEach(dmc => {
            dmc.resetAllDimensions();
            dmc.setResultantDimensionsCount(0);
        });
        this.dimSlideComponent.resetAllLevels();
        //this.searchBar.resetAll();
        this.searchBar.resetEverySubComponent();
        this.results.resetResults();
        this.resultsCountDesc = '';
        this.searchTextStr = '';
        this.maturityLevelsStr = '';
        
        this.indusStr = '';
        this.bfStr = '';
        this.fiStr = '';
        this.acStr = '';
        this.ownersStr = ''; 
        this.filtersCount = 0;
        this.noResultsPrompt = false;
    }
    handleResetSearch() {
        if(this.searchBar.getDimensionSearchValue().length != 0 || this.searchBar.getSelectOwnerValue().length != 0) {
            
            this.searchBar.resetAll();
            this.results.resetResults();
            this.resultsCountDesc = '';
            this.ownersStr = ''; 
            this.searchTextStr = '';
            this.maturityLevelsStr = '';
            
        //     this.dataCollection.removeDimensionSearchData();
            this.dataCollection.removeSelectOwnerData(null);
        }
    }
}