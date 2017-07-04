import {IPageInfo} from './iPageInfo';

export interface IPaginatedResult {
    results: [];
    pageInfo: IPageInfo;
    metaData: any;
}