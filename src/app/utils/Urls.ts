import { constants } from './Constants';
import { BPMError } from './BPMError';
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

  getUrlWithParams(resourceName: string, options: Object) {
    Object.keys(options).forEach(key => {
      if (options.hasOwnProperty(key) && typeof options[key] !== 'string') {
        throw new BPMError('URL options can only contain string values',
          'getUrlWithParams', undefined);
      }
    });
    const url = this.getUrl(resourceName);
    const baseUrlLength = baseUrl.length;
    let iterateFlag = true;
    while (iterateFlag) {
      const indexOfColon = url.indexOf(':', baseUrlLength);
      let indexOfSlash = url.indexOf('/', indexOfColon);
      if (indexOfColon === -1) {
        iterateFlag = false;
        break;
      }
      if (indexOfSlash === -1) {
        indexOfSlash = url.length;
      }
      const propertyToReplace = url.substr(indexOfColon + 1, indexOfSlash - indexOfColon - 1);
      const colonWithPropertyToReplace = url.substr(indexOfColon, indexOfSlash - indexOfColon);
      if (options.hasOwnProperty(propertyToReplace)) {
        url.replace(colonWithPropertyToReplace, options[propertyToReplace]);
      } else {
        throw new BPMError('A parameter is missing from the URL', 'Missing parameter', undefined);
      }
    }
    return url;
  }
}
