import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'social-button',
    templateUrl: './social-button.component.html',
    styleUrls: ['./social-button.component.scss']  
})
export class SocialButtonComponent implements OnInit {
    
    @Input() socialIcon: string;
    @Input() socialUrl: string;

    constructor() {

    }
    ngOnInit() {
    
    }
}