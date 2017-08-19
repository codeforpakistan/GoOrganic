import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, SimpleChange } from '@angular/core'

@Component({
    selector: 'maturity-level',
    templateUrl: './maturity-level.component.html',
    styleUrls: ['./maturity-level.component.scss'],
    changeDetection:ChangeDetectionStrategy.Default
})
export class MaturityLevelComponent implements OnInit {

    imageUrl: string;
    @Input() data: any;
    
    constructor() {
    }
    ngOnInit() {
        if(this.data.name.toLowerCase() == 'idea') {
            this.imageUrl = '../../../../assets/images/idea.png';
        }
        else if(this.data.name.toLowerCase() == 'innovation') {
            this.imageUrl = '../../../../assets/images/innovation.png';
        }
        else if(this.data.name.toLowerCase() == 'proven') {
            this.imageUrl = '../../../../assets/images/proven.png';
        }
        else if(this.data.name.toLowerCase() == 'packaged') {
            this.imageUrl = '../../../../assets/images/packaged.png';
        }
    }
}