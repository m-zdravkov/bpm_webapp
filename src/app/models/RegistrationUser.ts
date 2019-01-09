import {User} from './User';
import {AccessToken} from './AccessToken';


export class RegistrationUser extends User {

  constructor(username: string,
              password: string,
              public email: string,
              public phone?: string,
              public facebook?: string,
              public showPhone?: boolean,
              public showEmail?: boolean,
              public showFacebook?: boolean,
              accessToken?: AccessToken) {
    super(username, password, accessToken); }
}
