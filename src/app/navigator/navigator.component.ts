import { Component, OnInit, ElementRef, ViewChild, ViewRef } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdLoadingService, TdDigitsPipe, LoadingMode, LoadingType, LoadingStrategy } from '@covalent/core';

import { UserService, IUser } from '../users';

import { ItemsService, ProductsService, AlertsService } from '../../services';

import { multi } from './data';

import { Observable } from 'rxjs/Observable';

import { FiltersDataService } from './shared/services/filters-data.service';

@Component({
  selector: 'bvf-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  viewProviders: [ ItemsService, ProductsService, AlertsService ],
})
export class NavigatorComponent implements OnInit {

  @ViewChild('scrcontainer') scrollContainer: ElementRef;

  items: Object[];
  users: IUser[];
  products: Object[];
  alerts: Object[];

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  // line, area
  autoScale: boolean = true;
  useCasesCount: number = 0;

  resetSiblingValues: boolean;
  isShow: boolean;
  errorMsg: string;

  copyrightYear: number;

  showScrollTopBtn: boolean;

  constructor(private _titleService: Title,
              private _itemsService: ItemsService,
              private _userService: UserService,
              private _alertsService: AlertsService,
              private _productsService: ProductsService,
              private _loadingService: TdLoadingService,
              private _filtersData: FiltersDataService) {
                // Chart
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
    this.resetSiblingValues = false;
    this.isShow = false;

    this._loadingService.register('serviceLoader');
    this.errorMsg = '';
    this.showScrollTopBtn = false;
  }
  ngOnInit(): void {
    this._titleService.setTitle( 'Business Value Framework' );

    var d = new Date();
    this.copyrightYear = d.getFullYear();

  
    Promise.all([
      this._filtersData.getFiltersData(),
      this._filtersData.getOwnersData(),
      this._filtersData.getSuggestionsData()
    ])
    .then(
      data => {
        this._loadingService.resolve('serviceLoader');
        this.isShow = true;
      },
      error => {
        this._loadingService.resolve('serviceLoader');
        this.errorMsg = 'Something went wrong. Please try again.'
      }
    );

  }
  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  getUseCasesCount(value: any): void {
    this.useCasesCount = value;
  }
  listenFilterChanges(value): void {
    this.resetSiblingValues = true;
  }

  scrollToTop() {
    this.smoothScroll();
  }

  scrollTo(scrollOffset: number, duration: number) {
    setTimeout(() => {
      this.scrollContainer.nativeElement.scrollTop = scrollOffset;
    }, duration);
    return;
  }

  smoothScroll() {
    var startY = this.scrollContainer.nativeElement.scrollTop;
    var stopY = 0;
    var distance = startY;
    var speed = Math.round(distance / 100);
    var step = Math.round(distance / 100);
    var leapY = startY - step;
    var timer = 0;
    for (var i = startY; i > stopY; i -= step) {
      this.scrollTo(leapY, timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
	}

  containerScroll() {
    if( Math.round(this.scrollContainer.nativeElement.scrollTop) >=  this.scrollContainer.nativeElement.scrollHeight / 2 ) {
      this.showScrollTopBtn = true;
    }
    if( this.scrollContainer.nativeElement.scrollTop == 0 ) {
      this.showScrollTopBtn = false;
    }
  }
}
