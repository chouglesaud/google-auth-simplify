# google-auth-simplify
It simplifies ```google-auth-library``` in 3 steps:
1. Generate auth URL.
2. Get auth token. 
3. Get user info.

## Install
```
npm i google-auth-simplify
```
## Example
```js
const express = require('express');
const { GoogleAuth } = require('google-auth-simplify');

const app = express();

const googleAuth = new GoogleAuth({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectURI: GOOGLE_REDIRECT_URI,
});

app.get('/login', (req, res) => {
  const authUrl = googleAuth.generateAuthUrl();// STEP 1
  res.redirect(authUrl);
});

app.get('/google_redirect_url', async (req, res) => {
  const code = req.query['code'];
  const authToken = await googleAuth.getAuthToken(code);// STEP 2
  const profile = await googleAuth.getUserInfo(authToken);// STEP 3
  res.json({profile});
});

app.listen(3000, () => {
  console.log('server started:.:.:');
});

```
