import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'owner-card',
    templateUrl: './owner-card.component.html',
    styleUrls: ['./owner-card.component.scss']  
})
export class OwnerCardComponent implements OnInit {
    
    @Input() owner: Object;
    @Input() backgroundColor: string;
    @Input() fontColor: string;
    @Input() showHrefs: boolean;

    constructor() {}
    ngOnInit() {
    
    }
    disableClick() {
        return false;
    }
}