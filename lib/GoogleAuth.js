"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuth = void 0;
const google_auth_library_1 = require("google-auth-library");
class GoogleAuth {
    constructor(authOptions) {
        this.client = new google_auth_library_1.OAuth2Client({
            clientId: authOptions.clientId,
            clientSecret: authOptions.clientSecret,
            redirectUri: authOptions.redirectURI,
        });
        this.authOptions = authOptions;
    }
    generateAuthUrl() {
        const defaultScopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ];
        const generateAuthUrlOpts = {
            scope: [...defaultScopes],
            access_type: 'offline',
        };
        return this.client.generateAuthUrl(generateAuthUrlOpts);
    }
    async getAuthToken(code) {
        try {
            const { tokens } = await this.client.getToken(code);
            return tokens.id_token;
        }
        catch (error) {
            throw 'invalid code';
        }
    }
    async getUserInfo(token) {
        if (!this.isValidAuthToken(token)) {
            throw 'invalid token';
        }
        return await this.getTicketPaylod(token);
    }
    async isValidAuthToken(token) {
        const payload = await this.getTicketPaylod(token);
        if (payload.aud === this.authOptions.clientId)
            return true;
        return false;
    }
    async getTicketPaylod(token) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: this.authOptions.clientId,
            });
            return ticket.getPayload();
        }
        catch (err) {
            return false;
        }
    }
}
exports.GoogleAuth = GoogleAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZ2xlQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Hb29nbGVBdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUFpRTtBQWFqRSxNQUFhLFVBQVU7SUFHckIsWUFBWSxXQUF3QjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQVksQ0FBQztZQUM3QixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVE7WUFDOUIsWUFBWSxFQUFFLFdBQVcsQ0FBQyxZQUFZO1lBQ3RDLFdBQVcsRUFBRSxXQUFXLENBQUMsV0FBVztTQUNyQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBQ00sZUFBZTtRQUNwQixNQUFNLGFBQWEsR0FBRztZQUNwQixnREFBZ0Q7WUFDaEQsa0RBQWtEO1NBQ25ELENBQUM7UUFDRixNQUFNLG1CQUFtQixHQUF3QjtZQUMvQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUN6QixXQUFXLEVBQUUsU0FBUztTQUN2QixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDTSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDcEMsSUFBSTtZQUNGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBcUIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDeEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sY0FBYyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUNNLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBYTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sZUFBZSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzFDLE1BQU0sT0FBTyxHQUFRLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDM0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ08sS0FBSyxDQUFDLGVBQWUsQ0FDM0IsS0FBYTtRQUViLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2FBQ3BDLENBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztDQUNGO0FBdkRELGdDQXVEQyJ9