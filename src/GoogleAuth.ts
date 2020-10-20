import { OAuth2Client, TokenPayload } from 'google-auth-library';
import {
  GetTokenResponse,
  GenerateAuthUrlOpts,
} from 'google-auth-library/build/src/auth/oauth2client';
import { IAuth } from './IAuth';

type AuthOptions = {
  clientId: string;
  clientSecret: string;
  redirectURI: string;
};

export class GoogleAuth implements IAuth {
  private client: OAuth2Client;
  private authOptions: AuthOptions;
  constructor(authOptions: AuthOptions) {
    this.client = new OAuth2Client({
      clientId: authOptions.clientId,
      clientSecret: authOptions.clientSecret,
      redirectUri: authOptions.redirectURI,
    });
    this.authOptions = authOptions;
  }
  public generateAuthUrl(): string {
    const defaultScopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];
    const generateAuthUrlOpts: GenerateAuthUrlOpts = {
      scope: [...defaultScopes],
      access_type: 'offline',
    };

    return this.client.generateAuthUrl(generateAuthUrlOpts);
  }
  public async getAuthToken(code: string): Promise<string> {
    try {
      const { tokens }: GetTokenResponse = await this.client.getToken(code);
      return tokens.id_token;
    } catch (error) {
      throw 'invalid code';
    }
  }
  public async getUserInfo(token: string): Promise<any> {
    if (!this.isValidAuthToken(token)) {
      throw 'invalid token';
    }
    return await this.getTicketPaylod(token);
  }
  private async isValidAuthToken(token: string): Promise<boolean> {
    const payload: any = await this.getTicketPaylod(token);
    if (payload.aud === this.authOptions.clientId) return true;
    return false;
  }
  private async getTicketPaylod(
    token: string
  ): Promise<TokenPayload | boolean> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.authOptions.clientId,
      });
      return ticket.getPayload();
    } catch (err) {
      return false;
    }
  }
}
