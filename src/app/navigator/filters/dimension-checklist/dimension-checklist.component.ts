import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataCollectionService } from '../../shared/services/data-collection.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdSearchBoxComponent } from '@covalent/core';

@Component({
    selector: 'dimension-checklist',
    templateUrl: './dimension-checklist.component.html',
    styleUrls: ['./dimension-checklist.component.scss']  
})
export class DimensionCheckListComponent implements OnInit {
    
    data: any;
    filteredDimensions: any[];
    isChecked: boolean;

    @Input() checklistId: number;
    @Input() bgColor: string;
    @Input() heading: string;
    @Input() scrollbarClassName: string;
    @Input() searchboxClassName: string;
    @Input() dimensions: any;
    @Input() checkboxClassName: string;
    
    @Output() resetSearchTriggered: EventEmitter<any>;

    @ViewChild('search') search: TdSearchBoxComponent;
    
    dimensionsList: any[];
    dimCount: number;

    constructor(private dataCollection: DataCollectionService) {
        this.isChecked = false;
        this.data = new BehaviorSubject<any>(null);
        this.resetSearchTriggered = new EventEmitter<any>();
        this.dimCount = 0;
    }
    ngOnInit() {
        this.dimensionsList = this.dimensions;
        this.filteredDimensions = this.dimensionsList;
        this.filteredDimensions.forEach(f => f.isChecked = false);
    }
    searchInputTerm(text: string) {
        
        this.filteredDimensions = this.dimensionsList.filter(option => {
            return option.name.toLowerCase().indexOf(text.toLowerCase()) != -1 ? option : ''
        });

        this.filteredDimensions.forEach(d => d.isChecked = this.isChecked);
        
    }
    toggleChecklistDimension(obj: any): void {
        this.resetSearchTriggered.emit(null);
        
        obj.dimension.isChecked = !obj.dimension.isChecked;

        if(this.dimensionsList.length == this.filteredDimensions.length)
            this.isChecked = this.filteredDimensions.every(_ => _.isChecked);

        if(obj.event.checked) {

            if(this.checklistId == 1) {
                if(!this.dataCollection.findIndustriesData(obj.dimension))
                    this.dataCollection.addIndustriesData(obj.dimension);
            }
            else if(this.checklistId == 2) {
                if(!this.dataCollection.findBusinessFunctionsData(obj.dimension))
                    this.dataCollection.addBusinessFunctionsData(obj.dimension);
            }
            else if(this.checklistId == 3) {
                if(!this.dataCollection.findFunctionalInsightsData(obj.dimension))
                    this.dataCollection.addFunctionalInsightsData(obj.dimension);
            } 
            else if(this.checklistId == 4) {
                if(!this.dataCollection.findAnalyticalCapabilitiesData(obj.dimension))
                    this.dataCollection.addAnalyticalCapabilitiesData(obj.dimension);
            }
        }
        else {
            if(this.checklistId == 1) {
                this.dataCollection.removeIndustriesData(obj.dimension);
            }
            else if(this.checklistId == 2) {
                this.dataCollection.removeBusinessFunctionsData(obj.dimension);
            }
            else if(this.checklistId == 3) {
                this.dataCollection.removeFunctionalInsightsData(obj.dimension);
            } 
            else if(this.checklistId == 4) {
                this.dataCollection.removeAnalyticalCapabilitiesData(obj.dimension);
            }
        }
    }
    toggleAllDimensions(): void {
        this.resetSearchTriggered.emit(null);    
        this.isChecked = !this.isChecked;
        this.filteredDimensions.forEach(d => d.isChecked = this.isChecked);

        if(this.isChecked) {
            if(this.checklistId == 1) {
                this.dimensionsList.forEach(dimension => {
                    if(!this.dataCollection.findIndustriesData(dimension))
                        this.dataCollection.addIndustriesData(dimension); 
                });
            }
            else if(this.checklistId == 2) {
                this.dimensionsList.forEach(dimension => {
                    if(!this.dataCollection.findBusinessFunctionsData(dimension))
                        this.dataCollection.addBusinessFunctionsData(dimension); 
                });
            }
            else if(this.checklistId == 3) {
                this.dimensionsList.forEach(dimension => {
                    if(!this.dataCollection.findFunctionalInsightsData(dimension)) 
                        this.dataCollection.addFunctionalInsightsData(dimension); 
                });
            }
            else if(this.checklistId == 4) {
                this.dimensionsList.forEach(dimension => { 
                    if(!this.dataCollection.findAnalyticalCapabilitiesData(dimension)) 
                        this.dataCollection.addAnalyticalCapabilitiesData(dimension); 
                });
            }
        }
        else {
            
            if(this.checklistId == 1) {
                this.dimensionsList.forEach(dimension => this.dataCollection.removeIndustriesData(dimension));
            }
            else if(this.checklistId == 2) {
                this.dimensionsList.forEach(dimension => this.dataCollection.removeBusinessFunctionsData(dimension));
            }
            else if(this.checklistId == 3) {
                this.dimensionsList.forEach(dimension => this.dataCollection.removeFunctionalInsightsData(dimension));
            }
            else if(this.checklistId == 4) {
                this.dimensionsList.forEach(dimension => this.dataCollection.removeAnalyticalCapabilitiesData(dimension));
            }
        }
    }

    resetAllDimensions(): void {
        this.isChecked = false;
        if(this.filteredDimensions) {
            this.filteredDimensions = this.filteredDimensions.map(f => {
                f.isChecked = false;
                return f;
            });
        }
        this.search.value = '';
    }
    setResultantDimensionsCount(count): void {
        this.dimCount = count;
    }
}