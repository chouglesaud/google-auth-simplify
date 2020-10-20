import express, { Request, Response } from 'express';

const app = express();

import { GoogleAuth } from '../GoogleAuth';
require('dotenv').config();

const googleAuth = new GoogleAuth({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectURI: process.env.GOOGLE_REDIRECT_URI,
});

app.get('/login', (req: Request, res: Response) => {
  res.send(`<a href="${googleAuth.generateAuthUrl()}">my auth</a>`);
});

app.get('/api/v1/auth/callback', async (req: Request, res: Response) => {
  const code: string = req.query['code'] as string;
  const authToken = await googleAuth.getAuthToken(code);
  const profile = await googleAuth.getUserInfo(authToken);
  res.json({ code, authToken, profile });
});

app.listen(3000, () => {
  console.log('server started');
});
