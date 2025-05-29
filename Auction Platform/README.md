# Auction Platform

This is a full-stack web application for managing online auctions. The platform allows users to register, log in, create auctions, place bids, and manage their accounts.

## Features

- User registration and authentication
- Create, view, update, and delete auctions
- Place bids on auctions
- User dashboard for managing auctions and bids
- Image upload for auction items
- RESTful API with Express.js and MongoDB

## Technologies Used

- **Frontend:** React, Redux
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Passport.js (local strategy), express-session
- **File Uploads:** Multer
- **Other:** dotenv, bcryptjs

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/auction-platform.git
   cd auction-platform
   ```

2. **Install client dependencies:**
   ```sh
   cd clients
   npm install
   ```

3. **Install server dependencies:**
   ```sh
   cd ../server
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following content:
   ```
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   PORT=5000
   ```

### Running the Application

**Start the server:**
```sh
cd server
npm run dev
```

**Start the client:**
```sh
cd ../clients
npm start
```

The client will run on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:5000](http://localhost:5000).

## Folder Structure

```
AuctionWeb/
  Auction Platform/
    clients/      # React frontend
    server/       # Express backend
```

## License

This project is licensed under the MIT License.