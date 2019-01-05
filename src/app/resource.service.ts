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

  create(resource: T): void;
  get(query: any): void;
  getAll(query: any): void;
  update(query: any): void;
  delete(query: any): void;
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
   * 
   * @param action CRUD action
   * @param body the request body, can be a resource, can be a query
   * @param id 
   */
  protected genericRequest(action: string, body: any, params?: string | string[]): Observable<HttpEvent<any>> {
    const reqData: HttpRequestData = this.httpRequests[action];
    const req = new HttpRequest(reqData.method, UrlBuilder.addParams(reqData.url, params) , body, reqData.options);
    return this.httpClient.request(req);
  }

  protected genericCrud(action: string, request: any, params?: string | string[]) {
    this.genericRequest(action, request, params).subscribe(
      (res: any) => {
        if (action === 'get' || action === 'getAll') {
          this.resources += res;
        }
      },
      (err: any) => {
        this.genericError(err);
      }
    )
  }

  protected genericError(err: any) {
    console.log(JSON.stringify(err));
    if (err.url && err.status) {
      this.toastr.warning(err.url, err.status);
      if (err.status === 404) {
        this.toastr.error('We could not find what you were looking for, because it doesn\'t exist.', 'Oops!');
      }else {
        this.toastr.error(err.message);
      }
    }
  }

  // Handling methods section, these are meant to be overridden, but provide some default functionallity

  public create(resource: T): void {
    this.genericCrud('create', resource);
  }

  public get(query: any): void {
    this.genericCrud('get', query, query.id as string);
  }

  public getAll(query: any): void {
    this.genericCrud('getAll', query);
  }

  public update(query: any): void {
    this.genericCrud('update', query, query.id as string);
  }

  public delete(query: any): void {
    this.genericCrud('delete', query, query.id as string);
  }

  buildHttpRequests(baseUrl: string) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    this.httpRequests['create'] = new HttpRequestData('POST', baseUrl + '/create', options);
    this.httpRequests['get'] = new HttpRequestData('GET', baseUrl + '/get', options);
    this.httpRequests['getAll'] = new HttpRequestData('GET', baseUrl + '/getall', options);
    this.httpRequests['update'] = new HttpRequestData('PUT', baseUrl + '/update', options);
    this.httpRequests['delete'] = new HttpRequestData('DELETE', baseUrl + '/delete', options);
  }
}