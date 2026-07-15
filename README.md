# Chat App
A real-time full-stack chat application built using the MERN stack and Socket.IO.

## Features
- User Authentication (JWT)
- Signup & Login
- Real-time Messaging
- Online/Offline Status
- Profile Picture Upload
- Update Profile
- Cloud Image Storage
- Responsive UI

## Tech Stack
### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Axios
- Socket.IO Client

## Performance
- Average end-to-end message delivery latency: ~86ms (measured over 30 samples, local network), from client emit to receiver render — includes MongoDB write + Socket.IO push.

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

## Folder Structure
```
Chat_App/
├── client/
│   ├── Dockerfile
│   └── .dockerignore
├── server/
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
├── README.md
└── .gitignore
```

## Installation

### Clone the repository
```bash
git clone https://github.com/Agam73/Chat_app.git
```

You can run this project either **locally** (Node.js installed on your machine) or with **Docker** (no local Node.js setup needed).

---

## Option 1: Run Locally

### Install dependencies
Backend
```bash
cd server
npm install
```

Frontend
```bash
cd client
npm install
```

### Create Environment Variables
Create a `.env` file inside the `server` folder.
Example:
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_secret=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Create a `.env` file inside the `client` folder.
Example:
```
VITE_BACKEND_URL=http://localhost:3000/api/v1
VITE_SOCKET_URL=http://localhost:3000
```

### Run the Backend
```bash
cd server
npm run dev
```

### Run the Frontend
```bash
cd client
npm run dev
```

---

## Option 2: Run with Docker

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed

### Create Environment Variables
Same as above — create `.env` files inside both `server/` and `client/` folders (see examples in Option 1).

### Build and Run Containers
From the project root:
```bash
docker compose up --build
```

This will:
- Build the client and server images
- Start the backend on `http://localhost:3000`
- Start the frontend on `http://localhost:5173`

### Stop Containers
```bash
docker compose down
```

### Rebuild After Dependency Changes
If you add/update npm packages, rebuild the images:
```bash
docker compose up --build
```

---

## Future Improvements
- Group Chats
- Message Reactions
- Read Receipts
- Typing Indicator
- Message Search
- Notifications

## Author
**Agam Bansal**