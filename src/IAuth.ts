export interface IAuth {
  generateAuthUrl(): string;
  getAuthToken(code: string): Promise<any>;
  getUserInfo(token: string): Promise<any>;
}
