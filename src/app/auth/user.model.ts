export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public clgname: string,
    public contact: string,
    private _token: string,
    private _tokenExpiration: Date
  ) {}
  get token() {
    if (!this._tokenExpiration || this._tokenExpiration <= new Date()) {
      return null;
    }
    return this._token;
  }
  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this._tokenExpiration.getTime() - new Date().getTime();
  }
}
