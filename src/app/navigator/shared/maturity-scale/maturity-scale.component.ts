import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'maturity-scale',
    templateUrl: './maturity-scale.component.html',
    styleUrls: ['./maturity-scale.component.scss']  
})
export class MaturityScaleComponent implements OnInit {
    
    @Input() level: string;
    @Input() mode: string; //simple | detailed

    constructor() {
    }
    ngOnInit() {
    
    }
}