
import { Client } from "@microsoft/microsoft-graph-client";
import { getToken } from './auth'

// Create an authentication provider
const authProvider = {
    getAccessToken: async () => {
        // call getToken in auth.js
        return await getToken();
    }
};

async function getUser() {
    return await graphClient
      .api('/me')
      // Only get the fields used by the app
      .select('id,displayName,mail,userPrincipalName,mailboxSettings')
      .get();
}

const graphClient = Client.initWithMiddleware({authProvider});

export { getUser, graphClient }
