const msalConfig = {
    auth: {
        clientId: '<your-client-id>',
        redirectUri: 'http://localhost:8080'
    }
};

const msalRequest = {
      scopes: [
        'user.read',
        'mailboxsettings.read',
        'calendars.readwrite'
        ],
      prompt: "select_account"
}

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
}

export { msalConfig, msalRequest, firebaseConfig }

