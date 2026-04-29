# 🎵 Music Sampler Project

A full-stack music sequencer app with user authentication and real-time audio grid playback.

## 🚀 Features

* User registration and login
* Password encryption (bcrypt)
* JWT authentication
* Interactive music grid (sequencer)
* Add / remove columns dynamically
* Switch instruments (guitar / drums)
* Adjustable playback speed
* Real-time audio playback
* ▶️ Start / Stop playback

## 🧱 Tech Stack

### Frontend

* React + TypeScript
* React Router
* CSS

### Backend

* Node.js
* Express
* bcrypt
* JWT
* JSON file database

## 📁 Project Structure

```
project/
├── client/
│   ├── components/
│   ├── sequencer.ts
│   ├── App.tsx
│   └── style/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── db/
│   ├── sounds/
│   │   ├── guitar/
│   │   └── drums/
│   └── index.js
```

## ⚙️ Installation

### Server

```bash
cd server
npm install
node server.js
```

Server runs on:
[http://localhost:3001](http://localhost:3001)

### Client

```bash
cd client
npm install
npm run dev
```

Client runs on:
[http://localhost:5173](http://localhost:5173)

## 🔐 API Endpoints

### Register

`POST /register`

```json
{
  "name": "username",
  "password": "password"
}
```

### Login

`POST /login`

```json
{
  "name": "username",
  "password": "password"
}
```

Response:

```json
{
  "message": "Login success",
  "token": "JWT_TOKEN"
}
```

## 🎹 How the Sequencer Works

* Grid of notes
* Each column plays in sequence
* Active column is highlighted
* Looping playback supported
* Real-time audio triggering
* Start and Stop control playback

## 📦 Sounds

```
server/sounds/
├── guitar/
└── drums/
```