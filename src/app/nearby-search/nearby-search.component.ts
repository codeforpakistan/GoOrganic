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
        'Cabbage',
        'Carrot',
        'Mint',
        'Onion',
        'Tomato'
    ];

    showResult: boolean = false;

    filteredStrings: string[];

    stringsModel: string[] = [];

    color = 'primary';
    mode = 'determinate';
    bufferValue = 75;

    @Input() searchbarType: string;

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
}