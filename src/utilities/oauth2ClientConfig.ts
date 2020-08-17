import dotenv from 'dotenv';
const {google} = require('googleapis');

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID, 
    process.env.OAUTH_CLIENT_SECRET, 
    process.env.GOOGLE_CALLBACK_URL
);

export default oauth2Client;