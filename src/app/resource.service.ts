import { Injectable } from '@angular/core';
import { HttpRequestData } from './models/HttpRequestData';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface IResourceService<T> {
  // These are stored in a custom model, as the real requests need to be generated dynamically (for parameters and such)
  httpRequests: {[key: string]: HttpRequestData};
  // This buffers fetched resources
  resources: {[key: string]: T};

  create(resource: T): void;
  get(resource: any): void;
  update(resource: T): void;
  delete(resource: any): void;
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

  constructor(protected httpClient: HttpClient) { }

  getInstance(): IResourceService<T> {
    return new ResourceService<T>(this.httpClient);
  }
}

export class ResourceService<T> implements IResourceService<T> {
  public httpRequests: {[key: string]: HttpRequestData};
  public resources: any; // {[key: string]: T};

  constructor(protected httpClient: HttpClient) { 

  }

  /**
   * 
   * @param action CRUD action
   * @param body the request body, can be a resource, can be a query
   * @param id 
   */
  protected genericRequest(action: string, body: any, uri?: string): Observable<HttpEvent<any>> {
    const reqData: HttpRequestData = this.httpRequests[action];
    const req = new HttpRequest(reqData.method, reqData.url + ( uri || "" ), body, reqData.options);
    return this.httpClient.request(req);
  }

  protected genericCrud(action: string, request: any, uri?: string) {
    this.genericRequest(action, request, uri).subscribe(
      (res: any) => {
        if (action === 'get') {
          this.resources += res;
        }
      },
      (err: any) => {
        console.log(JSON.stringify(err));
      }
    )
  }

  // Handling methods section, these are meant to be overridden, but provide some default functionallity

  public create(resource: T): void {
    this.genericCrud('create', resource);
  }

  public get(resource: any): void {
    this.genericCrud('get', resource, resource.id);
  }

  public update(resource: T): void {
    this.genericCrud('update', resource);
  }

  public delete(resource: any): void {
    this.genericCrud('delete', null, resource.id);
  }

  buildHttpRequests(baseUrl: string) {
    this.httpRequests['create'] = new HttpRequestData('POST', baseUrl + '/create');
    this.httpRequests['get'] = new HttpRequestData('GET', baseUrl + '/get/');
    this.httpRequests['update'] = new HttpRequestData('PUT', baseUrl + '/update');
    this.httpRequests['delete'] = new HttpRequestData('DELETE', baseUrl + '/delete/');
  }
}