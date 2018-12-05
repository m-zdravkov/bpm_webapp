import { constants } from './Constants';
const baseUrl = constants.baseUrl;
export class Urls {
  private urls: Map<string, string> = new Map();
  constructor() {
    this.urls.set('login', `${baseUrl}/auth/login`);
    this.urls.set('register', `${baseUrl}/auth/register`);
  }
  getUrl(resourceName: string) {
    return this.urls.get(resourceName);
  }
}
