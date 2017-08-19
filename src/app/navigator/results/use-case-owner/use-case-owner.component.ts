import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'use-case-owner',
    templateUrl: './use-case-owner.component.html',
    styleUrls: ['./use-case-owner.component.scss']  
})
export class UseCaseOwnerComponent implements OnInit {

    @Input() usecaseOwner: any;

    constructor() {
        this.usecaseOwner = {};
    }
    ngOnInit() {
        var d = new Date(this.usecaseOwner.lastUpdatedDate).toDateString().split(" ");
        d.shift(); 
        this.usecaseOwner.lastUpdatedDate = d.join(" ");
    }
}