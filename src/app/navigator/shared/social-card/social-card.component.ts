import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'social-card',
    templateUrl: './social-card.component.html',
    styleUrls: ['./social-card.component.scss']  
})
export class SocialCardComponent implements OnInit {
    
    @Input() socialObj: object;
    
    constructor() {}
    ngOnInit() {
    
    }
}