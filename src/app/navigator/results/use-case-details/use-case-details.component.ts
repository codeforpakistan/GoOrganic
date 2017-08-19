import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'use-case-details',
    templateUrl: './use-case-details.component.html',
    styleUrls: ['./use-case-details.component.scss']  
})
export class UseCaseDetailsComponent implements OnInit {

    usecase: any;
    constructor(@Inject(MD_DIALOG_DATA) public data: any) {
        this.usecase = data.usecase;
    }
    ngOnInit() {
        
    }
    closeUseCaseDetails(): void {
        this.data.UseCaseComponent._dialogService.closeAll();
    }
}