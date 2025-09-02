# Firebase Setup Instructions

To enable cloud storage, follow these steps:

## 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "moonlit-thoughts"
4. Enable Google Analytics (optional)

## 2. Enable Services
1. **Firestore Database**: 
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode
   
2. **Authentication**:
   - Go to Authentication
   - Click "Get started"
   - Enable "Anonymous" sign-in method

## 3. Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web" icon to add web app
4. Register app with name "moonlit-thoughts"
5. Copy the firebaseConfig object

## 4. Update Code
Replace the config in `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 5. Update entryManager.ts
Uncomment the Firebase imports and functions in `src/utils/entryManager.ts`

Currently using localStorage for offline functionality.