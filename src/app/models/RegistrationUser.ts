import {User} from './User';
import {AccessToken} from './AccessToken';


export class RegistrationUser extends User {

  constructor(public username: string,
              public password: string,
              public email: string,
              public phone?: string,
              public facebook?: string,
              public showPhone?: boolean,
              public showEmail?: boolean,
              public showFacebook?: boolean,
              public accessToken?: AccessToken) {
    super(username, password); }
}
