import { Injectable } from '@angular/core';
import { HttpRequestData } from './models/HttpRequestData';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ToastrService } from 'ngx-toastr';
import { UrlBuilder } from './utils/UrlBuilder';

export interface IResourceService<T> {
  // These are stored in a custom model, as the real requests need to be generated dynamically (for parameters and such)
  httpRequests: {[key: string]: HttpRequestData};
  // This buffers fetched resources
  resources: {[key: string]: T};

  create(resource: T): Observable<HttpEvent<any>>;
  get(query: any): Observable<HttpEvent<any>>;
  getProperty(resourceId: string, propertyName: string, propertyId: string, query?: any): Observable<HttpEvent<any>>;
  getAll(query: any): Observable<HttpEvent<any>>;
  update(query: any): Observable<HttpEvent<any>>;
  delete(query: any): Observable<HttpEvent<any>>;
  /**
   * This method will automatically build request data for CRUD operations (url + method) from the base URL.
   * You can then fine-tune these as you need.
   * @param baseUrl the base URL for the resource, e.g. http://localhost/resource
   */
  buildHttpRequests(baseUrl: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceServiceInstance<T> {

  constructor(
    protected httpClient: HttpClient,
    protected toastr: ToastrService
  ) { }

  getInstance(): IResourceService<T> {
    return new ResourceService<T>(this.httpClient, this.toastr);
  }
}

export interface HttpRequestDataMap {
  [key: string]: HttpRequestData;
}

export class ResourceService<T> implements IResourceService<T> {
  public httpRequests: {[key: string]: HttpRequestData} = {'': null as HttpRequestData};
  public resources: any; // {[key: string]: T};

  constructor(
    protected httpClient: HttpClient,
    protected toastr: ToastrService
  ) { 
  }

  /**
   * Makes a generic CRUD request from predefined settings, such as data from httpRequests[], and dynamic params[] 
   * @param action CRUD action
   * @param body the request body, can be a resource, can be a query
   * @param params url parameters 
   */
  protected makeRequest(action: string, body: any, params?: string | string[]): Observable<HttpEvent<any>> {
    const reqData: HttpRequestData = this.httpRequests[action];
    const req = new HttpRequest(reqData.method, UrlBuilder.addParams(reqData.url, params) , body, reqData.options);
    return this.httpClient.request(req);
  }

  /**
   * Calls a generic request and then calls the default handlers. Override this if you don't want default handlers.
   * @param action action id (determines request details such as url and method)
   * @param body request body
   * @param params dynamic url parameters after the base url for the request
   */
  protected handleCrud(action: string, body: any, params?: string | string[]): Observable<HttpEvent<any>> {
    let req = this.makeRequest(action, body, params);

    req.subscribe(
      (res: any) => {
        this.handleGenericResponse(action, res);
      },
      (err: any) => {
        this.handleGenericError(action, err);
      }
    );

    return req;
  }

  /**
   * This response handler is called on every generic crud request.
   * @param action id of the action, e.g. create
   * @param res server response
   */
  protected handleGenericResponse(action: string, res: any) {
    if (action === 'get' || action === 'getAll') {
      this.resources += res;
    }
  }

  /**
   * This error handler is called on every generic crud request.
   * @param action id of the action, e.g. create 
   * @param err server response
   */
  protected handleGenericError(action: string, err: any) {
    console.log(JSON.stringify(err));
    if (err.url && err.status) {
      this.toastr.warning(err.url, err.status);
      if (err.status === 404 && action !== 'getProperty') {
        this.toastr.error('We could not find what you were looking for, because it doesn\'t exist.', 'Oops!');
      }else {
        this.toastr.error(err.message);
      }
    }
  }

  // Handling methods section, these can be overridden, but provide some default functionallity
  // You can override them in your service sub-class, but you can also subscribe to them in a component

  public create(resource: T): Observable<HttpEvent<any>> {
    return this.handleCrud('create', resource);
  }

  public get(query: any): Observable<HttpEvent<any>> {
    return this.handleCrud('get', query, query.id as string);
  }

  public getProperty(resourceId: string, propertyName: string, propertyId: string, query?: any): Observable<HttpEvent<any>>  {
    return this.handleCrud('getProperty', query, [resourceId, propertyName, propertyId]);
  }

  public getAll(query: any): Observable<HttpEvent<any>> {
    return this.handleCrud('getAll', query);
  }

  public update(query: any): Observable<HttpEvent<any>> {
    return this.handleCrud('update', query, query.id as string);
  }

  public delete(query: any): Observable<HttpEvent<any>> {
    return this.handleCrud('delete', query, query.id as string);
  }

  buildHttpRequests(baseUrl: string) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    this.httpRequests['create'] = new HttpRequestData('POST', baseUrl, options);
    this.httpRequests['get'] = new HttpRequestData('GET', baseUrl, options);
    this.httpRequests['getProperty'] = new HttpRequestData('GET', baseUrl, options);
    this.httpRequests['getAll'] = new HttpRequestData('GET', baseUrl + '/list', options);
    this.httpRequests['update'] = new HttpRequestData('PUT', baseUrl, options);
    this.httpRequests['delete'] = new HttpRequestData('DELETE', baseUrl, options);
  }
}