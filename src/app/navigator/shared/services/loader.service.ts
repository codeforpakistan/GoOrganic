import { Injectable } from '@angular/core';
import { TdLoadingService, LoadingMode, LoadingType, LoadingStrategy } from '@covalent/core';

@Injectable()
export class LoaderService {
    constructor(private _loadingService: TdLoadingService) {

        this._loadingService.create({
            name: 'loader',
            mode: LoadingMode.Indeterminate,
            type: LoadingType.Circular,
            color: 'accent'
        });
    }
    registerLoader() {
        this._loadingService.register('loader');
    }
    resolveLoader() {
        this._loadingService.resolve('loader');
    }
}