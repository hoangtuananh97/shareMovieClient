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
3. Click "Share a Movie" to upload a new video. Let's upload and input:
   1. Upload video <Required>
   2. Upload image <Required>
   3. Input title <Required>
   4. Input Description <Option>
   5. Input tag <Option>
4. Interact with videos by liking or disliking them.
5. Receive real-time notifications when other users share new videos.
6. Reconnect websocket when restart server.

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

### WebSocket Connection Issues
If you're experiencing problems with WebSocket connections:
1. Ensure your backend server is running and accessible.
2. Verify that the WebSocket URL in your `.env` file is correct.
3. Check the browser console for any connection errors.
4. If using a secure WebSocket (wss://), ensure your SSL certificates are valid.

### Video Playback Problems
If videos are not playing correctly:
1. Confirm that the video URLs are valid and accessible.
2. Check if the video format is supported by the browser you're using.
3. Clear your browser cache and reload the page.
4. Ensure your internet connection is stable.

### Authentication Errors
If you're having trouble logging in or accessing protected routes:
1. Check if your login credentials are correct.
2. Verify that the authentication token is being stored correctly in localStorage.
3. Ensure the backend API is correctly validating and responding to authentication requests.

### File Upload Issues
If you're unable to upload videos or images:
1. Check the file size and ensure it's within the allowed limit.
2. Verify that the file format is supported.
3. Ensure you have the necessary permissions to upload files.
4. Check the network tab in your browser's developer tools for any error responses from the server.

## RUN Client and Server
1. Goto folder parent
2. Create `sh file`. Ex: `run_server.sh`
3. Add permission for `sh file`: ` chmod +x run_server.sh`
4. Add content to file:
```
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build the Docker images and start the containers
echo "Server: Building Docker images and starting containers..."
docker-compose -f <Folder Server>/docker-compose.yml up --build -d

echo "Client: Building Docker images and starting containers..."
docker-compose -f <Folder Client>/docker-compose.yml up --build -d

# Wait for a few seconds to ensure that services are up and running
echo "Waiting for services to start..."
sleep 5

echo "RUNNING..."
```
5. Run `./run_server.sh`
