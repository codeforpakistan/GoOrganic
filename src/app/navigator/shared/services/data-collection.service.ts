import { Injectable } from '@angular/core';

@Injectable()
export class DataCollectionService {

    dimensionSearchData: string;
    selectOwnerData: any[];
    isViewAllData: boolean;

    industriesData: any[];
    businessFunctionsData: any[];
    functionalInsightsData: any[];
    analyticalCapabilitiesData: any[];


    industriesHash: object;
    bfHash: object;
    fiHash: object;
    acHash: object; 

    maturityLevelsData: any[];
    
    constructor() {
        this.resetAllData();
    }

    selectDimensionSearchData(dimensionSearchParam: any): void {
        this.dimensionSearchData = dimensionSearchParam;
    }
    removeDimensionSearchData(): void {
        this.dimensionSearchData = ''
    }
    addSelectOwnerData(selectOwnerDataParam: object): void {
        // todo: this code will be used in future
        // this.selectOwnerData.push(selectOwnerDataParam);
        this.selectOwnerData = [selectOwnerDataParam];
    }
    removeSelectOwnerData(selectOwnerDataParam: number): void {
        //todo: this code will be used in future
        //this.selectOwnerData = this.selectOwnerData.filter(obj => obj.id != selectOwnerDataParam.id)
        this.selectOwnerData = [];
    }

    viewAllData(val: boolean): void {
        console.log('inside viewAllData ======>>');
        console.log(val);
        this.isViewAllData = val;
    }


    addIndustriesData(industriesDataParam: any): void {
        this.industriesHash[industriesDataParam.name] = 1;
        this.industriesData.push(industriesDataParam);
    }
    removeIndustriesData(industriesDataParam: any): void {
        this.industriesData = this.industriesData.filter(obj => obj.name != industriesDataParam.name);
        delete this.industriesHash[industriesDataParam.name];
    }
    findIndustriesData(industriesDataParam: any): boolean {
        return this.industriesHash.hasOwnProperty(industriesDataParam.name);
    }

    addBusinessFunctionsData(businessFunctionsDataParam: any): void {
        this.bfHash[businessFunctionsDataParam.name] = 1;
        this.businessFunctionsData.push(businessFunctionsDataParam);
    }
    removeBusinessFunctionsData(businessFunctionsDataParam: any): void {
        this.businessFunctionsData = this.businessFunctionsData.filter(obj => obj.name != businessFunctionsDataParam.name);
        delete this.bfHash[businessFunctionsDataParam.name];
    }
    findBusinessFunctionsData(businessFunctionsDataParam: any): boolean {
        return this.bfHash.hasOwnProperty(businessFunctionsDataParam.name);
    }

    addFunctionalInsightsData(functionalInsightsDataParam: any): void {
        this.fiHash[functionalInsightsDataParam.name] = 1;
        this.functionalInsightsData.push(functionalInsightsDataParam);
    }
    removeFunctionalInsightsData(functionalInsightsDataParam: any): void {
        this.functionalInsightsData = this.functionalInsightsData.filter(obj => obj.name != functionalInsightsDataParam.name);
        delete this.fiHash[functionalInsightsDataParam.name];
    }
    findFunctionalInsightsData(functionalInsightsDataParam: any): boolean {
        return this.fiHash.hasOwnProperty(functionalInsightsDataParam.name);
    }

    addAnalyticalCapabilitiesData(analyticalCapabilitesDataParam: any): void {
        this.acHash[analyticalCapabilitesDataParam.name] = 1;
        this.analyticalCapabilitiesData.push(analyticalCapabilitesDataParam);
    }
    removeAnalyticalCapabilitiesData(analyticalCapabilitesDataParam: any): void {
        this.analyticalCapabilitiesData = this.analyticalCapabilitiesData.filter(obj => obj.name != analyticalCapabilitesDataParam.name);
        delete this.acHash[analyticalCapabilitesDataParam.name];
    }
    findAnalyticalCapabilitiesData(analyticalCapabilitesDataParam: any): boolean {
        return this.acHash.hasOwnProperty(analyticalCapabilitesDataParam.name);
    }

    addMaturityLevelData(maturityLevelDataParam: object): void {
        this.maturityLevelsData.push(maturityLevelDataParam);
    }
    removeMaturityLevelData(maturityLevelDataParam: number): void {
        this.maturityLevelsData = this.maturityLevelsData.filter(mld => mld.id != maturityLevelDataParam);
    }
    findMaturityLevelData(maturityLevelDataParam: number): boolean {
        return this.maturityLevelsData.findIndex(mld => mld.id == maturityLevelDataParam) != -1 ? true : false;
    }
    getDataObject(): object {
        let dataObject = {};
        
        if(this.isViewAllData) {
            return dataObject;
        }

        if(this.dimensionSearchData && this.dimensionSearchData.length != 0)
        {
            dataObject['searchText'] = this.dimensionSearchData;
        }
        if(this.selectOwnerData && this.selectOwnerData.length != 0)
        {
            dataObject['selectedOwners'] = this.selectOwnerData;
        }

        if(this.industriesData && this.industriesData.length != 0)
        {
            dataObject['industries'] = this.industriesData;
        }
        if(this.businessFunctionsData && this.businessFunctionsData.length != 0)
        {
            dataObject['businessFunctions'] = this.businessFunctionsData;
        }
        if(this.functionalInsightsData && this.functionalInsightsData.length != 0)
        {
            dataObject['functionalInsights'] = this.functionalInsightsData;
        }
        if(this.analyticalCapabilitiesData && this.analyticalCapabilitiesData.length != 0)
        {
            dataObject['analyticalCapabilities'] = this.analyticalCapabilitiesData;
        }

        if(this.maturityLevelsData && this.maturityLevelsData.length != 0)
        {
            dataObject['maturityLevels'] = this.maturityLevelsData;
        }

        return dataObject;
    }
    resetAllData(): void {
        this.dimensionSearchData = '';
        this.selectOwnerData = [];
        this.isViewAllData = false;
        this.industriesData = [];
        this.businessFunctionsData = [];
        this.functionalInsightsData = [];
        this.analyticalCapabilitiesData = [];
        this.maturityLevelsData = [];

        this.industriesHash = {};
        this.bfHash = {};
        this.fiHash = {};
        this.acHash = {};
    }
}