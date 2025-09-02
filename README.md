# Moonlit Thoughts 🌙✨

A beautiful, pink-themed personal journal web app with Firebase cloud storage.

## Features

- 🎨 Soft pink diary-style design with cursive fonts
- 😊 Emoji picker for expressive entries
- ☁️ Cloud storage with Firebase Firestore
- 👤 Anonymous authentication for privacy
- 📱 Mobile-friendly responsive design
- ⚡ Real-time entry updates

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "moonlit-thoughts"
3. Enable Firestore Database in test mode
4. Enable Authentication and allow Anonymous sign-in
5. Copy your Firebase config from Project Settings

### 2. Configure the App

Replace the Firebase config in `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 3. Firestore Security Rules (Test Mode)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

### 4. Deploy to GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your app will be live at `https://username.github.io/repository-name`

## Usage

1. Open `diary.html` to see the welcome screen
2. Click "Open Journal" to start writing
3. Use the emoji picker to add emotions
4. Click "Save Entry" to store in the cloud
5. All entries are automatically synced across devices

## File Structure

```
moonlit-thoughts/
├── diary.html      # Welcome page
├── journal.html    # Main journal interface
├── style.css       # Pink diary theme
├── script.js       # Firebase integration
└── README.md       # This file
```

## Technologies Used

- HTML5 & CSS3
- Vanilla JavaScript (ES6 modules)
- Firebase Firestore
- Firebase Authentication
- emoji-picker-element
- Google Fonts (Dancing Script)

Enjoy writing your moonlit thoughts! 🌙💕