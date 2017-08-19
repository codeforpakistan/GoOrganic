import { Component, OnInit, Input } from '@angular/core';
import { StepState } from '@covalent/core';

@Component({
    selector: 'nearby-search',
    templateUrl: './nearby-search.component.html',
    styleUrls: ['./nearby-search.component.scss']  
})
export class NearBySearchComponent implements OnInit {
    
    disabled: boolean = false;
    chipAddition: boolean = true;
    chipRemoval: boolean = true;

    strings: string[] = [
        'stepper',
        'expansion-panel',
        'markdown',
        'highlight',
        'loading',
        'media',
        'chips',
        'http',
        'json-formatter',
        'pipes',
        'need more?',
    ];

    filteredStrings: string[];

    stringsModel: string[] = this.strings.slice(0, 6);

    ngOnInit(): void {
        this.filterStrings('');
    }

    filterStrings(value: string): void {
        this.filteredStrings = this.strings.filter((item: any) => {
            if (value) {
            return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
            } else {
            return false;
            }
        }).filter((filteredItem: any) => {
            return this.stringsModel ? this.stringsModel.indexOf(filteredItem) < 0 : true;
        });
    }


    // activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
    // stateStep2: StepState = StepState.Required;
    // stateStep3: StepState = StepState.Complete;
    
    // toggleRequiredStep2(): void {
    //     this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
    // }

    // toggleCompleteStep3(): void {
    //     this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
    // }

    // activeStep1Event(): void {
    //     this.activeDeactiveStep1Msg = 'Active event emitted.';
    // }

    // deactiveStep1Event(): void {
    //     this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    // }

    color = 'warn';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
}