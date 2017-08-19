// must contain md-sidenav
import { Component, OnInit, ElementRef, ViewChild, ViewRef } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdLoadingService, TdDigitsPipe, LoadingMode, LoadingType, LoadingStrategy } from '@covalent/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dashboard',
  templateUrl: './projects-listing.component.html',
  styleUrls: ['../navigator.component.scss'],
})
export class ProjectListingComponent implements OnInit {

  constructor(private _titleService: Title) {
  }
  ngOnInit(): void {
    this._titleService.setTitle( 'Go Organic - Dashboard' );
  }
}
