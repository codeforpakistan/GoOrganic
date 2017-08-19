import { Component, OnInit, Input } from '@angular/core';
import { SendRequestService } from '../../shared/services/send-request.service';

@Component({
    selector: 'view-usecases',
    templateUrl: './view-usecases.component.html',
    styleUrls: ['./view-usecases.component.scss']  
})
export class ViewUseCasesComponent implements OnInit {

    useCasesCount: number;

    constructor(private sendRequest: SendRequestService) {
        this.useCasesCount = 0;
        this.sendRequest.subscribeToRequestService().subscribe(result => {
            if(result && result.data)
                this.useCasesCount = result.data.useCasesCount;
        });
    }
    ngOnInit() {
        
    }
    resetViewUseCasesCount() {
        this.useCasesCount = 0;
    }
}