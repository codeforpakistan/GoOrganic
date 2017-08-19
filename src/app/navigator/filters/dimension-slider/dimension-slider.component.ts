import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataCollectionService } from '../../shared/services/data-collection.service';
import { MaturityLevelComponent } from '../maturity-level/maturity-level.component';

@Component({
    selector: 'dimension-slider',
    templateUrl: './dimension-slider.component.html',
    styleUrls: ['./dimension-slider.component.scss']  
})
export class DimensionSliderComponent implements OnInit {

    isIdeaActive:boolean;
    isInnovationActive:boolean;
    isProvenActive:boolean;
    isPackagedActive:boolean;

    @Input() maturityLevels:any[];

    @Output() resetSearchTriggered: EventEmitter<any>;
    
    constructor(private dataCollection: DataCollectionService) {
        this.resetSearchTriggered = new EventEmitter<any>();
    }
    ngOnInit() {
        this.resetAllLevels();
    }
    toggleLevel(maturityLevel) {
        this.resetSearchTriggered.emit(null);
        maturityLevel.isActive = !maturityLevel.isActive;

        if(maturityLevel.isActive) {
            if(!this.dataCollection.findMaturityLevelData(maturityLevel.id))
                this.dataCollection.addMaturityLevelData(maturityLevel);
        }
        else {
            this.dataCollection.removeMaturityLevelData(maturityLevel.id);
        }
    }

    resetAllLevels() {
        if(this.maturityLevels) {
            this.maturityLevels.map(ml => {
                ml.isActive = false;
                this.dataCollection.removeMaturityLevelData(ml.id);
            });
        }
    }
}