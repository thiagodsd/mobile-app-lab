# mobile-app-lab
Experimental React Native application exploring cutting-edge features and best practices in mobile app development.

## 🔐 Security Setup

This project uses environment variables for secure credential management. **Never commit API keys or secrets to the repository.**

### Firebase Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Generate new Firebase credentials:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Navigate to Project Settings → General
   - Create a new web app or regenerate existing credentials
   - **Important**: The previous API key was compromised and should not be reused

3. Fill in your `.env.local` file with the new credentials:
   ```
   REACT_APP_FIREBASE_API_KEY=your_new_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   # ... etc
   ```

4. **Never commit `.env.local`** - it's automatically ignored by git
