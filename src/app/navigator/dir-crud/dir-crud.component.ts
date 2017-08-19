import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { TdSearchInputComponent } from '@covalent/core';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dir-crud.component.html',
    styleUrls: ['./dir-crud.component.scss']
})
export class DirCrudComponent implements AfterViewInit, OnInit {
  
  searchInputTerm: string;
  
  categories: string[] = [
    'Analytic Techniques',
    'Success Criteria',
    'Objective / Problem Statement',
    'References',
    'Outcome',
    'Business Benefits',
    'Business Objectives',
    'Data',
    'Challenges',
    'Expected Outcome',
    'Analytics'
  ]

  data: any[] = [
    {
      category: 'Analytic Techniques',
      dimensions: [
        { item: 1, dimension: '1 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Success Criteria',
      dimensions: [
        { item: 1, dimension: '2 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Objective / Problem Statement',
      dimensions: [
        { item: 1, dimension: '3 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'References',
      dimensions: [
        { item: 1, dimension: '4 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Outcome',
      dimensions: [
        { item: 1, dimension: '5 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Business Benefits',
      dimensions: [
        { item: 1, dimension: '6 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Business Objectives',
      dimensions: [
        { item: 1, dimension: '7 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Data',
      dimensions: [
        { item: 1, dimension: '8 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Challenges',
      dimensions: [
        { item: 1, dimension: '9 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Expected Outcome',
      dimensions: [
        { item: 1, dimension: '10 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    },
    {
      category: 'Analytics',
      dimensions: [
        { item: 1, dimension: '11 Provide answers to the following:'},
        { item: 2, dimension: 'Average loiter time at event x for segment y?'},
        { item: 3, dimension: 'How many high earner, young families live close to x?'},
        { item: 4, dimension: 'How many people attended x sporting event?'},
        { item: 5, dimension: 'How many people responded to in-venue ads while in venue?'},
        { item: 6, dimension: 'Provide answers to the following:'},
        { item: 7, dimension: 'Average loiter time at event x for segment y?'},
        { item: 8, dimension: 'How many high earner, young families live close to x?'},
        { item: 9, dimension: 'How many people attended x sporting event?'},
        { item: 10, dimension: 'How many people responded to in-venue ads while in venue?'}
      ]
    }
  ];

  filteredData: any[];
  selectedDataObject: {
    title: string,
    dimensions: [
      {
        item: string,
        dimension: string
      }
    ]
  };

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {

        this.filteredData = this.data;
        this.selectedDataObject = this.data[0];
  }

  ngOnInit(): void {

  }

  search(value): void {
    this.filteredData = this.data.filter( d => d.dimension.toLowerCase().indexOf(value.toLowerCase()) != -1 );
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

  selectItem(index): void {
    this.selectedDataObject = this.data[index];
  }
}
