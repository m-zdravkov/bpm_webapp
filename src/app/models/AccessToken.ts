export class AccessToken {
  _id?: string;
  token?: string;
  expireTime?: Date;
  refreshToken?: string;
  refreshExpireTime?: Date;
}
