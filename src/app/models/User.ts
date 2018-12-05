import { AccessToken } from './AccessToken';

export class User {
  constructor(public username: string, public password: string, public accessToken?: AccessToken, public _id?: string) { }
}
