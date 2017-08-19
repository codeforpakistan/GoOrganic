import { Component, OnInit, Input } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { UseCaseDetailsComponent } from '../use-case-details/use-case-details.component';
import { DirCrudComponent } from '../../dir-crud/dir-crud.component';


@Component({
    selector: 'use-case',
    templateUrl: './use-case.component.html',
    styleUrls: ['./use-case.component.scss']
})
export class UseCaseComponent implements OnInit {

  @Input()  usecaseObj: object;

  constructor(private _dialogService: TdDialogService) {
    
  }
  ngOnInit() {

  }
  showUseCaseDetails(usecase):void {
    this._dialogService.open(UseCaseDetailsComponent, {data: {UseCaseComponent: this, usecase: this.usecaseObj}});
  }
  showDirCrud(event):void {
    event.stopPropagation();
    this._dialogService.open(DirCrudComponent);
  }
}
