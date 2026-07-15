# Chat App

A real-time full-stack chat application built with the **MERN** stack and **Socket.IO**, featuring JWT authentication, real-time messaging, profile management, Cloudinary image uploads, and Docker support for easy development.

---

## Features

- JWT Authentication
- User Signup & Login
- Real-time Messaging
- Online/Offline User Status
- Profile Picture Upload
- Profile Update
- Cloudinary Image Storage
- Responsive UI

---

## Tech Stack

### Frontend

- React
- Redux Toolkit
- Tailwind CSS
- Axios
- Socket.IO Client
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Socket.IO
- Multer

### DevOps

- Docker
- Docker Compose

---

## Performance

Measured over **30 local-network tests**:

- Average end-to-end message delivery latency: **~86 ms**
- Includes:
  - MongoDB write
  - Socket.IO message delivery
  - Receiver-side rendering

---

## Project Structure

```text
Chat_App/
├── client/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   └── package.json
│
├── compose.yaml
├── README.md
└── .gitignore
```

---

# Getting Started

Clone the repository:

```bash
git clone https://github.com/Agam73/Chat_app.git
cd Chat_app
```

You can run the project in two ways:

- Locally using Node.js
- Using Docker Compose

---

# Option 1 — Run Locally

## Prerequisites

- Node.js 24+
- npm
- MongoDB Atlas account (or a local MongoDB instance)

---

## Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ../client
npm install
```

---

## Configure Environment Variables

### Backend

Copy the example environment file:

```bash
cp .env.example .env
```

Update the values inside `.env`.

Example:

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
JWT_secret=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend

Copy the example environment file:

```bash
cp .env.example .env
```

Update the values.

Example:

```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
VITE_SOCKET_URL=http://localhost:3000
```

---

## Start the Backend

```bash
cd server
npm run dev
```

---

## Start the Frontend

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

# Option 2 — Run with Docker

## Prerequisites

- Docker
- Docker Compose

---

## Configure Environment Variables

Copy the example environment files.

### Backend

```bash
cd server
cp .env.example .env
```

### Frontend

```bash
cd ../client
cp .env.example .env
```

Update both `.env` files with your own configuration.

---

## Build and Start Containers

From the project root:

```bash
docker compose up --build
```

This will:

- Build the frontend image
- Build the backend image
- Create the required containers
- Start the backend on **http://localhost:3000**
- Start the frontend on **http://localhost:5173**

---

## Stop Containers

```bash
docker compose down
```

---

## Rebuild Images

If you install new dependencies or modify the Dockerfiles:

```bash
docker compose up --build
```

Otherwise:

```bash
docker compose up
```

---

## Default Ports

| Service | Port |
|----------|------|
| Frontend | 5173 |
| Backend | 3000 |

---

## Future Improvements

- Group Chats
- Message Reactions
- Read Receipts
- Typing Indicator
- Message Search
- Push Notifications

---

## Author

**Agam Bansal**