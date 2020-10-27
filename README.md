# vue-meeting-scheduler
![Calendar](./src/assets/meeting-scheduler.png)

## Overview
Vue-meeting-scheduler is an app that makes scheduling meetings easier. It utilizes the Microsoft Authentication Library to make it possible to sign in with your Microsoft account, Microsoft Graph API to show/create Microsoft calendar events, Vue.js + a Vuetify calendar component to display signed in users microsoft events and Google Firebase to store created dates for the poll-voting system.

**A microsoft account is needed to use the application.**

## Features
1. Log in with microsoft account
2. See personal microsoft calendar events in the app calendar
3. A voting system where the organizer can add dates and let other users vote for their preferable date.
4. Create new events with the possibility to invite other people.

## Project setup
1. Clone the repo
2. Go to the root directory of the repo and run `npm install`
3. In the src/plugins folder create a new file called `config.js`
4. Copy everything from the `src/plugins/config-sample.js` file to your newly created `src/plugins/config.js` and change the values to your own (guide furher down on how to get your own values)
5. run `npm run serve` to start the server and go to `http://localhost:8080`

## Setting up Firebase
1. Create a new project in Firebase
2. As stated in the **project setup** at the start of this README, change these values to your own in `src/plugins/config.js`
```
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
}
```

## Registering application
To be able to authenticate users with microsoft you need to register your application

1. Go to https://aad.portal.azure.com/ and sign in with your microsoft account
2. Go to **Azure Active Directory** in the menu to the left and select **App registrations**
3. Select **New registration** and enter a name, set **Supported account types** to **Accounts in any organizational directory and personal Microsoft accounts**
4. Under **redirect URI**, set the first drop-down to **Single-page application (SPA)** and set the value to *http://localhost:8080*
5. Choose **Register** and copy your **Application (client) ID**
6. As stated in the **project setup** at the start of this README, change the client ID to your own in `src/plugins/config.js` 
```
const msalConfig = {
    auth: {
        clientId: 'your-client-id',
        redirectUri: 'http://localhost:8080'
    }
};
```
