import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StepState, TdSearchInputComponent } from '@covalent/core';

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

    locations: string[] = [
        'Rawal Town',                            
        'Maira Sumbal Jaffar',    
        'Bokra',    
        'Jhangi Saydan',    
        'Badhana Kalan',    
        'Tarnol',    
        'Sarai Kharbooza',    
        'Shah Allah Ditta',    
        'Golra Sharif',    
        'Ali Pur Farash',
        'Taramri',
        'Chak Shahzad',    
        'Pandori'
    ];

    filteredLocations: string[];
    
    showResult: boolean = false;

    filteredStrings: string[];

    stringsModel: string[] = [];

    color = 'primary';
    mode = 'determinate';
    bufferValue = 75;

    @ViewChild('search') search: TdSearchInputComponent;

    @Input() searchbarType: string;

    selectedLocation: string;

    ngOnInit(): void {
        this.filterStrings('');
        this.filteredLocations = this.locations;
    }

    showNoLocationMsg: boolean;
    
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

    filterLocations(value): void {
        
        this.filteredLocations = this.locations.filter(l =>  l.toLowerCase().indexOf(value.toLowerCase()) != -1 );
        
        if(value.length != 0 && this.filteredLocations.length == 0){
            this.showNoLocationMsg = true;
            setTimeout(() => {
                this.showNoLocationMsg = false;
            }, 1500);
        }
    }

    clear(): void {
        this.search.value = '';
        this.showResult = false;
    }

    selectLocation(loc): void {
        this.search.value = loc;
        this.selectedLocation = loc;
        this.filteredLocations = [];
    }

    doSearch(value): void {
        this.selectedLocation = value;
        if(this.search.value)
            this.showResult = true;
    }

    searchLoc(): void {
        if(this.search.value)
            this.showResult = true;
    }
 
}