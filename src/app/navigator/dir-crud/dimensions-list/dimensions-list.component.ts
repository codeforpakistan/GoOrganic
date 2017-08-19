import { Component, OnInit, Input, AfterViewInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { TdSearchInputComponent } from '@covalent/core';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'dimensions-list',
    templateUrl: './dimensions-list.component.html',
    styleUrls: ['./dimensions-list.component.scss']
})
export class DimensionsListComponent implements AfterViewInit, OnInit, OnChanges {
  
  searchInputTerm: string;
  @Input() data: {
        title: string,
        dimensions: [{
            //item: number,
            dimension: string
        }] 
   };

  
  filteredDimensions: any[];
  showMessageCard: boolean;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
        this.showMessageCard = false;
        
  }

  ngOnChanges(): void {
    this.filteredDimensions = this.data.dimensions;
  }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

  search(value): void {
    this.filteredDimensions = this.data.dimensions.filter( d => d.dimension.toLowerCase().indexOf(value.toLowerCase()) != -1 );
  }

  addDimension(): void {
    this.data.dimensions.unshift({
        dimension: ''
    });
  }

  removeDimension(index): void {
    this.data.dimensions.splice(index, 1);
  }

  saveDimensionChanges(): void {
    this.showMessageCard = true;
    setTimeout(() => {
        this.showMessageCard = false;
        this._changeDetectorRef.detectChanges();
    }, 2000);
  }
}
