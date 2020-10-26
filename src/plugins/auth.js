// import Vue from 'vue';
import * as msal from "@azure/msal-browser";
import { msalConfig, msalRequest } from './config'

const msalClient = new msal.PublicClientApplication(msalConfig);
let account = null;

async function getToken() {
    account = sessionStorage.getItem('msalAccount');
    if (!account) {
        throw new Error(
            'User account missing from serssion. Please sign out and sign in again.'
        );
    }

    try {
        // Attempt to get the token silently
        const silentRequest = {
            scopes: msalRequest.scopes,
            account: msalClient.getAccountByUsername(account)
        };

        const silentResult = await msalClient.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (silentError) {
        // If silent requests fails with InteractionRequiredAuthError,
        // attempt to get the token interactively
        if (silentError instanceof msal.InteractionRequiredAuthError) {
            const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
            return interactiveResult.accessToken;
        } else {
            throw silentError;
        }
    }
}

export { msalClient, account, getToken }
