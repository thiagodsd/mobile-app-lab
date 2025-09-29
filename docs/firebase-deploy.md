# Firebase API-Based Setup Guide

## Architecture Overview

This project uses a secure API-based architecture where:
- ✅ All database operations go through Next.js API routes
- ✅ Firebase Admin SDK handles server-side database access
- ✅ Client-side has no direct database access
- ✅ Strict security rules prevent unauthorized access

## 1. Deploy Firestore Rules

Deploy the security rules to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

## 2. Environment Variables Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase configuration in `.env.local`:

### Client-side variables (for Firebase client SDK):
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lab-mobile-webapp.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lab-mobile-webapp
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lab-mobile-webapp.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Server-side variables (for Firebase Admin SDK):
```
FIREBASE_PROJECT_ID=lab-mobile-webapp
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"
```

**Note**: Get the Admin SDK credentials from Firebase Console → Project Settings → Service Accounts → Generate new private key

## 3. API Endpoints

### GET `/api/conhecimento-previo`
- Fetch response count
- Query params: `?full=true` to get all responses (admin)

### POST `/api/conhecimento-previo`
- Submit new response
- Body: `{ estudouEstatistica: string, onde: string }`

### DELETE `/api/conhecimento-previo` (Development only)
- Clear all responses
- Blocked in production

## 4. Test the API

1. Start the development server:
```bash
npm run dev
```

2. Test API endpoints:

```bash
# Get response count
curl http://localhost:3000/api/conhecimento-previo

# Submit a response
curl -X POST http://localhost:3000/api/conhecimento-previo \
  -H "Content-Type: application/json" \
  -d '{"estudouEstatistica":"Sim","onde":"Educação"}'
```

3. Test the UI:
Navigate to: `http://localhost:3000/educacao-na-computacao/conhecimento-previo`

## 5. Monitor in Firebase Console

Visit [Firebase Console](https://console.firebase.google.com/project/lab-mobile-webapp/firestore) to:
- View responses in the `conhecimento-previo` collection
- Monitor API activity
- Check for errors

## Collection Structure

Documents stored via API with this structure:
```typescript
{
  estudouEstatistica: "Sim" | "Não" | "Alguns assuntos",
  onde: "Trabalho" | "Educação" | "Hobby" | "Família",
  timestamp: Timestamp (server timestamp),
  userAgent: string,
  ip: string
}
```

## Security Benefits

- 🔒 **Server-only Access**: Database only accessible via Admin SDK
- 🔒 **API Validation**: All data validated on server before saving
- 🔒 **No Client Credentials**: No sensitive credentials exposed to client
- 🔒 **Rate Limiting**: Can add rate limiting to API routes
- 🔒 **Audit Trail**: IP addresses and user agents logged
- 🔒 **Admin Controls**: Admin operations (like DELETE) restricted by environment