# Gupt Baatien

Gupt Baatien is a web application that allows users to receive anonymous messages through a shareable link. Users who want to receive messages must sign up and verify their email, while anyone with the link can send messages anonymously without creating an account.

This project is built as a learning-focused application while following real-world authentication and validation practices.

---

## ✨ Features

- Anonymous message sending without signup  
- User authentication for message receivers  
- Email verification during signup  
- JWT-based authentication  
- Unique shareable link for each user  
- Senders can send multiple anonymous messages  
- Message length and content validation  
- Privacy-focused and minimal design  

---

## 🛠 Tech Stack

- **Framework:** Next.js (TypeScript)  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Validation:** Zod  
- **Email Service:** Used for email verification  

---

## 🔐 Authentication Flow

- Users who want to **receive messages** must:
  - Sign up
  - Verify their email
  - Log in to access their inbox

- Users who **send messages**:
  - Do not need to sign up
  - Can send multiple anonymous messages via a shared link

- Message receivers **cannot reply** to messages (by design)

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and configure the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_API_KEY=your_email_service_key
EMAIL_FROM=your_sender_email
NEXT_PUBLIC_APP_URL=http://localhost:3000
