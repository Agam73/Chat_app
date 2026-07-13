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

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Socket.IO
- Multer

## Folder Structure

```
Chat_App/
├── client/
├── server/
├── README.md
└── .gitignore
```

## Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
```

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
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_secret=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
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

## Future Improvements

- Group Chats
- Message Reactions
- Read Receipts
- Typing Indicator
- Message Search
- Notifications

## Author

**Agam Bansal**