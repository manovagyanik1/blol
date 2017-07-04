// Note: This wrapper is written assuming the result is sorted in reverse chronological order
export class PaginationWrapper {

    public static wrap(args: {results: [], pageSize: number, request: Hapi.Request}): IPaginatedResult {

    }

    private static getNextPageUrl(args: {results:[], request: Hapi.Request pageSize: number}): String {
        const {results, request, pageSize} = args;
        const lastResult = result && result.length ? result[result.length - 1] : null;
        const {path, query} = request;
        query['beforeTimeStamp'] = lastResult['createdAt'];
        const queryString = query.reduce((result, key, index) => {
            if (index === 0) {
                return result.concat(`${key}=${query[key]}`);
            } else {
                return result.concat(`&${key}=${query[key]}`);
            }
        });
        return queryString ? `${path}?${queryString}` : path;
    }

    private static getPreviousPagUrl(results:[], pageSize: number) : String {

    }
}