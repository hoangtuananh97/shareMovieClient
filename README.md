# Video Sharing Application

## Introduction
This is a React-based video sharing application that allows users to upload, view, and interact with shared videos. Key features include user authentication, real-time notifications for new video uploads, and a responsive design for various screen sizes.

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- A modern web browser

## Installation & Configuration
1. Clone the repository:
   ```
   git clone https://github.com/hoangtuananh97/shareMovieClient
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_WS_URL=ws://localhost:8000/ws
   ```
   Replace the URLs with your backend API and WebSocket endpoints.

## Running the Application
1. Start the development server:
   ```
   npm start
   ```

2. Access the application in your web browser at `http://localhost:3000`

3. Run the test suite:
   ```
   npm test
   ```

## Usage
1. Register or log in to your account.
2. Browse shared videos on the home page.
3. Click "Share a Movie" to upload a new video.
4. Interact with videos by liking or disliking them.
5. Receive real-time notifications when other users share new videos.
6. Reconnect websocket

## Docker Deployment (Optional)
To deploy the application using Docker:

### Options 1:
1. Build the Docker image:
   ```
   docker build -t video-sharing-app .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 video-sharing-app
   ```
### Options 2:
Only run docker-compose:
   ```
   docker-compose up --build -d
   ```
The application will be accessible at `http://localhost:3000`.

## Troubleshooting
- If you encounter WebSocket connection issues, ensure your backend server is running and the WebSocket URL is correct in the `.env` file.
- If videos fail to load, check your network connection and verify that the backend API is accessible.
- For any test failures, ensure all dependencies are up to date by running `npm install`.
