export class HttpRequestData {
    method: string;
    url: string;
    options: any;

    constructor (method: string, url: string, options?: any) {
        this.method = method;
        this.url = url;
        this.options = options;
    }
}