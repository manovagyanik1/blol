import {IPageInfo} from './iPageInfo';

export interface IPaginatedResult {
    results: Array<any>;
    pageInfo: IPageInfo;
}