import { Injectable } from '@angular/core';
import { HttpRequestData } from './models/HttpRequestData';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IResourceService<T> {
  // These are stored in a custom model, as the real requests need to be generated dynamically (for parameters and such)
  httpRequests: {[key: string]:HttpRequestData};

  create(resource: T): Observable<HttpEvent<T>>;
  get(resource: T): Observable<HttpEvent<{[key: string]:T}>>; // Get an array of resources
  update(resource: T): Observable<HttpEvent<T>>;
  delete(resource: T): Observable<HttpEvent<T>>;
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
  public httpRequests: {[key: string]:HttpRequestData};

  constructor(protected httpClient: HttpClient) { 

  }

  protected genericRequest(action: string, resource: T): Observable<HttpEvent<any>> {
    const reqData: HttpRequestData = this.httpRequests[action];
    const req = new HttpRequest(reqData.method, reqData.url, resource, reqData.options);
    return this.httpClient.request(req);
  }

  create(resource: T): Observable<HttpEvent<T>> {
    return this.genericRequest('create', resource);
  }

  get(resource: T): Observable<HttpEvent<{[key:string]:T}>> {
    return this.genericRequest('get', resource);
  }

  update(resource: T): Observable<HttpEvent<T>> {
    return this.genericRequest('update', resource);
  }

  delete(resource: T): Observable<HttpEvent<T>> {
    return this.genericRequest('delete', resource);
  }

  buildHttpRequests(baseUrl: string) {
    this.httpRequests['create'] = new HttpRequestData('POST', baseUrl + '/create');
    this.httpRequests['get'] = new HttpRequestData('GET', baseUrl + '/get');
    this.httpRequests['update'] = new HttpRequestData('PUT', baseUrl + '/update');
    this.httpRequests['delete'] = new HttpRequestData('DELETE', baseUrl + '/delete');
  }
}