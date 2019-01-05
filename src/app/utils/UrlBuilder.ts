export class UrlBuilder {
    public static addParams(baseUrl: string, params?: string | string[], queryParams?: {[key: string]: string}):string {
        return baseUrl + this.buildUrlParams(params) + this.buildQueryParams(queryParams);
    }


    private static buildUrlParams(params: string | string[], beginWithSlash: boolean = true, endWithSlash: boolean = false): string {
        if (!params)
            return "";

        let result: string = "";
        
        if (beginWithSlash)
            result += "/";

        if (params instanceof Array) {
            for (let param in params) {
                result += param;
            }
        }else {
            result += params;
        }

        if (endWithSlash)
            result += "/";

        return result;
    }

    private static buildQueryParams(queryParams: {[key: string]: string}):string {
        // TODO: Not implemented
        return "";
    }
}