// Note: This wrapper is written assuming the result is sorted in reverse chronological order
import { IPaginatedResult } from "./iPaginatedResult";
import * as Hapi from 'hapi';

export class PaginationWrapper {

    public static wrap(args: {results: Array<any>, pageSize: number, request: Hapi.Request}): IPaginatedResult {
        const {results, pageSize, request} = args;
        return {
            results,
            pageInfo: {
                nextPageUrl: PaginationWrapper.getNextPageUrl({results, request, pageSize}),
                previousPageUrl: PaginationWrapper.getPreviousPageUrl({results, request, pageSize}),
            }
        };
    }

    private static getNextPageUrl(args: {results: Array<any>, request: Hapi.Request, pageSize: number}): String {
        const {results, request, pageSize} = args;
        const lastResult = results && results.length ? results[results.length - 1] : null;
        const {path, query} = request;
        const queryCopy = Object.assign({}, query);
        queryCopy['beforeTimeStamp'] = lastResult['createdAt'];
        const queryString = PaginationWrapper.getQueryString(queryCopy);
        return queryString ? `${path}?${queryString}` : path;
    }

    private static getPreviousPageUrl(args: {results: Array<any>, request: Hapi.Request, pageSize: number}): String {
        const {results, request, pageSize} = args;
        const lastResult = results && results.length ? results[0] : null;
        const {path, query} = request;
        const queryCopy = Object.assign({}, query);
        queryCopy['afterTimeStamp'] = lastResult['createdAt'];
        const queryString = PaginationWrapper.getQueryString(queryCopy);
        return queryString ? `${path}?${queryString}` : path;
    }

    private static getQueryString(query: any) : String {
        let queryString = '';
        for (const key in query) {
            if (Object.hasOwnProperty.call(query, key)) {
                queryString = queryString ? `${queryString}&` : queryString;
                queryString = queryString.concat(`${key}=${query[key]}`);
            }
        }
        return queryString;
    }
}